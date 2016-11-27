import blockNameFromFile from './blockNameFromFile';

const defaultOptions = {
  // Whether to return the block or element class name as well as the modified
  // block or element class.
  returnBaseEl: true,

  // Whether to return an array of classnames. If false, will return a space
  // separated string of class names.
  returnArray: false,

  // Whether to automatically convert module names, file names and file paths to
  // block safe dash-case name.
  convertToBlockName: true,

  // An optional custom file extension to use when extracting a block name from
  // a file name or file path.
  customFileExtension: null,
};

const bemClassGenerator = (bInput = '', userOptions = {}) => {
  const options = {
    ...defaultOptions,
    ...userOptions,
  };

  const b = options.convertToBlockName ?
    blockNameFromFile(bInput, options.customFileExtension) :
    bInput;

  const genB = () => b;
  const genE = e => (e ? `__${e}` : '');
  const genM = m => (m ? `--${m}` : '');

  const genI = (e = null, m = null) => `${genB()}${genE(e)}${genM(m)}`;

  // Main API.
  function gen(e, m) {
    const modifiers = Array.isArray(m) ? m : (m ? [m] : []);
    const isBase = !m || (Array.isArray(m) && !m.length);
    const baseClassArr = (options.returnBaseEl || isBase) ? [genI(e)] : [];
    const classnames = modifiers.reduce(
      (arr, modifier) => (modifier ? [...arr, genI(e, modifier)] : arr),
      baseClassArr
    );
    return options.returnArray ? classnames : classnames.join(' ');
  }

  // Helper function to skip the `e` component, for generating classes that
  // just have a modifier for the base class.
  gen.m = (m = null) => gen(null, m);

  // Generate a function that will output the element class, but can also be
  // re-called to change the modifer.
  gen.e = (e = null, m = null) => (newM = m) => gen(e, newM);

  return gen;
};

export default bemClassGenerator;
