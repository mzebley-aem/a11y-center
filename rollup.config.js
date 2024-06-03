import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import litCss from 'rollup-plugin-lit-css';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/a11y-center.ts',
  output: {
    file: 'public/bundle.js',
    format: 'esm',
    sourcemap: true
  },
  plugins: [
    resolve(),
    typescript({
      tsconfig: './tsconfig.json'
    }),
    litCss(),
    terser()
  ]
};