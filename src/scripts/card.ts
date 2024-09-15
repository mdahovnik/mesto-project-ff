import { Config } from './constants';
import { Api } from "./api";
import { Popup } from "./modal";

export { cardToDelete };

const config: Config = new Config();
const api: Api = new Api();
const popup: Popup = new Popup(config);
const cardToDelete = {
    get card() {
        return this._cardObject as HTMLLIElement;
    },
    set card(obj: HTMLLIElement) {
        this._cardObject = obj;
    }
};

export class User {
    about: string;
    avatar: string;
    cohort: string;
    name: string;
    _id: string;

    constructor(object: { about: string, avatar: string, cohort: string, name: string, _id: string }) {
        this.about = object.about;
        this.avatar = object.avatar;
        this.cohort = object.cohort;
        this.name = object.name;
        this._id = object._id;
    }
}

class Owner extends User { }

export class Card {
    cardLikes: User[];
    cardLink: string;
    cardName: string;
    cardOwner: Owner;
    cardId: string;

    constructor(object: { createdAt: string, likes: User[], link: string, name: string, owner: Owner, _id: string }) {
        this.cardLikes = object.likes;
        this.cardLink = object.link;
        this.cardName = object.name;
        this.cardOwner = object.owner;
        this.cardId = object._id;
    }

    createElement(user: User, handleCardClick): HTMLLIElement {
        const card = config.cardTemplate.content.querySelector('.card').cloneNode(true) as HTMLLIElement;
        const image = card.querySelector('.card__image') as HTMLImageElement;
        const likeButton = card.querySelector('.card__like-button') as HTMLButtonElement;
        const deleteButton = card.querySelector('.card__delete-button') as HTMLButtonElement;
        const title = card.querySelector('.card__title') as HTMLHeadingElement;
        const likeCount = card.querySelector('.card__like-count') as HTMLSpanElement;

        card.dataset.cardId = this.cardId;
        image.src = this.cardLink;
        image.alt = this.cardName;
        title.textContent = this.cardName;
        likeCount.textContent = this.cardLikes.length.toString();

        likeButton.addEventListener('click', this.handleLikeButton);
        image.addEventListener('click', () => {
            handleCardClick(image.src, image.alt)
        });

        // Проходим по массиву likes{...}, ищем себя по id, если есть, активируем свой лайк на карточке.
        if (this.cardLikes.find(userItem => userItem._id === user._id)) {
            likeButton.classList.add('card__like-button_is-active');
        }

        // Проверяем владельца карточки, если наша, вешаем обработчик на кнопку, иначе скрываем кнопку.
        if (this.cardOwner._id === user._id) {
            deleteButton.addEventListener('click', this.handleDeleteButton);
        }
        else deleteButton.style.display = "none";

        return card;
    }


    private handleLikeButton(event: MouseEvent) {
        const element = event.target as HTMLButtonElement
        const card = element.closest('.card') as HTMLLIElement;
        const likeCount = card.querySelector('.card__like-count') as HTMLSpanElement;

        if (!element.classList.contains('card__like-button_is-active')) {
            api.like(card.dataset.cardId)
                .then((cardData) => {
                    likeCount.textContent = cardData.likes.length;
                    element.classList.add('card__like-button_is-active');
                })
                .catch((err) => {
                    console.error(err);
                })
        }
        else {
            api.dislike(card.dataset.cardId)
                .then((cardData) => {
                    likeCount.textContent = cardData.likes.length;
                    element.classList.remove('card__like-button_is-active');
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    }


    private handleDeleteButton(event: MouseEvent) {
        const element = event.target as HTMLButtonElement;
        cardToDelete.card = element.closest('.card');
        popup.openPopup(config.deleteCardPopup);
    }

}