// length value
var characterAmountRange = document.querySelector(".length-range");
var characterAmountNumber = document.querySelector(".length-number");
// main element
var resultEl = document.getElementById("result");
var lengthEl = document.getElementById("length");
var uppercaseEl = document.getElementById("uppercase");
var lowercaseEl = document.getElementById("lowercase");
var numbersEl = document.getElementById("numbers");
var symbolsEl = document.getElementById("symbols");
var generateEl = document.getElementById("generate");
var clipboard = document.getElementById("clipboard");
// object to cantact function
var randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
}

// length value evnt listener
characterAmountRange.addEventListener("input", syncCharacterAmount);
characterAmountNumber.addEventListener("input", syncCharacterAmount);
// copy event listener
clipboard.addEventListener("click", () => {
	var textarea = document.createElement("textarea");
	var password = resultEl.innerText;

	if(!password) { return; }

	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand("copy");
	textarea.remove();
	alert("Password copied to clipboard");
});
// main event listener to create random passwords
generate.addEventListener("click", (event) => {
  event.preventDefault();
	var length = lengthEl.value;
	var hasLower = lowercaseEl.checked;
	var hasUpper = uppercaseEl.checked;
	var hasNumber = numbersEl.checked;
	var hasSymbol = symbolsEl.checked;

	resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});
// function to content random passwords
function generatePassword(lower, upper, number, symbol, length) {
	var generatedPassword = "";
	var typesCount = lower + upper + number + symbol;
	var typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);

	// Doesn"t have a selected type
	if(typesCount === 0) {
		return "";
	}

	// create a loop
	for(var i=0; i<length; i+=typesCount) {
		typesArr.forEach(type => {
			var funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}

	var finalPassword = generatedPassword.slice(0, length);


  return finalPassword;

}
// function for random lowercase
function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
// function for random uppercase
function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
// function for random number
function getRandomNumber() {
	return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
// function for random symbol
function getRandomSymbol() {
	var symbols = arrayFromLowToHigh(33, 47).concat(
        arrayFromLowToHigh(58, 64)
      ).concat(
        arrayFromLowToHigh(91, 96)
      ).concat(
        arrayFromLowToHigh(123, 126)
      );
	return String.fromCharCode(symbols[Math.floor(Math.random() * symbols.length)]);
}
function arrayFromLowToHigh(low, high) {
      var array = [];
      for (var i = low; i <= high; i++) {
          array.push(i);
      }
      return array;
  }

// length value function
function syncCharacterAmount(event) {
  var value = event.target.value;
  characterAmountNumber.value = value;
  characterAmountRange.value = value;
}
