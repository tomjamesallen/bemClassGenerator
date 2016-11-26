var bem = require("../lib")("my-module");

// Get the base class for the module.
console.log('base class ->', bem());
// -> 'my-module'

// Get the base class + modifier.
console.log('base class + modifier ->', bem(null, 'my-modifier'));
// -> 'my-module my-module--my-modifier'

// or
console.log('base class + modifier ->', bem.m('my-modifier'));
// -> 'my-module my-module--my-modifier'

// Get the base class with multuiple modifiers.
console.log('base class + modifiers ->', bem.m(['modifier-1', 'modifier-2']));
// -> 'my-module my-module--modifier-1 my-module--modifier-2'

// Get an element class.
console.log('element class ->', bem('element'));
// -> 'my-module__element'

// Get a element + modifier.
console.log('element + modifier class ->', bem('element', 'modifier-1'));
// -> 'my-module__element my-module__element--modifier-1'

// Elements also accept an array of modifiers.
console.log('base class + modifiers ->', bem('element', ['modifier-1', 'modifier-2']));
// -> 'my-module__element my-module__element--modifier-1 my-module__element--modifier-2'
