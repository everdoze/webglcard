import style from './style.scss';
import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  LineSegments,
  Spherical,
  LinearMipmapNearestFilter,
  PerspectiveCamera,
  Points,
  Raycaster,
  Scene,
  ShaderMaterial,
  Texture,
  Vector2,
  Vector3,
  Box3,
  MeshBasicMaterial,
  Mesh,
  WebGLRenderer
} from 'three';

import EventSystem from 'app/events';

import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js';
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { Font } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

import AboutMe from 'app/views/about-me';

import {Elastic, gsap, Power0, Power2} from 'gsap';
import DotsVertexShader from 'shaders/dots.vertex.glsl';
import DotsFragmentShader from 'shaders/dots.fragment.glsl';
import InfoVertexShader from 'shaders/info.vertex.glsl';
import InfoFragmentShader from 'shaders/info.fragment.glsl';
import DotTexture from 'textures/dot-texture.png';
import InfoTexture from 'textures/info1.png';
import BrainTexture from 'textures/brain-circuit1.png';
import SmileBeam from 'textures/smile-beam1.png';
import CirclePhone from 'textures/circle-phone-flip1.png';
import Handshake from 'textures/handshake1.png';
import OswaldFont from 'typo/Oswald_Regular.json';
import debounce from 'utils/debounce';
import {cancelablePromise} from 'utils/cancellable-promise';
import Logger from 'app/logger';

const logger = new Logger('Renderer');

const SETUP = {
  CAMERA_NAVIGATION_TIME: 0.5,
  DISTANCE_TO_INFO_POINT: 50,
  DEFAULT_CAMERA_POSITION: new Vector3(0, 0, 350),
  FONT_SIZE: 12,
  DOTS_AMOUNT: 3000,
  INFO_HOVER_DURATION: 0.5,
  INFO_OUT_DURATION: 0.5,
  DOT_HOVER_DURATION: 0.5,
  DOT_OUT_DURATION: 0.5
};

class Renderer {
  constructor(root, onReady) {
    this.canvas = this.createCanvas(root);
    this.lastTime = performance.now();
    this.deltaTime = 0;
    this.cancelNavigationThen = null;
    this.detail = false;
    
    this.devicePixelRatio = Math.min(window.devicePixelRatio, 2);
    this.dotsize = 5 * this.devicePixelRatio;
    this.dothoverdelta = 5 * this.devicePixelRatio;

    this.infodotsize = 25 * this.devicePixelRatio;
    this.infodothoverdelta = 7 * this.devicePixelRatio;

    this.infoPoints = [
      {
        name: '/about',
        component: AboutMe,
        texture: this.loadTexture(InfoTexture)
      },
      {
        name: '/skills',
        component: AboutMe,
        texture: this.loadTexture(BrainTexture)
      },
      {
        name: '/hobbies',
        component: AboutMe,
        texture: this.loadTexture(SmileBeam)
      },
      {
        name: '/contacts',
        component: AboutMe,
        texture: this.loadTexture(CirclePhone)
      },
      {
        name: '/projects',
        component: AboutMe,
        texture: this.loadTexture(Handshake)
      }
    ];

    this.initColors();
    this.initScene();
    this.initCamera();
    this.initRenderer();
    this.initRaycaster();
    this.initGroup();
    this.popupateScene();
    this.createMouseHandlers();
    this.createTouchHandlers();

    this.animations = {};
    this.infoAnimations = {};
    this.hovered = [];
    this.prevHovered = [];
    this.infoHovered = [];
    this.prevInfoHovered = [];
    this.mouse = {
      x: -1.0,
      y: -1.0
    }

    gsap.ticker.add(this.render.bind(this));
    window.addEventListener("resize", debounce(this.onResize.bind(this)));
    
    EventSystem.bind('reset-camera', this.onBack.bind(this));
    EventSystem.bind('navigate-to', this.navigateTo.bind(this));
    
    onReady();
  }
  
  navigateTo (name) {
    const index = this.infoPoints.findIndex(p => p.name === name);
    this.detail = true;
    this.handleInfoClick(index);
  }
  
  onResize() {
    this.canvas.style.width = '';
    this.canvas.style.height = '';
    this.width = this.canvas.offsetWidth;
    this.height = this.canvas.offsetHeight;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
    this.composer.setSize(this.width, this.height);
    this.composer.setPixelRatio(this.devicePixelRatio);
  }

