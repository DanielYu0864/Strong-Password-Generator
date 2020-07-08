// length value
var characterAmountRange = document.querySelector(".length-range");
var characterAmountNumber = document.querySelector(".length-number");
//  clipboard
var clipboard = document.getElementById("clipboard");
// caseoptions
var characterAmountEl = document.querySelector("#length");
var includeUpperCaseEl = document.querySelector("#uppercase");
var includeLowerCaseEl = document.querySelector("#lowercase");
var includeNumbersEl = document.querySelector("#numbers");
var includeSymbolsEl = document.querySelector("#symbols");
// result
var result = document.querySelector("#result");
var generateBtn = document.querySelector("#generate");
// charcodes
var uppercaseCherCodes = arrayFromLowToHigh(65, 90);
var lowercaseCharCodes = arrayFromLowToHigh(97, 122);
var NumberCharCodes = arrayFromLowToHigh(48, 57);
var symbolCharCodes = arrayFromLowToHigh(33, 47).concat(
    arrayFromLowToHigh(58, 64)
  ).concat(
    arrayFromLowToHigh(91, 96)
  ).concat(
    arrayFromLowToHigh(123, 126)
  );

// length value listener
characterAmountRange.addEventListener("input", syncCharacterAmount);
characterAmountNumber.addEventListener("input", syncCharacterAmount);

// copy event listener
clipboard.addEventListener("click", () => {
	var textarea = document.createElement("textarea");
	var password = result.innerText;

	if(!password) {
    alert("Nothing to be copied");
    return; }

	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand("copy");
	textarea.remove();
	alert("Password copied to clipboard");
});

// event listener to call the function
generateBtn.addEventListener("click", event => {
    event.preventDefault();
    var characterAmount = characterAmountEl.value;
    var includeUpperCase = includeUpperCaseEl.checked;
    var includeLowerCase = includeLowerCaseEl.checked;
    var includeNumbers = includeNumbersEl.checked;
    var includeSymbols = includeSymbolsEl.checked;
    var password = generatePassword(characterAmount, includeUpperCase, includeLowerCase, includeNumbers, includeSymbols)
    result.textContent = password;
});

// function to create radom password
function generatePassword(characterAmount, includeUpperCase, includeLowerCase, includeNumbers, includeSymbols) {
	var passwordCharacters = [];
    var characterAmount = characterAmountEl.value;
    if (includeUpperCase) passwordCharacters = passwordCharacters.concat(uppercaseCherCodes);
    if (includeLowerCase) passwordCharacters = passwordCharacters.concat(lowercaseCharCodes);
    if (includeNumbers) passwordCharacters = passwordCharacters.concat(NumberCharCodes);
    if (includeSymbols) passwordCharacters = passwordCharacters.concat(symbolCharCodes);
	var newPassword = [];
    for (var i = 0; i < characterAmount; i++) {
        var characterCode = passwordCharacters[Math.floor(Math.random() * passwordCharacters.length)];
		newPassword.push(String.fromCharCode(characterCode));
    }
	return newPassword.join("");
}
// length value function
function syncCharacterAmount(event) {
    var value = event.target.value;
    characterAmountNumber.value = value;
    characterAmountRange.value = value;
  }
// funtion to run array
function arrayFromLowToHigh(low, high) {
    var array = [];
    for (var i = low; i <= high; i++) {
        array.push(i);
    }
    return array;
}