import { ImageResponse } from "next/og";

export const runtime = "edge";
// Cache for one day to avoid regenerating on each request
export const revalidate = 86400;
export const alt = "Francesco Delmonaco - Sviluppatore Web Full Stack";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

export default async function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #0f172a 0%, #111827 60%, #1f2937 100%)",
                    color: "#ffffff",
                    padding: 64,
                    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif",
                }}
            >
                <div
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 16,
                        marginBottom: 24,
                        opacity: 0.9,
                    }}
                >
                    <div
                        style={{
                            height: 16,
                            width: 16,
                            background: "#22d3ee",
                            borderRadius: 9999,
                            boxShadow: "0 0 24px rgba(34, 211, 238, 0.6)",
                        }}
                    />
                    <span style={{ fontSize: 28, letterSpacing: 0.2 }}>francescodelmonaco.com</span>
                </div>

                <h1
                    style={{
                        fontSize: 64,
                        lineHeight: 1.1,
                        margin: 0,
                        letterSpacing: -0.5,
                    }}
                >
                    Sviluppatore Web Full Stack
                </h1>
                <p
                    style={{
                        marginTop: 20,
                        fontSize: 28,
                        maxWidth: 900,
                        color: "#d1d5db",
                    }}
                >
                    React.js, Next.js, TypeScript, Tailwind CSS, Supabase
                </p>

                <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
                    {[
                        "React",
                        "Next.js",
                        "TypeScript",
                        "Tailwind",
                        "Supabase",
                    ].map((tag) => (
                        <div
                            key={tag}
                            style={{
                                padding: "8px 14px",
                                borderRadius: 9999,
                                background: "rgba(255,255,255,0.08)",
                                border: "1px solid rgba(255,255,255,0.12)",
                                fontSize: 22,
                            }}
                        >
                            {tag}
                        </div>
                    ))}
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
