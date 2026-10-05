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

## Website architecture
- Keep homepage sections in the nursery module and expose the completed homepage at the index route; this keeps the marketing experience cohesive and section navigation local.
- Define visual roles and reusable botanical control styles in the global stylesheet and Button variants; this preserves consistent theming.
- Manage GSAP/ScrollTrigger and Lenis in the scoped botanical motion hook with cleanup and media-query guards; this prevents leaked animations and preserves accessible native scrolling.
- Keep the website frontend-only and clearly mark unverified business details, illustrative reviews, and newsletter availability; no collection or service integration has been commissioned.
