#define hue(h) clamp( abs( fract(h + vec4(3,2,1,0)/3.) * 6. - 3.) -1. , 0., 1.)
#define rand1(p) fract(sin(p* 78.233)* 43758.5453)

varying highp vec3 vpos;
varying highp float vtime;
uniform highp mat3 uvTransform;
uniform highp vec3 color;

void main() {
    highp vec2 uv = (uvTransform * vec3(gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1)).xy - .5;

    highp float g = length(uv);

    g = .001 / smoothstep(.0, 20., g);

    gl_FragColor = vec4(color, g*.005);
}