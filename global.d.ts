// Tell TypeScript that CSS files are valid side-effect imports
// (handled at runtime by Next.js / Turbopack / webpack)
declare module "*.css" {
    const styles: { readonly [className: string]: string };
    export default styles;
}
