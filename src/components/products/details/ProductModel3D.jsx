import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PresentationControls, Environment, OrbitControls } from '@react-three/drei';

// مكونات النماذج ثلاثية الأبعاد
const WaterBottleModel = ({ scale = 2.5 }) => {
  return (
    <mesh scale={scale} position={[0, 0, 0]}>
      <cylinderGeometry args={[1, 1, 3, 32]} />
      <meshStandardMaterial color="#88CCFF" transparent opacity={0.8} />
      <mesh position={[0, 1.6, 0]}>
        <cylinderGeometry args={[0.5, 0.7, 0.5, 32]} />
        <meshStandardMaterial color="#2299FF" />
      </mesh>
    </mesh>
  );
};

const GasCylinderModel = ({ scale = 2.5 }) => {
  return (
    <mesh scale={scale} position={[0, 0, 0]}>
      <cylinderGeometry args={[1, 1, 3, 32]} />
      <meshStandardMaterial color="#FF9933" />
      <mesh position={[0, 1.6, 0]}>
        <cylinderGeometry args={[0.3, 0.5, 0.3, 32]} />
        <meshStandardMaterial color="#CC7722" />
      </mesh>
      <mesh position={[0, 1.8, 0]} rotation={[Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.5, 16]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
    </mesh>
  );
};

const ProductModel3D = ({ productType }) => {
  return (
    <div className="w-full h-full">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <PresentationControls
          global
          zoom={0.8}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <Suspense fallback={null}>
            {productType === 'water' ? <WaterBottleModel /> : <GasCylinderModel />}
            <Environment preset="city" />
          </Suspense>
        </PresentationControls>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default ProductModel3D;
