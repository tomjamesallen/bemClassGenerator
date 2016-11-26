const defaultOptions = {
  // Whether to return the block or element class name as well as the modified
  // block or element class.
  returnBaseEl: true,

  // Whether to return an array of classnames. If false, will return a space
  // separated string of class names.
  returnArray: false,
};

const bemClassGenerator = (b = '', userOptions = {}) => {
  const options = {
    ...defaultOptions,
    ...userOptions,
  };
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
