var bem = require("../lib")("my-module");

// Get the base class for the module.
console.log('base class ->', bem());

// Get the base class + modifier.
console.log('base class + modifier ->', bem(null, 'my-modifier'));
// or
console.log('base class + modifier ->', bem.m('my-modifier'));

// Get the base class with multuiple modifiers.
console.log('base class + modifiers ->', bem.m(['modifier-1', 'modifier-2']));

// Get an element class.
console.log('element class ->', bem('element'));

// Get a element + modifier.
console.log('element + modifier class ->', bem('element', 'modifier-1'));

// Elements also accept an array of modifiers.
console.log('base class + modifiers ->', bem('element', ['modifier-1', 'modifier-2']));
