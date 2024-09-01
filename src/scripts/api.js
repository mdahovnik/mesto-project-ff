const apiConfig = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-22',
    headers: {
        authorization: '414f8694-193c-4196-bcbb-74dcac9ca435',
        'Content-Type': 'application/json'
    }
}

export function getProfile() {
    return fetch(`${apiConfig.baseUrl}/users/me`, {
        headers: apiConfig.headers
    }).then(res => checkResponseStatus(res))
}

export function getCards() {
    return fetch(`${apiConfig.baseUrl}/cards`, {
        headers: apiConfig.headers
    }).then(res => checkResponseStatus(res))
}

export function saveProfile(userName, userDescription) {
    return fetch(`${apiConfig.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify({
            name: userName.value,
            about: userDescription.value
        })
    }).then(res => checkResponseStatus(res))
}

export function saveAvatar(avatarLink) {
    return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify({
            avatar: avatarLink
        })
    }).then(res => checkResponseStatus(res))
}

export function saveCard(name, link) {
    return fetch(`${apiConfig.baseUrl}/cards`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    }).then(res => checkResponseStatus(res))
}

export function deleteCard(cardId) {
    return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: apiConfig.headers
    }).then(res => checkResponseStatus(res))
}

export function like(cardId) {
    return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: apiConfig.headers
    }).then(res => checkResponseStatus(res))
}

export function dislike(cardId) {
    return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: apiConfig.headers
    }).then(res => checkResponseStatus(res))
}

function checkResponseStatus(response) {
    if (response.ok)
        return response.json();

    return Promise.reject(`Ошибка : ${response.statusText}`);
}