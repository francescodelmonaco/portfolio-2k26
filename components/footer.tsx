import { site } from "@/lib/site";

export default function Footer() {
    return (
        <footer className="px-3 pb-3 md:px-20 md:pb-6">
            <div className="mx-auto max-w-5xl rounded-3xl bg-surface-alt">
                <div className="p-8 md:p-10 lg:p-12 text-center font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                    <p>
                        © {new Date().getFullYear()} {site.author}
                    </p>
                </div>
            </div>
        </footer>
    );
}
