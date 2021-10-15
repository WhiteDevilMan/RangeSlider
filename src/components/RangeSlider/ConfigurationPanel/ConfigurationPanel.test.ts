/**
 * @jest-environment jsdom
 */

/* eslint-disable lines-between-class-members */
/* eslint-disable dot-notation */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */

import { ISettings } from '../RangeSlider/types';
import ConfigurationPanel from './ConfigurationPanel';

let settings: ISettings;

beforeEach(() => {
  settings = {
    min: 0,
    max: 1500,
    step: 10,
    valueFrom: 1000,
    valueTo: 1490,
    isVertical: false,
    isTwoRunners: true,
    isScaleVisible: true,
    isBarVisible: true,
    isTooltipsVisible: true,
    isConfPanel: true,

  };
});

describe('private addListeners', () => {
  it('should change values and add listeners', () => {
    const confPanel = new ConfigurationPanel(settings);
    const nObsSpy = jest
      .spyOn(confPanel.changeConfPanelSettingsObserver, 'notifyObservers');

    confPanel.cpMin!.value = String(100);
    confPanel.cpMax!.value = String(100);
    confPanel.cpStep!.value = String(100);
    confPanel.cpFrom!.value = String(100);
    confPanel.cpTo!.value = String(100);

    confPanel.cpVertical!.checked = false;
    confPanel.cpRange!.checked = false;
    confPanel.cpScale!.checked = false;
    confPanel.cpBar!.checked = false;
    confPanel.cpTips!.checked = false;

    const result = confPanel['addListeners']();

    /* number inputs */
    // cpMin listener
    result.cpMin!.click();
    expect(String(result.settings.min)).toBe(result.cpMin!.value);
    expect(nObsSpy).toBeCalledWith(settings);
    // cpMin listener end

    // cpMax listener
    result.cpMax!.click();
    expect(String(result.settings.max)).toBe(result.cpMax!.value);
    expect(nObsSpy).toBeCalledWith(settings);
    // cpMax listener end

    // cpStep listener
    result.cpStep!.click();
    expect(String(result.settings.step)).toBe(result.cpStep!.value);
    expect(nObsSpy).toBeCalledWith(settings);
    // cpStep listener end

    // cpFrom listener
    result.cpFrom!.click();
    expect(String(result.settings.valueFrom)).toBe(result.cpFrom!.value);
    expect(nObsSpy).toBeCalledWith(settings);
    // cpFrom listener end

    // cpTo listener
    result.cpTo!.click();
    expect(String(result.settings.valueTo)).toBe(result.cpTo!.value);
    expect(nObsSpy).toBeCalledWith(settings);
    // cpTo listener end

    /* checkbox inputs */
    // cpVertical listener
    result.cpVertical!.click();
    expect(result.settings.isVertical).toBe(result.cpVertical!.checked);
    expect(nObsSpy).toBeCalledWith(settings);
    // cpVertical listener end

    // cpRange listener
    result.cpRange!.click();
    expect(result.settings.isTwoRunners).toBe(result.cpRange!.checked);
    expect(nObsSpy).toBeCalledWith(settings);
    // cpRange listener end

    // cpScale listener
    result.cpScale!.click();
    expect(result.settings.isScaleVisible).toBe(result.cpScale!.checked);
    expect(nObsSpy).toBeCalledWith(settings);
    // cpScale listener end

    // cpBar listener
    result.cpBar!.click();
    expect(result.settings.isBarVisible).toBe(result.cpBar!.checked);
    expect(nObsSpy).toBeCalledWith(settings);
    // cpBar listener end

    // cpTips listener
    result.cpTips!.click();
    expect(result.settings.isTooltipsVisible).toBe(result.cpTips!.checked);
    expect(nObsSpy).toBeCalledWith(settings);
    // cpTips listener end
  });
});