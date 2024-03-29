# Boxstore

Box to store every thing everywhere!

Tests : [![Dev CI](https://github.com/kevinbalicot/boxstore/actions/workflows/dev.yml/badge.svg)](https://github.com/kevinbalicot/boxstore/actions/workflows/dev.yml)

## Installation

```
$ npm install --save boxstore 
```

## Usage

```javascript
const boxstore = require('boxstore');

// Define box content
boxstore.set({
    foo: 'bar',
    bar: 'foo'
});

// Add something
boxstore.add('something', { apple: 'green' });

boxstore.get('foo') // => 'bar'
boxstore.get('bar') // => 'foo'
boxstore.get('something') // => { apple: 'green' }
```

```javascript
const boxstore = require('boxstore');

boxstore.set({
    level1: {
        level2: {
            level3: 'foo'
        }
    }
});

boxstore.get('level1'); // { level2: { level3: 'foo' }}
boxstore.get('level1.level2'); // { level3: 'foo' }
boxstore.get('level1.level2.level3'); // 'foo'

boxstore.search('level3'); // 'foo'

```

## Options

Immutable

```javascript
const boxstore = require('boxstore');

boxstore.set({ foo: 'bar' }, { immutable: true }); // Ok

boxstore.set({ bar: 'foo' }); // Throw Error, content can't change because box is immutable
```

## Test

```
npm test
```
