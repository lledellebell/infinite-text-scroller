import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const banner = `/*!
 * Infinite Text Scroller v1.0.0
 * (c) ${new Date().getFullYear()} deep
 * Released under the MIT License
 */`;

export default [
  // ESM 빌드 (모던 번들러용)
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/index.js',
        format: 'umd',
        name: 'InfiniteTextScroller',
        exports: 'named'
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm'
      }
    ],
    plugins: [
      resolve(),
      babel({ babelHelpers: 'bundled' })
    ]
  },
  // UMD 빌드 (브라우저용, 압축됨)
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.js',
      format: 'umd',
      name: 'TextScrollerFactory',
      exports: 'named',
      sourcemap: true,
      banner
    },
    plugins: [resolve(), terser()]
  },
  // UMD 빌드 (디버그용, 압축 안됨)
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.debug.js',
      format: 'umd',
      name: 'TextScrollerFactory',
      exports: 'named',
      sourcemap: true,
      banner
    },
    plugins: [resolve()]
  }
];
