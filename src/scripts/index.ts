import '../pages/index.css';
import { Config } from "./constants";
import { cardToDelete, Card, User } from './card';
import { Popup } from './modal';
import { Api } from './api';
import { Validation } from './validation';

const config: Config = new Config();
const popup: Popup = new Popup(config);
const api: Api = new Api();
const validation: Validation = new Validation(config);

config.newPlaceForm.addEventListener('submit', handleNewCardSubmit);
config.editProfileForm.addEventListener('submit', handleProfileSubmit);
config.avatarForm.addEventListener('submit', handleAvatarSubmit);

config.addButton.addEventListener('click', handleAddButton);
config.editButton.addEventListener('click', handleEditButton);
config.profileAvatar.addEventListener('click', handleAvatarButton);

config.deleteCardPopup.addEventListener('submit', handleCardDeleteSubmit);

let user: User = null;
renderLoading(true);
validation.enableValidation();

/*  Начальная загрузка данных профиля пользователя и списка карточек используя
    Promise.all() для гарантированного получения user_id до начала загрузки карточек
*/
Promise.all([api.getProfile(), api.getCards()])
    .then(([profileData, cardsData]) => {
        user = new User(profileData);

        config.profile.dataset.userId = user._id;
        config.profileAvatar.setAttribute('style', `background-image: url(${user.avatar})`);
        config.profileTitle.textContent = user.name;
        config.profileDescription.textContent = user.about;

        cardsData.forEach(cardItem => {
            const card: Card = new Card(cardItem);
            config.placesList.append(card.createElement(user, handleCardClick));
        });
    })
    .catch((err) => {
        console.error(err);
    })
    .finally(() => {
        renderLoading(false);
    })


function handleAddButton() {
    config.newPlaceForm.reset();
    validation.clearValidation(config.newPlaceForm);
    popup.openPopup(config.newCardPopup);
}


function handleEditButton() {
    config.profileNameInput.value = config.profileTitle.textContent;
    config.descriptionInput.value = config.profileDescription.textContent;
    validation.clearValidation(config.editProfileForm);
    popup.openPopup(config.profilePopup);
}


function handleAvatarButton() {
    config.avatarForm.reset();
    validation.clearValidation(config.avatarForm);
    popup.openPopup(config.avatarPopup);
}


function handleCardClick(cardImageLink: string, cardName: string) {
    (config.imagePopup.querySelector('.popup__image') as HTMLImageElement).src = cardImageLink;
    (config.imagePopup.querySelector('.popup__image') as HTMLImageElement).alt = cardName;
    (config.imagePopup.querySelector('.popup__caption') as HTMLImageElement).textContent = cardName;
    popup.openPopup(config.imagePopup);
}


function handleProfileSubmit(event: SubmitEvent) {
    event.preventDefault();

    setButtonName(config.profilePopup, 'Сохранение...');

    api.saveProfile(config.profileNameInput.value, config.descriptionInput.value)
        .then((data) => {
            config.profileTitle.textContent = data.name;
            config.profileDescription.textContent = data.about;

            popup.closePopup(config.profilePopup);
            validation.clearValidation(config.editProfileForm);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            setButtonName(config.profilePopup, 'Сохранить');
        });
}


function handleNewCardSubmit(event: SubmitEvent) {
    event.preventDefault();
    const newCardName = getValidCardName(config.cardNameInput.value);
    const newCardImageAddress = config.cardUrlInput.value;

    setButtonName(config.newCardPopup, 'Сохранение...');

    api.saveCard(newCardName, newCardImageAddress)
        .then((cardItem) => {
            const card: Card = new Card(cardItem);
            config.placesList.prepend(card.createElement(user, handleCardClick));

            popup.closePopup(config.newCardPopup);
            config.newPlaceForm.reset();
            validation.clearValidation(config.newPlaceForm);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            setButtonName(config.newCardPopup, 'Сохранить');
        });
}


function handleAvatarSubmit(event: SubmitEvent) {
    event.preventDefault();

    const avatarImageAddress = config.avatarUrlInput.value;

    setButtonName(config.avatarPopup, 'Сохранение...');

    api.saveAvatar(avatarImageAddress)
        .then((data) => {
            config.profileAvatar.setAttribute('style', `background-image: url(${data.avatar})`);
            popup.closePopup(config.avatarPopup);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            setButtonName(config.avatarPopup, 'Сохранить');
        });
}


function handleCardDeleteSubmit(event: SubmitEvent) {
    event.preventDefault();
    const cardId = cardToDelete.card.dataset.cardId;

    api.deleteCard(cardId)
        .then(() => {
            if (cardToDelete.card) {
                cardToDelete.card.remove();
                popup.closePopup(config.deleteCardPopup);
                cardToDelete.card = null;
            }
        })
        .catch((err) => {
            console.error(err);
        })
}


function getValidCardName(inputString: string): string {
    if (inputString.length > 1)
        return inputString[0].toUpperCase() + inputString.slice(1).toLowerCase();

    return inputString.toUpperCase();
}


function setButtonName(popup: HTMLDivElement, name: string) {
    popup.querySelector('.popup__button').textContent = name;
}


function renderLoading(isLoading: boolean) {
    if (isLoading) {
        config.spinner.classList.add('spinner_visible');
    } else {
        config.spinner.classList.remove('spinner_visible');
    }
}