
interface IHarryPotterCharacter {
    name: string;
    image: string;
    wizard: boolean;
}

class HarryPotterCharacters {

    private _characters: IHarryPotterCharacter[] = [];
    private _elementByPage: number = 6;
    private _currentPage: number = 1;

    get characters(): IHarryPotterCharacter[] {
        return this._characters;
    }

    set characters(value: IHarryPotterCharacter[]) {
        this._characters = value;
    }

    get elementByPage(): number {
        return this._elementByPage;
    }

    set elementByPage(value: number) {
        this._elementByPage = value;
    }

    get currentPage(): number {
        return this._currentPage;
    }

    set currentPage(value: number) {
        this._currentPage = value;
    }

    getCharactersPaginated(): IHarryPotterCharacter[] {
        return this.characters.slice((this.currentPage - 1) * this.elementByPage, this.elementByPage * this.currentPage);
    }

}

function initHarryPotter(): void {
    const hpCharacters: HarryPotterCharacters = new HarryPotterCharacters();

    fetch('https://hp-api.onrender.com/api/characters')
    .then((response: Response) => {
        if (response.status === 200) {
            return response.json() as Promise<IHarryPotterCharacter[]>;
        }
        return new Array<IHarryPotterCharacter>();
    })
    .then((data: IHarryPotterCharacter[]) => {
        hpCharacters.characters = data;
        generateHtmlHarryPotter(hpCharacters);
    })
    .catch(e => {
        console.log(e);
    });
}

function generateHtmlHarryPotter(harryPotterCharacter: HarryPotterCharacters): void {
    const container: HTMLDivElement|null = document.querySelector('div.container');
    if (container) {
        if (harryPotterCharacter.characters.length === 0) {
            const error: HTMLParagraphElement = document.createElement('p');
            error.innerText = 'Patientez le temps que les données arrivent....';
            container.appendChild(error);
            return;
        }

        let divButtons: HTMLDivElement|null = document.querySelector('[data-container-buttons]');
        let divContainerCharacter: HTMLDivElement|null = document.querySelector('[data-container]');
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

        const buttonPrevious: HTMLButtonElement = document.createElement('button');
        buttonPrevious.innerText = 'Previous';
        buttonPrevious.classList.add('btn');
        buttonPrevious.classList.add('btn-warning');
        buttonPrevious.addEventListener('click', () => {
            if (harryPotterCharacter.currentPage > 1) {
                harryPotterCharacter.currentPage--;
            }
            generateHtmlHarryPotter(harryPotterCharacter);
        });

        const buttonNext: HTMLButtonElement = document.createElement('button');
        buttonNext.innerText = 'Next';
        buttonNext.classList.add('btn');
        buttonNext.classList.add('btn-warning');
        buttonNext.addEventListener('click', () => {
            const length: number = harryPotterCharacter.characters.length / harryPotterCharacter.elementByPage;
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
            const cardHP: HTMLDivElement = document.createElement('div');
            cardHP.classList.add('col-4');

            const image: HTMLImageElement = document.createElement('img');
            image.src = hpCharacter.image;
            image.classList.add('img-fluid');

            const name: HTMLParagraphElement = document.createElement('p');
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