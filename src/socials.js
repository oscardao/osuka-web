import $ from 'jquery';

let socialLinks = [
    {
        name: 'Github',
        link: 'https://github.com/oscardao',
        faIcon: 'fa-github',
        hoverColor: '#333333',
    },
    {
        name: 'LinkedIn',
        link: 'https://www.linkedin.com/in/oscar-dao-52b983147/',
        faIcon: 'fa-linkedin-in',
        hoverColor: '#2867B2',
    },
    {
        name: 'Itch',
        link: 'https://osuka-creative.itch.io/',
        faIcon: 'fa-itch-io',
        hoverColor: '#fa5c5c',
    }
]

let container = $('#socials');
let defaultIconBackgroundColor = '#ffffff';

export function init() {
    let isFirst = true;

    socialLinks.forEach(element => {
        let button = $('<div class="socials-button"></div>');
        let icon = $('<div class="icon"></div>');

        button.hover(function () {
            icon.css("background-color", element.hoverColor);
        }, function () {
            icon.css("background-color", defaultIconBackgroundColor);
        });

        let span = $(`<span>${element.name}</span>`)
        span.css('color', element.hoverColor);

        icon.append(`<i class="fab ${element.faIcon}"></i>`);
        button.append(icon);
        button.append(span);
        container.append(button);
        /*< div class="socials-button" >
            <div class="icon">
                <i class="fab fa-linkedin-f"></i>
            </div>
            <span>Facebook</span>
        </div >*/
        //container.append("<p>Hi</p>");
    });
}
