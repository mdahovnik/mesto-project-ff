import { Config } from './constants';


export class Popup {
    config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    openPopup(popupType: HTMLDivElement): void {
        document.addEventListener('keydown', this.handleOnKeydown);
        popupType.addEventListener('click', this.handleOnClick);
        popupType.classList.add('popup_is-opened');
        this.config.page.classList.add('page-no-scroll');
    }


    closePopup(popupType: HTMLDivElement): void {
        document.removeEventListener('keydown', this.handleOnKeydown);
        popupType.removeEventListener('click', this.handleOnClick);
        popupType.classList.remove('popup_is-opened');
        this.config.page.classList.remove('page-no-scroll');
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
