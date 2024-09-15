export class Config {

    static page = document.querySelector('.page') as HTMLBodyElement;

    static profile = document.querySelector('.profile') as HTMLDivElement;
    static profileTitle = this.profile.querySelector('.profile__title') as HTMLParagraphElement;
    static profileDescription = this.profile.querySelector('.profile__description') as HTMLParagraphElement;
    static profileAvatar = this.profile.querySelector('.profile__image') as HTMLDivElement;

    static addButton = this.profile.querySelector('.profile__add-button') as HTMLButtonElement;
    static editButton = this.profile.querySelector('.profile__edit-button') as HTMLButtonElement;

    static placesList = document.querySelector('.places__list') as HTMLUListElement;
    static spinner = document.querySelector('.places__spinner') as HTMLDivElement;

    static avatarPopup = document.querySelector('.popup_type_avatar') as HTMLDivElement;
    static profilePopup = document.querySelector('.popup_type_edit') as HTMLDivElement;
    static newCardPopup = document.querySelector('.popup_type_new-card') as HTMLDivElement;
    static imagePopup = document.querySelector('.popup_type_image') as HTMLDivElement;
    static deleteCardPopup = document.querySelector('.popup_type_delete-card') as HTMLDivElement;

    static editProfileForm = document.forms['edit-profile'] as HTMLFormElement;
    static newPlaceForm = document.forms['new-place'] as HTMLFormElement;
    static avatarForm = document.forms['avatar'] as HTMLFormElement;

    static profileNameInput = this.editProfileForm.querySelector('.popup__input_type_name') as HTMLInputElement;
    static descriptionInput = this.editProfileForm.querySelector('.popup__input_type_description') as HTMLInputElement;

    static cardTemplate = this.page.querySelector('#card-template') as HTMLTemplateElement;
    static cardNameInput = this.newCardPopup.querySelector('.popup__input_type_card-name') as HTMLInputElement;
    static cardUrlInput = this.newCardPopup.querySelector('.popup__input_type_url') as HTMLInputElement;
    static avatarUrlInput = this.avatarPopup.querySelector('.popup__input_type_url') as HTMLInputElement;

    static validationConfig = {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
    };

    static cardToDelete = {
        get card() {
            return this._cardObject as HTMLLIElement;
        },
        set card(obj: HTMLLIElement) {
            this._cardObject = obj;
        }
    };
}
