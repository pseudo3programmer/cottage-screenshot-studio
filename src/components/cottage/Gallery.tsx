import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { RoomImage } from "@/content/site";
import { Button } from "@/components/ui/button";
import { DeferredPhoto } from "@/components/cottage/Photo";
import { isNearbySlide } from "@/lib/photos";

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
  const [previewApi, setPreviewApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [expandedSelected, setExpandedSelected] = useState(0);

  useEffect(() => {
    if (!previewApi) return;
    const onSelect = () => setSelected(previewApi.selectedScrollSnap());
    onSelect();
    previewApi.on("select", onSelect);
    previewApi.on("reInit", onSelect);
    return () => { previewApi.off("select", onSelect); previewApi.off("reInit", onSelect); };
  }, [previewApi]);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setExpandedSelected(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => { api.off("select", onSelect); };
  }, [api]);

  useEffect(() => {
    if (api && open) api.scrollTo(start, true);
  }, [api, open, start]);

  if (images.length === 0) return <PhotoPlaceholder className="aspect-[4/3] w-full" />;

  return (
    <>
      <Carousel setApi={setPreviewApi} opts={{ loop: images.length > 1 }} className="w-full">
        <CarouselContent className="ml-0">
          {images.map((img, i) => (
            <CarouselItem key={img.src + i} className="pl-0">
              <Button variant="ghost" type="button" onClick={() => { setStart(i); setExpandedSelected(i); setOpen(true); }} className="relative block aspect-[4/3] h-auto w-full rounded-none p-0" aria-label={`Open ${img.label?.toLowerCase() ?? `photo ${i + 1}`} of ${title}`}>
                <DeferredPhoto active={isNearbySlide(i, selected, images.length)} src={img.src} alt={img.alt} sizes="(min-width: 768px) 496px, calc(100vw - 32px)" className="aspect-[4/3] h-full w-full object-cover" />
                {img.label && <span className="absolute bottom-3 left-3 rounded-md bg-forest-deep px-3 py-1.5 text-sm font-semibold text-primary-foreground">{img.label}</span>}
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
          {open && <Carousel setApi={setApi} opts={{ loop: images.length > 1, startIndex: start }}>
            <CarouselContent>
              {images.map((img, i) => (
                <CarouselItem key={img.src + i} className="relative">
                  <div className="h-[65svh] w-full"><DeferredPhoto active={isNearbySlide(i, expandedSelected, images.length)} src={img.src} alt={img.alt} sizes="(min-width: 1024px) 992px, calc(100vw - 48px)" className="h-full w-full rounded-lg object-contain" /></div>
                  {img.label && <span className="absolute bottom-3 left-7 rounded-md bg-forest-deep px-3 py-1.5 text-sm font-semibold text-primary-foreground">{img.label}</span>}
                </CarouselItem>
              ))}
            </CarouselContent>
            {images.length > 1 && (
              <>
                <CarouselPrevious className="left-2 h-11 w-11" />
                <CarouselNext className="right-2 h-11 w-11" />
              </>
            )}
          </Carousel>}
        </DialogContent>
      </Dialog>
    </>
  );
}
