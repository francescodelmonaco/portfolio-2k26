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
 */
const THEME_SCRIPT = `(function(){try{
var p=localStorage.getItem('theme')||'system';
if(p!=='light'&&p!=='dark')p='system';
var d=p==='dark'||(p==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);
var r=document.documentElement;
r.dataset.theme=d?'dark':'light';
r.dataset.themePref=p;
r.style.colorScheme=d?'dark':'light';
r.classList.add('js');
}catch(e){}})();`;

export default function ThemeScript() {
    return <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />;
}
