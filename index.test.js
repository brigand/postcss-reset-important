var postcss = require('postcss');

var plugin = require('./');

function run(input, output, opts) {
  return postcss([ plugin(opts) ]).process(input, { from: undefined })
    .then(result => {
      expect(result.warnings().length).toBe(0);
      if (output) {
        expect(result.css).toEqual(output);
      } else {
        expect(result.css).toMatchSnapshot();
      }
      return result.css;
    });
}

it('does basic reset', async () => {
  const css = await run('a{ }', null, { });
  expect(css).toMatch(/inherit/);
  expect(css).toMatch(/!important/);
});

it('no reset with reset: false', async () => {
  const css = await run('a{ reset: false }', null, { });
  expect(css).not.toMatch(/inherit/);
});

it('adds important to own classes', async () => {
  const css = await run('a{ color: red; }', null, { });
  expect(css).toMatch(/color: red !important/);
});

