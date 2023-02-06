"use strict";
class Student {
    constructor() {
        this._isActive = true;
        this._ranks = [];
        this._lastName = '';
        this._firstName = '';
        this._dob = new Date();
    }
    // private ranks: Array<number> = new Array<number>();
    get isActive() {
        return this._isActive;
    }
    set isActive(value) {
        this._isActive = value;
    }
    get ranks() {
        return this._ranks;
    }
    set ranks(value) {
        this._ranks = value;
    }
    get lastName() {
        return this._lastName.toUpperCase();
    }
    set lastName(value) {
        this._lastName = value;
    }
    get firstName() {
        return this._firstName;
    }
    set firstName(value) {
        this._firstName = value;
    }
    get dob() {
        return this._dob;
    }
    set dob(value) {
        this._dob = value;
    }
    getAge() {
        return (new Date()).getFullYear() - this._dob.getFullYear();
    }
    getAverage() {
        let sum = 0;
        for (const rank of this.ranks) {
            sum += rank.value;
        }
        return sum / this.ranks.length;
    }
}
window.addEventListener('load', () => {
    let dob = new Date();
    dob.setFullYear(1995);
    let student = new Student();
    student.dob = dob;
    student.lastName = 'TOTO';
    student.firstName = 'Toto';
    student.ranks =
        [
            {
                value: 12,
                subject: 'sql'
            },
            {
                value: 15,
                subject: 'Java'
            }
        ];
    console.log(student.ranks);
    // QuerySelector
    const btn = document.querySelector('[data-dark-light]');
    if (btn) {
        btn.addEventListener('click', () => {
            const body = document.querySelector('body');
            if (body) {
                body.classList.toggle('dark-mode');
            }
        });
    }
    const allDivElement = document.querySelectorAll('div');
    allDivElement.forEach((elem) => {
        console.log(elem);
    });
    const element = document.createElement('div');
    fetch('https://randomuser.me/api/')
        .then((response) => {
        if (response.status === 200) {
            return response.json();
        }
        console.log(response.body);
    })
        .then((data) => {
        if (data) {
            console.log(data.results[0]);
        }
    })
        .catch(e => {
        console.log(e);
    });
});
//# sourceMappingURL=index.js.map