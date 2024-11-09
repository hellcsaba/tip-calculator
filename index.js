document.addEventListener("DOMContentLoaded", () => {
  const billInput = document.getElementById("bill");
  const peopleInput = document.getElementById("people");
  const tipButtons = document.querySelectorAll(".splitter__tip-button");
  const customTipInput = document.querySelector(".splitter__input--custom");
  const tipAmountDisplay = document.querySelectorAll(".splitter__result-value")[0];
  const totalDisplay = document.querySelectorAll(".splitter__result-value")[1];
  const resetButton = document.querySelector(".splitter__reset-button");

  let tipPercentage = 0;

  function calculateAmounts() {
    const billValue = parseFloat(billInput.value);
    const peopleCount = parseInt(peopleInput.value);

    if (isNaN(billValue) || billValue <= 0 || isNaN(peopleCount) || peopleCount <= 0) {
      tipAmountDisplay.textContent = "$0.00";
      totalDisplay.textContent = "$0.00";
      return;
    }

    const tipAmount = (billValue * tipPercentage) / 100;
    const tipPerPerson = tipAmount / peopleCount;
    const totalPerPerson = billValue / peopleCount + tipPerPerson;

    tipAmountDisplay.textContent = `$${tipPerPerson.toFixed(2)}`;
    totalDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;
  }

  function enableResetButton() {
    const billValue = parseFloat(billInput.value);
    const peopleCount = parseInt(peopleInput.value);

    if (billValue && peopleCount && tipPercentage) {
      resetButton.disabled = false;
    } else {
      resetButton.disabled = true;
    }
  }

  tipButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tipButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      tipPercentage = parseFloat(button.textContent);
      customTipInput.value = "";

      calculateAmounts();
      enableResetButton();
    });
  });

  customTipInput.addEventListener("input", () => {
    tipButtons.forEach((button) => button.classList.remove("active"));
    tipPercentage = parseFloat(customTipInput.value) || 0;

    calculateAmounts();
    enableResetButton();
  });

  billInput.addEventListener("input", () => {
    calculateAmounts();
    enableResetButton();
  });

  peopleInput.addEventListener("input", () => {
    calculateAmounts();
    enableResetButton();
  });

  resetButton.addEventListener("click", () => {
    billInput.value = "";
    peopleInput.value = "";
    customTipInput.value = "";
    tipButtons.forEach((button) => button.classList.remove("active"));
    tipPercentage = 0;

    tipAmountDisplay.textContent = "$0.00";
    totalDisplay.textContent = "$0.00";
    resetButton.disabled = true; // Disable button after reset
  });
});
