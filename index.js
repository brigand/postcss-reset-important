const postcss = require('postcss');

function addReset(props, rule, noImportant, before = null) {
  Object.keys(props).reverse().map((key) => {
    const obj = { prop: key, value: props[key], important: !noImportant };
    if (before) {
      rule.insertBefore(before, obj);
    } else {
      rule.prepend(obj);
    }
  });
}

module.exports = postcss.plugin('postcss-reset-important', function (opts) {
  opts = opts || {};

  const requireExplicit = !!opts.requireExplicit;
  const noImportant = !!opts.noImportant;
  const props = opts.props || {
    color: 'inherit',
    margin: '0',
    padding: '0',
    border: '0',
    'font-size': '100%',
    font: 'inherit',
    'vertical-align': 'baseline',
  };

  let doReset = !requireExplicit;

  const transform = (css) => {
    css.walkRules((rule) => {
      let didReset = false;
      let doReset = !requireExplicit;
      const unsetProps = Object.assign({}, props);
      rule.walkDecls((decl, i) => {
        // reset may be true or false
        if (decl.prop === 'reset') {
          if (decl.value === 'false') {
            doReset = false;
          }
          if (decl.value === 'true') {
            doReset = true;
          }
          if (doReset) {
            // Check the rest of the props so we can omit some resets
            rule.walkDecls((decl2) => {
              if (unsetProps[decl2.prop]) {
                delete unsetProps[decl2.prop];
              }
            });

            // Add the reset and store that we did it so it doesn't get added twice
            if (!didReset) {
              addReset(unsetProps, rule, noImportant, decl);
              didReset = true;
            }
          }
          decl.remove();
        }

        if (!noImportant) {
          decl.important = true;
        }

        if (unsetProps[decl.prop]) {
          delete unsetProps[decl.prop];
        }
      });

      if (doReset && !didReset) addReset(unsetProps, rule, noImportant, null);
    });
  };

  return transform;
});

