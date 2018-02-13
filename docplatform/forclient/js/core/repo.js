function parse_fixtures(xml, handler) {
    var result = {};
    var parser = new DOMParser();
    var datadoc = parser.parseFromString(xml, "text/xml");

    var elements = datadoc.getElementsByTagNameNS('http://developer.opentext.com/schemas/storyteller/layout', 'fixture');
    for (var i = 0; i<elements.length; i++) {
        var el = elements[i];
        var key = el.getAttribute('key');
        var type = el.getAttribute('type');
        var encoding = el.getAttribute('encoding');
        var content = el.innerHTML;
        result[key] = { key: key, type: type, encoding: encoding, content: content };
    }
    return result;
}

function upload_fixture(key, type, encoding, content) {
    if (encoding === 'base64')
        content = window.atob(content);
    var blob = new Blob([content], {type: type});
    var url = URL.createObjectURL(blob);
    console.log(key, type, encoding, url);
    return { key: key, type: type, blob: blob, url: url };
}

function fixture_context(fixtures) {
    console.log(fixtures);

    function str2ab(bytestr) {
        var ab = new ArrayBuffer(bytestr.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < bytestr.length; i++)
            ia[i] = bytestr.charCodeAt(i);
        return ab;
    }

 	function get_data(key) {
        return fixtures[key].content;
	}

    function get_uri(key) {
        var fixture = fixtures[key];
        if (!fixture['uri']) {
            var content = fixture.encoding === 'base64' 
                ? str2ab(window.atob(fixture.content))
                : fixture.content;
            fixture.blob = new Blob([content], {type: fixture.type});
            fixture.url = URL.createObjectURL(fixture.blob);
            console.log(typeof content, fixture);
        }
        return fixture.url;
    }
 
	return { 
        get_data: get_data,
        get_uri: get_uri
    };
}

function assertEncoding(encoding) {
    if (encoding && !Buffer.isEncoding(encoding)) {
        throw new Error("Unknown encoding: '" + encoding + "'");
    }
}

//var xml = document.getElementById("stl-fixtures").textContent;
//var fixtures = parse_fixtures(xml, upload_fixture);
//var context = fixture_context(fixtures);

exports.load = function load_data(uri, encoding) {
    assertEncoding(encoding);
    if (encoding === undefined) {
        encoding = 'utf8';
    }
    if (encoding === 'utf8') {
        return context.get_data(uri);
    }
    var buffer = new Buffer(repo.load(uri, true));
    if (encoding) {
        buffer = buffer.toString(encoding);
    }
    return buffer;
};

exports.local_uri = function local_uri(uri) {
    return context.get_uri(uri);
};

exports.upload = function upload_data(data, encoding) {
    
};

