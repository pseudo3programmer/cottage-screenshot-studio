import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { RoomImage } from "@/content/site";
import { Button } from "@/components/ui/button";

export function PhotoPlaceholder({ label = "Your photo here", className = "" }: { label?: string; className?: string }) {
  return (
    <div className={`flex items-center justify-center bg-secondary text-sm text-muted-foreground ${className}`} role="img" aria-label={label}>
      <span className="rounded-full border border-border px-3 py-1">{label}</span>
    </div>
  );
}

export function Gallery({ images, title }: { images: RoomImage[]; title: string }) {
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (api && open) api.scrollTo(start, true);
  }, [api, open, start]);

  if (images.length === 0) return <PhotoPlaceholder className="aspect-[4/3] w-full" />;

  return (
    <>
      <Carousel opts={{ loop: images.length > 1 }} className="w-full">
        <CarouselContent className="ml-0">
          {images.map((img, i) => (
            <CarouselItem key={img.src + i} className="pl-0">
              <Button variant="ghost" type="button" onClick={() => { setStart(i); setOpen(true); }} className="block h-auto w-full rounded-none p-0" aria-label={`Open photo ${i + 1} of ${title}`}>
                <img src={img.src} alt={img.alt} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious className="left-3 h-11 w-11" />
            <CarouselNext className="right-3 h-11 w-11" />
          </>
        )}
      </Carousel>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl border-none bg-forest-deep p-2 pt-14 sm:p-4 sm:pt-14 [&>button]:flex [&>button]:h-11 [&>button]:w-11 [&>button]:items-center [&>button]:justify-center [&>button]:text-primary-foreground">
          <DialogTitle className="sr-only">{title} photos</DialogTitle>
          <Carousel setApi={setApi} opts={{ loop: images.length > 1 }}>
            <CarouselContent>
              {images.map((img, i) => (
                <CarouselItem key={img.src + i}>
                  <img src={img.src} alt={img.alt} className="h-[65svh] w-full rounded-lg object-contain" />
                </CarouselItem>
              ))}
            </CarouselContent>
            {images.length > 1 && (
              <>
                <CarouselPrevious className="left-2 h-11 w-11" />
                <CarouselNext className="right-2 h-11 w-11" />
              </>
            )}
          </Carousel>
        </DialogContent>
      </Dialog>
    </>
  );
}
