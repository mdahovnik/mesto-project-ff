(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-22",headers:{authorization:"414f8694-193c-4196-bcbb-74dcac9ca435","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Ошибка : ".concat(e.statusText))}function r(e){e.addEventListener("click",o),document.addEventListener("keydown",c),e.classList.add("popup_is-opened"),document.querySelector(".page").classList.add("page-no-scroll")}function n(e){e.removeEventListener("click",o),document.removeEventListener("keydown",c),e.classList.remove("popup_is-opened"),document.querySelector(".page").classList.remove("page-no-scroll")}function o(e){(function(e){return"popup__close"===e.target.className}(e)||function(e){return e.target.classList.contains("popup")}(e))&&n(e.currentTarget)}function c(e){(function(e){return"Escape"===e.key})(e)&&n(document.querySelector(".popup_is-opened"))}var a=document.querySelector("#card-template").content,i=document.querySelector(".popup_type_delete-card");function u(e){var t=a.querySelector(".card").cloneNode(!0),r=t.querySelector(".card__image"),n=t.querySelector(".card__like-button"),o=t.querySelector(".card__delete-button"),c=t.querySelector(".card__title"),i=t.querySelector(".card__like-count");return t.id=e.cardItem._id,r.src=e.cardItem.link,r.alt=e.cardItem.name,c.textContent=e.cardItem.name,i.textContent=e.cardItem.likes.length,n.addEventListener("click",e.handlers.handleLike),o.addEventListener("click",e.handlers.handleDelete),r.addEventListener("click",(function(){e.handlers.handleCardClick(r.src,r.alt)})),e.cardItem.likes.find((function(t){return t._id===e.userId}))&&n.classList.add("card__like-button_is-active"),e.cardItem.owner._id!==e.userId&&(o.style.display="none"),t}function s(r){var n,o=r.target.closest(".card"),c=o.querySelector(".card__like-count");r.target.classList.contains("card__like-button_is-active")?function(r){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(r),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))}(o.id).then((function(e){c.textContent=e.likes.length,r.target.classList.remove("card__like-button_is-active")})).catch((function(e){console.error(e)})):(n=o.id,fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then((function(e){return t(e)}))).then((function(e){c.textContent=e.likes.length,r.target.classList.add("card__like-button_is-active")})).catch((function(e){console.error(e)}))}function l(o){var c=o.target.closest(".card");i.addEventListener("submit",(function(r){var o;r.preventDefault(),(o=c.id,fetch("".concat(e.baseUrl,"/cards/").concat(o),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))).then((function(){c.remove(),n(i)})).catch((function(e){console.error(e)}))})),r(i)}function d(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(r){r.classList.remove(t.inputErrorClass);var n=e.querySelector(".".concat(r.id,"-error"));n.classList.remove(t.errorClass),n.textContent=""}))}function p(e,t,r){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?t.classList.remove(r.inactiveButtonClass):t.classList.add(r.inactiveButtonClass)}document.addEventListener("click",(function(e){var t=e.target.classList;t.contains("profile__add-button")?(C.addEventListener("submit",D),C.reset(),d(C,I),r(b)):t.contains("profile__edit-button")?(k.value=f.querySelector(".profile__title").textContent,E.value=f.querySelector(".profile__description").textContent,L.addEventListener("submit",T),d(L,I),r(S)):t.contains("profile__avatar-button")&&(g.addEventListener("submit",w),g.reset(),d(g,I),r(h))}));var _,f=document.querySelector(".content"),m=document.querySelector(".places__list"),y=document.querySelector(".places__spinner"),v=[fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return t(e)})),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return t(e)}))],h=document.querySelector(".popup_type_avatar"),S=document.querySelector(".popup_type_edit"),b=document.querySelector(".popup_type_new-card"),q=document.querySelector(".popup_type_image"),L=document.forms["edit-profile"],C=document.forms["new-place"],g=document.forms.avatar,k=L.querySelector(".popup__input_type_name"),E=L.querySelector(".popup__input_type_description"),x=document.querySelector(".profile__info"),U=document.querySelector(".profile__image"),I={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function A(e,t){q.querySelector(".popup__image").src=e,q.querySelector(".popup__image").alt=t,q.querySelector(".popup__caption").textContent=t,r(q)}function T(r){var o,c;r.preventDefault(),B(S,"Сохранение..."),(o=k,c=E,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:o.value,about:c.value})}).then((function(e){return t(e)}))).then((function(e){f.querySelector(".profile__title").textContent=e.name,f.querySelector(".profile__description").textContent=e.about})).catch((function(e){console.error(e)})).finally((function(){B(S,"Сохранить")})),L.removeEventListener("submit",T),d(L,I),n(S)}function D(r){r.preventDefault();var o,c,a,i=(o=b.querySelector(".popup__input_type_card-name").value).length>1?o[0].toUpperCase()+o.slice(1).toLowerCase():o.toUpperCase(),s=b.querySelector(".popup__input_type_url").value;B(b,"Сохранение..."),(c=i,a=s,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:c,link:a})}).then((function(e){return t(e)}))).then((function(e){m.prepend(u(P(e)))})).catch((function(e){console.error(e)})).finally((function(){B(b,"Сохранить")})),C.reset(),C.removeEventListener("submit",D),d(C,I),n(b)}function w(r){r.preventDefault();var o=h.querySelector(".popup__input_type_url").value;B(h,"Сохранение..."),function(r){return fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})}).then((function(e){return t(e)}))}(o).then((function(e){U.setAttribute("style","background-image: url(".concat(e.avatar,")"))})).catch((function(e){console.error(e)})).finally((function(){B(h,"Сохранить")})),n(h)}function P(e){return{cardItem:e,handlers:{handleLike:s,handleDelete:l,handleCardClick:A},userId:x.id}}function B(e,t){e.querySelector(".popup__button").textContent=t}function N(e){e?y.classList.add("spinner_visible"):y.classList.remove("spinner_visible")}_=I,Array.from(document.querySelectorAll(_.formSelector)).forEach((function(e){!function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);p(r,n,t),r.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,r){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t,r){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(r.inputErrorClass),n.classList.remove(r.errorClass),n.textContent=""}(e,t,r):function(e,t,r,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),o.textContent=r,o.classList.add(n.errorClass)}(e,t,t.validationMessage,r)}(e,o,t),p(r,n,t)}))}))}(e,_)})),N(!0),Promise.all(v).then((function(e){x.id=e[0]._id,U.setAttribute("style","background-image: url(".concat(e[0].avatar,")")),x.querySelector(".profile__title").textContent=e[0].name,x.querySelector(".profile__description").textContent=e[0].about,e[1].forEach((function(e){m.append(u(P(e)))}))})).catch((function(e){console.error(e)})).finally((function(){N(!1)}))})();