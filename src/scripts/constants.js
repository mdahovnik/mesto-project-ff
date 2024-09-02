export {
    page,
    profile,
    profileTitle,
    profileDescription,
    profileAvatar,
    placesList,
    spinner,
    avatarPopup,
    profilePopup,
    newCardPopup,
    imagePopup,
    deleteCardPopup,
    editProfileForm,
    newPlaceForm,
    avatarForm,
    profileNameInput,
    descriptionInput,
    validationConfig,
    addButton,
    editButton,
    avatarButton, 
    cardNameInput, 
    cardUrlInput,
    avatarUrlInput,
    cardTemplate
};

const page = document.querySelector('.page');

const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');
const profileAvatar = profile.querySelector('.profile__image');

const addButton = profile.querySelector('.profile__add-button');
const editButton = profile.querySelector('.profile__edit-button');
const avatarButton = profile.querySelector('.profile__avatar-button');

const placesList = document.querySelector('.places__list');
const spinner = document.querySelector('.places__spinner');

const avatarPopup = document.querySelector('.popup_type_avatar');
const profilePopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const deleteCardPopup = document.querySelector('.popup_type_delete-card');

const editProfileForm = document.forms['edit-profile'];
const newPlaceForm = document.forms['new-place'];
const avatarForm = document.forms['avatar'];

const profileNameInput = editProfileForm.querySelector('.popup__input_type_name');
const descriptionInput = editProfileForm.querySelector('.popup__input_type_description');

const cardTemplate = document.querySelector('#card-template');
const cardNameInput = newCardPopup.querySelector('.popup__input_type_card-name');
const cardUrlInput = newCardPopup.querySelector('.popup__input_type_url');
const avatarUrlInput = avatarPopup.querySelector('.popup__input_type_url');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};
