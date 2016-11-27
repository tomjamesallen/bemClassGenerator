// eslint-disable-next-line import/no-extraneous-dependencies
import { expect } from 'chai';
import bemClassGenerator from '../src/index';

const BASE_CLASS = 'my-module';
const BASE_MODIFIER = 'modifier-1';
const BASE_MODIFIER_2 = 'modifier-2';
const EL = 'element-1';
const EL_MODIFIER = 'el1-modifier';
const EL_MODIFIER_2 = 'el1-modifier-2';

describe('bemClassGenerator', () => {
  describe('returnBaseEl: false', () => {
    const bem = bemClassGenerator(BASE_CLASS, { returnBaseEl: false });

    it('it should return the base class', () => {
      expect(bem()).to.equal(BASE_CLASS);
    });
    it('it should accept an element', () => {
      expect(bem(EL)).to.equal(`${BASE_CLASS}__${EL}`);
    });
    it('it should accept an element and a modifier', () => {
      expect(bem(EL, EL_MODIFIER)).to.equal(`${BASE_CLASS}__${EL}--${EL_MODIFIER}`);
    });
    it('it should accept a null element and a modifier', () => {
      expect(bem(null, EL_MODIFIER)).to.equal(`${BASE_CLASS}--${EL_MODIFIER}`);
    });
    it('its `m` method should output the same as if we\'d passed a null value to the first argument of the main API', () => {
      expect(bem.m(EL_MODIFIER)).to.equal(`${BASE_CLASS}--${EL_MODIFIER}`);
    });
    describe('`e` method', () => {
      it('its `e` method should return a function', () => {
        expect(typeof bem.e()).to.equal('function');
      });
      it('the returned function should return the element with an optional modifier', () => {
        const el = bem.e(EL);
        expect(el()).to.equal(`${BASE_CLASS}__${EL}`);
        expect(el(EL_MODIFIER)).to.equal(`${BASE_CLASS}__${EL}--${EL_MODIFIER}`);
      });
    });
  });

  describe('returnBaseEl: true', () => {
    const bem = bemClassGenerator(BASE_CLASS, { returnBaseEl: true });

    it('it should create return the base class', () => {
      expect(bem()).to.equal(BASE_CLASS);
    });
    it('it should accept an element', () => {
      expect(bem(EL)).to.equal(`${BASE_CLASS}__${EL}`);
    });
    it('it should accept an element and a modifier', () => {
      expect(bem(EL, EL_MODIFIER)).to.equal(`${BASE_CLASS}__${EL} ${BASE_CLASS}__${EL}--${EL_MODIFIER}`);
    });
    it('it should accept a null element and a modifier', () => {
      expect(bem(null, EL_MODIFIER)).to.equal(`${BASE_CLASS} ${BASE_CLASS}--${EL_MODIFIER}`);
    });
    it('its `m` method should output the same as if we\'d passed a null value to the first argument of the main API', () => {
      expect(bem.m(EL_MODIFIER)).to.equal(`${BASE_CLASS} ${BASE_CLASS}--${EL_MODIFIER}`);
    });
    describe('it should accept an array of modifiers', () => {
      it('modify block', () => {
        expect(bem.m([BASE_MODIFIER, BASE_MODIFIER_2])).to.equal(
          `${BASE_CLASS} ${BASE_CLASS}--${BASE_MODIFIER} ${BASE_CLASS}--${BASE_MODIFIER_2}`
        );
      });
      it('modify element', () => {
        expect(bem(EL, [EL_MODIFIER, EL_MODIFIER_2])).to.equal(
          `${BASE_CLASS}__${EL} ${BASE_CLASS}__${EL}--${EL_MODIFIER} ${BASE_CLASS}__${EL}--${EL_MODIFIER_2}`
        );
      });
    });
    describe('`e` method', () => {
      it('its `e` method should return a function', () => {
        expect(typeof bem.e()).to.equal('function');
      });
      it('the returned function should return the element with an optional modifier', () => {
        const el = bem.e(EL);
        expect(el()).to.equal(`${BASE_CLASS}__${EL}`);
        expect(el(EL_MODIFIER)).to.equal(`${BASE_CLASS}__${EL} ${BASE_CLASS}__${EL}--${EL_MODIFIER}`);
      });
    });
  });
});
