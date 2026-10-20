import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { getGoogleReviews } from "@/lib/reviews.functions";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";

function Stars({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} className={`h-4 w-4 ${n <= Math.round(value) ? "fill-accent text-accent" : "text-border"}`} />
      ))}
    </div>
  );
}

export function Reviews() {
  const { data, isLoading } = useQuery({ queryKey: ["google-reviews"], queryFn: () => getGoogleReviews(), staleTime: 3600_000 });
  const live = data?.status === "ok" ? data : null;
  const mapsUrl = live?.mapsUrl || site.location.mapsUrl;

  return (
    <div>
      {live?.rating && live.total ? (
        <div className="mb-6 flex items-center gap-3">
          <span className="font-display text-4xl font-semibold">{live.rating.toFixed(1)}</span>
          <div>
            <Stars value={live.rating} />
            <p className="text-sm text-muted-foreground">{live.total} reviews on Google</p>
          </div>
        </div>
      ) : null}

      {isLoading && <div className="grid gap-4 sm:grid-cols-2">{[0, 1].map((i) => <div key={i} className="h-40 animate-pulse rounded-2xl bg-muted" />)}</div>}

      {live && live.reviews.length > 0 && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            {live.reviews.map((r, i) => (
              <article key={i} className="rounded-2xl bg-card p-5 shadow-soft">
                <div className="mb-3 flex items-center gap-3">
                  {r.photo && <img src={r.photo} alt="" referrerPolicy="no-referrer" loading="lazy" className="h-10 w-10 rounded-full" />}
                  <div>
                    {r.authorUrl ? <a href={r.authorUrl} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">{r.author}</a> : <p className="font-medium">{r.author}</p>}
                    {r.relativeTime && <p className="text-xs text-muted-foreground">{r.relativeTime}</p>}
                  </div>
                </div>
                <Stars value={r.rating} />
                <p className="mt-3 text-sm leading-relaxed">{r.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Reviews powered by Google</p>
        </>
      )}

      {!isLoading && !live && (
        site.manualReviews.length > 0 ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              {site.manualReviews.map((r, i) => (
                <article key={i} className="rounded-2xl bg-card p-5 shadow-soft">
                  <p className="font-medium">{r.author}</p>
                  {r.date && <p className="text-xs text-muted-foreground">{r.date}</p>}
                  <div className="mt-2"><Stars value={r.rating} /></div>
                  <p className="mt-3 text-sm leading-relaxed">{r.text}</p>
                </article>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Selected guest reviews. These are added manually and not synced automatically with Google.</p>
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card p-6 text-center">
            <p className="font-display text-xl">Read what our guests say</p>
            <p className="mt-2 text-sm text-muted-foreground">Our genuine guest reviews are on Google Maps.</p>
          </div>
        )
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {mapsUrl && <Button asChild size="lg" className="h-12 rounded-full"><a href={mapsUrl} target="_blank" rel="noopener noreferrer">Read All Reviews on Google</a></Button>}
        {site.location.writeReviewUrl && <Button asChild size="lg" variant="outline" className="h-12 rounded-full"><a href={site.location.writeReviewUrl} target="_blank" rel="noopener noreferrer">Write a Review</a></Button>}
      </div>
    </div>
  );
}
