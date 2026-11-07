import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";
import { photoSources } from "@/lib/photos";

type PhotoProps = ImgHTMLAttributes<HTMLImageElement> & { src: string };

export function Photo({ src, ...props }: PhotoProps) {
  return <img {...photoSources(src)} {...props} />;
}

/** Start fetching shortly before a photo enters view, not at page load. */
export function DeferredPhoto({ active = true, ...props }: PhotoProps & { active?: boolean }) {
  const host = useRef<HTMLSpanElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = host.current;
    if (!active || ready || !element) return;
    if (!("IntersectionObserver" in window)) {
      setReady(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setReady(true);
        observer.disconnect();
      }
    }, { rootMargin: "600px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, [active, ready]);

  return (
    <span ref={host} className="block h-full w-full bg-secondary">
      {ready ? <Photo {...props} loading="eager" decoding="async" /> : <span className={props.className} aria-hidden="true" />}
    </span>
  );
}