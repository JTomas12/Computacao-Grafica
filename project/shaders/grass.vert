attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;

uniform float normScale;

void main() {
    vec3 offset = vec3(0.0, 0.0, 0.0);
    
    vTextureCoord = aTextureCoord;

    // Calculate time factor independently of the texture
    float time = mod(timeFactor * 0.1, 3.14);

    // Calculate offset along z-axis using sine function to create oscillation
    offset.z = sin(time) * 5.0; // Adjust multiplier to control amplitude of oscillation

    // Apply the offset to the vertex position
    vec4 finalVertexPosition = vec4(aVertexPosition + offset, 1.0);

    // Transform the vertex position to clip space
    gl_Position = uPMatrix * uMVMatrix * finalVertexPosition;
}