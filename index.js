
class Boxstore {
    constructor() {
        this._items = null;
        this.immutable = false;
    }

    /**
     * Set box content
     * @param {object} items
     * @param {object} [options={}]
     * @param {boolean} [options.immutable=false] Set box content immutable
     */
    set(items, { immutable } = {}) {
        if (this.immutable && null !== this._items) {
            throw new Error('Content can\'t change because box is immutable.');
        }

        if (typeof items !== 'object' || Array.isArray(items) || null === items) {
            throw new Error('Items has to be an object.');
        }

        this._items = items;

        if (!!immutable && !this.immutable) {
            this.immutable = immutable;
        }
    }

    /**
     * Add item into box
     * @param {string} name
     * @param {*} value
     */
    add(name, value) {
        if (this.immutable && !!this._items[name]) {
            throw new Error('Can\'t add item because it already exists and box is immutable.');
        }

        this._items[name] = value;
    }

    /**
     * Get item from box
     * @param {string} name
     * @param {*} [def=null] default value
     *
     * @return {*|null}
     */
    get(name, def = null) {
        const levels = name.split('.');

        let last = this._items;
        for (let i = 0; i < levels.length; i++) {
            if (null === last) {
                break;
            }

            last = last[levels[i]] !== undefined ? last[levels[i]] : def;
        }

        return last;
    }

    /**
     * Search something into tree
     * @param {string} name
     * @param {object} [tree=null]
     *
     * @return {*}
     */
    search(name, tree = null) {
        tree = null !== tree ? tree : this._items;

        let nodes = [];
        for (let prop in tree) {
            if (prop === name) {
                return tree[prop];
            }

            if (
                typeof tree[prop] === 'object' &&
                !Array.isArray(tree[prop]) &&
                null !== tree[prop]
            ) {
                nodes.push(tree[prop]);
            }
        }

        let search = null;
        for (let i = 0; i < nodes.length; i++) {
            search = this.search(name, nodes[i]);

            if (!!search) {
                return search;
            }
        }

        return null;
    }

    /**
     * Set items
     * @param {object} items
     */
    set items(items) {
        this._items = items;
    }

    /**
     * Get items
     * @return {object}
     */
    get items() {
        return this._items;
    }

    /**
     * @private
     */
    _clear() {
        this._items = null;
        this.immutable = false;
    }
}

if (typeof window != 'undefined' && window) {
    window.boxstore = new Boxstore();
} else if (typeof module !== 'undefined' && module.exports) {
    module.exports = new Boxstore();
}
