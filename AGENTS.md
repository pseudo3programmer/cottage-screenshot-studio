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

## Project rules
- All cottage facts, contacts, rooms and manual reviews live in `src/content/site.ts`; components read from it so the owner edits one file. Empty fields are hidden, never invented.
- Google reviews come only from the `getGoogleReviews` server function (Places API New, env `GOOGLE_PLACES_API_KEY` + `GOOGLE_PLACE_ID`), falling back to manual reviews; keys never reach the browser.
