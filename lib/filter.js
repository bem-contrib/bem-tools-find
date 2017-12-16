'use strict';
var path = require('path');

function Filter(criteria) {
    this._criteria = criteria;
}

Filter.prototype = {
    /**
     * Applies all filter criteria to given items
     * @param {Object} item - BEM entity object
     * @returns {Boolean}
     */
    apply : function(item) {
        return this._byLevel(item) &&
            this._byBlock(item) &&
            this._byElement(item) &&
            this._byModifier(item) &&
            this._byTech(item);
    },

    /**
     * Applies level criteria
     * @param {Object} item - BEM entity object
     * @returns {Boolean}
     * @private
     */
    _byLevel : function(item) {
        return this._shouldPass(item, 'levels', function(level) {
            return path.resolve(level) === path.resolve(item.cell.layer);
        });
    },

    /**
     * Applies block criteria
     * @param {Object} item - BEM entity object
     * @returns {Boolean}
     * @private
     */
    _byBlock : function(item) {
        return this._shouldPass(item, 'blocks', function(block) {
            return block === item.cell.block;
        });
    },

    /**
     * Applies element criteria
     * @param {Object} item - BEM entity object
     * @returns {Boolean}
     * @private
     */
    _byElement : function(item) {
        return this._shouldPass(item, 'elements', function(elem) {
            return elem === item.cell.elem;
        });
    },

    /**
     * Applies modifier criteria
     * @param {Object} item - BEM entity object
     * @returns {Boolean}
     * @private
     */
    _byModifier : function(item) {
        return this._shouldPass(item, 'modifiers', function(mod) {
            return item.cell.mod && mod === item.cell.mod.name;
        });
    },

    /**
     * Applies tech criteria
     * @param {Object} item - BEM entity object
     * @returns {Boolean}
     * @private
     */
    _byTech : function(item) {
        return this._shouldPass(item, 'techs', function(tech) {
            return tech === item.cell.tech;
        });
    },

    /**
     * Determines should item pass or not
     * @param {Object} item - BEM entity object
     * @param {String} optsField - name of option field
     * @param {String} matchFn - function for matching
     * @returns {Boolean}
     * @private
     */
    _shouldPass : function(item, optsField, matchFn) {
        var opts = this._criteria[optsField];
        return !opts || !opts.length || opts.some(matchFn);
    }
};

module.exports = Filter;
