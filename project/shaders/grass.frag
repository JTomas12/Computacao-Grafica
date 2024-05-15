#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;

void main() {
    // Define a time factor to control the speed of the color transition
    float time = mod(timeFactor * 0.1, 3.14); // Adjust the multiplier to control the speed

    vec3 green = vec3(0.0, 0.5 +(sin(time) *0.5), 0.0); // Pure green color with varying brightness

    vec3 color = vec3(0.0, green.g, 0.0); 

    // Set color with alpha value
    vec4 finalColor = vec4(color, 1.0);

    // Output the final color
    gl_FragColor = finalColor;
}