# Francesco Delmonaco — Portfolio 2k26

Portfolio personale bilingue (IT/EN), pagina singola. Next.js App Router, Tailwind v4, deploy su Vercel.

Online su **[francescodelmonaco.com](https://francescodelmonaco.com)**.

## Avvio

```bash
npm install
npm run dev      # http://localhost:3000 -> redirige su /it o /en
```

| Comando            | Cosa fa                                              |
| ------------------ | ---------------------------------------------------- |
| `npm run dev`      | server di sviluppo (Turbopack)                       |
| `npm run build`    | build di produzione                                  |
| `npm start`        | serve la build di produzione                         |
| `npm run lint`     | ESLint (flat config, `core-web-vitals` + TS)         |
| `npx tsc --noEmit` | typecheck (`tsconfig` imposta `noEmit`, niente script) |

Non esiste una suite di test.

## Struttura

```
app/
  [locale]/          layout.tsx È il root layout - app/layout.tsx non esiste
    layout.tsx       <html>/<body>, font, metadata, hreflang
    page.tsx         l'unica pagina vera; emette anche il @graph JSON-LD
    opengraph-image.tsx
  not-found.tsx      404 di root - possiede il proprio guscio di documento (vedi sotto)
  globals.css        token di design, pannelli, reveal, cambio tema
  sitemap.ts robots.ts
components/          un file per sezione, più ui/section.tsx e theme/
lib/
  data.ts            contenuto indipendente dalla lingua: slug, tecnologie, link, asset
  site.ts            fonte unica per siteUrl, email, social
  fonts.ts           i tre loader next/font, condivisi dai due gusci
  i18n/              elenco lingue, helper, getMessages
messages/            it.ts (fonte di verità) + en.ts (tipizzato su it)
proxy.ts             redirect di lingua sulla sola root
```

## Come funziona

### Routing e lingue

Una sola pagina, renderizzata sotto un segmento `[locale]` e prerenderizzata su
`/it` e `/en`. `dynamicParams = false` fa sì che qualsiasi altro prefisso sia un
404 vero, invece di contenuto italiano a un URL inventato.

`proxy.ts` — **non** `middleware.ts`, la cui convenzione di file è deprecata in
Next 16 — intercetta solo `/` e fa un redirect 307 verso una lingua, risolvendo
**cookie → `Accept-Language` → `defaultLocale`**. Il cookie vince, così una
scelta esplicita non viene annullata dall'header di lingua del browser, e viene
scritto lato client dallo switcher: un `Set-Cookie` sul redirect renderebbe la
risposta non cacheabile dalla CDN. 307 e mai 308, perché la destinazione dipende
dal visitatore.

`app/not-found.tsx` intercetta ogni 404, incluso `/fr`. Un boundary not-found non
può salvare il layout sotto cui vive, e `app/[locale]/layout.tsx` *è* il root
layout: quindi il boundary deve stare sopra di esso e portarsi dietro il proprio
`<html>`/`<body>`.

`app/sitemap.ts` e `app/robots.ts` devono restare nella root di `app/`: la route
sitemap generata chiama l'handler senza argomenti, quindi una copia sotto
`[locale]` non potrebbe mai leggere il parametro. Un unico file emette entrambe
le lingue.

### i18n

Fatta a mano di proposito: ~40 stringhe, due lingue, niente plurali né date, per
cui una libreria ICU sarebbe tutto costo e nessun beneficio.

`messages/it.ts` è la fonte di verità ed esporta `type Messages = typeof it`
(**niente `as const`**, che restringerebbe ogni valore a un literal di stringa
impedendo a `en` di soddisfare il tipo). `messages/en.ts` dichiara
`export const en: Messages`, quindi una chiave mancante fa fallire la build.

> **L'unica regola da non violare mai:** non importare `messages/*` o
> `getMessages` da un file `"use client"`. `LocaleSwitcher` e `ThemeToggle`
> ricevono come prop stringhe già risolte. Romperla trascina entrambi i
> dizionari nel bundle client e vanifica tutto il motivo per cui non si usa
> next-intl.

`lib/data.ts` contiene solo struttura indipendente dalla lingua. Le descrizioni
dei progetti vivono in `messages/`, indicizzate per slug in un
`Record<ProjectSlug, …>`: quindi **aggiungere un progetto a `lib/data.ts` è un
errore di compilazione finché non esistono entrambe le traduzioni**.

### Server e client

È tutto Server Component tranne tre foglie: `locale-switcher.tsx`,
`theme/theme-toggle.tsx` e `reveal.tsx`. `<Reveal>` è un confine client i cui
`children` arrivano da Server Component e restano renderizzati lato server:
avvolgere una sezione non la trasforma in un componente client.

### Temi (chiaro / scuro / sistema)

Niente `next-themes`; una trentina di righe scritte a mano, ed è l'architettura a
eliminare la solita danza del flag `mounted`.

- Ogni token è una **coppia `light-dark()` su `:root`**. L'override a runtime è
  un singolo ribaltamento di `color-scheme`, non uno scambio di regole: così
  nessun selettore può mancare dall'HTML renderizzato dal server e non esiste una
  finestra in cui dipinga la palette sbagliata. Lightning CSS abbassa
  `light-dark()` in uno switch di custom property e lo emette sia per
  `@media (prefers-color-scheme: dark)` sia per `:root[data-theme=…]`, il che
  significa che **la modalità sistema funziona anche con il JS disattivato**.
- `light-dark()` accetta solo valori `<color>`. Per questo i *colori* delle ombre
  sono token mentre la *geometria* si compone nelle regole `.panel`. Non mettere
  mai un intero `box-shadow` dentro `light-dark()`.
- `theme/theme-script.tsx` è un `<script>` inline sincrono dentro `<head>`, mai
  `next/script`: nessuna strategia di caricamento garantisce l'esecuzione prima
  del paint. Scrive `data-theme` (risolto), `data-theme-pref` (preferenza) e
  `class="js"`.
- Il segmento attivo del controllo è stilizzato **puramente da
  `[data-theme-pref]` in CSS**, mai dallo stato React; `ThemeToggle` legge la
  preferenza con `useSyncExternalStore`, così server e client producono markup
  identico.

Aggiungere un colore significa aggiungere un token `light-dark()` e mapparlo in
`@theme inline`. Evita i modificatori di opacità Tailwind (`/50`) su questi
token: `color-mix()` sopra `light-dark()` non vale il rischio, aggiungi piuttosto
un token.

### SEO

Un unico `@graph` JSON-LD (Person + WebSite + un CreativeWork per progetto, con
riferimenti incrociati via `@id`) emesso da `app/[locale]/page.tsx`.
`generateMetadata` restituisce lo **stesso** oggetto `languages` per entrambe le
lingue, il che soddisfa in un colpo solo tutte e quattro le regole hreflang.
`opengraph-image.tsx` prerenderizza un PNG per lingua: dichiarare
`openGraph.images` nei metadata oscurerebbe in silenzio quella convenzione di
file.

## Convenzioni di stile

Tailwind v4, configurato interamente in CSS. **Non esiste `tailwind.config`.**

- **Usa le utility semantiche**: `bg-background`, `bg-surface`, `bg-surface-alt`,
  `bg-muted`, `text-foreground`, `text-muted-foreground`, `border-border`,
  `border-border-strong`, `text-primary`, `bg-success`, `bg-glow`. Mai la
  sintassi con var grezze (`text-(--white)`): nomina un valore, e "testo bianco"
  è sbagliato in tema chiaro.
- **Tre toni di superficie, e l'ordine conta**: `--background` (canvas della
  pagina) sta sotto `--surface-alt` (le fasce di sezione) che sta sotto
  `--surface` (le card). È quella scala a far leggere le card come oggetti
  fisici; cambiare un valore significa ricontrollare tutti e tre.
