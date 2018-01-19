var postcss = require('postcss');

module.exports = postcss.plugin('postcss-reset-important', function (opts) {
    opts = opts || {};

    // Work with options here

    return function (root, result) {

        // Transform CSS AST here

    };
});
