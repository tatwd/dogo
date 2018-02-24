// import resolve from 'rollup-plugin-node-resolve';
// import babel from 'rollup-plugin-babel';

export default {
  input: './index.js',
  output: [{
    format: 'es',
    file: './dist/dogo.js'
  }, {
    format: 'iife',
    name: 'dogo',
    file: './dist/dogo.iife.js'
  }],
  watch: {
    include: 'src/**'
  },
  // plugins: [
  //   resolve(),
  //   babel({
  //     exclude: 'node_modules/**'
  //   })
  // ]
}
