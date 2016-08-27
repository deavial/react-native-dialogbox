import babel from 'rollup-plugin-babel';

let pkg = require('./package.json');

export default {
  entry: 'lib/index.js',
  external: Object.keys(pkg.dependencies),
  targets: [
    {
      dest: pkg['main'],
      format: 'es',
      sourceMaps: false
    }
  ]
}
