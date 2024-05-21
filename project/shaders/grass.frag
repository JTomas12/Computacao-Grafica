#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D texture;

void main() {
    vec4 colorTexture = texture2D(texture, vTextureCoord);
    
    // Used to discard textures with too much transparency, that is, texture that doesn't have enough color
    if (colorTexture.a < 1.0) {
        discard;
    } else {
        gl_FragColor = vec4(colorTexture.rgb, 1.0);
    }
}