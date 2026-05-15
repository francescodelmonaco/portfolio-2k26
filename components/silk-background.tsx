// Pure CSS replacement for the Three.js Silk shader.
// The shader with color #030215 produces values from near-black → #030215,
// visually indistinguishable from a static dark gradient at that color.
// This eliminates the three + @react-three/fiber bundle (~412 KiB).
export default function SilkBackground() {
    return (
        <div
            className="absolute inset-0"
            style={{
                background:
                    "radial-gradient(ellipse 90% 70% at 15% 50%, #060428 0%, #030215 55%)," +
                    "radial-gradient(ellipse 70% 90% at 85% 25%, #050320 0%, #030215 50%)," +
                    "radial-gradient(ellipse 60% 60% at 50% 85%, #04031c 0%, #030215 60%)",
            }}
        />
    );
}
