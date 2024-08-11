import { handlerCardClicked, cardTemplate} from ".";
export { createCard, likeCard, deleteCard };

function createCard(cardItem, likeCard, deleteCard) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const likeButton = card.querySelector('.card__like-button');
    const deleteButton = card.querySelector('.card__delete-button');

    cardImage.src = cardItem.link;
    cardImage.alt = cardItem.name;
    card.querySelector('.card__title').textContent = cardItem.name;
    card.addEventListener('click', handlerCardClicked);
    likeButton.addEventListener('click', likeCard);
    deleteButton.addEventListener('click', deleteCard);
    return card;
}

function likeCard(e) {
    e.target.classList.toggle('card__like-button_is-active');
}

function deleteCard(e) {
    e.target.removeEventListener('click', handlerCardClicked);
    e.target.parentElement.remove();
}