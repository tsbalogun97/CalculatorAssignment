
const screenContainer = document.querySelector(".screenContainer");

// Function that allows numbers to populate on the screen
const buttonPress = (symbol) => {
  screenContainer.textContent += symbol;
};

// Function that allows all buttons pressable 
let allNumbersArray = document.querySelectorAll([".number", ".symbol"]);
for (numberButton of allNumbersArray) {
  let numberSymbol = numberButton.innerHTML;
  numberButton.onclick = () => {
    buttonPress(numberSymbol);
  };
}

// Clear screen function to be used with C and equalSign
// Used to remove all text from screen
const clearScreen = () => {
  screenContainer.innerHTML = "";
};

// Function let C button clear the screen when clicked
const clearScreenButton = document.querySelector(".clearScreen");
clearScreenButton.onclick = () => {
  clearScreen();
  buttonPress(0);
};

// Split screen content by math operator
const screenContentSplit = (screenContent) => {

  // split by math operator
  for (operator of "/x-+") {
    if (screenContent.includes(operator)) {
      let inputArray = screenContent
        .replaceAll("/", "*")
        .replaceAll("x", "*")
        .replaceAll("-", "*")
        .replaceAll("+", "*")
        .split("*");
      inputArray.push(operator);
      return inputArray;
    }
  }

  return [screenContent];
};

// Function that calculates the input numbers
const equalSignPress = () => {
  let screenContent = screenContainer.textContent;
  let screenContentArray = screenContentSplit(screenContent);

  console.log(screenContentArray);

  // Math operations based on the screenContentArray length and operator
  if (screenContentArray.length > 3) {
    console.log("ERR", "Length>3");
    clearScreen();
    buttonPress("ERR");
  } else if (screenContentArray.length == 1) {
    console.log(Number(screenContentArray[0]));
    clearScreen();
    buttonPress(Number(screenContentArray[0]));
  } else {
    switch (screenContentArray.pop()) {
      case "/":
        console.log("divide", screenContentArray);
        clearScreen();
        buttonPress(
          (
            Number(screenContentArray[0]) / Number(screenContentArray[1])
          ).toFixed(2)
        );
        break;
      case "x":
        console.log("times", screenContentArray);
        clearScreen();
        buttonPress(
          (
            Number(screenContentArray[0]) * Number(screenContentArray[1])
          ).toFixed(2)
        );
        break;
      case "-":
        console.log("minus", screenContentArray);
        clearScreen();
        buttonPress(
          (
            Number(screenContentArray[0]) - Number(screenContentArray[1])
          ).toFixed(2)
        );
        break;
      case "+":
        console.log("add", screenContentArray);
        clearScreen();
        buttonPress(
          (
            Number(screenContentArray[0]) + Number(screenContentArray[1])
          ).toFixed(2)
        );
        break;
      case "":
        console.log("ERR");
        clearScreen();
        buttonPress("ERR");
        break;
    }
  }
};

// onclick function for the  equalSign button
const equalSignButton = document.querySelector(".equalSign");
equalSignButton.onclick = equalSignPress;
