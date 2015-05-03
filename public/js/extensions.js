angular.module('Sudoku').filter('capitalize', function () {
    'use strict';
    return function (input) {
        return input.substring(0, 1).toUpperCase() + input.substring(1);
    };
});

Array.prototype.clone = function () {
    'use strict';
    return JSON.parse(JSON.stringify(this));
};

Object.prototype.exists = function (search) {
    'use strict';
    var i;
    for (i = 0; i < this.length; i++) {
        if (this[i] === search) {
            return true;
        }
    }
    return false;
};

Object.prototype.flip = function () {
    'use strict';
    //   example 1: array_flip( {a: 1, b: 1, c: 2} );
    //   returns 1: {1: 'b', 2: 'c'}
    //   example 2: ini_set('phpjs.return_phpjs_arrays', 'on');
    //   example 2: array_flip(array({a: 0}, {b: 1}, {c: 2}))[1];
    //   returns 2: 'b'

    var key;
    var tmpArr = {};

    for (key in this) {
        if (!this.hasOwnProperty(key)) {
            continue;
        }
        tmpArr[this[key]] = key;
    }

    return tmpArr;
};

Object.prototype.size = function () {
    'use strict';
    var size = 0;
    var key;

    for (key in this) {
        if (this.hasOwnProperty(key)) {
            size++;
        }
    }
    return size;
};

Math.precisionRound = function (num, numPrecision) {
    'use strict';
    var precision = Math.pow(10, numPrecision);
    return Math.round(num * precision) / precision;
};

(function () {
    'use strict';

    function _dynamicSortMultiple() {
        var props = arguments;
        return function (obj1, obj2) {
            var i = 0;
            var result = 0;
            var numberOfProperties = props.length;
            /* try getting a different result from 0 (equal)
             * as long as we have extra properties to compare
             */
            while (result === 0 && i < numberOfProperties) {
                result = _dynamicSort(props[i])(obj1, obj2);
                i++;
            }
            return result;
        };
    }

    function _dynamicSort(property) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1, property.length - 1);
        }
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        };
    }

    Array.prototype.sortBy = function () {
        return this.sort(_dynamicSortMultiple.apply(null, arguments));
    };
}());

angular.array2D = function (x, y) {
    'use strict';
    var i;
    var array2D = new Array(x);
    for (i = 0; i < array2D.length; i++) {
        array2D[i] = new Array(y);
    }

    return array2D;
};

//   example 1: str_pad('Kevin van Zonneveld', 30, '-=', 'STR_PAD_LEFT');
//   returns 1: '-=-=-=-=-=-Kevin van Zonneveld'
//   example 2: str_pad('Kevin van Zonneveld', 30, '-', 'STR_PAD_BOTH');
//   returns 2: '------Kevin van Zonneveld-----'
angular.strPad = function(input, pad_length, pad_string, pad_type) {
    var half = '';
    var pad_to_go;
    var str_pad_repeater = function (s, len) {
        var collect = '';
        var i;

        while (collect.length < len) {
            collect += s;
        }
        collect = collect.substr(0, len);

        return collect;
    };

    input += '';
    pad_string = pad_string !== undefined ? pad_string : ' ';

    if (pad_type !== 'STR_PAD_LEFT' && pad_type !== 'STR_PAD_RIGHT' && pad_type !== 'STR_PAD_BOTH') {
        pad_type = 'STR_PAD_RIGHT';
    }
    if ((pad_to_go = pad_length - input.length) > 0) {
        if (pad_type === 'STR_PAD_LEFT') {
            input = str_pad_repeater(pad_string, pad_to_go) + input;
        } else if (pad_type === 'STR_PAD_RIGHT') {
            input = input + str_pad_repeater(pad_string, pad_to_go);
        } else if (pad_type === 'STR_PAD_BOTH') {
            half = str_pad_repeater(pad_string, Math.ceil(pad_to_go / 2));
            input = half + input + half;
            input = input.substr(0, pad_length);
        }
    }

    return input;
};