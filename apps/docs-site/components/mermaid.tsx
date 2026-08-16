'use client';

import { Check, Clipboard, Download, Expand, Minus, Plus, RotateCcw, X } from 'lucide-react';
import { Suspense, use, useEffect, useId, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { useCopyButton } from 'fumadocs-ui/utils/use-copy-button';
import { DotmSquare3 } from '@/components/ui/dotm-square-3';

const cache = new Map<string, Promise<unknown>>();
const iconButtonClass = `${buttonVariants({ size: 'icon-xs' })} cursor-pointer text-fd-foreground hover:text-fd-accent-foreground disabled:cursor-not-allowed`;

function cachePromise<T>(key: string, create: () => Promise<T>): Promise<T> {
  const cached = cache.get(key);
  if (cached) return cached as Promise<T>;

  const promise = create();
  cache.set(key, promise);
  return promise;
}

export function Mermaid({ chart }: { chart: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <MermaidLoading />;

  return (
    <Suspense fallback={<MermaidLoading />}>
      <MermaidContent chart={chart} />
    </Suspense>
  );
}

function MermaidLoading() {
  return (
    <div className="not-prose relative my-6 grid h-64 place-items-center overflow-hidden rounded-xl border bg-fd-card">
      <div className="absolute inset-6 animate-pulse rounded-lg bg-fd-muted/45" aria-hidden="true" />
      <div className="relative flex flex-col items-center gap-3 text-xs text-fd-muted-foreground">
        <DotmSquare3 ariaLabel="Rendering diagram" dotSize={3} size={22} />
        <span>Rendering diagram…</span>
      </div>
      <div className="absolute end-2 top-2 h-7 w-24 animate-pulse rounded-md bg-fd-muted" aria-hidden="true" />
    </div>
  );
}

function MermaidContent({ chart }: { chart: string }) {
  const id = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const modalDiagramRef = useRef<HTMLDivElement>(null);
  const baseViewBoxRef = useRef<{ x: number; y: number; width: number; height: number } | null>(null);
  const dragRef = useRef<{ x: number; y: number; left: number; top: number } | null>(null);
  const viewRef = useRef({ zoom: 1, offset: { x: 0, y: 0 } });
  const targetViewRef = useRef(viewRef.current);
  const animationFrameRef = useRef<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const { resolvedTheme } = useTheme();
  const { default: mermaid } = use(cachePromise('mermaid', () => import('mermaid')));

  const animateView = () => {
    const current = viewRef.current;
    const target = targetViewRef.current;
    const next = {
      zoom: current.zoom + (target.zoom - current.zoom) * 0.22,
      offset: {
        x: current.offset.x + (target.offset.x - current.offset.x) * 0.22,
        y: current.offset.y + (target.offset.y - current.offset.y) * 0.22,
      },
    };
    const settled = Math.abs(next.zoom - target.zoom) < 0.001
      && Math.abs(next.offset.x - target.offset.x) < 0.1
      && Math.abs(next.offset.y - target.offset.y) < 0.1;
    const view = settled ? target : next;

    viewRef.current = view;
    setZoom(view.zoom);
    setOffset(view.offset);
    animationFrameRef.current = settled ? null : requestAnimationFrame(animateView);
  };

  const startViewAnimation = () => {
    if (animationFrameRef.current === null) animationFrameRef.current = requestAnimationFrame(animateView);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const bounds = canvas.getBoundingClientRect();
      const current = targetViewRef.current;
      const nextZoom = Math.min(3, Math.max(0.5, current.zoom * Math.exp(-event.deltaY * 0.0015)));
      const pointerX = event.clientX - bounds.left - bounds.width / 2;
      const pointerY = event.clientY - bounds.top - bounds.height / 2;
      const ratio = nextZoom / current.zoom;
      const nextOffset = {
        x: pointerX - (pointerX - current.offset.x) * ratio,
        y: pointerY - (pointerY - current.offset.y) * ratio,
      };

      targetViewRef.current = { zoom: nextZoom, offset: nextOffset };
      startViewAnimation();
    };

    canvas.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      canvas.removeEventListener('wheel', handleWheel);
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
    fontFamily: 'inherit',
    themeCSS: 'margin: 0 auto;',
    theme: resolvedTheme === 'dark' ? 'dark' : 'default',
  });

  const { svg, bindFunctions } = use(
    cachePromise(`${chart}-${resolvedTheme}`, () => mermaid.render(id, chart.replaceAll('\\n', '\n'))),
  );

  useEffect(() => {
    const diagram = modalDiagramRef.current?.querySelector('svg');
    const values = diagram?.getAttribute('viewBox')?.split(/\s+/).map(Number);
    if (!diagram || values?.length !== 4 || values.some((value) => !Number.isFinite(value))) return;

    baseViewBoxRef.current = { x: values[0], y: values[1], width: values[2], height: values[3] };
  }, [svg]);

  useEffect(() => {
    const diagram = modalDiagramRef.current?.querySelector('svg');
    const canvas = canvasRef.current;
    const base = baseViewBoxRef.current;
    if (!diagram || !canvas || !base || canvas.clientWidth === 0 || canvas.clientHeight === 0) return;

    const fittedScale = Math.min(canvas.clientWidth / base.width, canvas.clientHeight / base.height);
    const width = base.width / zoom;
    const height = base.height / zoom;
    const x = base.x + (base.width - width) / 2 - offset.x / (fittedScale * zoom);
    const y = base.y + (base.height - height) / 2 - offset.y / (fittedScale * zoom);
    diagram.setAttribute('viewBox', `${x} ${y} ${width} ${height}`);
  }, [offset, svg, zoom]);

  const [copied, copySource] = useCopyButton(() => navigator.clipboard.writeText(chart));
  const downloadSvg = () => {
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'diagram.svg';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  };
  const openFullscreen = () => {
    const initialView = { zoom: 1, offset: { x: 0, y: 0 } };
    viewRef.current = initialView;
    targetViewRef.current = initialView;
    setZoom(1);
    setOffset({ x: 0, y: 0 });
    dialogRef.current?.showModal();
    requestAnimationFrame(() => setOffset({ x: 0, y: 0 }));
  };
  const closeFullscreen = () => {
    dialogRef.current?.close();
  };
  const changeZoom = (amount: number) => {
    targetViewRef.current = {
      ...targetViewRef.current,
      zoom: Math.min(3, Math.max(0.5, targetViewRef.current.zoom + amount)),
    };
    startViewAnimation();
  };
  const resetView = () => {
    const initialView = { zoom: 1, offset: { x: 0, y: 0 } };
    if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = null;
    viewRef.current = initialView;
    targetViewRef.current = initialView;
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };
  return (
    <>
      <figure className="not-prose group relative my-6 overflow-hidden rounded-xl border bg-fd-card">
        <div
          className="overflow-auto [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
          ref={(container) => {
            if (container) bindFunctions?.(container);
          }}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
        <div className="absolute end-2 top-2 flex select-none gap-0.5 rounded-md border bg-fd-background/95 p-0.5 backdrop-blur">
            <button data-checked={copied || undefined} className={iconButtonClass} onClick={copySource} aria-label={copied ? 'Copied source' : 'Copy source'} title={copied ? 'Copied' : 'Copy source'}>
              {copied ? <Check /> : <Clipboard />}
            </button>
            <button className={iconButtonClass} onClick={downloadSvg} aria-label="Download SVG" title="Download SVG">
              <Download />
            </button>
            <button className={iconButtonClass} onClick={openFullscreen} aria-label="Open in fullscreen" title="Open in fullscreen">
              <Expand />
            </button>
        </div>
      </figure>

      <dialog
        ref={dialogRef}
        aria-label="Mermaid diagram viewer"
        onCancel={(event) => {
          event.preventDefault();
          closeFullscreen();
        }}
        onClose={resetView}
        className="m-auto h-[75dvh] w-[95vw] max-w-4xl overflow-hidden rounded-xl border bg-fd-background p-0 text-fd-foreground shadow-2xl backdrop:bg-black/60"
      >
        <div className="relative h-full overflow-hidden">
          <div className="absolute left-1/2 top-3 z-10 flex -translate-x-1/2 select-none items-center gap-0.5 rounded-md border bg-fd-background/95 p-0.5 backdrop-blur">
              <button className={iconButtonClass} disabled={zoom <= 0.5} onClick={() => changeZoom(-0.25)} aria-label="Zoom out" title="Zoom out">
                <Minus />
              </button>
              <button className={iconButtonClass} onClick={resetView} aria-label="Reset zoom" title="Reset zoom">
                <RotateCcw />
              </button>
              <span className="inline-flex h-6 w-10 select-none items-center justify-center rounded-sm bg-fd-muted text-[11px] tabular-nums text-fd-foreground" aria-live="polite">
                {Math.round(zoom * 100)}%
              </span>
              <button className={iconButtonClass} disabled={zoom >= 3} onClick={() => changeZoom(0.25)} aria-label="Zoom in" title="Zoom in">
                <Plus />
              </button>
              <button data-checked={copied || undefined} className={iconButtonClass} onClick={copySource} aria-label={copied ? 'Copied source' : 'Copy source'} title={copied ? 'Copied' : 'Copy source'}>
                {copied ? <Check /> : <Clipboard />}
              </button>
              <button className={iconButtonClass} onClick={downloadSvg} aria-label="Download SVG" title="Download SVG">
                <Download />
              </button>
          </div>
          <button className={`${iconButtonClass} absolute end-3 top-3 z-10 rounded-lg border bg-fd-background/95 backdrop-blur`} onClick={closeFullscreen} aria-label="Close" title="Close">
            <X />
          </button>
          <div
            ref={canvasRef}
            className="relative h-full w-full touch-none select-none overflow-hidden bg-fd-background active:cursor-grabbing"
            onPointerDown={(event) => {
              if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
              animationFrameRef.current = null;
              targetViewRef.current = viewRef.current;
              event.currentTarget.setPointerCapture(event.pointerId);
              dragRef.current = { x: event.clientX, y: event.clientY, left: offset.x, top: offset.y };
            }}
            onPointerMove={(event) => {
              if (!dragRef.current) return;
              const nextOffset = {
                x: dragRef.current.left + event.clientX - dragRef.current.x,
                y: dragRef.current.top + event.clientY - dragRef.current.y,
              };
              viewRef.current.offset = nextOffset;
              targetViewRef.current = viewRef.current;
              setOffset(nextOffset);
            }}
            onPointerUp={() => {
              dragRef.current = null;
            }}
            onPointerCancel={() => {
              dragRef.current = null;
            }}
          >
            <div
              className="h-full w-full cursor-grab [&_svg]:!block [&_svg]:!h-full [&_svg]:!w-full [&_svg]:!max-w-none"
              ref={(container) => {
                modalDiagramRef.current = container;
                if (container) bindFunctions?.(container);
              }}
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          </div>
        </div>
      </dialog>
    </>
  );
}
