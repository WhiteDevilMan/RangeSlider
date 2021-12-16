/* eslint-disable dot-notation */
/* eslint-disable no-shadow */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import { ISettings, ThumbName } from '../RangeSlider/types';
import Model from './Model';

let settings: ISettings;

beforeEach(() => {
  settings = {
    min: 0,
    max: 1500,
    isTwoRunners: true,
    isScaleVisible: true,
    isVertical: false,
    isTooltipsVisible: true,
    isConfPanel: true,
    isBarVisible: true,
    valueFrom: 1000,
    valueTo: 1490,
    step: 10,
  };
});

describe('private static validateSettings', () => {
  test('"settings.min >= settings.max" should throw Error', () => {
    settings.min = 2000;
    settings.max = 1500;

    const throwMessage = "'max' must be greater than 'min'";
    expect(() => Model['validateSettings'](settings)).toThrow(throwMessage);

    settings.min = 1000;
    settings.max = 1000;
    expect(() => Model['validateSettings'](settings)).toThrow(throwMessage);

    settings.min = 1000;
    settings.max = 1500;
    expect(() => Model['validateSettings'](settings)).not.toThrow(throwMessage);
  });

  test('"settings.valueFrom < settings.min" should throw Error', () => {
    settings.valueFrom = 700;
    settings.min = 1000;
    const throwMessage = "'valueFrom' must be greater than 'min'";
    expect(() => Model['validateSettings'](settings)).toThrow(throwMessage);

    settings.valueFrom = 1300;
    settings.min = 1000;
    expect(() => Model['validateSettings'](settings)).not.toThrow(throwMessage);
  });

  test('"settings.valueFrom > settings.valueTo" should throw Error', () => {
    settings.valueFrom = 1200;
    settings.valueTo = 1100;
    const throwMessage = "'valueFrom' must be less than 'valueTo'";
    expect(() => Model['validateSettings'](settings)).toThrow(throwMessage);

    settings.valueFrom = 1000;
    settings.valueTo = 1100;
    expect(() => Model['validateSettings'](settings)).not.toThrow(throwMessage);
  });

  test('settings.valueTo > settings.max should return valueTo = max', () => {
    settings.valueTo = 1200;
    settings.max = 1100;
    let validatedSettings = Model['validateSettings'](settings);
    expect(validatedSettings.valueTo).toBe(settings.max);

    settings.valueTo = 1200;
    settings.max = 1300;
    validatedSettings = Model['validateSettings'](settings);
    expect(validatedSettings.valueTo).toBe(settings.valueTo);
  });

  test('"settings.valueTo - settings.valueFrom < settings.step" should set valueFrom = valueTo - step', () => {
    settings.min = 200;
    settings.valueTo = 1400;
    settings.valueFrom = 1000;
    settings.step = 500;
    const value = settings.valueTo - settings.step;

    const result = Model['validateSettings'](settings);
    expect(result.valueFrom).toBe(value);
  });

  test('"settings.valueTo - settings.valueFrom < settings.step" should set valueTo = valueFrom + step', () => {
    settings.min = 1000;
    settings.valueTo = 1400;
    settings.valueFrom = 1000;
    settings.step = 500;
    const value = settings.valueFrom + settings.step;

    const result = Model['validateSettings'](settings);
    expect(result.valueTo).toBe(value);
  });
});

describe('function getThumbValue:', () => {
  test('if thumbName == "from" should return settings.valueFrom', () => {
    const thumbName: ThumbName = 'from';
    const result = settings.valueFrom;
    expect(Model['getThumbValue'](settings, thumbName)).toBe(result);
  });

  test('if thumbName == "to" should return settings.valueTo', () => {
    const thumbName: ThumbName = 'to';
    const result = settings.valueTo;
    expect(Model['getThumbValue'](settings, thumbName)).toBe(result);
  });
});

describe('public getSettings', () => {
  test('check returned object', () => {
    const model = new Model(settings);
    expect(model.getSettings()).toStrictEqual(settings);
  });
});

describe('public updateSettings', () => {
  test('should return the passed values', () => {
    const model = new Model(settings);
    expect(model.updateSettings(settings)).toStrictEqual(settings);
  });

  test('should change the settings', () => {
    settings.min = 100;
    const model = new Model(settings);
    const currentSettings = model.getSettings();

    settings.min = 200;
    expect(model.updateSettings(settings)).not.toStrictEqual(currentSettings);
  });
});
