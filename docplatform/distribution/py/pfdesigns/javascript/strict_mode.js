function foo() {
    var title = "Not the page title";
    with (document) {
        write(title + "\n");
        write("contains a with statement");
    }
};
