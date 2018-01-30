# Boxstore

Box to store everythings everywhere!

Tests : [![Build Status](https://travis-ci.org/kevinbalicot/boxstore.svg?branch=master)](https://travis-ci.org/kevinbalicot/boxstore)

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
