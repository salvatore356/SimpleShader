

import { Canvas } from '@react-three/fiber';
import { Plane, OrbitControls } from '@react-three/drei';
import { useControls } from 'leva'

import * as THREE from 'three'
import vertexShader from './vertexShader';
import fragmentShader from './fragmentShader';

export default function SimpleShader() {

  const hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16) / 255.0,
      g: parseInt(result[2], 16) / 255.0,
      b: parseInt(result[3], 16) / 255.0
    } : null;
  }

  var uniforms = {
    u_colorA: { value: new THREE.Vector3(7.0/255.0, 3.0/255.0, 252.0/255.0) },
    u_colorB: { value: new THREE.Vector3(3.0/255.0, 211.0/255.0, 252.0/255.0) },
    u_resolution: { value: new THREE.Vector2(window.innerHeight, window.innerWidth) }
  };

  useControls({ 
    initial: {
      value: '#0703FC',
      onChange: (v) => {
        let rgb = hexToRgb(v);
        uniforms.u_colorA.value.set(rgb.r, rgb.g, rgb.b)
      },
    }, 
    end: {
      value: '#03D3FC',
      onChange: (v) => {
        let rgb = hexToRgb(v);
        uniforms.u_colorB.value.set(rgb.r, rgb.g, rgb.b)
      },
    },
  })

  return (
    <Canvas 
        dpr={window.devicePixelRatio} 
        camera={{ position: [0.0, 0.0, 10.0] }}
    >
      
      <Plane  args={[10, 10]} >
        <shaderMaterial 
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          side={THREE.DoubleSide}
        />
      </Plane>
      
      <OrbitControls />
    </Canvas>
  );
}