  initColors () {
    this.colors = [
      new Color('#44a8be'),
      new Color('#118387'),
      new Color('#7fc4cc'),
      new Color('#c4dfe6')
    ];
    this.pointColors = [
      new Color('#a6d8e8'),
      new Color('#aadadc'),
      new Color('#adf5d1'),
      new Color('#c2f8d1')
    ];
    this.infoColors = [
      new Color('#ffcb80'),
      new Color('#f695ac'),
      new Color('#7fd4ff'),
      new Color('#e9f8c2'),
      new Color('#73ff6c'),
    ];
  }

  initRenderer () {
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      antialias: true
    });


    this.renderer.setSize(this.canvas.width, this.canvas.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor('#081f1f'); //

    this.composer = new EffectComposer(this.renderer);

    this.composer.addPass(new RenderPass(this.scene, this.camera));

    const bloomPass = new UnrealBloomPass(new Vector2(this.canvas.width, this.canvas.height), 0.3, 1.2, 0.50);

    this.composer.addPass(bloomPass);
  }

  initScene () {
    this.scene = new Scene();
  }

  initRaycaster () {
    this.raycaster = new Raycaster();
    this.raycaster.params.Points.threshold = 6;
  }

  initCamera() {
    this.camera = new PerspectiveCamera(50, this.canvas.width / this.canvas.height, 0.1, 2000);
    this.resetCamera();
  }

  resetCamera () {
    this.camera.position.copy(SETUP.DEFAULT_CAMERA_POSITION);
  }

  initGroup () {
    this.group = new Group();
    this.scene.add(this.group);
  }

  base64ToUint8Array(base64) {
    const binaryString = atob(base64.split(',')[1]);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  loadImage (image) {
    const bytes = this.base64ToUint8Array(image);
    const blob = new Blob([bytes], { type: 'image/png' });
    const imageUrl = URL.createObjectURL(blob);
    const img = new Image();
    img.src = imageUrl;
    return img;
  }

  loadTexture (image, flip = false) {
    const texture = new Texture(this.loadImage(image));
    texture.needsUpdate = true;
    texture.flipY = flip;
    texture.minFilter = LinearMipmapNearestFilter;
    return texture;
  }
  
  calculateVectorXYZ (vector) {
    vector.x = Math.cos(vector.theta) * Math.cos(vector.phi);
    vector.y = Math.sin(vector.phi);
    vector.z = Math.sin(vector.theta) * Math.cos(vector.phi);
  }

  popupateScene() {
    const dotTexture = this.loadTexture(DotTexture);

    const dotsAmount = SETUP.DOTS_AMOUNT;
    this.dotsGeometry = new BufferGeometry();

    // Массивы для позиций, размеров и цветов
    const positions = new Float32Array(dotsAmount * 3);
    const sizes = new Float32Array(dotsAmount);
    const colors = new Float32Array(dotsAmount * 3);

    this.animated = {};

    // Заполнение массивов данными
    for (let i = 0; i < dotsAmount; ++i) {
      const vector = new Vector3();
      vector.color = Math.floor(Math.random() * this.pointColors.length);
      vector.theta = Math.random() * Math.PI * 2;
      vector.phi = (1 - Math.sqrt(Math.random())) * Math.PI / 2 * (Math.random() > 0.5 ? 1 : -1);

      this.calculateVectorXYZ(vector);
      vector.multiplyScalar(120 + (Math.random() - 0.5) * 5);
      vector.scaleX = this.dotsize;

      if (Math.random() > 0.5) {
        this.moveDot(vector, i);
        this.animated[i] = true;
      }

      vector.toArray(positions, i * 3);
      this.pointColors[vector.color].toArray(colors, i * 3);
      sizes[i] = this.dotsize;
    }

    // Установка атрибутов в геометрию
    this.attributePositions = new Float32BufferAttribute(positions, 3);
    this.attributeSizes = new Float32BufferAttribute(sizes, 1);
    this.attributeColors = new Float32BufferAttribute(colors, 3);

    this.dotsGeometry.setAttribute('position', this.attributePositions);
    this.dotsGeometry.setAttribute('size', this.attributeSizes);
    this.dotsGeometry.setAttribute('color', this.attributeColors);

    const shaderMaterial = new ShaderMaterial({
      uniforms: {
        uTexture: { value: dotTexture }
      },
      vertexShader: DotsVertexShader,
      fragmentShader: DotsFragmentShader,
      transparent: true
    });

    this.wrap = new Points(this.dotsGeometry, shaderMaterial);
    this.wrap.renderOrder = 1;

    // Создание геометрии для линий
    const segmentsGeom = new BufferGeometry();
    const segmentPositions = [];
    const segmentColors = [];

    for (let i = 0; i < this.dotsGeometry.attributes.position.count; i++) {
      const vector = new Vector3().fromBufferAttribute(this.dotsGeometry.attributes.position, i);
      for (let j = i + 1; j < this.dotsGeometry.attributes.position.count; j++) {
        const otherVector = new Vector3().fromBufferAttribute(this.dotsGeometry.attributes.position, j);
        const dist = vector.distanceTo(otherVector);
        if (dist < 16 && !this.animated[i] && !this.animated[j]) {
          segmentPositions.push(vector.x, vector.y, vector.z);
          segmentPositions.push(otherVector.x, otherVector.y, otherVector.z);
          const color = this.colors[Math.floor(Math.random() * this.colors.length)];
          segmentColors.push(color.r, color.g, color.b);
          segmentColors.push(color.r, color.g, color.b);
        }
      }
    }

    this.linesPositions = new Float32BufferAttribute(segmentPositions, 3)
    this.linesAttributes = new Float32BufferAttribute(segmentColors, 3);
    segmentsGeom.setAttribute('position', this.linesPositions);
    segmentsGeom.setAttribute('color', this.linesAttributes);

    const segmentsMat = new LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.2
    });

    this.segments = new LineSegments(segmentsGeom, segmentsMat);
    this.segments.renderOrder = 2;

    // Точки со страницами
    this.infoDotsGeometry = new BufferGeometry();

    const infoPositions = new Float32Array(this.infoPoints.length * 3);
    const infoSizes = new Float32Array(this.infoPoints.length);
    const infoColors = new Float32Array(this.infoPoints.length * 3);
    const infoTextureIndices = new Float32Array(this.infoPoints.length);
  
    const infoTextures = this.infoPoints.map(p => p.texture);
    // Заполнение массивов данными для точек с иконкой "info"
    const MAX_VERTICAL_ANGLE = (20 * Math.PI) / 180;
    const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
    
    for (let i = 0; i < this.infoPoints.length; ++i) {
      const vector = new Vector3();
      vector.color = i %  this.infoColors.length;
      vector.theta = GOLDEN_ANGLE * i;
      vector.phi = (Math.random() - 0.5) * 2 * MAX_VERTICAL_ANGLE;
  
      this.calculateVectorXYZ(vector);
      vector.multiplyScalar(130);
      vector.scaleX = this.infodotsize;

      this.infoPoints[i].color = this.infoColors[vector.color];
      this.infoPoints[i].position = vector;

      vector.toArray(infoPositions, i * 3);
      this.infoColors[vector.color].toArray(infoColors, i * 3);
      infoSizes[i] = this.infodotsize;
      infoTextureIndices[i] = i;
    }
    
    // Установка атрибутов в геометрию для точек с иконкой "info"
    this.infoAttributePositions = new Float32BufferAttribute(infoPositions, 3);
    this.infoAttributeSizes = new Float32BufferAttribute(infoSizes, 1);
    this.infoAttributeColors = new Float32BufferAttribute(infoColors, 3);
    this.infoTextureIndices = new Float32BufferAttribute(infoTextureIndices, 1);

    this.infoDotsGeometry.setAttribute('position', this.infoAttributePositions);
    this.infoDotsGeometry.setAttribute('size', this.infoAttributeSizes);
    this.infoDotsGeometry.setAttribute('color', this.infoAttributeColors);
    this.infoDotsGeometry.setAttribute('textureIndex', this.infoTextureIndices);

    const infoShaderMaterial = new ShaderMaterial({
      uniforms: {
        uTextures: { value: infoTextures }
      },
      vertexShader: InfoVertexShader,
      fragmentShader: InfoFragmentShader,
      transparent: true
    });
    this.infoWrap = new Points(this.infoDotsGeometry, infoShaderMaterial);
    this.infoWrap.renderOrder = 0;

    const font = new Font(OswaldFont);
    const titleTop = new TextGeometry('Frontend development...', {
      font: font,
      size: SETUP.FONT_SIZE,
      depth: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.05,
      bevelSegments: 5
    });
    const titleBottom = new TextGeometry('...as an Art!', {
      font: font,
      size: SETUP.FONT_SIZE,
      depth: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.05,
      bevelSegments: 5
    });

    const textMaterial = new MeshBasicMaterial({ color: '#aadadc'});

    const topTitleTextMesh = new Mesh(titleTop, textMaterial);
    topTitleTextMesh.position.x = -75;
    topTitleTextMesh.position.y = 120;

    const bottomTitleTextMesh = new Mesh(titleBottom, textMaterial);
    bottomTitleTextMesh.position.x = -38;
    bottomTitleTextMesh.position.y = -130;

    this.scene.add(topTitleTextMesh);
    this.scene.add(bottomTitleTextMesh)

    this.group.add(this.segments);
    this.group.add(this.wrap);
    this.group.add(this.infoWrap);

    // Проверка и масштабирование сферы
    this.checkAndResizeSphere(this.group, this.camera, this.renderer);
  }

  checkAndResizeSphere(group, camera) {
    const box = new Box3().setFromObject(group);
    const center = box.getCenter(new Vector3());
    const size = box.getSize(new Vector3());
    const radius = size.length() * 0.5;
    const fov = camera.fov * (Math.PI / 180);

    // Вычисляем необходимое расстояние, чтобы вся сфера помещалась в область видимости
    const distance = radius / Math.sin(fov / 2);

    // Вычисляем текущее расстояние от камеры до центра объекта
    const currentDistance = camera.position.distanceTo(center);

    // Рассчитываем коэффициент масштабирования
    const scale = currentDistance / distance;

    // Применяем масштабирование
    group.scale.set(scale, scale, scale);
  }

  getDirectionOutCenter(pointVector) {
    return pointVector.clone().normalize();
  }

  isPointVisible(pointIndex, geometry, cameraPosition, group) {
    const pointVector = new Vector3().fromBufferAttribute(geometry.attributes.position, pointIndex);
    pointVector.applyMatrix4(group.matrixWorld); // Применение матрицы группы для учета вращения

    const toCameraVector = new Vector3().subVectors(cameraPosition, pointVector).normalize();
    const normal = pointVector.clone().normalize();
    return normal.dot(toCameraVector) > 0;
  }

  render() {
    let i;

    const currentTime = performance.now();
    this.deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    this.dotsGeometry.verticesNeedUpdate = true;
    this.dotsGeometry.verticesNeedUpdate = true;

    if (!this.isDragging && !this.prevInfoHovered.length && !this.detail) {
      this.group.rotation.y += 0.04 * this.deltaTime;
    }

    this.raycaster.setFromCamera( this.mouse, this.camera );
    let intersections = this.raycaster.intersectObjects([this.wrap]);
    this.hovered = [];
    if (intersections.length) {
      for(i = 0; i < intersections.length; i++) {
        let index = intersections[i].index;
        this.hovered.push(index);
        if (this.prevHovered.indexOf(index) === -1) {
          this.onDotHover(index);
        }
      }
    }
    for(i = 0; i < this.prevHovered.length; i++){
      if(this.hovered.indexOf(this.prevHovered[i]) === -1){
        this.mouseOut(this.prevHovered[i]);
      }
    }

    if (!this.detail) {
      this.infoHovered = [];
      this.raycaster.setFromCamera( this.mouse, this.camera );
      let infoIntersections = this.raycaster.intersectObjects([this.infoWrap]);
      if (infoIntersections.length) {
        for(i = 0; i < infoIntersections.length; i++) {
          if (!this.isPointVisible(infoIntersections[i].index, this.infoDotsGeometry, this.camera.position, this.group)) {
            continue;
          }
          let index = infoIntersections[i].index;
          this.infoHovered.push(index);
          if (this.prevInfoHovered.indexOf(index) === -1) {
            this.onInfoHover(index);
          }
        }
      }
      for(i = 0; i < this.prevInfoHovered.length; i++){
        if(this.infoHovered.indexOf(this.prevInfoHovered[i]) === -1){
          this.onInfoOut(this.prevInfoHovered[i]);
        }
      }
    }


    if (this.infoHovered.length) {
      this.canvas.style.cursor = 'pointer';
    } else {
      this.canvas.style.cursor = 'default';
    }

    this.prevInfoHovered = this.infoHovered.slice(0);
    this.prevHovered = this.hovered.slice(0);
    this.attributeSizes.needsUpdate = true;
    this.attributePositions.needsUpdate = true;

    //this.renderer.render(this.scene, this.camera);

    this.composer.render();

    // this.stats.end();
  }

  onInfoHover (index) {
    if (this.infoAnimations[index]) {
      this.infoAnimations[index].kill();
      delete this.infoAnimations[index];
    }

    this.infoAnimations[index] = gsap.to(this.infoDotsGeometry.attributes.size.array, {
      [index]: this.infodotsize + this.infodothoverdelta,
      ease: Elastic.easeOut.config(2, 0.2),
      duration: SETUP.INFO_HOVER_DURATION,
      onUpdate: () => {
        this.infoDotsGeometry.attributes.size.needsUpdate = true;
      }
    });
  }

  onInfoOut (index) {
    if (this.infoAnimations[index]) {
      this.infoAnimations[index].kill();
      delete this.infoAnimations[index];
    }

    this.infoAnimations[index] = gsap.to(this.infoDotsGeometry.attributes.size.array, {
      [index]: this.infodotsize,
      ease: Power2.easeOut,
      duration: SETUP.INFO_OUT_DURATION,
      onUpdate: () => {
        this.infoDotsGeometry.attributes.size.needsUpdate = true;
      }
    });
  }

  onDotHover(index) {
    if (this.animations[index]) {
      this.animations[index].kill();
      delete this.animations[index];
    }

    this.animations[index] = gsap.to(this.dotsGeometry.attributes.size.array, {
      [index]: this.dotsize + this.dothoverdelta,
      ease: Power2.easeOut,
      duration: SETUP.DOT_HOVER_DURATION,
      onUpdate: () => {
        this.dotsGeometry.attributes.size.needsUpdate = true;
      }
    });
  }

  mouseOut(index) {
    if (this.animations[index]) {
      this.animations[index].kill();
      delete this.animations[index];
    }

    this.animations[index] = gsap.to(this.dotsGeometry.attributes.size.array, {
      [index]: this.dotsize,
      ease: Power2.easeOut,
      duration: SETUP.DOT_OUT_DURATION,
      onUpdate: () => {
        this.dotsGeometry.attributes.size.needsUpdate = true;
      }
    });
  }

  moveDot(vector, index) {
    let toVector = vector.clone();
    toVector.multiplyScalar((Math.random() - 0.5) * 0.1 + 1);
    gsap.to(vector, {
      x: toVector.x,
      y: toVector.y,
      z: toVector.z,
      duration: Math.random() * 3 + 3,
      yoyo: true,
      repeat: -1,
      delay: -Math.random() * 3,
      ease: Power0.easeNone,
      onUpdate: () => {
        this.attributePositions.array[index*3] = vector.x;
        this.attributePositions.array[index*3+1] = vector.y;
        this.attributePositions.array[index*3+2] = vector.z;
      }
    });
  }

  createTouchHandlers () {
    this.canvas.addEventListener('touchstart', (event) => {
      if (this.detail) {
        return;
      }
      this.previousMouseX = event.touches[0].clientX;
      this.isDragging = true;
    });

    window.addEventListener('touchmove', (e) => {
      if (this.detail) {
        return;
      }
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;
      const rect = this.canvas.getBoundingClientRect();
      if (this.isDragging) {
        const deltaX = (x - this.previousMouseX) * this.renderer.getPixelRatio();
        this.group.rotation.y += deltaX * 0.3 * this.deltaTime;
      }
      this.previousMouseX = x;
      this.mouse.x = ((x - rect.left) * this.renderer.getPixelRatio() / this.canvas.width) * 2 - 1;
      this.mouse.y = -((y - rect.top) * this.renderer.getPixelRatio() / this.canvas.height) * 2 + 1;
    });

    window.addEventListener('touchend', () => {
      if (this.detail) {
        return;
      }
      this.isDragging = false;
    });
  }

  createMouseHandlers() {
    this.canvas.addEventListener('mousedown', () => {
      if (this.detail) {
        return;
      }
      this.isDragging = true;
    });

    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      if (this.isDragging && !this.detail) {
        const deltaX = (e.clientX - this.previousMouseX) * this.renderer.getPixelRatio();
        this.group.rotation.y += deltaX * 0.3 * this.deltaTime;
      }
      this.previousMouseX = e.clientX;
      this.mouse.x = ((e.clientX - rect.left) * this.renderer.getPixelRatio() / this.canvas.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) * this.renderer.getPixelRatio() / this.canvas.height) * 2 + 1;
    });

    window.addEventListener('mouseup', () => {
      if (this.detail) {
        return;
      }
      this.isDragging = false;
    });

    window.addEventListener('click', () => {
      if (this.detail) {
        return;
      }
      this.onClick();
    });
  }

  handleInfoClick (idx) {
    const pos = this.infoPoints[idx].position.clone();

    pos.applyMatrix4(this.group.matrixWorld);  // Целевая позиция

    // Позиция, куда должна быть направлена камера
    const direction = this.getDirectionOutCenter(pos).negate();
    const distance = SETUP.DISTANCE_TO_INFO_POINT;  // Расстояние, на котором камера должна находиться от цели

    // Конечная позиция камеры
    const endPosition = pos.clone().add(direction.multiplyScalar(-distance));
    
    EventSystem.trigger('close-page');
    this.navigateCamera(endPosition, this.camera).then(() => {
      EventSystem.trigger('show-page', this.infoPoints[idx]);
    }).catch(() => {logger.log('Seems like you\'re like to press buttons. Rerouting...')});
    this.detail = true;
  }

  onBack () {
    this.navigateCamera(SETUP.DEFAULT_CAMERA_POSITION, this.camera).then(() => {
      this.detail = false;
    }).catch(() => {logger.log('Seems like you\'re like to press buttons. Rerouting...')});
  }
  
  navigateCamera(endPosition, camera) {
    if (this.cancelNavigationThen) {
      this.cancelNavigationThen();
      this.cancelNavigationThen = null;
    }
    
    function shortestAngle(start, end) {
      let diff = (end - start + Math.PI) % (2 * Math.PI);
      if (diff < 0) diff += 2 * Math.PI;
      return diff - Math.PI;
    }

    const {promise, cancel} = cancelablePromise((done) => {
      const startPosition = camera.position.clone();
      const radius = startPosition.length(); // Дистанция камеры от центра
      const endRadius = endPosition.length();
  
      // Преобразуем позиции в сферические координаты
      const startSpherical = new Spherical().setFromVector3(startPosition);
      const endSpherical = new Spherical().setFromVector3(endPosition);
  
      // Вычисляем разницу углов
      let deltaTheta = shortestAngle(startSpherical.theta, endSpherical.theta);
      let deltaPhi = shortestAngle(startSpherical.phi, endSpherical.phi);
  
      const sphericalParams = {
        theta: startSpherical.theta,
        phi: startSpherical.phi,
        radius: radius
      };
  
      gsap.to(sphericalParams, {
        theta: startSpherical.theta + deltaTheta,
        phi: startSpherical.phi + deltaPhi,
        radius: endRadius,
        duration: SETUP.CAMERA_NAVIGATION_TIME,
        ease: "power2.inOut",
        onUpdate: () => {
          const newSpherical = new Spherical(
            sphericalParams.radius,
            sphericalParams.phi,
            sphericalParams.theta
          );
      
          // Преобразуем обратно в декартовы координаты
          const newPosition = new Vector3().setFromSpherical(newSpherical);
          camera.position.copy(newPosition);
          camera.lookAt(new Vector3(0, 0, 0));
        },
        onComplete: () => {
          this.cancelNavigationThen = null;
          done();
        }
      });
    });
    
    this.cancelNavigationThen = cancel;
    
    return promise;
  }
  
  
  onClick() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersections = this.raycaster.intersectObjects([this.infoWrap]);

    if (intersections.length > 0) {
      const intersection = intersections[0];
      if (this.isPointVisible(intersection.index, this.infoDotsGeometry, this.camera.position, this.group)) {
        this.handleInfoClick(intersection.index);
      }
    }
  }

  createCanvas(root) {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'webgl');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.classList.add(style.canvas);
    root.append(canvas);
    return canvas;
  }


}

export default Renderer;
