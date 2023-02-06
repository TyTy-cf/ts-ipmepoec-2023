
class Student {

    private _isActive: boolean = true;
    private _ranks: IRank[] = [];
    private _lastName: string = '';
    private _firstName: string = '';
    private _dob: Date = new Date();
    // private ranks: Array<number> = new Array<number>();

    get isActive(): boolean {
        return this._isActive;
    }

    set isActive(value: boolean) {
        this._isActive = value;
    }

    get ranks(): IRank[] {
        return this._ranks;
    }

    set ranks(value: IRank[]) {
        this._ranks = value;
    }

    get lastName(): string {
        return this._lastName.toUpperCase();
    }

    set lastName(value: string) {
        this._lastName = value;
    }

    get firstName(): string {
        return this._firstName;
    }

    set firstName(value: string) {
        this._firstName = value;
    }

    get dob(): Date {
        return this._dob;
    }

    set dob(value: Date) {
        this._dob = value;
    }

    public getAge(): number {
        return (new Date()).getFullYear() - this._dob.getFullYear();
    }

    public getAverage(): number {
        let sum: number = 0;
        for (const rank of this.ranks) {
            sum += rank.value;
        }
        return sum / this.ranks.length;
    }
}

interface IRank {
    value: number;
    subject: string;
}

interface IRandomUser {
    results: {
        gender: string;
        name: {
            title: string;
            first: string;
            last: string;
        },
        email: string;
    }[];
}

interface IPokeApiResponse {
    count: number;
    next: string|null;
    previous: string|null;
    results: IPokeApiResults[];
}

interface IPokeApiResults {
    name: string;
    url: string;
}

window.addEventListener('load', () => {
    let dob: Date = new Date();
    dob.setFullYear(1995);
    let student: Student = new Student();
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
    const btn: HTMLButtonElement|null = document.querySelector('[data-dark-light]');
    if (btn) {
        btn.addEventListener('click', () => {
            const body: HTMLBodyElement|null = document.querySelector('body');
            if (body) {
                body.classList.toggle('dark-mode');
            }
        });
    }

    const allDivElement: NodeListOf<HTMLDivElement> = document.querySelectorAll('div');
    allDivElement.forEach((elem) => {
        console.log(elem);
    });

    const element: HTMLDivElement = document.createElement('div');

    fetch('https://randomuser.me/api/')
    .then((response: Response) => {
        if (response.status === 200) {
            return response.json() as Promise<IRandomUser>;
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