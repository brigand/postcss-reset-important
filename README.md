# PostCSS Reset Important [![Build Status][ci-img]][ci]

[PostCSS] plugin for reseting all styles using !important, and making your own styles !important.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/brigand/postcss-reset-important.svg
[ci]:      https://travis-ci.org/brigand/postcss-reset-important

```css
.foo {
    /* Input example */
}
```

```css
.foo {
  /* Output example */
}
```

## Usage

```js
postcss([ require('postcss-reset-important') ])
```

See [PostCSS] docs for examples for your environment.
