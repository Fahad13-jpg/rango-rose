/* eslint-disable @typescript-eslint/no-require-imports -- Isolated server-render tests use the TypeScript compiler API. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
function load(file, env = {}) {
  const source = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  const testModule = { exports: {} };
  const context = { module: testModule, exports: testModule.exports, process: { env }, AbortSignal,
    require(name) { if (name === '@/components/Icon') return load('components/Icon.tsx', env); return require(name); } };
  vm.createContext(context); vm.runInContext(code, context); return testModule.exports;
}
test('unconfigured contact and newsletter never present a fake submission form', () => {
  const contact = renderToStaticMarkup(React.createElement(load('components/ContactForm.tsx').default));
  const newsletter = renderToStaticMarkup(React.createElement(load('components/Newsletter.tsx').default));
  assert.match(contact, /Online messages are coming soon/); assert.doesNotMatch(contact, /<form/);
  assert.match(newsletter, /Newsletter signups will open soon/); assert.doesNotMatch(newsletter, /<form/);
});
test('configuring the public API restores both real forms', () => {
  const env = { NEXT_PUBLIC_API_URL: 'https://api.example.test/' };
  for (const file of ['ContactForm.tsx', 'Newsletter.tsx']) {
    const html = renderToStaticMarkup(React.createElement(load('components/' + file, env).default));
    assert.match(html, /<form/); assert.match(html, /type="submit"/);
  }
});
test('catalog safely handles missing, invalid and failing APIs, empty lists, malformed and real data', async () => {
  const source = fs.readFileSync(path.join(__dirname, '../app/shop/page.tsx'), 'utf8');
  const ast = ts.createSourceFile('shop.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const fn = ast.statements.find(node => ts.isFunctionDeclaration(node) && node.name.text === 'getProducts');
  const code = ts.transpileModule(fn.getText(ast), { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText;
  async function run(env, fetch) { const context = { process: { env }, fetch, URL, AbortSignal }; vm.createContext(context); return vm.runInContext(code + ';getProducts()', context); }
  const env = { NEXT_PUBLIC_API_URL: 'https://api.example.test/' };
  const unexpected = () => { throw Error('unexpected request'); };
  assert.equal(await run({}, unexpected), null);
  assert.equal(await run({ NEXT_PUBLIC_API_URL: 'invalid' }, unexpected), null);
  assert.equal(await run(env, async () => ({ ok: false })), null);
  assert.equal(await run(env, async () => { throw Error('offline'); }), null);
  assert.equal(await run(env, async () => ({ ok: true, json: async () => [null] })), null);
  assert.equal(JSON.stringify(await run(env, async () => ({ ok: true, json: async () => [] }))), '[]');
  const products = [{ id: 1, title: 'Rose Milk', description: 'Milk and rose', price: '24.00', imageSrc: null, badge: '' }];
  const actual = await run(env, async (url, options) => { assert.equal(url.href, 'https://api.example.test/api/products/'); assert.equal(options.next.revalidate, 60); return { ok: true, json: async () => products }; });
  assert.equal(JSON.stringify(actual), JSON.stringify(products));
});
