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
module.exports = function mjs(Key, {headers, body, isBase64Encoded=false}) {
  let prefixing = process.env.NODE_ENV != 'testing'
  if (prefixing) {
    let raw = isBase64Encoded? Buffer.from(body, 'base64').toString() : body
    let ast = esprima.parseModule(raw, {}, function visit(node) {
      if (node.type === 'ImportDeclaration') {
        let val = `/${process.env.NODE_ENV}${node.source.value}`
        node.source.value = val
      }
      return node
    })
    raw = escodegen.generate(ast)
    body = isBase64Encoded? Buffer.from(raw).toString('base64') : raw
  }
  return {headers, body, isBase64Encoded}
}
