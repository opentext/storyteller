function current_item() {
    var layout = window.stl.layout;
    return layout.elements[layout.elements.length-1];
}

exports.item = current_item;
