
interface IEntityId {
    id: number;
}

class PostReview {
    content: string = '';
    rank: number = 0;
    account: IEntityId|undefined;
    game: IEntityId|undefined;
}

function generateForm(): void {
    const myBtn = document.querySelector('[data-dark-light]');
    if (myBtn) {
        const hiddenForm = document.createElement('form');
        hiddenForm.action = '#';
        hiddenForm.method = 'POST';
        hiddenForm.classList.add('mt-2');

        const div = document.createElement('div');
        div.classList.add('row');

        const inputUsername = document.createElement('textarea');
        inputUsername.classList.add('form-control');
        inputUsername.classList.add('col-6');
        inputUsername.name = 'content';
        inputUsername.placeholder = 'Content';
        inputUsername.setAttribute('required', 'required');
        div.appendChild(inputUsername);

        const inputPassword = document.createElement('input');
        inputPassword.classList.add('form-control');
        inputPassword.classList.add('col-6');
        inputPassword.type = 'text';
        inputPassword.name = 'rank';
        inputPassword.placeholder = 'Rank';
        inputPassword.setAttribute('required', 'required');
        div.appendChild(inputPassword);

        const inputUser = document.createElement('input');
        inputUser.classList.add('form-control');
        inputUser.classList.add('col-6');
        inputUser.type = 'number';
        inputUser.name = 'user[id]';
        inputUser.placeholder = 'ID User';
        inputUser.setAttribute('required', 'required');
        div.appendChild(inputUser);

        const inputGame = document.createElement('input');
        inputGame.classList.add('form-control');
        inputGame.classList.add('col-6');
        inputGame.type = 'number';
        inputGame.name = 'game[id]';
        inputGame.placeholder = 'ID Game';
        inputGame.setAttribute('required', 'required');
        div.appendChild(inputGame);

        const btnSubmit = document.createElement('button');
        btnSubmit.className = 'btn btn-dark col-3 mx-auto';
        btnSubmit.innerText = 'Envoyer';
        div.appendChild(btnSubmit);

        hiddenForm.appendChild(div);
        onSubmit(hiddenForm);

        myBtn.after(hiddenForm);
    }
}

function onSubmit(form: HTMLFormElement): void {
    form.addEventListener('submit', (e: SubmitEvent) => {
        e.preventDefault();
        const formData: FormData = new FormData(form);
        const review: PostReview = new PostReview();

        const dataContent: FormDataEntryValue|null = formData.get('content');
        if (typeof dataContent === "string") {
            review.content = dataContent;
        }

        const dataRank: FormDataEntryValue|null = formData.get('rank');
        if (typeof dataRank === "string") {
            review.rank = parseInt(dataRank);
        }

        const dataUserId: FormDataEntryValue|null = formData.get('user[id]');
        if (typeof dataUserId === "string") {
            review.account = {id: parseInt(dataUserId)};
        }

        const dataGameId: FormDataEntryValue|null = formData.get('game[id]');
        if (typeof dataGameId === "string") {
            review.game = {id: parseInt(dataGameId)};
        }

        fetch('https://steam-ish.test-02.drosalys.net/api/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review) // request body nécessaire pour la donnée à envoyer
        })
        .then((response: Response) => {
            if (response.status === 400) {
                // gestion d'erreur !
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
        });

        // => récupère les données du form sous un objet JSON de form "K,V"
        // où les keys sont les names des input du form
    });
}

window.addEventListener('load', () => {
    generateForm();
});

// const dataWeight: FormDataEntryValue|null = formData.get('weight');
// const dataHeight: FormDataEntryValue|null = formData.get('height');
// if (dataWeight && dataHeight) {
//     if (typeof dataWeight === "string" && typeof dataHeight === 'string') {
//         if (dataWeight.length > 0 && dataHeight.length > 0) {
//             const heightM: number = parseInt(dataHeight) / 100;
//             const imc: string = (parseInt(dataWeight) / (heightM * heightM)).toFixed(2);
//             alert('Votre IMC est de ' + imc);
//         }
//     }
// }