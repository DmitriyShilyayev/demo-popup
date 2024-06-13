let openPopupElem = document.querySelector('.popup-button');
let popupContentObj = {
    'login-window': {
        header: 'Войти в систему',
        body: [
            {
                type: 'text-field',
                name: 'email-phone',
                placeholder: 'Email/Телефон',
            },
            {
                type: 'password',
                name: 'password',
                placeholder: 'Пароль',
            },
            {
                type: 'checkbox',
                name: 'remember-password',
                label: 'Запомнить пароль',
            },
            {
                type: 'link',
                text: 'Восстановить',
                title: 'Восстановить',
                href: '#',
            },
        ],
        footer: [
            { class: 'primary', text: 'Войти' },
            { class: 'secondary', text: 'Зарегистрироваться' },
        ],
    },
};

if (openPopupElem) {
    let bodyElem = document.querySelector('body');
    let closePopupElems = document.querySelectorAll('.close-popup');
    let popupContentElem = document.querySelector('.popup .popup-content');

    openPopupElem.addEventListener('click', openPopup);
    closePopupElems.forEach((elem) =>
        elem.addEventListener('click', closePopup)
    );

    function openPopup(event) {
        let popupContentKey = event.target.attributes['popupContent'].value;
        let contentObj = popupContentObj[popupContentKey];
        let popupContentStr = '';
        if (contentObj.header && contentObj.header.length) {
            popupContentStr += renderHeader(contentObj.header);
        }
        if (contentObj.body && contentObj.body.length) {
            popupContentStr += renderBody(contentObj.body);
        }
        if (contentObj.footer && contentObj.footer.length) {
            popupContentStr += renderFooter(contentObj.footer);
        }
        popupContentElem.innerHTML = popupContentStr;
        bodyElem.classList.add('open-popup');
    }

    function closePopup() {
        bodyElem.classList.remove('open-popup');
    }

    function renderHeader(title) {
        return `<div class="popup-header"><h2 class="popup-title">${title}</h2></div>`;
    }

    function renderBody(itemsObj) {
        let result = '<div class="popup-body">';
        itemsObj.forEach((item) => {
            let id = Math.floor(Math.random() * 100);
            switch (item.type) {
                case 'text':
                    result += `<div class="popup-text"><p> ${item.text}</p></div>`;
                    break;
                case 'text-field':
                case 'email':
                case 'number':
                case 'tel':
                case 'password':
                    result += `<div class="popup-input ${item.type}">`;
                    if (item.label) {
                        result += `<label for="${item.name + '_' + id}">${
                            item.label
                        }</label>`;
                    }
                    result += `<input
                        id="${item.name + '_' + id}"
                        type="${
                            item.type === 'text-field' ? 'text' : item.type
                        }"
                        name="${item.name}"
                        title="${item.title ? item.title : ''}"
                        value="${item.value ? item.value : ''}"
                        placeholder="${
                            item.placeholder ? item.placeholder : ''
                        }"/>`;
                    result += `</div>`;
                    break;
                case 'radio':
                case 'checkbox':
                    result += `<div class="popup-input ${item.type}">
                            <label>
                                <input type="${item.type}" name="${item.name}"/>
                                ${item.label}
                            </label>
                        </div>`;
                    break;
                case 'link':
                    result += `<div class="popup-link">
                            <a href="${item.href}"
                                title="${item.title ? item.title : ''}">
                                ${item.text}
                            </a>
                        </div>`;
                    break;
            }
        });
        result += '</div>';
        return result;
    }

    function renderFooter(itemsObj) {
        let result = '<div class="popup-footer">';
        itemsObj.forEach((item) => {
            result += `<div class="popup-button"><button type="button" class="button ${item.class}">${item.text}</button></div>`;
        });
        result += '</div>';
        return result;
    }
}
