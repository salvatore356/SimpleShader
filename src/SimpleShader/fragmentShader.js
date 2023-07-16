import glsl from 'glslify';

const fragmentShader = glsl`
varying vec2 vUv;

uniform vec3 u_colorA; 
uniform vec3 u_colorB; 
uniform vec2 u_resolution;

void main() {
  vec2 normalizedPixel = gl_FragCoord.xy/u_resolution.x;
  vec3 color = mix(u_colorA, u_colorB, normalizedPixel.x);

  gl_FragColor = vec4(color, 1.0);
}

`

export default fragmentShader