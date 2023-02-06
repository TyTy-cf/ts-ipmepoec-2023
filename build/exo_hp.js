"use strict";
class HarryPotterCharacters {
    constructor() {
        this._characters = [];
        this._elementByPage = 6;
        this._currentPage = 1;
    }
    get characters() {
        return this._characters;
    }
    set characters(value) {
        this._characters = value;
    }
    get elementByPage() {
        return this._elementByPage;
    }
    set elementByPage(value) {
        this._elementByPage = value;
    }
    get currentPage() {
        return this._currentPage;
    }
    set currentPage(value) {
        this._currentPage = value;
    }
    getCharactersPaginated() {
        return this.characters.slice((this.currentPage - 1) * this.elementByPage, this.elementByPage * this.currentPage);
    }
}
function initHarryPotter() {
    const hpCharacters = new HarryPotterCharacters();
    fetch('https://hp-api.onrender.com/api/characters')
        .then((response) => {
        if (response.status === 200) {
            return response.json();
        }
        return new Array();
    })
        .then((data) => {
        hpCharacters.characters = data;
        generateHtmlHarryPotter(hpCharacters);
    })
        .catch(e => {
        console.log(e);
    });
}
function generateHtmlHarryPotter(harryPotterCharacter) {
    const container = document.querySelector('div.container');
    if (container) {
        if (harryPotterCharacter.characters.length === 0) {
            const error = document.createElement('p');
            error.innerText = 'Patientez le temps que les données arrivent....';
            container.appendChild(error);
            return;
        }
        let divButtons = document.querySelector('[data-container-buttons]');
        let divContainerCharacter = document.querySelector('[data-container]');
        if (divButtons) {
            divButtons.remove();
        }
        if (divContainerCharacter) {
            divContainerCharacter.remove();
        }
        divButtons = document.createElement('div');
        divButtons.classList.add('d-flex');
        divButtons.classList.add('justify-content-between');
        divButtons.setAttribute('data-container-buttons', '');
        const buttonPrevious = document.createElement('button');
        buttonPrevious.innerText = 'Previous';
        buttonPrevious.classList.add('btn');
        buttonPrevious.classList.add('btn-warning');
        buttonPrevious.addEventListener('click', () => {
            if (harryPotterCharacter.currentPage > 1) {
                harryPotterCharacter.currentPage--;
            }
            generateHtmlHarryPotter(harryPotterCharacter);
        });
        const buttonNext = document.createElement('button');
        buttonNext.innerText = 'Next';
        buttonNext.classList.add('btn');
        buttonNext.classList.add('btn-warning');
        buttonNext.addEventListener('click', () => {
            const length = harryPotterCharacter.characters.length / harryPotterCharacter.elementByPage;
            if (harryPotterCharacter.currentPage <= Math.ceil(length)) {
                harryPotterCharacter.currentPage++;
            }
            generateHtmlHarryPotter(harryPotterCharacter);
        });
        divButtons.appendChild(buttonPrevious);
        divButtons.appendChild(buttonNext);
        divContainerCharacter = document.createElement('div');
        divContainerCharacter.classList.add('row');
        divContainerCharacter.classList.add('mt-5');
        divContainerCharacter.setAttribute('data-container', '');
        for (const hpCharacter of harryPotterCharacter.getCharactersPaginated()) {
            const cardHP = document.createElement('div');
            cardHP.classList.add('col-4');
            const image = document.createElement('img');
            image.src = hpCharacter.image;
            image.classList.add('img-fluid');
            const name = document.createElement('p');
            name.innerText = hpCharacter.name;
            name.classList.add('text-center');
            cardHP.appendChild(image);
            cardHP.appendChild(name);
            divContainerCharacter.appendChild(cardHP);
        }
        container.appendChild(divButtons);
        container.appendChild(divContainerCharacter);
    }
}
window.addEventListener('load', () => {
    initHarryPotter();
});
//# sourceMappingURL=exo_hp.js.map