/**
 * Soft studio lighting: warm key and fill from the front, cool rim lights
 * from behind so the dumpling's pleats read clearly against the cream stage.
 */
export default function Lighting() {
  return (
    <>
      {/* Front: warm key, fill and top spot */}
      <hemisphereLight args={['#fffaf0', '#d5dbe3', 0.95]} />
      <ambientLight intensity={0.95} color="#fff8ee" />
      <directionalLight position={[2.4, 6.2, 5.2]} intensity={2.05} color="#ffffff" />
      <directionalLight position={[-3.8, 3.4, 2.2]} intensity={0.95} color="#FFE9B0" />
      <spotLight position={[0, 7.2, 3.6]} angle={0.55} penumbra={0.7} intensity={1.15} color="#FFF6E0" />

      {/* Back: cool rim lights for a clean silhouette */}
      <directionalLight position={[0.2, 2.6, -6.4]} intensity={2.85} color="#F2F6FB" />
      <directionalLight position={[-3.2, 3.8, -4.8]} intensity={1.45} color="#C5D0DC" />
      <directionalLight position={[3.4, 2.9, -4.4]} intensity={1.25} color="#D7E0EA" />
      <spotLight position={[0, 4.2, -6.2]} angle={0.42} penumbra={0.78} intensity={2.8} color="#FFFFFF" />
      <pointLight position={[0, 1.2, -3.2]} intensity={1.55} color="#E4EAF2" distance={9} decay={2} />
    </>
  );
}
