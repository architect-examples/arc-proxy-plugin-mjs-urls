let test = require('tape')
let plugin = require('./index') // note package.json "main" points to dist
let mock = require('./mock')

test('env', t=> {
  t.plan(1)
  t.ok(plugin, 'exists')
})

test.only('isBase64Encoded', t=> {
  t.plan(1)
  let {Key, config, defaults} = mock
  let result = plugin(Key, defaults)
  t.ok(result, 'got result')
  console.log(result)
})

test('returns {body, headers}', t=> {
  t.plan(2)
  let Key = 'static/foo.mjs'
  let src = `
    import foo from '/bar'
    let baz = 6
  `
  let result = plugin(Key, {
    headers: {'content-type':'text/javascript;charset=utf8'},
    body: src
  })
  t.ok(result.headers, 'has headers')
  t.ok(result.body, 'has body')
  console.log(result)
})

test('adds staging prefix when Key starts with "staging"', t=> {
  t.plan(1)
  process.env.NODE_ENV = 'staging'
  let Key = 'staging/foo.mjs'
  let src = `
    import foo from '/bar'
    let baz = 6
  `
  let result = plugin(Key, {
    headers: {'content-type':'text/javascript;charset=utf8'},
    body: src
  })
  let snapshot = "import foo from '/staging"
  t.ok(result.body.startsWith(snapshot), 'prepended staging')
  console.log(result)
})

test('adds production prefix when Key starts with "production"', t=> {
  t.plan(1)
  process.env.NODE_ENV = 'production'
  let Key = 'production/foo.mjs'
  let src = `
    import foo from '/bar'
    let baz = 6
  `
  let result = plugin(Key, {
    headers: {'content-type':'text/javascript;charset=utf8'},
    body: src
  })
  let snapshot = "import foo from '/production"
  t.ok(result.body.startsWith(snapshot), 'prepended production')
  console.log(result)
})
