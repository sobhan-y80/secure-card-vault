//$$ Variables
const cardNumberInputsElm = document.querySelectorAll(".form__card_number_field");

//$$ Methods

const isClassList = (mainClassList, className) => mainClassList?.contains(className);

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
