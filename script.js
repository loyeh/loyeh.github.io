// function for adding the innerText of pressed button to the display

const equation = document.getElementById("equation");
const display = document.getElementById("display");
const settingContent = document.getElementById("settingContent");
const dropdowns = document.getElementsByClassName("settingContent");
// const settingIcon = document.getElementsByClassName("settingContent");
const calculatorBtn = document.getElementsByClassName("calculator_button");
const outputNode = document.getElementById("output");
const r = document.querySelector(":root");
function inputText(x) {
	let text = equation.value;
	let endChar = text.slice(-1);
	if (Number(x) && endChar != ")") {
		if (text == "0") {
			text = "";
		}
		text += x;
	} else {
		text += x;
		if (isNaN(text.slice(-2, -1))) {
			text = sieveX(x);
		}
	}
	// console.log(text);
	return text;
}
function displayEquation(text) {
	equation.value = text;
	// if (isNaN(text.slice(-1))) {
	// 	deletText(text, 1);
	// }
	resizeText();
}
// console.log(equation.value);
function sieveX(x) {
	let text = equation.value;
	let endChar = text.slice(-1);
	// console.log(endChar);
	switch (x) {
		case ".":
			text += "0.";
			displayEquation(text);
			break;
		case "+":
		case "-":
		case "\xF7":
		case "\xD7":
		case "^":
			if (endChar != "(" && endChar != ")") {
				text = deletText(equation.value, 1) + x;
				break;
			}
			if (endChar == "(" || endChar == ".") {
				x = "";
				text += x;
				break;
			}
			if (endChar == ")") {
				text += x;
				break;
			}
		case `(...)`:
			if (text == "0" || text == "") {
				text = "(";
				break;
			}
			if (endChar != ")") {
				if (!text.includes("(")) {
					if (isNaN(endChar)) {
						text += "(";
					} else {
						text += "";
					}
				} else {
					if (!isNaN(endChar)) {
						text += ")";
					} else {
						text += "(";
					}
				}
			} else {
				if (text.includes("(")) {
					if (text.includes(")")) {
						let open = text.match(/\(/g);
						let close = text.match(/\)/g);
						if (open.length > close.length) {
							text += ")";
						} else {
							text += "";
						}
					}
					displayEquation(text);
					break;
				}
			}
	}
	// console.log(text);
	displayEquation(text);
	return text;
}

function all_clear() {
	let text = "0";
	equation.style.fontSize = "inherit";
	equation.style.wordWrap = "unset";

	return text;
}

//function deletText, deletes "n" charectors from the end of the
// "text" and returns the remaning string...

function deletText(text, n) {
	text += "";
	let reminedText = "";
	for (let i = 0; i < text.length - n; i++) {
		reminedText += text[i];
	}
	if (reminedText == "") {
		reminedText = all_clear();
	}
	resizeText();
	console.log(reminedText);
	return reminedText;
}

window.onclick = function (event) {
	console.log(event.target);
	// console.log(event.target.textContent);
	if (!event.target.matches(".settingIcon")) {
		for (i = 0; i < dropdowns.length; i++) {
			let openDropdown = dropdowns[i];
			if (openDropdown.classList.contains("show")) {
				openDropdown.classList.remove("show");
			}
		}
	}
	if (event.target.matches(".settingIcon")) {
		settingContent.classList.toggle("show");
	}
	if (event.target.matches(".operator") || event.target.matches(".number")) {
		text = inputText(event.target.innerText);
	}
	if (event.target.matches(".delete")) {
		text = deletText(equation.value, 1);
	}
	if (event.target.matches(".clear")) {
		text = all_clear();
	}
	if (event.target.matches(".equals")) {
		if (outputNode.innerText == "") {
			text = "Syntax Error";
		} else {
			text = outputNode.innerText;
		}
	}
	displayEquation(text);
	output(text);
};
function calculator(event) {
	let pressdKey = event.key;

	// console.log(pressdKey);

	if (
		pressdKey == 1 ||
		pressdKey == 2 ||
		pressdKey == 3 ||
		pressdKey == 4 ||
		pressdKey == 5 ||
		pressdKey == 6 ||
		pressdKey == 7 ||
		pressdKey == 8 ||
		pressdKey == 9 ||
		pressdKey == 0 ||
		pressdKey == "+" ||
		pressdKey == "-" ||
		pressdKey == "\xF7" ||
		pressdKey == "(" ||
		pressdKey == ")" ||
		pressdKey == "." ||
		pressdKey == "\xD7"
	) {
		inputText(pressdKey);
		for (let i = 0; i < calculatorBtn.length; i++) {
			if (calculatorBtn[i].innerText == pressdKey) {
				let col = calculatorBtn[i].style.backgroundColor;
				calculatorBtn[i].style.backgroundColor = "#c44b4b89";
				setTimeout(() => {
					calculatorBtn[i].style.backgroundColor = col;
				}, 200);
			}
		}
	}

	if (pressdKey == "c" || pressdKey == "Escape") {
		all_clear();
	}

	if (pressdKey == "Backspace") {
		deletText(equation.value, 2);
	}

	resizeText();
}

