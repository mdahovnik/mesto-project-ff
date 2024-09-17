import '../pages/index.css';
import { Config } from "./constants";
import { Card, User } from './card';
import { Popup } from './modal';
import { Api } from './api';
import { Validation } from './validation';

class App {

}
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


async function handleProfileSubmit(event: SubmitEvent) {
    event.preventDefault();
    setButtonName(Config.profilePopup, 'Сохранение...');

    const profileData = await Api.saveProfile(Config.profileNameInput.value, Config.descriptionInput.value)
        .catch((err) => { console.error(err) });

    Config.profileTitle.textContent = profileData.name;
    Config.profileDescription.textContent = profileData.about;

    popup.closePopup(Config.profilePopup);
    validation.clearValidation(Config.editProfileForm);
    setButtonName(Config.profilePopup, 'Сохранить');
}


async function handleNewCardSubmit(event: SubmitEvent) {
    event.preventDefault();
    setButtonName(Config.newCardPopup, 'Сохранение...');

    const newCardName = getValidCardName(Config.cardNameInput.value);
    const newCardImageAddress = Config.cardUrlInput.value;

    const cardData = await Api.saveCard(newCardName, newCardImageAddress)
        .catch((err) => { console.error(err); });

    const card: Card = new Card(cardData);

    Config.placesList.prepend(card.createCardElement(user));

    popup.closePopup(Config.newCardPopup);
    Config.newPlaceForm.reset();
    validation.clearValidation(Config.newPlaceForm);
    setButtonName(Config.newCardPopup, 'Сохранить');
}


async function handleAvatarSubmit(event: SubmitEvent) {
    event.preventDefault();
    setButtonName(Config.avatarPopup, 'Сохранение...');

    const avatarImageAddress = Config.avatarUrlInput.value;

    const avatarData = await Api.saveAvatar(avatarImageAddress)
        .catch((err) => { console.error(err); });

    Config.profileAvatar.setAttribute('style', `background-image: url(${avatarData.avatar})`);

    popup.closePopup(Config.avatarPopup);
    setButtonName(Config.avatarPopup, 'Сохранить');
}


async function handleCardDeleteSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (Config.cardToDelete.card) {
        const cardId = Config.cardToDelete.card.dataset.cardId;

        await Api.deleteCard(cardId).catch((err) => { console.error(err); })

        Config.cardToDelete.card.remove();
        popup.closePopup(Config.deleteCardPopup);
        Config.cardToDelete.card = null;
    }
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