- **La profondità viene da `.panel` / `.panel-soft` / `.panel-interactive`**, non
  dalle utility shadow di Tailwind. Ognuna sovrappone un'ombra di contatto
  stretta a una ambientale larga con spread molto negativo, più un highlight
  interno in alto: una sfocatura sola legge come un rettangolo sfocato invece che
  come un oggetto. `.panel-interactive` si solleva in hover e si riappoggia su
  `:active`, protetta da `prefers-reduced-motion`.
- **Regola delle forme** (documentata anche in `globals.css`): i controlli
  interattivi sono pillole completamente tonde; i pannelli usano
  `--radius-panel` (28px); i media dentro un pannello usano il raggio del
  pannello *meno il suo padding*, così le curve restano concentriche; chip e
  tessere piccole usano `--radius` (16px); le fasce di sezione usano
  `--radius-band` (36px).
- Il blu `#1C4EEF` (schiarito a `#7E99FF` in dark, dove il blu pieno non
  passerebbe il contrasto) è l'unico accento. Non introdurne un secondo.
- Tre font, caricati una volta sola in `lib/fonts.ts`: Bricolage Grotesque →
  `font-display`, DM Sans → `font-sans`, DM Mono → `font-mono` (le piccole
  diciture maiuscole spaziate). DM Mono non ha un taglio variabile, da cui i pesi
  espliciti.
