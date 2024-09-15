import '../pages/index.css';
import { Config } from "./constants";
import { Card, User } from './card';
import { Popup } from './modal';
import { Api } from './api';
import { Validation } from './validation';

const popup: Popup = Popup.getPopup;
const validation: Validation = Validation.getValidation;

Config.newPlaceForm.addEventListener('submit', handleNewCardSubmit);
Config.editProfileForm.addEventListener('submit', handleProfileSubmit);
Config.avatarForm.addEventListener('submit', handleAvatarSubmit);

Config.addButton.addEventListener('click', handleAddButton);
Config.editButton.addEventListener('click', handleEditButton);
Config.profileAvatar.addEventListener('click', handleAvatarButton);

Config.deleteCardPopup.addEventListener('submit', handleCardDeleteSubmit);

let user: User = null;
renderLoading(true);
validation.enableValidation();

/*  Начальная загрузка данных профиля пользователя и списка карточек используя
    Promise.all() для гарантированного получения user_id до начала загрузки карточек
*/
Promise.all([Api.getProfile(), Api.getCards()])
    .then(([profileData, cardsData]) => {
        user = new User(profileData);
        
        Config.profile.dataset.userId = user._id;
        Config.profileAvatar.setAttribute('style', `background-image: url(${user.avatar})`);
        Config.profileTitle.textContent = user.name;
        Config.profileDescription.textContent = user.about;

        cardsData.forEach(cardItem => {
            const card: Card = new Card(cardItem);
            Config.placesList.append(card.createCardElement(user));
        });
    })
    .catch((err) => {
        console.error(err);
    })
    .finally(() => {
        renderLoading(false);
    })


function handleAddButton() {
    Config.newPlaceForm.reset();
    validation.clearValidation(Config.newPlaceForm);
    popup.openPopup(Config.newCardPopup);
}


function handleEditButton() {
    Config.profileNameInput.value = Config.profileTitle.textContent;
    Config.descriptionInput.value = Config.profileDescription.textContent;
    validation.clearValidation(Config.editProfileForm);
    popup.openPopup(Config.profilePopup);
}


function handleAvatarButton() {
    Config.avatarForm.reset();
    validation.clearValidation(Config.avatarForm);
    popup.openPopup(Config.avatarPopup);
}


function handleProfileSubmit(event: SubmitEvent) {
    event.preventDefault();

    setButtonName(Config.profilePopup, 'Сохранение...');

    Api.saveProfile(Config.profileNameInput.value, Config.descriptionInput.value)
        .then((data) => {
            Config.profileTitle.textContent = data.name;
            Config.profileDescription.textContent = data.about;

            popup.closePopup(Config.profilePopup);
            validation.clearValidation(Config.editProfileForm);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            setButtonName(Config.profilePopup, 'Сохранить');
        });
}


function handleNewCardSubmit(event: SubmitEvent) {
    event.preventDefault();
    const newCardName = getValidCardName(Config.cardNameInput.value);
    const newCardImageAddress = Config.cardUrlInput.value;

    setButtonName(Config.newCardPopup, 'Сохранение...');

    Api.saveCard(newCardName, newCardImageAddress)
        .then((cardItem) => {
            const card: Card = new Card(cardItem);
            Config.placesList.prepend(card.createCardElement(user));

            popup.closePopup(Config.newCardPopup);
            Config.newPlaceForm.reset();
            validation.clearValidation(Config.newPlaceForm);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            setButtonName(Config.newCardPopup, 'Сохранить');
        });
}


function handleAvatarSubmit(event: SubmitEvent) {
    event.preventDefault();

    const avatarImageAddress = Config.avatarUrlInput.value;

    setButtonName(Config.avatarPopup, 'Сохранение...');

    Api.saveAvatar(avatarImageAddress)
        .then((data) => {
            Config.profileAvatar.setAttribute('style', `background-image: url(${data.avatar})`);
            popup.closePopup(Config.avatarPopup);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            setButtonName(Config.avatarPopup, 'Сохранить');
        });
}


function handleCardDeleteSubmit(event: SubmitEvent) {
    event.preventDefault();
    console.log(Config.cardToDelete);
    const cardId = Config.cardToDelete.card.dataset.cardId;
    Api.deleteCard(cardId)
        .then(() => {
            if (Config.cardToDelete.card) {
                Config.cardToDelete.card.remove();
                popup.closePopup(Config.deleteCardPopup);
                Config.cardToDelete.card = null;
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
        Config.spinner.classList.add('spinner_visible');
    } else {
        Config.spinner.classList.remove('spinner_visible');
    }
}