
function generateForm(): void {
   const myBtn = document.querySelector('[data-dark-light]');
   if (myBtn) {
      const hiddenForm = document.createElement('form');
      hiddenForm.action = '#';
      hiddenForm.method = 'POST';
      hiddenForm.classList.add('mt-2');

      const div = document.createElement('div');
      div.classList.add('row');

      const inputUsername = document.createElement('input');
      inputUsername.classList.add('form-control');
      inputUsername.classList.add('col-6');
      inputUsername.name = 'name';
      inputUsername.placeholder = 'Name';
      inputUsername.setAttribute('required', 'required');
      setFocus(inputUsername);
      div.appendChild(inputUsername);

      const inputPassword = document.createElement('input');
      inputPassword.classList.add('form-control');
      inputPassword.classList.add('col-6');
      inputPassword.type = 'password';
      inputPassword.name = 'password';
      inputPassword.placeholder = 'Password';
      inputPassword.setAttribute('required', 'required');
      setFocus(inputPassword);
      div.appendChild(inputPassword);

      const inputNickname = document.createElement('input');
      inputNickname.classList.add('form-control');
      inputNickname.classList.add('col-6');
      inputNickname.type = 'text';
      inputNickname.name = 'nickname';
      inputNickname.placeholder = 'Nickname';
      inputNickname.setAttribute('required', 'required');
      setFocus(inputNickname);
      div.appendChild(inputNickname);

      const inputEmail = document.createElement('input');
      inputEmail.classList.add('form-control');
      inputEmail.classList.add('col-6');
      inputEmail.type = 'text';
      inputEmail.name = 'email';
      inputEmail.placeholder = 'Email';
      inputEmail.setAttribute('required', 'required');
      setFocus(inputEmail);
      div.appendChild(inputEmail);

      const btnSubmit = document.createElement('button');
      btnSubmit.className = 'btn btn-dark col-3 mx-auto';
      btnSubmit.innerText = 'Envoyer';
      div.appendChild(btnSubmit);

      hiddenForm.appendChild(div);
      onSubmit(hiddenForm);

      myBtn.after(hiddenForm);
   }
}

function setFocus(input: HTMLInputElement): void {
   input.addEventListener('focusin', () => {
      input.classList.remove('is-invalid');
      input.classList.remove('is-valid');
   });
}

interface IResponseApi {
   code: number;
   content: IViolation|any;
}

interface IViolation {
   violations: {
      propertyPath: string;
      title: string;
   }[];
}

function onSubmit(form: HTMLFormElement): void {
   form.addEventListener('submit', (e: SubmitEvent) => {
      e.preventDefault();
      const formData: FormData = new FormData(form);
      console.log(JSON.stringify(Object.fromEntries(formData.entries())));
      fetch('http://192.168.144.44:8000/api/account', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(Object.fromEntries(formData.entries())),
      })
      .then(async (response: Response) => {
          const apiResponse: IResponseApi = {
            code: response.status,
            content: await response.json()
         };
          return apiResponse;
      })
      .then((data: IResponseApi) => {
         if (data.code === 400) {
            const content: IViolation = data.content as IViolation;
            for (const violation of content.violations) {
               const inputOnError: HTMLInputElement|null = document.querySelector('input[name="' + violation.propertyPath + '"]');
               if (inputOnError) {
                  inputOnError.classList.add('is-invalid');
                  const errorField: HTMLParagraphElement = document.createElement('p');
                  errorField.innerText = violation.title;
                  errorField.classList.add('text-danger');
                  inputOnError.after(errorField);
               }
            }
            const othersInput: NodeListOf<HTMLInputElement> = document.querySelectorAll('input:not(.is-invalid)');
            for (const element of othersInput) {
               element.classList.add('is-valid');
            }
         }
      });
   });
}


function setUpPasswordField(): void {
    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="password"]');
    inputs.forEach((input) => {
      const buttonHideShow: HTMLButtonElement = document.createElement('button');
      buttonHideShow.innerText = '👀';
      buttonHideShow.classList.add('btn');
      buttonHideShow.classList.add('btn-primary');
      buttonHideShow.setAttribute('type', 'button');
      input.after(buttonHideShow);

      buttonHideShow.addEventListener('click', () => {
         if (input.type === 'password') {
            input.type = 'text';
         } else {
            input.type = 'password';
         }
      });
    });
}

window.addEventListener('load', () => {
   generateForm();
   setUpPasswordField();
});