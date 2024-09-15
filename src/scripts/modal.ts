import { Config } from './constants';


export class Popup {
    
    private static _popup: Popup = null;

    static get getPopup(): Popup {
        if (!this._popup) {
            this._popup = new Popup();
            return this._popup;
        }
        return this._popup;
    }

    private constructor() { }

    openPopup(popupType: HTMLDivElement): void {
        document.addEventListener('keydown', this.handleOnKeydown);
        popupType.addEventListener('click', this.handleOnClick);
        popupType.classList.add('popup_is-opened');
        Config.page.classList.add('page-no-scroll');
    }


    closePopup(popupType: HTMLDivElement): void {
        document.removeEventListener('keydown', this.handleOnKeydown);
        popupType.removeEventListener('click', this.handleOnClick);
        popupType.classList.remove('popup_is-opened');
        Config.page.classList.remove('page-no-scroll');
    }


    private handleOnClick = (event: MouseEvent) => {
        const element = event.currentTarget as HTMLDivElement;
        if (this.isCloseClick(event) || this.isOverlayClick(event)) {
            this.closePopup(element);
        }
    }


    private handleOnKeydown = (event: KeyboardEvent) => {
        if (this.isEscapePressed(event)) {
            this.closePopup(document.querySelector('.popup_is-opened') as HTMLDivElement);
        }
    }


    private isCloseClick(event: MouseEvent): boolean {
        return (event.target as HTMLButtonElement).className === 'popup__close';
    }


    private isOverlayClick(event: MouseEvent): boolean {
        return (event.target as HTMLDivElement).classList.contains('popup');
    }


    private isEscapePressed(event: KeyboardEvent): boolean {
        return event.key === 'Escape';
    }
}
