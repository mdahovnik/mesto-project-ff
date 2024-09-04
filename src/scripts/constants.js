export const page = document.querySelector('.page');

export const profile = document.querySelector('.profile');
export const profileTitle = profile.querySelector('.profile__title');
export const profileDescription = profile.querySelector('.profile__description');
export const profileAvatar = profile.querySelector('.profile__image');

export const addButton = profile.querySelector('.profile__add-button');
export const editButton = profile.querySelector('.profile__edit-button');

export const placesList = document.querySelector('.places__list');
export const spinner = document.querySelector('.places__spinner');

export const avatarPopup = document.querySelector('.popup_type_avatar');
export const profilePopup = document.querySelector('.popup_type_edit');
export const newCardPopup = document.querySelector('.popup_type_new-card');
export const imagePopup = document.querySelector('.popup_type_image');
export const deleteCardPopup = document.querySelector('.popup_type_delete-card');

export const editProfileForm = document.forms['edit-profile'];
export const newPlaceForm = document.forms['new-place'];
export const avatarForm = document.forms['avatar'];

export const profileNameInput = editProfileForm.querySelector('.popup__input_type_name');
export const descriptionInput = editProfileForm.querySelector('.popup__input_type_description');

export const cardTemplate = document.querySelector('#card-template');
export const cardNameInput = newCardPopup.querySelector('.popup__input_type_card-name');
export const cardUrlInput = newCardPopup.querySelector('.popup__input_type_url');
export const avatarUrlInput = avatarPopup.querySelector('.popup__input_type_url');

export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};
