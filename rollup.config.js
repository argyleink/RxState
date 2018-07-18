import resolve from 'rollup-plugin-node-resolve'

// universal module of only this lib
export default {
  input: 'src/index.js',
  output: {
    name: 'rxstatestore',
    file: 'dist/index.js',
    format: 'umd'
  },
  plugins: [resolve({
    customResolveOptions: {
      moduleDirectory: 'node_modules'
    }
  })],
  external: [
    'rxjs',
    'rxjs/operators',
  ]
}