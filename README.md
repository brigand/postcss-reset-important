[PostCSS] plugin for reseting all styles using !important, and making your own styles !important.
Mostly useful for browser extension content scripts and their CSS.

[PostCSS]: https://github.com/postcss/postcss

```css
.foo {
  color: red;
}
```

```css
.foo {
  margin: 0 !important;
  /* bunch of other stuff */

  color: red !important;
}
```

## Usage

```js
postcss([
  require('postcss-reset-important'),
])
```

## Options

`requireExplicit: boolean`

Requires you to use the `reset` property to enable the transform for a rule. Defaults to `false`

`noImportant: boolean`

Doesn't use `!important` in the generated reset styles, and doesn't add it for your own styles.

## reset

The 'reset' property can be used to control the plugin. If `requireExplicit` isn't set, the default is `reset: true`.

You can explicitly define it like so:

```css
.foo {
  reset: true;
  color: red;
}
```

You can also disable the resets for an element.

```css
.foo {
  reset: false;
  color: red;
}
```

TODO: add extra reset options for various html tags that generate different resets.

