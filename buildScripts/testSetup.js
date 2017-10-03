//this file isn't transpiled, so must use commonJS and ES5

//register babel to transpile before our test run.
require('babel-register')();

// Disable webpack features that mocha doesn't understand
require.extensions['.css'] =  () => null;
