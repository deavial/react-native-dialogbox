import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
let pkg = require('./package.json');

export default {
  entry: 'lib/index.js',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ],
  external: Object.keys(pkg.dependencies),
  targets: [
    {
      dest: pkg['main'],
      format: 'es',
      exports: 'named',
      sourceMaps: false
    }
  ]
}
