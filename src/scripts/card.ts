import { Api } from "./api";
import { Config } from "./constants";
import { Popup } from './modal';

const popup: Popup = Popup.getPopup;


export class User {
    about: string;
    avatar: string;
    cohort: string;
    name: string;
    _id: string;

    // constructor(object: { about: string, avatar: string, cohort: string, name: string, _id: string }) {
    //     this.about = object.about;
    //     this.avatar = object.avatar;
    //     this.cohort = object.cohort;
    //     this.name = object.name;
    //     this._id = object._id;
    // }

    constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}

class Owner extends User { }

export class Card {
    createdAt: string;
    likes: User[];
    link: string;
    name: string;
    owner: Owner;
    _id: string;

    // constructor(object: { createdAt: string, likes: User[], link: string, name: string, owner: Owner, _id: string }) {
    //     this.createdAt = object.createdAt;
    //     this.likes = object.likes;
    //     this.link = object.link;
    //     this.name = object.name;
    //     this.owner = object.owner;
    //     this.id = object._id;
    // }

    constructor(init?: Partial<Card>) {
        Object.assign(this, init);
    }


    createCardElement(user: User): HTMLLIElement {
        const cardElement = Config.cardTemplate.content.querySelector('.card').cloneNode(true) as HTMLLIElement;
        const image = cardElement.querySelector('.card__image') as HTMLImageElement;
        const likeButton = cardElement.querySelector('.card__like-button') as HTMLButtonElement;
        const deleteButton = cardElement.querySelector('.card__delete-button') as HTMLButtonElement;
        const title = cardElement.querySelector('.card__title') as HTMLHeadingElement;
        const likeCount = cardElement.querySelector('.card__like-count') as HTMLSpanElement;

        cardElement.dataset.cardId = this._id;
        image.src = this.link;
        image.alt = this.name;
        title.textContent = this.name;
        likeCount.textContent = this.likes.length.toString();

        likeButton.addEventListener('click', this.handleLikeButton);
        image.addEventListener('click', () => {
            this.handleCardClick(image.src, image.alt)
        });

        // Проходим по массиву likes{...}, ищем себя по id, если есть, активируем свой лайк на карточке.
        if (this.likes.find(userItem => userItem._id === user._id)) {
            likeButton.classList.add('card__like-button_is-active');
        }

        // Проверяем владельца карточки, если наша, вешаем обработчик на кнопку, иначе скрываем кнопку.
        if (this.owner._id === user._id) {
            deleteButton.addEventListener('click', this.handleDeleteButton);
        }
        else deleteButton.style.display = "none";

        return cardElement;
    }


    private handleLikeButton(event: MouseEvent) {
        const element = event.target as HTMLButtonElement
        const card = element.closest('.card') as HTMLLIElement;
        const likeCount = card.querySelector('.card__like-count') as HTMLSpanElement;

        if (!element.classList.contains('card__like-button_is-active')) {
            Api.like(card.dataset.cardId)
                .then((cardData) => {
                    likeCount.textContent = cardData.likes.length;
                    element.classList.add('card__like-button_is-active');
                })
                .catch((err) => {
                    console.error(err);
                })
        }
        else {
            Api.dislike(card.dataset.cardId)
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

        Config.cardToDelete.card = element.closest('.card');
        popup.openPopup(Config.deleteCardPopup);
    }


    private handleCardClick(cardImageLink: string, cardName: string) {
        const liElement = Config.imagePopup.querySelector('.popup__image') as HTMLImageElement;
        const imgElement = Config.imagePopup.querySelector('.popup__caption') as HTMLImageElement;

        liElement.src = cardImageLink;
        liElement.alt = cardName;
        imgElement.textContent = cardName;
        popup.openPopup(Config.imagePopup);
    }
}