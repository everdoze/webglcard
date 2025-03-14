varying float vTextureIndex;
varying vec3 vColor;
uniform sampler2D uTextures[10];

void main(){
    int idx = int(floor(vTextureIndex + 0.5));

    vec4 textureColor;
    if (idx == 0) {
        textureColor = texture2D( uTextures[0], gl_PointCoord );
    } else if (idx == 1) {
        textureColor = texture2D( uTextures[1], gl_PointCoord );
    } else if (idx == 2) {
        textureColor = texture2D( uTextures[2], gl_PointCoord );
    } else if (idx == 3) {
        textureColor = texture2D( uTextures[3], gl_PointCoord );
    } else if (idx == 4) {
        textureColor = texture2D( uTextures[4], gl_PointCoord );
    } else {
        textureColor = texture2D( uTextures[0], gl_PointCoord );
    }

    vec2 coord = gl_PointCoord * 2.0 - 1.0;
    float dist = dot(coord, coord);
    if ( dist > 1.0 ) discard;

    vec3 newColor = vColor.rgb;
    if (textureColor.a > 0.2) {
        newColor *= textureColor.rgb;
    }

    gl_FragColor = vec4(newColor, 1.0);
}
