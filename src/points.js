import $ from 'jquery';

let body = $('body');
let overlay = null;

let points = [
    {
        position: [0, 0, 0],
        htmlID: 'person'
    }
]

export function init() {
    $(`#person`).hide();
}