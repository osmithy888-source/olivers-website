<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Rules
- Netlify deploys use `vite.netlify.config.ts` (SPA mode + static nitro preset). Build with `env -u DEV_SERVER__PROJECT_PATH -u LOVABLE_SANDBOX bunx vite build -c vite.netlify.config.ts`, then the SSR HTML at "/" must be captured into `dist/client/index.html` (prerendering 404s in this setup); `dist/client` is then drag-and-droppable to Netlify. Why: the sandbox build config forces the Cloudflare preset and the static prerender fails, so the static export needs the SPA config plus a captured index.html.
