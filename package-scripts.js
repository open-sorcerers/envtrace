module.exports = {
  scripts: {
    build: `rollup -c rollup.config.js`,
    test: `jest`,
    run: {
      description: 'build and test against local fixture script',
      script: `nps build run.example.simple run.example.complex run.example.array`,
      example: {
        simple: `DEBUG=example node example.js`,
        complex: `DEBUG=example:* node example-complex.js`,
        array: `DEBUG=example:* node example-complex-array.js`
      }
    }
  }
}
