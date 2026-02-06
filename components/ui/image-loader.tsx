"use client";

import React, {
    useEffect,
    useRef,
    useState,
    memo,
} from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { SlideImage } from "yet-another-react-lightbox";

type Props = Omit<
    React.ComponentProps<typeof Image>,
    "src" | "onLoad" | "onError"
> & {
    src: string;
    fallback?: string;
    lazy?: boolean;
    rootMargin?: string;
    showSkeleton?: boolean;
    skeletonClassName?: string;
    showSpinner?: boolean;
    wrapperClassName?: string;
    fadeDurationMs?: number;
    onLoaded?: (isFallback: boolean) => void;
};

export function ImageLoader({
    src,
    alt = "",
    fallback = "/storage/images/logos/empty.png",
    lazy = true,
    rootMargin = "200px",
    showSkeleton = true,
    skeletonClassName = "bg-muted",
    showSpinner = true,
    wrapperClassName = "",
    className = "",
    fadeDurationMs = 300,
    onLoaded,
    ...imgProps
}: Props) {
    const [isInView, setIsInView] = useState(!lazy);
    const wrapRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!lazy || isInView) return;
        const el = wrapRef.current;
        if (!el) return;

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    io.disconnect();
                }
            },
            { rootMargin }
        );

        io.observe(el);
        return () => io.disconnect();
    }, [lazy, isInView, rootMargin]);

    return (
        <div
            ref={wrapRef}
            className={`relative inline-block ${wrapperClassName}`}
        >
            {isInView && (
                <InnerImg
                    key={src}
                    src={src}
                    fallback={fallback}
                    alt={alt}
                    className={className}
                    fadeDurationMs={fadeDurationMs}
                    showSkeleton={showSkeleton}
                    skeletonClassName={skeletonClassName}
                    showSpinner={showSpinner}
                    onLoaded={onLoaded}
                    {...imgProps}
                />
            )}
        </div>
    );
}

type InnerProps = Omit<Props, "lazy" | "rootMargin" | "wrapperClassName"> & {
    fadeDurationMs: number;
};

function InnerImg({
    src,
    fallback,
    alt,
    className,
    height = 200,
    width = 200,
    fadeDurationMs,
    showSkeleton,
    skeletonClassName,
    showSpinner,
    onLoaded,
    ...imgProps
}: InnerProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [failed, setFailed] = useState(false);
    const [open, setOpen] = useState(false);

    const effectiveSrc = failed ? fallback : src;

    return (
        <>
            {showSkeleton && isLoading && (
                <div
                    className={`absolute inset-0 animate-pulse rounded ${skeletonClassName}`}
                />
            )}

            {showSpinner && isLoading && (
                <div className="pointer-events-none absolute inset-0 grid place-items-center">
                    <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-5 w-5 animate-spin"
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="none"
                            opacity="0.25"
                        />
                        <path d="M22 12a10 10 0 0 1-10 10" fill="currentColor" />
                    </svg>
                </div>
            )}

            <button type="button" onClick={() => setOpen(true)}>
                <Image
                    {...imgProps}
                    src={effectiveSrc as string}
                    alt={alt}
                    height={height}
                    width={width}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`${className} shadow-lg cursor-pointer`}
                    style={{
                        transition: `opacity ${fadeDurationMs}ms ease`,
                        opacity: isLoading ? 0 : 1,
                        ...(imgProps.style ?? {}),
                    }}
                    onLoadingComplete={() => {
                        setIsLoading(false);
                        onLoaded?.(failed);
                    }}
                    onError={() => {
                        if (!failed) {
                            setFailed(true);
                            setIsLoading(true);
                        } else {
                            setIsLoading(false);
                        }
                    }}
                />
            </button>

            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={[{ src: effectiveSrc, alt } as SlideImage]}
                carousel={{ finite: true }}
                controller={{ closeOnBackdropClick: true }}
                render={{
                    buttonPrev: () => null,
                    buttonNext: () => null,
                }}
            />
        </>
    );
}

export default memo(ImageLoader);
