'use client';

import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';

type Direction = 'left' | 'right';
type DragState = {
  pointerId: number;
  startX: number;
  startY: number;
  startOffset: number;
  startIndex: number;
  dragStartThreshold: number;
  dragThreshold: number;
  dragging: boolean;
};

const BASE_DRAG_START_THRESHOLD = 8;
const INTERACTIVE_DRAG_START_THRESHOLD = 18;

function getTrackPadding(track: HTMLDivElement): number {
  const paddingLeft = Number.parseFloat(window.getComputedStyle(track).paddingLeft);
  return Number.isNaN(paddingLeft) ? 0 : paddingLeft;
}

function clampOffset(offset: number, maxOffset: number): number {
  return Math.min(Math.max(offset, 0), maxOffset);
}

function getClosestTargetIndex(targets: number[], offset: number): number {
  return targets.reduce((closestIndex, target, index) => {
    const currentClosestTarget = targets[closestIndex] ?? 0;
    return Math.abs(target - offset) < Math.abs(currentClosestTarget - offset) ? index : closestIndex;
  }, 0);
}

function getDragThreshold(targets: number[], index: number): number {
  const currentTarget = targets[index] ?? 0;
  const previousTarget = targets[index - 1];
  const nextTarget = targets[index + 1];
  const stepDistances = [previousTarget, nextTarget]
    .filter((target): target is number => target !== undefined)
    .map((target) => Math.abs(target - currentTarget));

  if (stepDistances.length === 0) {
    return 36;
  }

  const nearestStepDistance = Math.min(...stepDistances);
  return Math.min(Math.max(nearestStepDistance * 0.18, 36), 72);
}

function isInteractiveTarget(target: EventTarget | null): boolean {
  return target instanceof Element && target.closest('a, button, input, select, textarea, summary, [role="button"]') !== null;
}

function getSnapIndexFromDrag(
  targets: number[],
  startIndex: number,
  deltaX: number,
  dragThreshold: number
): number {
  if (Math.abs(deltaX) < dragThreshold) {
    return startIndex;
  }

  const direction = deltaX < 0 ? 1 : -1;
  const maxIndex = Math.max(targets.length - 1, 0);
  return Math.min(Math.max(startIndex + direction, 0), maxIndex);
}

function getCurrentTrackOffset(track: HTMLDivElement): number {
  const transform = window.getComputedStyle(track).transform;

  if (!transform || transform === 'none') {
    return 0;
  }

  return Math.max(0, -new DOMMatrixReadOnly(transform).m41);
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
  const dragStateRef = useRef<DragState | null>(null);
  const suppressClickRef = useRef(false);
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

  const setTrackOffset = useCallback((offset: number, dragging: boolean) => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    track.style.transition = dragging ? 'none' : '';
    track.style.transform = `translate3d(${-offset}px, 0, 0)`;
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

  const currentOffset = snapTargets[activeIndex] ?? 0;
  const maxOffset = snapTargets.at(-1) ?? 0;

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track) {
      return;
    }

    viewport.style.touchAction = 'pan-y';
    viewport.style.cursor = maxOffset > 0 ? 'grab' : '';

    const restoreUserSelection = () => {
      document.body.style.userSelect = '';
    };

    const beginDrag = (pointerId: number, startOffset: number) => {
      viewport.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
      setTrackOffset(startOffset, true);

      if (!viewport.hasPointerCapture(pointerId)) {
        viewport.setPointerCapture(pointerId);
      }
    };

    const finishDrag = (pointerId: number, clientX: number) => {
      const dragState = dragStateRef.current;

      if (!dragState || dragState.pointerId !== pointerId) {
        return;
      }

      dragStateRef.current = null;
      restoreUserSelection();
      viewport.style.cursor = maxOffset > 0 ? 'grab' : '';

      if (!dragState.dragging) {
        return;
      }

      const deltaX = clientX - dragState.startX;
      const nextOffset = clampOffset(dragState.startOffset - deltaX, maxOffset);
      const nextIndex = getSnapIndexFromDrag(
        snapTargets,
        dragState.startIndex,
        deltaX,
        dragState.dragThreshold
      );
      const snappedOffset = snapTargets[nextIndex] ?? nextOffset;

      if (viewport.hasPointerCapture(pointerId)) {
        viewport.releasePointerCapture(pointerId);
      }

      setTrackOffset(snappedOffset, false);
      setActiveIndex(nextIndex);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (maxOffset <= 0) {
        return;
      }

      if (event.pointerType === 'mouse' && event.button !== 0) {
        return;
      }

      const startOffset = clampOffset(getCurrentTrackOffset(track), maxOffset);
      const startIndex = getClosestTargetIndex(snapTargets, startOffset);

      dragStateRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        startOffset,
        startIndex,
        dragStartThreshold: isInteractiveTarget(event.target)
          ? INTERACTIVE_DRAG_START_THRESHOLD
          : BASE_DRAG_START_THRESHOLD,
        dragThreshold: getDragThreshold(snapTargets, startIndex),
        dragging: false,
      };
      suppressClickRef.current = false;
    };

    const handlePointerMove = (event: PointerEvent) => {
      const dragState = dragStateRef.current;

      if (!dragState || dragState.pointerId !== event.pointerId) {
        return;
      }

      const deltaX = event.clientX - dragState.startX;
      const deltaY = event.clientY - dragState.startY;

      if (!dragState.dragging) {
        if (Math.abs(deltaX) < dragState.dragStartThreshold || Math.abs(deltaX) <= Math.abs(deltaY)) {
          return;
        }

        dragState.dragging = true;
        suppressClickRef.current = true;
        beginDrag(event.pointerId, dragState.startOffset);
      }

      const nextOffset = clampOffset(dragState.startOffset - deltaX, maxOffset);
      setTrackOffset(nextOffset, true);
    };

    const handlePointerUp = (event: PointerEvent) => {
      finishDrag(event.pointerId, event.clientX);
    };

    const handlePointerCancel = (event: PointerEvent) => {
      finishDrag(event.pointerId, event.clientX);
    };

    const handleClickCapture = (event: MouseEvent) => {
      if (!suppressClickRef.current) {
        return;
      }

      suppressClickRef.current = false;
      event.preventDefault();
      event.stopPropagation();
    };

    viewport.addEventListener('pointerdown', handlePointerDown);
    viewport.addEventListener('pointermove', handlePointerMove);
    viewport.addEventListener('pointerup', handlePointerUp);
    viewport.addEventListener('pointercancel', handlePointerCancel);
    viewport.addEventListener('click', handleClickCapture, true);

    return () => {
      restoreUserSelection();
      dragStateRef.current = null;
      viewport.style.cursor = '';
      track.style.transition = '';
      viewport.removeEventListener('pointerdown', handlePointerDown);
      viewport.removeEventListener('pointermove', handlePointerMove);
      viewport.removeEventListener('pointerup', handlePointerUp);
      viewport.removeEventListener('pointercancel', handlePointerCancel);
      viewport.removeEventListener('click', handleClickCapture, true);
    };
  }, [maxOffset, setTrackOffset, snapTargets]);

  const scroll = (direction: Direction) => {
    setActiveIndex((previousIndex) => {
      const maxIndex = Math.max(snapTargets.length - 1, 0);
      const delta = direction === 'right' ? 1 : -1;
      return Math.min(Math.max(previousIndex + delta, 0), maxIndex);
    });
  };

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