function resizeText() {
	let size = parseInt(window.getComputedStyle(equation).fontSize);
	let txt = equation.value;
	if (isOverflown()) {
		while (isOverflown()) {
			if (size > 30) {
				size -= 0.1;
				equation.style.fontSize = `${size}px`;
			} else {
				equation.style.whiteSpace = "normal";
				equation.style.wordWrap = "break-word";
				equation.style.overflow = "hidden";
			}
		}
	}
	if (isSmaller()) {
		while (isSmaller() && size <= 70 && txt.length < 20) {
			size += 0.1;
			equation.style.fontSize = `${size}px`;
			equation.style.whiteSpace = "nowrap";
			equation.style.wordWrap = "unset";
			equation.style.overflow = "unset";
		}
	}
	equation.scrollTop = equation.scrollHeight;
}

function isOverflown() {
	return equation.scrollWidth * 1.05 > display.clientWidth;
}

function isSmaller() {
	return equation.scrollWidth * 1.05 < display.clientWidth;
}
function darkMode() {
	r.style.setProperty("--back", "#ffffff");
	r.style.setProperty("--btnTextColor", "#ffffff");
	r.style.setProperty("--menueTextColor", "#ffffff");
	r.style.setProperty("--displayTextColor", "wheat");
	r.style.setProperty("--numbersBackgroundColor", "#636363");
	r.style.setProperty("--operatorsBackgroundColor", "#214c7a");
	r.style.setProperty("--functionsBackgroundColor", "#404040");
	r.style.setProperty("--bodyBackgroundColor", "#000000");
	r.style.setProperty("--displayBackgroundColor", "#303030");
	r.style.setProperty("--menueBackgroundColor", "#626262");
	r.style.setProperty("--menueHoverBackgroundColor", "#0f0f0f");
	r.style.setProperty(
		"--filter",
		"invert(100%) sepia(0%) saturate(7467%) hue-rotate(133deg) brightness(114%) contrast(105%)"
	);
}
function lightMode() {
	r.style.setProperty("--back", "#ededed");
	r.style.setProperty("--btnTextColor", "#000000");
	r.style.setProperty("--menueTextColor", "#000000");
	r.style.setProperty("--displayTextColor", "000000");
	r.style.setProperty("--numbersBackgroundColor", "#d1d1d185");
	r.style.setProperty("--operatorsBackgroundColor", "#2990fe85");
	r.style.setProperty("--functionsBackgroundColor", "#7e7d7d53");
	r.style.setProperty("--bodyBackgroundColor", "#fff");
	r.style.setProperty("--displayBackgroundColor", "#e3f1ff");
	r.style.setProperty("--menueBackgroundColor", "#85c4ffb8");
	r.style.setProperty("--menueHoverBackgroundColor", "#fffffffc");
	r.style.setProperty("--filter", "none");
}
function defaultMode() {
	if (
		window.matchMedia &&
		window.matchMedia("(prefers-color-scheme: dark)").matches
	) {
		darkMode();
	} else {
		lightMode();
	}
}
function output(text) {
	let final = text;
	let endChar = text.slice(-1);
	if (isNaN(endChar) && endChar != ")") {
		final = deletText(text, 1);
	}
	let open = [0];
	let close = [0];
	if (text.includes("(")) {
		open = text.match(/\(/g);
		let n = open.length - close.length;
		if (text.includes(")")) {
			close = text.match(/\)/g);
			n = open.length - close.length - 1;
		}
		for (let i = 0; i <= n; i++) {
			final += ")";
		}
	}

	final = final
		.replace(/\^/g, "**")
		.replace(/\xD7/g, "*")
		.replace(/\xF7/g, "/");

	console.log(final);
	try {
		const result = eval(final);
		outputNode.innerText = result;
	} catch (error) {
		outputNode.innerText = "";
	}
	if (isNaN(text)) {
		outputNode.classList.add("show");
	} else {
		outputNode.classList.remove("show");
	}
}
