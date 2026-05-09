'use client';

import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';

type Direction = 'left' | 'right';

function getTrackPadding(track: HTMLDivElement): number {
  const paddingLeft = Number.parseFloat(window.getComputedStyle(track).paddingLeft);
  return Number.isNaN(paddingLeft) ? 0 : paddingLeft;
}

function getSnapTargets(track: HTMLDivElement, viewport: HTMLDivElement): number[] {
  const paddingLeft = getTrackPadding(track);
  const maxOffset = Math.max(track.scrollWidth - viewport.clientWidth, 0);
  const rawTargets = Array.from(track.querySelectorAll<HTMLElement>('.carousel-card')).map((card) =>
    Math.min(Math.max(card.offsetLeft - paddingLeft, 0), maxOffset)
  );
  const uniqueTargets: number[] = [];

  rawTargets.forEach((target) => {
    const previousTarget = uniqueTargets.at(-1);
    if (previousTarget === undefined || Math.abs(previousTarget - target) > 1) {
      uniqueTargets.push(target);
    }
  });

  return uniqueTargets.length > 0 ? uniqueTargets : [0];
}

export function useCarouselScroll(itemCount: number) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [snapTargets, setSnapTargets] = useState<number[]>([0]);
  const [activeIndex, setActiveIndex] = useState(0);

  const measureTargets = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track) {
      return;
    }

    const nextTargets = getSnapTargets(track, viewport);
    setSnapTargets(nextTargets);
    setActiveIndex((previousIndex) => Math.min(previousIndex, nextTargets.length - 1));
  }, []);

  useLayoutEffect(() => {
    measureTargets();

    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) {
      return;
    }

    let frameId = 0;
    const scheduleMeasure = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(measureTargets);
    };

    const resizeObserver = new ResizeObserver(scheduleMeasure);
    resizeObserver.observe(viewport);
    resizeObserver.observe(track);
    track.querySelectorAll('.carousel-card').forEach((card) => resizeObserver.observe(card));

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, [itemCount, measureTargets]);

  const scroll = (direction: Direction) => {
    setActiveIndex((previousIndex) => {
      const maxIndex = Math.max(snapTargets.length - 1, 0);
      const delta = direction === 'right' ? 1 : -1;
      return Math.min(Math.max(previousIndex + delta, 0), maxIndex);
    });
  };

  const currentOffset = snapTargets[activeIndex] ?? 0;
  const canScrollLeft = activeIndex > 0;
  const canScrollRight = activeIndex < snapTargets.length - 1;
  const trackStyle = useMemo(
    () => ({
      transform: `translate3d(${-currentOffset}px, 0, 0)`,
    }),
    [currentOffset]
  );

  return {
    viewportRef,
    trackRef,
    scroll,
    trackStyle,
    canScrollLeft,
    canScrollRight,
  };
}