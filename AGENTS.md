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
- Serve cottage images through the pre-compressed CDN rendition manifest and shared Photo controls; prioritize the hero and defer offscreen carousel slides to avoid competing downloads.
- Cottage navigation uses the mobile drawer and safe-area-aware contact bar below the large breakpoint; photo controls retain 44px touch targets so tablet and phone navigation stays usable.
- All cottage facts, contacts, rooms and manual reviews live in `src/content/site.ts`; components read from it so the owner edits one file. Empty fields are hidden, never invented.
- Google reviews come only from the `getGoogleReviews` server function (Places API New via the Google Maps connector gateway, env `LOVABLE_API_KEY` + `GOOGLE_MAPS_API_KEY`, place ID from `site.location.googlePlaceId`), falling back to manual reviews; keys never reach the browser.
- Online booking: `bookings` table is server-only (RLS on, no policies); all reads/writes go through `src/lib/booking.functions.ts` via the admin client. Payments use Cashfree (env `CASHFREE_APP_ID`, `CASHFREE_SECRET_KEY`, `CASHFREE_ENV`=sandbox|production); a booking is marked paid only after the server re-checks the order with Cashfree. Unpaid holds block dates for `PENDING_HOLD_MINUTES`.
