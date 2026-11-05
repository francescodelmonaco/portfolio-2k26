import { site } from "@/lib/site";

/** L'ultima fascia della colonna: tono `alt`, dopo Contatti che è `base`. */
export default function Footer() {
    return (
        <footer className="bg-surface-alt px-5 py-8 md:px-10">
            <p className="hud-label text-center text-muted-foreground">
                © {new Date().getFullYear()} {site.author}
            </p>
        </footer>
    );
}
