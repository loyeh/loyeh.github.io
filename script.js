// function for adding the value of pressed button to the display

const equation = document.getElementById("equation");
const display = document.getElementById("display");

function inputText(x) {
	if (equation.value == "0") {
		equation.value = "";
	}
	equation.value += x;
}

// console.log(equation.innerText);

function all_clear() {
	equation.value = "0";
	equation.style.fontSize = "inherit";
}

function deletText() {
	let d = equation.value;
	let text = "";
	for (let i = 0; i < d.length - 1; i++) {
		text += d[i];
	}
	if (text == "") {
		text = "0";
	}
	equation.value = text;
}

function showSetting() {
	const settingContent = document.getElementById("settingContent");
	const settingIcon = document.getElementById("settingIcon");
	settingContent.style.display = "block";
	settingIcon.style.opacity = 1;
	settingIcon.style.filter =
		"invert(0%) sepia(6%) saturate(7478%) hue-rotate(307deg) brightness(98%) contrast(106%)";
	settingIcon.style.backgroundColor = "white";
}

function calculator(event) {
	let vari = event.key;
	console.log(vari);

	if (
		vari == 1 ||
		vari == 2 ||
		vari == 3 ||
		vari == 4 ||
		vari == 5 ||
		vari == 6 ||
		vari == 7 ||
		vari == 8 ||
		vari == 9 ||
		vari == 0 ||
		vari == "+" ||
		vari == "-" ||
		vari == "/" ||
		vari == "%" ||
		vari == "."
	) {
		inputText(vari);
	}

	if (vari == "c" || vari == "Escape") {
		all_clear();
	}
	if (vari == "*") {
		inputText("x");
	}
	if (vari == "Backspace") {
		deletText();
	}
	let equationText = equation.value;
	let size = window.getComputedStyle(equation).fontSize;
	let s = document.getElementById("equation").style.fontSize;
	let e = "";
	for (let i = 0; i < size.length - 2; i++) {
		e += size[i];
	}
	console.log(equationText.length, size, typeof s, s, e);

	if (equationText.length > equation.cols) {
		if (equation.cols < 20) {
			equation.style.fontSize = `${e * 0.75}px`;
			equation.cols = Math.round(1.33333 * equation.cols);
		} else if (equation.rows < 3) {
			equation.rows++;
		}
	}
}
