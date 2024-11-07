document.addEventListener("DOMContentLoaded", () => {
  const billInput = document.getElementById("bill");
  const peopleInput = document.getElementById("people");
  const tipButtons = document.querySelectorAll(".splitter__tip-button");
  const customTipInput = document.querySelector(".splitter__input--custom");
  const tipAmountDisplay = document.querySelectorAll(".splitter__result-value")[0];
  const totalDisplay = document.querySelectorAll(".splitter__result-value")[1];

  let tipPercentage = 0;

  function calculateAmounts() {
    const billValue = parseFloat(billInput.value);
    const peopleCount = parseInt(peopleInput.value, 10);

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

  tipButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tipButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      tipPercentage = parseFloat(button.textContent);
      customTipInput.value = "";

      calculateAmounts();
    });
  });

  customTipInput.addEventListener("input", () => {
    tipButtons.forEach((button) => button.classList.remove("active"));
    tipPercentage = parseFloat(customTipInput.value) || 0;

    calculateAmounts();
  });

  billInput.addEventListener("input", calculateAmounts);
  peopleInput.addEventListener("input", calculateAmounts);
});
