attribute float size;
attribute vec3 color;
attribute float textureIndex;

varying vec3 vColor;
varying float vDistance;
varying float vSize;
varying float vTextureIndex;

void main() {
    vColor = color;
    vTextureIndex = textureIndex;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = vSize = size * (350.0 / -mvPosition.z);
    vDistance = length(position);
    gl_Position = projectionMatrix * mvPosition;
}
