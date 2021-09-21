/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import {
  ISettings, ISliderElement, INodeName, IMinMax,
} from '../RangeSlider/types';

export function getMinMaxElementEdgesInPx(settings: ISettings, el: ISliderElement): IMinMax {
  const elementRect = el.element.getBoundingClientRect();

  if (settings.isVertical) {
    return {
      min: elementRect!.top,
      max: elementRect!.bottom,
    };
  }
  return {
    min: elementRect!.left,
    max: elementRect!.right,
  };
}

export function getElementLengthInPx(settings: ISettings, el: HTMLElement): number {
  return settings.isVertical
    ? el.getBoundingClientRect().height
    : el.getBoundingClientRect().width;
}

export function createElement(
  tag: INodeName,
  tagClassName: string,
  el?: HTMLElement,
): HTMLElement {
  const element = document.createElement(tag);
  element.className = tagClassName;

  if (el) {
    element.appendChild(el);
  }
  return element;
}

export function getOnePointInPx(settings: ISettings, element: HTMLElement) {
  const elementLengthInPx: number = getElementLengthInPx(settings, element);
  const elementLengthInPoints: number = settings.max - settings.min;
  return elementLengthInPx / elementLengthInPoints;
}