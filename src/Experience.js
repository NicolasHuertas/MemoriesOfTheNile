/**
 * Hooks Reactjs: https://legacy.reactjs.org/docs/hooks-intro.html
 * React Three Fiber: https://docs.pmnd.rs/react-three-fiber/getting-started/introduction
 * Hooks de R3F: https://docs.pmnd.rs/react-three-fiber/api/hooks
 * React three drei: https://github.com/pmndrs/drei
 * Three.js: https://threejs.org/docs/
 * 
 *
*/
import React from "react";
import { OrbitControls, Text, Float, PointerLockControls, useHelper } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber"
import { useRef, useState, useEffect } from "react";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import Intro from "./Intro";
import Menu from "./Menu";
import Skybox from "./Skybox";
import Guia from "./Guia";
import Lobby from "./Lobby";
import Architecture from "./Architecture";
import Templo2 from "./Templo2";

export function Experience() {

    const [menuVisible, setMenuVisible] = useState(false);
    const controlsRef = useRef();
    const { camera, gl } = useThree();
    const cameraRef = useRef(camera);
    const previousMouse = useRef([0, 0]);


    useEffect(() => {
        const handleKeyDown = (event) => {
            // if (event.code === 'Space') {
            //     event.preventDefault();
            //     setMenuVisible((prevMenuVisible) => !prevMenuVisible);
            //     //orbitControlsRef.current.enabled = !menuVisible;
            // }     

            switch (event.code) {
                case 'Space':
                    event.preventDefault();
                    setMenuVisible((prevMenuVisible) => !prevMenuVisible);
                    //orbitControlsRef.current.enabled = !menuVisible;
                    break;

                case 'ArrowRight':
                    var currentPosition = cameraRef.current.position.toArray().join(',');
                    switch (currentPosition) {
                        case '0,0,5': //posicion piramide y esfinge
                            cameraRef.current.position.set(8, 0, 5); //posicion lobby
                            break
                        case '8,0,5'://posicion lobby
                            //algun objeto a la derecha del lobby
                            break
                        case '-18,0,5'://posicion arquitectura
                            cameraRef.current.position.set(0, 0, 5); //posicion piramide y esfinge
                            break
                        case '-40,1,5'://posicion templo2
                            cameraRef.current.position.set(-18, 0, 5); //posicion arquitectura
                            break


                    }

                    break;

                case 'ArrowLeft':
                    var currentPosition = cameraRef.current.position.toArray().join(',');
                    switch (currentPosition) {
                        case '0,0,5': //posicion piramide y esfinge
                            cameraRef.current.position.set(-18, 0, 5); //posicion arquitectura
                            break
                        case '-18,0,5'://posicion arquitectura
                            cameraRef.current.position.set(-40, 1, 5); //posicion templo2
                            break
                        case '8,0,5'://posicion lobby
                            cameraRef.current.position.set(0, 0, 5); //posicion piramide y esfinge    
                            break

                    }
                    break;

            }
        };


        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [menuVisible]);



    const changeCameraPosition = (iconIndex) => {
        // Placeholder positions for camera position based on the clicked icon
        const positions = [
            [5, 0, 0],   // Historia
            [-18, 0.2, -9],  // Arquitectura
            [-40, 0, -9],   // Naturaleza
            [-5, 0, 0],  // Cultura
            [9, -0.5, 0.03] //Lobby
        ];

        const position = positions[iconIndex];
        cameraRef.current.position.set(position[0], position[1], position[2]);
    };
    /*
        const handleMouseMove = (event) => {
            const { clientX, clientY } = event;
            const [prevX, prevY] = previousMouse.current;
            const movementX = clientX - prevX;
            const movementY = clientY - prevY;
        
            if (movementX !== 0 || movementY !== 0) {
              controlsRef.current.rotateSpeed = 1;
              controlsRef.current.update();
              controlsRef.current.rotateSpeed = 0.5;
            }
        
            previousMouse.current = [clientX, clientY];
          };
        
          useFrame(() => {
            controlsRef.current.update();
          });*/

    return <>
        {/* <OrbitControls
            ref={controlsRef}
            args={[camera, gl.domElement]}
            enableRotate
            
        /> */}

        <PointerLockControls
            makeDefault
        />


        <directionalLight position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />

        <Skybox />
        <Intro />
        <Lobby />
        <Architecture />
        <Templo2 />
        <Guia />

        <Float speed={5} >
            <Text
                font="./bangers-v20-latin-regular.woff"
                fontSize={1}
                color="#964B00"
                position-y={4}
                maxWidth={8}
                textAlign="center"
            >
                Memories of the Nile
            </Text>
        </Float>


        <Float speed={3} >
            <Text
                font="./bangers-v20-latin-regular.woff"
                fontSize={0.6}
                color="white"
                position-x={-18}
                position-z={-2}
                position-y={4}
                maxWidth={8}
                textAlign="center"
            >
                Una puerta de acceso a los dioses
            </Text>
        </Float>

        {menuVisible && <Menu onClose={() => setMenuVisible(false)} changeCameraPosition={changeCameraPosition} />}
    </>
}
