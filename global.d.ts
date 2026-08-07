// Dice a TypeScript che i file CSS sono import validi per side-effect
// (a runtime li gestisce Next.js / Turbopack / webpack)
declare module "*.css" {
    const styles: { readonly [className: string]: string };
    export default styles;
}
