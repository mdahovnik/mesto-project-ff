// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardItem, deleteCard) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);

    card.querySelector('.card__image').src = cardItem.link;
    card.querySelector('.card__image').alt = cardItem.name;
    card.querySelector('.card__title').textContent = cardItem.name;
    card.querySelector('.card__delete-button').addEventListener('click', () => {
        deleteCard(card);
    });

    return card;
}

// @todo: Функция удаления карточки
function deleteCard(card) {
    card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(cardItem => {
    placesList.append(createCard(cardItem, deleteCard));
});

