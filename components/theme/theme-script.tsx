/**
 * Gira in modo sincrono dentro <head>, prima del primo paint.
 *
 * È volutamente un <script> inline semplice e non next/script: nessuna strategia
 * di caricamento garantisce l'esecuzione prima del paint, e qualunque cosa
 * arrivi dopo significa un lampo del tema sbagliato.
 *
 * Scrive tre cose su <html>:
 *   data-theme      il valore risolto (light|dark): ribalta color-scheme, che è
 *                   ciò che legge ogni token light-dark() in globals.css
 *   data-theme-pref la preferenza (light|system|dark): decide quale segmento del
 *                   controllo risulta attivo, puramente in CSS
 *   class="js"      protegge lo stato nascosto dello scroll-reveal, così un
 *                   fallimento del JS lascia la pagina del tutto visibile
 *                   invece che bianca
 *
 * E in più inserisce in testa a <head> il <meta name="theme-color"> del tema
 * risolto, così la cornice del browser su mobile segue la preferenza salvata e
 * non solo quella di sistema (vedi lib/theme-color.ts).
 */
import { THEME_COLORS, THEME_COLOR_META_ATTR } from "@/lib/theme-color";

const THEME_SCRIPT = `(function(){try{
var p=localStorage.getItem('theme')||'system';
if(p!=='light'&&p!=='dark')p='system';
var d=p==='dark'||(p==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);
var r=document.documentElement;
r.dataset.theme=d?'dark':'light';
r.dataset.themePref=p;
r.style.colorScheme=d?'dark':'light';
r.classList.add('js');
var h=document.head,m=h.querySelector('meta[${THEME_COLOR_META_ATTR}]');
if(!m){m=document.createElement('meta');m.name='theme-color';m.setAttribute('${THEME_COLOR_META_ATTR}','');h.insertBefore(m,h.firstChild);}
m.content=d?'${THEME_COLORS.dark}':'${THEME_COLORS.light}';
}catch(e){}})();`;

export default function ThemeScript() {
    return <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />;
}
