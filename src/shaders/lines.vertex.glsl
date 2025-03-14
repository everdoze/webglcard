uniform float time;

varying vec3 vColor;
varying float vTime;

void main() {
    vColor = color;
    vTime = time;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
