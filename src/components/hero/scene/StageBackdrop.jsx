/** Warm cream stage with a soft butter-yellow halo behind the dumpling (matches the hero). */
export default function StageBackdrop() {
  return (
    <group>
      <mesh position={[0, 0.45, -3.6]}>
        <planeGeometry args={[16, 10]} />
        <meshStandardMaterial color="#FFE3A0" roughness={0.85} metalness={0} />
      </mesh>
      <mesh position={[0, 0.32, -2.75]}>
        <circleGeometry args={[3.7, 64]} />
        <meshBasicMaterial color="#FED271" transparent opacity={0.35} />
      </mesh>
      <mesh position={[0, 0.3, -2.4]}>
        <circleGeometry args={[2.7, 64]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.45} />
      </mesh>
    </group>
  );
}
