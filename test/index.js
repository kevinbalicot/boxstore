const assert = require('assert');
const boxstore = require('./../index');

describe('Have boxstore', () => {
    describe('Set box content', () => {
        boxstore._clear();

        it('shouldn\'t set array as box content', () => {
            assert.throws(() => boxstore.set(null), Error);
            assert.throws(() => boxstore.set([1, 2, 3]), Error);
            assert.throws(() => boxstore.set('foo'), Error);
        });

        it('should get something existing', () => {
            boxstore.set({ foo: 'bar' });
            assert.equal(boxstore.get('foo'), 'bar');
        });

        it('should get null for no existing thing', () => {
            assert.equal(boxstore.get('bar'), null);
        });

        it('should get someting into deep tree content', () => {
            boxstore.set({
                level1: {
                    level2: {
                        level3: 'foo'
                    }
                }
            });

            assert.deepEqual(boxstore.get('level1'), { level2: { level3: 'foo' }});
            assert.deepEqual(boxstore.get('level1.level2'), { level3: 'foo' });
            assert.equal(boxstore.get('level1.level2.level3'), 'foo');
        });

        it('should search something', () => {
            assert.deepEqual(boxstore.search('level1'), { level2: { level3: 'foo' }});
            assert.deepEqual(boxstore.search('level2'), { level3: 'foo' });
            assert.equal(boxstore.search('level3'), 'foo');
            assert.equal(boxstore.search('level4'), null);
        });
    });

    describe('Add something into box', () => {
        it('should get this thing', () => {
            const expected = 'green';
            boxstore.add('apple', expected);

            assert.equal(expected, boxstore.get('apple'));
        });
    });

    describe('Set immutable box content', () => {
        boxstore._clear();

        it('shouldn\'t set another content', () => {
            boxstore.set({ car: 'red' }, { immutable: true });
            assert.throws(() => boxstore.set({ car: 'blue' }), Error);
            assert.throws(() => boxstore.set({ car: 'green' }, { immutable: false }), Error);
            assert.throws(() => boxstore.set({ car: 'yellow' }), Error);
        });

        it('shouldn\'t add something already existing', () => {
            boxstore.add('taxi', 'yello');
            assert.throws(() => boxstore.add('taxi', 'red'), Error);
            assert.throws(() => boxstore.add('car', 'blue'), Error);
        });
    });
});