- Le sezioni condividono `components/ui/section.tsx`, che accetta un `tone`
  `base` o `alt`. **Alternali così che due sezioni vicine non condividano mai il
  tono**: ora che le righe sottili non ci sono più, è quello scalino di colore a
  separare le sezioni. Ordine attuale: hero `base`, services `alt`, work `base`,
  stack `alt`, contact `base`, footer `alt`. I due toni condividono la stessa
  gronda esterna e la stessa misura interna, così il bordo sinistro di ogni
  titolo resta allineato lungo la pagina. **Nessuna etichetta sopra ai titoli.**
- Lo scroll reveal è CSS pilotato da un unico `IntersectionObserver` condiviso.
  Lo stato nascosto è protetto due volte, da `prefers-reduced-motion:
  no-preference` **e** da `.js`: così né una preferenza di animazioni ridotte né
  un fallimento del JS possono lasciare il contenuto invisibile. Non rimuovere
  mai nessuna delle due guardie.

## Trappole

- **`next.config.ts` è vuoto di proposito.** `experimental.optimizeCss`
  (critters) è stato rimosso: mette inline solo il CSS i cui selettori compaiono
  nell'HTML renderizzato dal server, il che è incompatibile in radice con un tema
  applicato via script, e il suo parser è precedente alle registrazioni
  `@property --tw-*` di Tailwind v4.
- **Le fasce di sezione si limitano con `max-w-band` + `mx-auto`, mai con un
  inset laterale fisso.** Una fascia deve restare più larga della misura
  `max-w-5xl` che avvolge a *ogni* viewport; un inset fisso smette di farlo
  appena il viewport è più stretto di misura + 2 × inset.
- **Express e PHP arrivano come SVG separati chiaro/scuro** invece che come un
  unico marchio in `currentColor`. Una `Skill` in `lib/data.ts` porta un
  `iconDark` opzionale; `stack-section.tsx` e `work-section.tsx` rendono entrambi
  i `next/image` e ne alternano la visibilità con la variante `dark:`, quindi lo
  scambio non richiede JS. Ogni nuovo logo senza un marchio leggibile in entrambi
  i temi ha bisogno della stessa coppia `icon`/`iconDark`.
- **`backdrop-filter` compare esattamente una volta**, in `.nav-pill`, e deve
  restare così. L'header è `fixed`, quindi la sfocatura è un composite una
  tantum; applicata a contenuto che scorre forza ridisegni GPU continui e
  distrugge il frame rate su mobile. Ha un fallback a riempimento pieno sotto
  `prefers-reduced-transparency`. Dato che l'header è `fixed` non occupa spazio
  nel layout: il padding superiore corrispondente lo porta la hero
  (`pt-28 md:pt-40`), quindi cambiare l'altezza della nav significa cambiare
  anche quello.
- **Gli elementi di griglia hanno bisogno di `min-w-0` esplicito** ovunque una
  cella possa contenere una stringa non spezzabile. Le tracce di griglia partono
  da `min-width: auto`, per cui l'indirizzo email in `contact-section.tsx`
  allargava tutta la colonna oltre il viewport finché ogni `<li>` non ha avuto
  `min-w-0`; da solo `truncate` non fa nulla.
- I valori di `viewport.themeColor` in `app/[locale]/layout.tsx` devono seguire
  `--background` in `globals.css`, altrimenti la cornice del browser su mobile e
  il canvas della pagina si scostano di una sfumatura.
- `.scrollbar-hide` è una utility opt-in; la pagina la sua scrollbar la tiene.
- `public/og-image.png` non è referenziato: le card OG si generano per lingua.
- `components.json` configura ancora shadcn, ed è per questo che si tengono gli
  alias compatibili in `globals.css` e `lib/utils.ts` (`cn`).

## Convenzioni di scrittura

I commenti nel codice sono **in italiano**. Identificatori, nomi di file, chiavi
di oggetti e array, tipi e valori di `messages/en.ts` restano **in inglese**. I
termini che compaiono letteralmente nel codice o nelle specifiche
(`data-theme`, `light-dark()`, `backdrop-filter`, hreflang, `Set-Cookie`…) non si
traducono dentro i commenti, altrimenti smettono di essere cercabili con grep.
