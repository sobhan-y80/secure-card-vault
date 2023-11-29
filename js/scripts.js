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
