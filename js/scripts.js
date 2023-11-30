//$$ Variables
const bankNameInputElm = document.querySelector(".form__card_bank_name");
const ownerCardInputElm = document.querySelector(".form__card_owner_name");
const cardNumberInputsElm = document.querySelectorAll(".form__card_number_field");
const yearInputElm = document.querySelector("input.form__year_field");
const monthInputElm = document.querySelector("input.form__month_field");
const cvv2 = document.querySelector(".form__cvv2_field");
const form = document.querySelector(".form");

//$$ Methods

const isClassList = (mainClassList, className) => mainClassList?.contains(className);
const numberInputHandler = (element) =>
    element.addEventListener("keypress", (e) =>
        e.keyCode >= 48 && e.keyCode <= 57 ? (element.value = e.target.value) : e.preventDefault()
    );
const saveLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key));
const clearStorage = () => localStorage.clear();
const removeSpecificValueFromStorage = (id) => {
    const mainCard = getLocalStorage("cards").filter((value) => value.id !== id);
    saveLocalStorage("cards", mainCard);
};
const getCardNumber = () => {
    let cardNumber;
    cardNumberInputsElm.forEach((input, key) => (key === 0 ? (cardNumber = input.value) : (cardNumber += input.value)));
    return cardNumber;
};
const clearForm = () => {
    bankNameInputElm.value = "";
    ownerCardInputElm.value = "";
    cardNumberInputsElm.forEach((input) => (input.value = ""));
    yearInputElm.value = "";
    monthInputElm.value = "";
    cvv2.value = "";
};
const saveCardAction = () => {
    const newInfo = {
        id: crypto.randomUUID(),
        ownerName: ownerCardInputElm.value.trim(),
        bankName: bankNameInputElm.value.trim(),
        cardBank: getCardNumber().trim(),
        year: yearInputElm.value.trim(),
        month: monthInputElm.value.trim(),
        cvv2: cvv2.value.trim(),
    };
    const cards = getLocalStorage("cards");
    const mainCards = Array.isArray(cards) ? [...cards, { ...newInfo }] : [{ ...newInfo }];
    saveLocalStorage("cards", mainCards);
    clearForm();
    renderCard();
};

const renderCard = () => {
    const cardsWrapperElm = document.querySelector(".card__wrapper");
    const cardList = getLocalStorage("cards");
    if (Array.isArray(cardList) && cardList.length) {
        cardsWrapperElm.classList.remove("hidden");
        const cardListElm = cardList.map(
            (card) =>
                `<div id="${card.id}" class="card">
                    <button class="card__remove_btn no_color">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 5L19 19M5.00003 19L12 12L19 5" stroke="#2D264B" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </button>
                    <div class="circle_card"></div>
                    <h1 class="card__bank_name pointer copy" data-value="${card?.bankName}" >${card?.bankName}</h1>
                    <div class="card__chip_wrapper">
                        <img class="card__chip" src="/public/images/credit-chip.png" alt="" />
                    </div>
                    <div title="click to copy">
                        <div id="card__card_number_wrapper" class="pointer copy" data-value="${card?.cardBank}">
                        ${card?.cardBank
                            .match(/.{1,4}/g)
                            .map((number) => `<span>${number}</span>`)
                            .join(" ")}
                        </div>
                        <div class="card__date copy" data-value="${card?.year}">
                            <span id="year" class="pointer" title="click to copy">
                                ${card?.year}
                            </span>
                            /
                            <span id="month" class="pointer copy" data-value="${card?.month}">
                                ${card?.month}
                            </span>
                        </div>
                        <div id="cvv2" class="pointer copy" data-value="${card?.cvv2}">CVV2 : ${card?.cvv2}</div>
                        <div title="click to copy" id="card__owner_name" class="pointer copy" data-value="${
                            card?.ownerName
                        }">
                            ${card?.ownerName}
                        </div>
                    </div>
                </div>`
        );
        cardsWrapperElm.innerHTML = `
        <div class="card_list_title">
            <h2>Card List</h2>
            <button class="remove_all_btn">Remove All</button>
        </div> 
        ${cardListElm.join(" ")}`;
        cardsWrapperElm.querySelectorAll(".remove_all_btn").forEach((btn) =>
            btn.addEventListener("click", () => {
                clearStorage();
                renderCard();
            })
        );

        const removeBtns = cardsWrapperElm.querySelectorAll(".card__remove_btn");
        removeBtns.forEach((removeBtn) =>
            removeBtn.addEventListener("click", () => {
                removeSpecificValueFromStorage(removeBtn.parentElement.id);
                renderCard();
            })
        );

        const mainCopysElems = cardsWrapperElm.querySelectorAll(".copy");
        mainCopysElems.forEach((elm) =>
            elm.addEventListener("click", () => navigator.clipboard.writeText(elm.dataset.value))
        );
    } else {
        cardsWrapperElm.classList.add("hidden");
    }
};

//$$ Evnet Handler
cardNumberInputsElm.forEach((inputFiled) => {
    inputFiled.addEventListener("focus", () => inputFiled.select());
    inputFiled.addEventListener("input", (e) => {
        if (e.target.value.length === 4) {
            isClassList(e.target.nextElementSibling?.classList, "form__card_number_field")
                ? e.target.nextElementSibling.focus()
                : undefined;
        } else if (e.target.value.length === 0) {
            isClassList(e.target.previousElementSibling?.classList, "form__card_number_field")
                ? e.target.previousElementSibling.focus()
                : undefined;
        }
    });
});
numberInputHandler(yearInputElm);
numberInputHandler(monthInputElm);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    saveCardAction();
});

window.addEventListener("load", renderCard);
