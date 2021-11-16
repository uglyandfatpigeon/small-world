import React, {useEffect} from "react";
import {Canvas, useFrame, useThree} from "@react-three/fiber";
import {Sky, Stars} from "@react-three/drei";
import {Physics, useBox, usePlane} from "@react-three/cannon";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import './App.css';


const CameraController = () => {
   const { camera, gl } = useThree(); 
   useEffect( () => { 
     const controls = new OrbitControls(camera, gl.domElement); 
     controls.minDistance = 3; 
     controls.maxDistance = 200; 
     return () => { controls.dispose(); 
    }; 
  }, [camera, gl] ); 
  return null; 
};

const Plane = () => {
  const [planeRef] = usePlane(() => ({rotation: [-Math.PI / 2, 0, 0]}))
  return (
    <mesh ref={planeRef} position={[0,0,0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry args={[100, 100]}/>
      <meshStandardMaterial color='lightpink'/>
    </mesh>
  )
}

const RotatingBox = () =>  {
  useFrame(({clock}) => {
    const a = clock.getElapsedTime();
    rotatingBoxMesh.current.rotation.x = a;
  })
  const rotatingBoxMesh = React.useRef();

  return (
    <mesh ref={rotatingBoxMesh} position={[0, 2, 0]}>
      <boxGeometry/>
      <meshPhongMaterial color='purple' />
    </mesh>
  )
}

const FallingBox = () => {
  const [fallingBoxMesh, api] = useBox(() => ({mass: 1, position: [2, 2, 0]}))
  return (
    <mesh ref={fallingBoxMesh} position={[2, 2, 0]}
      onClick={() => {api.velocity.set(-5, -2, 0)}}>
      <boxGeometry/>
      <meshStandardMaterial color="blue"/>
    </mesh>
  )
}

const Scene = () => {
  return (
    <Canvas>
      <CameraController/>
      <pointLight position={[10,10,10]}/>
      <Physics>
        <Plane/>
        <FallingBox/>
      </Physics>
      <RotatingBox/>
      <Sky/>
      <Stars/>
    </Canvas>
  )
}

const App = () => {
  return(
    <Scene />
  )
}

export default App;
