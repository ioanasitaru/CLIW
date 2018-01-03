function set_score(module_name, score) {
    localStorage.setItem(module_name, score);
}

function get_score(module_name) {
    return localStorage.getItem(module_name);
}