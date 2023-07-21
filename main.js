const RANGES = [[0, 16], [16, 17], [17, 18.5], [18.5, 25], [25, 30], [30, 35], [35, 40], [40, 200]];
const unitElements = document.getElementsByName('unit');

let unit;
let BMI;

init();

function init() {

    unit = 'METRIC';
    unitElements[0].checked = true;
    changeUnit(unit);

}

function changeUnit(name) {

    const heightUS = document.getElementById('height-us');
    const heightMetric = document.getElementById('height-metric');
    const weightUnit = document.getElementById('weight-unit');

    unit = name;

    if (name == 'METRIC') {
        weightUnit.innerText = 'kg';
        heightUS.style.display = 'none';
        heightMetric.style.display = 'flex';
    }
    else {
        weightUnit.innerText = 'pounds';
        heightMetric.style.display = 'none';
        heightUS.style.display = 'flex';
    }
}

unitElements.forEach(element => {
    element.addEventListener('click', (e) => {
        changeUnit(element.value);
    });
})

document.getElementById('submit').addEventListener('click', (e) => {
    e.preventDefault();

    const bmiElement = document.getElementById('bmi');
    const age = document.getElementById('age').value;

    if (age >= 2) {
        BMI = calculateBMI();

        if (age <= 20) {
            bmiElement.innerText = ' Use BMI calculator for children and teens';
        }
        else {
            bmiElement.innerText = 'Your BMI is ' + BMI.toFixed(2);
            outlineInTable();
        }
    }
})

function outlineInTable() {

    const tableElement = document.getElementById('table');

    RANGES.forEach((range, i) => {
        tableElement.querySelectorAll('tr')[i + 1].classList.remove('outlined');
        if (BMI >= range[0] && BMI < range[1]) {
            tableElement.querySelectorAll('tr')[i + 1].classList.add('outlined');
        }
    })
}

function calculateBMI() {

    let weight = +document.getElementById('weight').value;
    let height;
    let bmi;

    if (unit == 'US') {
        height = document.getElementById('feet').value * 12 + +document.getElementById('inches').value;
        bmi = (weight / (height * height)) * 703;
    }
    else if (unit == 'METRIC') {
        height = document.getElementById('height').value / 100;
        bmi = weight / (height * height);
    }

    return bmi;
}
