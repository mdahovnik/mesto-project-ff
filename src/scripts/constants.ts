export class Config {

    page = document.querySelector('.page') as HTMLBodyElement;

    profile = document.querySelector('.profile') as HTMLDivElement;
    profileTitle = this.profile.querySelector('.profile__title') as HTMLParagraphElement;
    profileDescription = this.profile.querySelector('.profile__description') as HTMLParagraphElement;
    profileAvatar = this.profile.querySelector('.profile__image') as HTMLDivElement;

    addButton = this.profile.querySelector('.profile__add-button') as HTMLButtonElement;
    editButton = this.profile.querySelector('.profile__edit-button') as HTMLButtonElement;

    placesList = document.querySelector('.places__list') as HTMLUListElement;
    spinner = document.querySelector('.places__spinner') as HTMLDivElement;

    avatarPopup = document.querySelector('.popup_type_avatar') as HTMLDivElement;
    profilePopup = document.querySelector('.popup_type_edit') as HTMLDivElement;
    newCardPopup = document.querySelector('.popup_type_new-card') as HTMLDivElement;
    imagePopup = document.querySelector('.popup_type_image') as HTMLDivElement;
    deleteCardPopup = document.querySelector('.popup_type_delete-card') as HTMLDivElement;

    editProfileForm = document.forms['edit-profile'] as HTMLFormElement;
    newPlaceForm = document.forms['new-place'] as HTMLFormElement;
    avatarForm = document.forms['avatar'] as HTMLFormElement;

    profileNameInput = this.editProfileForm.querySelector('.popup__input_type_name') as HTMLInputElement;
    descriptionInput = this.editProfileForm.querySelector('.popup__input_type_description') as HTMLInputElement;

    cardTemplate = this.page.querySelector('#card-template') as HTMLTemplateElement;
    cardNameInput = this.newCardPopup.querySelector('.popup__input_type_card-name') as HTMLInputElement;
    cardUrlInput = this.newCardPopup.querySelector('.popup__input_type_url') as HTMLInputElement;
    avatarUrlInput = this.avatarPopup.querySelector('.popup__input_type_url') as HTMLInputElement;

    validationConfig = {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
    };

    // let user: User = null;
}
