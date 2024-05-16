const { StyleCompiler }  = require ( '../lib/compile' );
/**
 * Script to test if the compiler is working fine with distinct configurations. 
 * @todo
 * - Add a test to check import and base styles. 
 */

let compiler;

beforeAll(() => {
  compiler = new StyleCompiler();
});

// Clean up 
afterAll(() => {
  compiler = null;
});

describe('StyleCompiler', () => {
  it('should compile successfully using default sass compiler', async () => {

    const styleString = `
      $primary-color: #00f;
      body {
        background-color: $primary-color;
      }
    `;
    const expectedCss = 'body{background-color:#00f}';

    const result = await compiler.make(styleString);

    expect(result).toBe(expectedCss);
  });

  it('should compile CSS correctly with PostCSS', async () => {
    const styleString = `
      body {
        background-color: #00f;
      }
    `;
    const expectedCss = 'body{background-color:#00f}';

    const result = await compiler.make(styleString);

    expect(result).toBe(expectedCss);
  });

  it('should minify CSS correctly', () => {
    const style = `
      body {
        background-color: #00f;
      }
    `;
    const expectedMinifiedCss = 'body{background-color:#00f}';

    const result = compiler.minify(style);

    expect(result).toBe(expectedMinifiedCss);
  });

  it('should return an empty string if input CSS is empty', () => {
    const style = '';

    const result = compiler.minify(style);

    expect(result).toBe('');
  });

  it('should catch errors', async () => {
    const styleString = 'invalid-sass-syntax';

    const result = await compiler.make(styleString);

    expect(result).toBe(false);
  });
});
