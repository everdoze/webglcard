varying float vTextureIndex;
varying vec3 vColor;
uniform sampler2D uTexture;

void main(){
    vec4 textureColor = texture2D( uTexture, gl_PointCoord );
    vec2 coord = gl_PointCoord * 2.0 - 1.0;
    float dist = dot(coord, coord);
    if ( dist > 1.0 ) discard;

    vec3 newColor = vColor.rgb;
    if (textureColor.a > 0.2) {
        newColor *= textureColor.rgb;
    }
    //vec4 color = vec4(vColor.rgb, 1.0);

    gl_FragColor = vec4(newColor, 1.0);
}
