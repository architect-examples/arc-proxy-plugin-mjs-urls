module.exports = {
  Key: 'cat.js',
  config: { 
    bucket: { staging: 'futz-staging', production: 'futz-prod' },
     plugins: { html: [], js: [] } },
  defaults:
   { headers:
      { 'content-type': 'application/javascript',
        'cache-control': 'max-age=86400',
        ETag: '"e547b6b18e8167daf1f9c6a1a3097a69"' },
     body: 'ZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2F0KHtrZXksIG5hbWV9KSB7CiAgcmV0dXJuIGA8bGk+CiAgICAke25hbWV9CiAgICA8YnV0dG9uIAogICAgICBkYXRhLWFjdGlvbj1kZXN0cm95IAogICAgICBkYXRhLWtleT0ke2tleX0+ZGVzdHJveTwvYnV0dG9uPgogIDwvbGk+YAp9Cg==',
     isBase64Encoded: true } }
