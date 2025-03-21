export function $(selector, all=false) {
    if (all) {
        return document.querySelectorAll(selector);
    } else {
        return document.querySelector(selector);
    }
}
