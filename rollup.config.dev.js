import resolve from 'rollup-plugin-node-resolve'

// es bundle which includes rx for easy demo/testing
export default {
  input: 'src/index.js',
  output: {
    name:     'RxState',
    exports:  'named',
    file:     'demo/rxstate.js',
    format:   'es'
  },
  plugins: [resolve({
    customResolveOptions: {
      moduleDirectory: 'node_modules'
    }
  })]
}