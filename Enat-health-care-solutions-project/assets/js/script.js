// constant variables
// form
// const form = document.getElementById("form-side");
const form = document.getElementById("metric-unit");

// input fields
const cm = document.getElementById("m-height");
const kg = document.getElementById("m-weight");

// result text field
//  default welcome text
const welcome = document.getElementById("welcome");
// BMI result display in number
const resultBmi = document.querySelector("#result-BMI");
const resultNumber = document.querySelector("#result-numb");
const resultBodyCont = document.querySelector("#result-body");

// Range of BMI  (underweight, normal etc..)
let rangeBmi = document.querySelector("#range-bmi");
const minWeight = document.querySelector("#result-min-weight");
const maxWeight = document.querySelector("#result-max-weight");

// BMI range category
const BMI_CATEGORIES = [
  { max: 16, label: "Severely underweight" },
  { max: 16.99, label: "Moderately underweight" },
  { max: 18.49, label: "Mildly underweight" },
  { max: 24.99, label: "Healthy weight" },
  { max: 29.99, label: "Overweight" },
  { max: 34.99, label: "Obese Class I" },
  { max: 39.99, label: "Obese Class II" },
  { max: Infinity, label: "Obese Class III" },
];
// min and max weight constant
const HEALTHY_MIN_BMI = 18.5;
const HEALTHY_MAX_BMI = 24.9;

// the function that handle the BMI calculation
// console.log("cm value", cm.value);
const calcBmi = () => {
  const valueHeight = cm.value;
  const valueWeight = kg.value;
  //  Scientific formula to calculate BMI
  //   bmi= kg/m2
  bmi = ((valueWeight / (valueHeight * valueHeight)) * 10000).toFixed(2);
  resultBmi.textContent = bmi;
  const heightToM = valueHeight / 100;

  //   calculate min and max weight
  const minWeightRange = (18.5 * heightToM * heightToM).toFixed(2);
  const maxWeightRange = (24.99 * heightToM * heightToM).toFixed(2);
  // write or display min and max range on both result displayer(inside form)
  minWeight.textContent = `${minWeightRange} kg`;
  maxWeight.textContent = `${maxWeightRange} kg`;

  if (bmi < 16) {
    rangeBmi.textContent = "Severely underweight";
  } else if (bmi >= 16 && bmi < 16.99) {
    rangeBmi.textContent = "Moderately underweight";
  } else if (bmi >= 17 && bmi < 18.49) {
    rangeBmi.textContent = "Mildly underweight";
  } else if (bmi >= 18.5 && bmi < 24.99) {
    rangeBmi.textContent = "Healthy weight";
    rangeBmi.style.fontWeight="bolder"
  } else if (bmi >= 25 && bmi < 29.99) {
    rangeBmi.textContent = "Overweight";
  } else if (bmi >= 30 && bmi < 34.99) {
    rangeBmi.textContent = "Obese Class I";
  } else if (bmi >= 35 && bmi < 39.99) {
    rangeBmi.textContent = "Obese Class II";
  } else {
    rangeBmi.textContent = "Obese Class III";
  }
  //    hide welcome default message and show the result box
  resultNumber.style.display = "block";
  resultBodyCont.style.display = "block";
  welcome.style.display = "none";
};

//  the function that handle the BMI calculation method-2
const calcBmi2=()=> {
  const valueHeight = parseFloat(cm.value);
  const valueWeight = parseFloat(kg.value);
  
  // Calculate BMI
  const bmi = ((valueWeight / Math.pow(valueHeight, 2)) * 10000).toFixed(2);
  resultBmi.textContent = bmi;

  // Calculate healthy weight range
  const heightInM = valueHeight / 100;
  const minWeightRange = (HEALTHY_MIN_BMI * Math.pow(heightInM, 2)).toFixed(2);
  const maxWeightRange = (HEALTHY_MAX_BMI * Math.pow(heightInM, 2)).toFixed(2);

  minWeight.textContent = `${minWeightRange} kg`;
  maxWeight.textContent = `${maxWeightRange} kg`;

  // Determine BMI category
  const bmiNum = parseFloat(bmi);
  for (const category of BMI_CATEGORIES) {
    if (bmiNum < category.max) {
      rangeBmi.textContent = category.label;
      break;
    }
  }

  // Show results
  resultNumber.style.display = "block";
  resultBodyCont.style.display = "block";
  welcome.style.display = "none";
}

function limitInput() {
  if (cm.value.length > 3 || kg.value.length > 3) {
    cm.value = cm.value.slice(0, 3);
    kg.value = kg.value.slice(0, 3);
  }
}

// attach limit input function to event listener methods
cm.addEventListener("input", limitInput);
kg.addEventListener("input", limitInput);

// bind calcBmi to event listener method
form.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && cm.value !== "" && kg.value !== "") {
    e.preventDefault();
    calcBmi();
  }
});
