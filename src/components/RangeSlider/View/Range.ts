/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { createElement } from '../lib/common';

export default class Range {
  element: HTMLElement;

  constructor() {
    this.element = createElement('div', 'range-slider__range');
  }

  setMarginFromBegin(margin: number, isVertical: boolean): Range {
    if (isVertical) {
      this.element.style.marginTop = `${margin}px`;
    } else {
      this.element.style.marginLeft = `${margin}px`;
    }
    return this;
  }

  setMarginFromEnd(margin: number, isVertical: boolean): Range {
    if (isVertical) {
      this.element.style.marginBottom = `${margin}px`;
    } else {
      this.element.style.marginRight = `${margin}px`;
    }
    return this;
  }
}
