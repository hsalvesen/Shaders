#version 300 es

in vec3 position;
out vec2 fragUv;

void main() {
    gl_Position = vec4(position, 1.0);
    fragUv = (position.xy + 1.0) * 0.5;
}