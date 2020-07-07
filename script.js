// length value
var characterAmountRange = document.querySelector(".length-range");
var characterAmountNumber = document.querySelector(".length-number");


// length value
characterAmountRange.addEventListener("input", syncCharacterAmount);
characterAmountNumber.addEventListener("input", syncCharacterAmount);


// length value
function syncCharacterAmount(event) {
    var value = event.target.value;
    characterAmountNumber.value = value;
    characterAmountRange.value = value;
  }

var resultEl = document.getElementById("result");
var lengthEl = document.getElementById("length");
var uppercaseEl = document.getElementById("uppercase");
var lowercaseEl = document.getElementById("lowercase");
var numbersEl = document.getElementById("numbers");
var symbolsEl = document.getElementById("symbols");
var generateEl = document.getElementById("generate");
var clipboard = document.getElementById("clipboard");

var randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
}

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

generate.addEventListener("click", (event) => {
  event.preventDefault();
	var length = lengthEl.value;
	var hasLower = lowercaseEl.checked;
	var hasUpper = uppercaseEl.checked;
	var hasNumber = numbersEl.checked;
	var hasSymbol = symbolsEl.checked;

	resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

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

function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

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


  // // caseoptions
// var characterAmountEl = document.querySelector("#length");
// var includeUpperCaseEl = document.querySelector("#uppercase");
// var includeLowerCaseEl = document.querySelector("#lowercase");
// var includeNumbersEl = document.querySelector("#numbers");
// var includeSymbolsEl = document.querySelector("#symbols");
// // result
// var result = document.querySelector("#result");
// var form = document.querySelector("#generate");
// // charcodes
// var UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
// var LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
// var NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
// var SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(
//     arrayFromLowToHigh(58, 64)
//   ).concat(
//     arrayFromLowToHigh(91, 96)
//   ).concat(
//     arrayFromLowToHigh(123, 126)
//   );

// form.addEventListener("click", event => {
//     event.preventDefault();
//     var characterAmount = characterAmountEl.value;
//     var includeUpperCase = includeUpperCaseEl.checked;
//     var includeLowerCase = includeLowerCaseEl.checked;
//     var includeNumbers = includeLowerCaseEl.checked;
//     var includeNumbers = includeNumbersEl.checked;
//     var includeSymbols = includeSymbolsEl.checked;
//     var password = generatePassword(characterAmount, includeUpperCase, includeLowerCase, includeNumbers, includeSymbols)
//     result.textContent = password;
// })

// function generatePassword(characterAmount, includeUpperCase, includeLowerCase, includeNumbers, includeSymbols) {

//     var characterAmount = characterAmountEl.value;
//     if (includeUpperCase) passwordCharacters = passwordCharacters.concat(UPPERCASE_CHAR_CODES);
//     if (includeLowerCase) passwordCharacters = passwordCharacters.concat(LOWERCASE_CHAR_CODES);
//     if (includeNumbers) passwordCharacters = passwordCharacters.concat(NUMBER_CHAR_CODES);
//     if (includeSymbols) passwordCharacters = passwordCharacters.concat(SYMBOL_CHAR_CODES);

//     // var characterCount = includeUpperCase + includeLowerCase + includeNumbers + includeSymbols;
//     var passwordCharacters = [];

//     for (var i = 0; i < characterAmount; i++) {
//         var characterCode = passwordCharacters[Math.floor(Math.random() * characterAmountEl.value)];
//         passwordCharacters.push(String.fromCharCode(characterCode));
//         return passwordCharacters.join("");
//     }
//     console.log(passwordCharacters);
// }

// function arrayFromLowToHigh(low, high) {
//     var array = [];
//     for (var i = low; i <= high; i++) {
//         array.push(i);
//     }
//     return array;
// }
