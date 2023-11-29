//$$ Variables
const bankNameInputElm = document.querySelector(".form__card_bank_name");
const ownerCardInputElm = document.querySelector(".form__card_bank_name");
const cardNumberInputsElm = document.querySelectorAll(".form__card_number_field");
const yearInputElm = document.querySelector("input.form__year_field");
const monthInputElm = document.querySelector("input.form__month_field");

const ins = document.querySelector("input");

//$$ Methods

const isClassList = (mainClassList, className) => mainClassList?.contains(className);
const saveLocalStorage = (key, value) => localStorage.setItem(key, value);
const getLocalStorage = (key) => localStorage.getItem(key);

const numberInputHandler = (element) =>
    element.addEventListener("keypress", (e) =>
        e.keyCode >= 48 && e.keyCode <= 57 ? (element.value = e.target.value) : e.preventDefault()
    );

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

const saveCardAction = () => {
    // const year
};
