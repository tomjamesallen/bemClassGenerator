// eslint-disable-next-line import/no-extraneous-dependencies
import { expect } from 'chai';
import { blockNameFromFile } from '../src/index';

describe('blockNameFromFile', () => {
  it('should convert a full pathname in pascal case to a block name', () => {
    expect(blockNameFromFile('/src/js/components/MyComponent.js')).to.equal('my-component');
  });

  it('should convert a full pathname in dash-case to a block name', () => {
    expect(blockNameFromFile('/src/js/components/my-component.js')).to.equal('my-component');
  });

  it('should convert a filename in pascal case to a block name', () => {
    expect(blockNameFromFile('MyComponent.js')).to.equal('my-component');
  });

  it('should convert a filename in dash-case case to a block name', () => {
    expect(blockNameFromFile('my-component.js')).to.equal('my-component');
  });

  it('should convert a filename in pascal case without an extension to a block name', () => {
    expect(blockNameFromFile('MyComponent')).to.equal('my-component');
  });

  it('should convert a filename in dash-case case without an extension to a block name', () => {
    expect(blockNameFromFile('my-component')).to.equal('my-component');
  });

  it('should remove a custom extension from a path and convert to block name', () => {
    expect(blockNameFromFile('MyComponent.react.jsx', 'react.jsx')).to.equal('my-component');
  });
});
