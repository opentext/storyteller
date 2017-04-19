// Copyright (c) 2016 Open Text. All Rights Reserved.
'use strict';

if (__bindings.functions.translate) {
    exports.translate = function lookup_translation(key, language) {
        language = language || __bindings.process.get('language');
        return __bindings.functions.translate(key, language);
    };
}
