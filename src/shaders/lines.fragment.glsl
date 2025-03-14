#version 300 es
precision highp float;
in vec4 lColor;
out vec4 fragColor;
void main(void) {
    fragColor = lColor; // White color for lines
}
