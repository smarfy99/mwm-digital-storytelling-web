import useSpline from "@splinetool/r3f-spline";
import { OrthographicCamera } from "@react-three/drei";

export default function Loading({ ...props }) {
  const { nodes, materials } = useSpline(
    "https://prod.spline.design/8YXrzanfANbipFcG/scene.splinecode"
  );
  return (
    <>
      <canvas>
        <group {...props} dispose={null}>
          <OrthographicCamera
            name="Camera"
            makeDefault={true}
            zoom={3.79}
            far={100000}
            near={-100000}
            position={[18.73, 80.17, 582.81]}
            rotation={[-0.04, 0.03, 0]}
            scale={1}
          />
          <group name="M_cha4" scale={0.5}>
            <group name="eyes" position={[0, 117.62, 1.71]}>
              <group name="R pupil" position={[19.24, -2.06, 36.83]}>
                <mesh
                  name="R_1"
                  geometry={nodes.R_1.geometry}
                  material={nodes.R_1.material}
                  castShadow
                  receiveShadow
                  position={[-0.04, 0.88, 35.92]}
                />
              </group>
              <group name="L pupil" position={[-19.24, -2.06, 36.83]} scale={2}>
                <mesh
                  name="L_1"
                  geometry={nodes.L_1.geometry}
                  material={nodes.L_1.material}
                  castShadow
                  receiveShadow
                  position={[0.02, 0.44, 17.96]}
                  scale={0.5}
                />
              </group>
              <group name="RWeye" position={[19.83, 0.44, 73.38]} scale={2}>
                <mesh
                  name="RFeye"
                  geometry={nodes.RFeye.geometry}
                  material={nodes.RFeye.material}
                  castShadow
                  receiveShadow
                  position={[-0.26, -0.86, -0.93]}
                  scale={0.5}
                />
                <mesh
                  name="rBeye"
                  geometry={nodes.rBeye.geometry}
                  material={nodes.rBeye.material}
                  castShadow
                  receiveShadow
                  position={[-0.26, -0.86, -1.04]}
                  scale={0.5}
                />
              </group>
              <group name="LWeye" position={[-18.91, 0.44, 73.38]} scale={2}>
                <mesh
                  name="LFeye"
                  geometry={nodes.LFeye.geometry}
                  material={nodes.LFeye.material}
                  castShadow
                  receiveShadow
                  position={[-0.2, -0.86, -0.93]}
                  scale={0.5}
                />
                <mesh
                  name="lBeye"
                  geometry={nodes.lBeye.geometry}
                  material={nodes.lBeye.material}
                  castShadow
                  receiveShadow
                  position={[-0.2, -0.86, -1.04]}
                  scale={0.5}
                />
              </group>
            </group>
            <mesh
              name="body"
              geometry={nodes.body.geometry}
              material={nodes.body.material}
              castShadow
              receiveShadow
              position={[0, 100, 0]}
            />
          </group>
          <directionalLight
            name="Directional Light"
            castShadow
            intensity={1}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={-10000}
            shadow-camera-far={100000}
            shadow-camera-left={-1000}
            shadow-camera-right={1000}
            shadow-camera-top={1000}
            shadow-camera-bottom={-1000}
            position={[-6.29, 189.26, 271.06]}
          />
          <hemisphereLight
            name="Default Ambient Light"
            intensity={0.75}
            color="#eaeaea"
          />
        </group>
      </canvas>
    </>
  );
}
