export default function Footer() {
    return (
        <footer className="w-full px-8 pb-4 flex items-center justify-between gap-4">
            <div className="h-px flex-1 bg-white/5" />
            <p className="text-[12px] font-mono tracking-[0.2em] uppercase text-(--gray) opacity-40 shrink-0">
                © {new Date().getFullYear()} Francesco Delmonaco
            </p>
            <div className="h-px flex-1 bg-white/5" />
        </footer>
    );
}