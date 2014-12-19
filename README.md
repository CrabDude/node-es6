node-es6
========

A `node --harmony` executable with full traceur compilation using

* `.traceurrc` via the [rc module](https://www.npmjs.org/package/rc)
* [traceur-source-maps](https://www.npmjs.org/package/traceur-source-maps) for source-mapped stack traces

#Install

```
$ npm install -g node-es6
```

#Run

```js
// index.js
let helloWorld = 'hello world'
console.log(hello)
```

```
$ node-es6 index.js
hello world

$ node-es6
traceur> let a = 'hello'; console.log(`${a}`)
hello
```
