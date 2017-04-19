'use strict';

function find_key( obj, val ) {
    var key;
    for( key in obj ) {
        if( obj.hasOwnProperty(key) && obj[key] === val) {
            return key;   
        }
    }
}
