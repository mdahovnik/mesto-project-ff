export class Api {

    private static apiConfig = {
        baseUrl: 'https://nomoreparties.co/v1/wff-cohort-22',
        headers: {
            authorization: '414f8694-193c-4196-bcbb-74dcac9ca435',
            'Content-Type': 'application/json'
        }
    }

    private constructor() { }

    static async getProfile(): Promise<any> {
        const response = await fetch(`${this.apiConfig.baseUrl}/users/me`, {
            headers: this.apiConfig.headers
        });
        return this.checkResponseStatus(response);
    }


    static async getCards(): Promise<any> {
        const response = await fetch(`${this.apiConfig.baseUrl}/cards`, {
            headers: this.apiConfig.headers
        });
        return this.checkResponseStatus(response);
    }


    static saveProfile(userName: string, userDescription: string): Promise<any> {
        return fetch(`${this.apiConfig.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.apiConfig.headers,
            body: JSON.stringify({
                name: userName,
                about: userDescription
            })
        }).then(this.checkResponseStatus)
    }


    static saveAvatar(avatarLink: string): Promise<any> {
        return fetch(`${this.apiConfig.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.apiConfig.headers,
            body: JSON.stringify({
                avatar: avatarLink
            })
        }).then(this.checkResponseStatus)
    }


    static saveCard(name: string, link: string): Promise<any> {
        return fetch(`${this.apiConfig.baseUrl}/cards`, {
            method: 'POST',
            headers: this.apiConfig.headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        }).then(this.checkResponseStatus)
    }


    static deleteCard(cardId: string): Promise<any> {
        return fetch(`${this.apiConfig.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.apiConfig.headers
        }).then(this.checkResponseStatus)
    }


    static like(cardId: string): Promise<any> {
        return fetch(`${this.apiConfig.baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this.apiConfig.headers
        }).then(this.checkResponseStatus)
    }


    static dislike(cardId: string): Promise<any> {
        return fetch(`${this.apiConfig.baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this.apiConfig.headers
        }).then(this.checkResponseStatus)
    }


    private static checkResponseStatus(response: Response): Promise<any> {
        if (response.ok)
            return response.json();

        return Promise.reject(`Ошибка : ${response.statusText}`);
    }

    static checkUrl() {
        return fetch('https://wallpapers.com/images/hd/clear-snake-game-character-z6jd7jtsl04g6mxx.jpg', {
            method: 'HEAD',
            mode: 'no-cors'
        }).then((response) => {
            console.log('статус => ' + response.status);
            console.log('тип данных => ' + response.headers.get('Content-Type'));
            console.log('размер => ' + response.headers.get('Content-Length'));
        }).catch((err) => {
            throw Error(err);
        })
    }
}
// cache-control