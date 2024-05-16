attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;



varying vec2 vTextureCoord;
uniform sampler2D uSampler2;
uniform float randomOscilation;
uniform float normScale;

void main() {
    vec3 offset = vec3(0.0, 0.0, 0.0);
    
    vTextureCoord = aTextureCoord;

    float time = timeFactor * 0.1;
        
    if (aVertexPosition.y != -1.0) {
        // Apply the sin function to the z-component of the offset, but negate it
        offset = vec3(-aVertexPosition.x, -aVertexNormal.y, aVertexPosition.z + aVertexPosition.y*aVertexPosition.y  + 0.5 * sin(time));
    }
    
    // Apply the offset to the vertex position
    vec4 finalVertexPosition = vec4(aVertexPosition + offset, 1.0);
    
    // Transform the vertex position to clip space
    gl_Position = uPMatrix * uMVMatrix * finalVertexPosition;
}