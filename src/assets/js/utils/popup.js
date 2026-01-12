/**
 * @author Luuxis
 * Luuxis License v1.0 (voir fichier LICENSE pour les détails en FR/EN)
 */

const { ipcRenderer } = require('electron');

export default class popup {
    constructor() {
        this.popup = document.querySelector('.popup');
        this.popupTitle = document.querySelector('.popup-title');
        this.popupContent = document.querySelector('.popup-content');
        this.popupOptions = document.querySelector('.popup-options');
        this.popupButton = document.querySelector('.popup-button');
    }

    openPopup(info) {
        this.popup.style.display = 'flex';
        if (info.background == false) this.popup.style.background = 'none';
        else this.popup.style.background = '#000000b3'
        this.popupTitle.innerHTML = info.title;
        this.popupContent.style.color = info.color ? info.color : '#e21212';
        this.popupContent.innerHTML = info.content;

        this.popupOptions.innerHTML = '';

        if (Array.isArray(info.options)) {
            this.popupOptions.style.display = 'flex';
            info.options.forEach(opt => {
                let btn = document.createElement('button');
                btn.className = 'popup-button';
                btn.textContent = opt.name;
                btn.addEventListener('click', () => {
                    if (opt.func) opt.func();
                    this.closePopup();
                });
                this.popupOptions.appendChild(btn);
            });
        } else if (info.options) {
            this.popupOptions.style.display = 'flex';
            let btn = document.createElement('button');
            btn.className = 'popup-button';
            btn.textContent = 'OK';
            btn.addEventListener('click', () => {
                if (info.exit) return ipcRenderer.send('main-window-close');
                this.closePopup();
            });
            this.popupOptions.appendChild(btn);
        } else {
            this.popupOptions.style.display = 'none';
        }
    }

    closePopup() {
        this.popup.style.display = 'none';
        this.popupTitle.innerHTML = '';
        this.popupContent.innerHTML = '';
        this.popupOptions.style.display = 'none';
    }
}