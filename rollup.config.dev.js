import resolve from 'rollup-plugin-node-resolve'

// es bundle which includes rx for easy demo/testing
export default {
  input: 'src/index.js',
  output: {
    name:     'rxstatestore',
    exports:  'named',
    file:     'demo/rxstatestore.js',
    format:   'es'
  },
  plugins: [resolve({
    customResolveOptions: {
      moduleDirectory: 'node_modules'
    }
  })]
}