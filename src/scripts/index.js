import '../pages/index.css';
// import { initialCards } from './cards';
import { createCard, handleCardLike, handleCardDelete } from './card';
import { openPopup, closePopup } from './modal';
import { enableValidation, clearValidation } from './validation';
import { getProfile, getCards, saveProfile, saveCard, deleteCard, saveAvatar } from './api';

const content = document.querySelector('.content');
const placesList = document.querySelector('.places__list');
const profilePopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const editProfileForm = document.forms['edit-profile'];
const profileNameInput = editProfileForm.querySelector('.popup__input_type_name');
const descriptionInput = editProfileForm.querySelector('.popup__input_type_description');
const profile = document.querySelector('.profile__info');
const profileImage = document.querySelector('.profile__image');
const newImageForm = document.forms['new-place'];

const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarForm = document.forms['avatar'];
// const newCardNameInput = newImageForm.querySelector('.popup__input_type_card-name');
// const newCardUrlInput = newImageForm.querySelector('.popup__input_type_url');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

/*  Начальная загрузка данных профиля пользователя и списка карточек используя
    Promise.all() для гарантированного получения user_id до начала загрузки карточек
 */
Promise.all([getProfile(), getCards()])
    .then(([resProfile, resCards]) => {
        resProfile.json()
            .then((data) => {
                // profileImage.style.backgroundImage = data.avatar;

                profile.id = data._id;
                profileImage.setAttribute('style', `background-image: url(${data.avatar})`);
                profile.querySelector('.profile__title').textContent = data.name;
                profile.querySelector('.profile__description').textContent = data.about;

                return resCards;
            })
            .then(res => res.json())
            .then((data) => {
                data.forEach(cardItem => {
                    placesList.append(createCard(getNewCardObject(cardItem)));
                });
            });
    })
    .catch(error => {
        console.error(error)
    })


//  style="background-image: url(<%=require('./images/avatar.jpg')%>);"
// getProfile()
//     .then((res) => {
//         if (res.ok)
//             return res.json();

//         return Promise.reject(error);
//     })
//     .then((data) => {
//         // profileImage.style.backgroundImage = data.avatar;

//         profile.id = data._id;
//         profileImage.setAttribute('style', `background-image: url(${data.avatar})`);
//         profile.querySelector('.profile__title').textContent = data.name;
//         profile.querySelector('.profile__description').textContent = data.about;
//     })
//     .catch((error) => {
//         console.log('getProfile error: ' + error);
//     });

// getCards()
//     .then((res) => {
//         if (res.ok)
//             return res.json();

//         return Promise.reject(error);
//     })
//     .then((data) => {
//         data.forEach(cardItem => {
//             placesList.append(createCard(getNewCardObject(cardItem)));
//         });
//     })
//     .catch((error) => {
//         console.log('getCards error: ' + error);
//     });

document.addEventListener('click', handlePageButtons);
enableValidation(validationConfig);

/*  Обрабатываем нажатие кнопок страницы (редактирование профиля, добавления карточки).
    В соответствии с кнопкой сгенерировавшей событие открываем нужный popup.
*/
function handlePageButtons(event) {
    if (event.target.classList.contains('profile__edit-button')) {
        profileNameInput.value = content.querySelector('.profile__title').textContent;
        descriptionInput.value = content.querySelector('.profile__description').textContent;

        editProfileForm.addEventListener('submit', handleProfileSubmit);

        clearValidation(editProfileForm, validationConfig);
        openPopup(profilePopup);
    }

    if (event.target.classList.contains('profile__add-button')) {
        newImageForm.addEventListener('submit', handleNewCardSubmit);
        newImageForm.reset();

        clearValidation(newImageForm, validationConfig);
        openPopup(newCardPopup);
    }

    if (event.target.classList.contains('profile__avatar-button')) {
        avatarForm.addEventListener('submit', handleAvatarSubmit);
        avatarForm.reset();

        clearValidation(avatarForm, validationConfig);
        openPopup(avatarPopup);
    }
}

function handleCardImageClick(cardImageLink, cardName) {
    imagePopup.querySelector('.popup__image').src = cardImageLink;
    imagePopup.querySelector('.popup__image').alt = cardName;
    imagePopup.querySelector('.popup__caption').textContent = cardName;
    openPopup(imagePopup);
}

function handleProfileSubmit(event) {
    event.preventDefault();
    content.querySelector('.profile__title').textContent = profileNameInput.value;
    content.querySelector('.profile__description').textContent = descriptionInput.value;

    saveProfile(profileNameInput, descriptionInput)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            profilePopup
        });

    editProfileForm.removeEventListener('submit', handleProfileSubmit);

    clearValidation(editProfileForm, validationConfig);
    closePopup(profilePopup);
}

function handleNewCardSubmit(event) {
    event.preventDefault();
    const cardName = newCardPopup.querySelector('.popup__input_type_card-name').value;
    const newCardName = getValidCardName(cardName);
    const newCardUrl = newCardPopup.querySelector('.popup__input_type_url').value;
    const cardItem = { name: newCardName, link: newCardUrl };
    // const newCard = createCard(getNewCardObject(cardItem));

    saveCard(newCardName, newCardUrl)
        .then((res) => {
            if (res.ok)
                return res.json()

            return Promise.reject(error);
        })
        .then((data) => {
            placesList.prepend(createCard(getNewCardObject(data)));
        })
        .catch((error) => {
            console.log('save newCard error: ' + error);
        });

    newImageForm.reset();
    newImageForm.removeEventListener('submit', handleNewCardSubmit);

    clearValidation(newImageForm, validationConfig);
    closePopup(newCardPopup);
}

function handleAvatarSubmit(event) {
    event.preventDefault();
    const newAvatarLink = avatarPopup.querySelector('.popup__input_type_url').value;

    saveAvatar(newAvatarLink)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            profileImage.setAttribute('style', `background-image: url(${data.avatar})`);
        })



    // 

    closePopup(avatarPopup);
}

function getValidCardName(inputString) {
    if (inputString.length >= 2)
        return inputString[0].toUpperCase() + inputString.slice(1).toLowerCase();

    return inputString.toUpperCase();
}

function getNewCardObject(cardItem) {
    return { cardItem, handleCardLike, handleCardDelete, handleCardImageClick };
}
