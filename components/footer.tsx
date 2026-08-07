import { site } from "@/lib/site";

export default function Footer() {
    return (
        <footer className="px-3 pb-3 md:px-5 md:pb-6">
            {/* stessa geometria di fascia di una Section con `tone="alt"`: vedi ui/section.tsx */}
            <div className="mx-auto max-w-band rounded-3xl bg-surface-alt">
                <div className="mx-auto max-w-5xl px-5 py-10 text-center font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase md:px-8">
                    <p>
                        © {new Date().getFullYear()} {site.author}
                    </p>
                </div>
            </div>
        </footer>
    );
}
