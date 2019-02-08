let esprima = require('esprima')
let escodegen = require('escodegen')
/**
 * arc-proxy-plugin-urls
 *
 * prepends mjs import declarations with /staging or /production
 *
 * // input
 * import foo from '/bar'
 *
 * // output
 * import foo from '/staging/bar'
 *
 * @param Key - the requested S3 Key
 * @param File - the file contents {headers, body}
 * @returns File - the processed file contents {header, body}
 */
module.exports = function mjs(Key, {headers, body}) {
  let staging = 'staging'
  let production = 'production'
  let prefixing = Key.startsWith(staging) || Key.startsWith(production)
  if (prefixing) {
    let ast = esprima.parseModule(body, {}, function visit(node) {
      if (node.type === 'ImportDeclaration') {
        let env = Key.startsWith(staging)? staging : production
        let val = `/${env}${node.source.value}`
        node.source.value = val
      }
      return node
    })
    return {headers, body: escodegen.generate(ast)}
  }
  else {
    return {headers, body}
  }
}
