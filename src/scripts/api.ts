export class Api {

    private apiConfig = {
        baseUrl: 'https://nomoreparties.co/v1/wff-cohort-22',
        headers: {
            authorization: '414f8694-193c-4196-bcbb-74dcac9ca435',
            'Content-Type': 'application/json'
        }
    }


    getProfile() {
        return fetch(`${this.apiConfig.baseUrl}/users/me`, {
            headers: this.apiConfig.headers
        }).then(this.checkResponseStatus)
    }


    getCards() {
        return fetch(`${this.apiConfig.baseUrl}/cards`, {
            headers: this.apiConfig.headers
        }).then(this.checkResponseStatus);
    }


    saveProfile(userName: string, userDescription: string) {
        return fetch(`${this.apiConfig.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.apiConfig.headers,
            body: JSON.stringify({
                name: userName,
                about: userDescription
            })
        }).then(this.checkResponseStatus)
    }


    saveAvatar(avatarLink: string) {
        return fetch(`${this.apiConfig.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.apiConfig.headers,
            body: JSON.stringify({
                avatar: avatarLink
            })
        }).then(this.checkResponseStatus)
    }


    saveCard(name: string, link: string) {
        return fetch(`${this.apiConfig.baseUrl}/cards`, {
            method: 'POST',
            headers: this.apiConfig.headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        }).then(this.checkResponseStatus)
    }


    deleteCard(cardId: string) {
        return fetch(`${this.apiConfig.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.apiConfig.headers
        }).then(this.checkResponseStatus)
    }


    like(cardId: string) {
        return fetch(`${this.apiConfig.baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this.apiConfig.headers
        }).then(this.checkResponseStatus)
    }


    dislike(cardId: string) {
        return fetch(`${this.apiConfig.baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this.apiConfig.headers
        }).then(this.checkResponseStatus)
    }


    private checkResponseStatus(response: Response) {
        if (response.ok)
            return response.json();

        return Promise.reject(`Ошибка : ${response.statusText}`);
    }
}