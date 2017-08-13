const k = {
  sex: null,
  weight: null,
  length: null,
  age: null,
  exercise: null
}

const iMan = document.getElementById("i-man");
const iWoman = document.getElementById("i-woman");
const iWeight = document.getElementById("i-weight");
const iLength = document.getElementById("i-length");
const iAge = document.getElementById("i-age");
const iExercise = document.getElementById("i-exercise");

const iCalculate = document.getElementById("calculate");
const spanError = document.getElementById("error");
const divResult = document.getElementById("result");

iCalculate.addEventListener("click", e => {
  setTimeout(() => e.target.className = "second-click-effect", 400);
  e.target.className = "first-click-effect";
});

iMan.addEventListener("click", e => {
  if(e.target.style.backgroundColor === "rgba(226, 141, 141, 0.6)") return;
  iWoman.style.backgroundColor = "#fff";
  e.target.style.backgroundColor = "rgba(226, 141, 141, 0.6)";
  k.sex = "man";
});

iWoman.addEventListener("click", e => {
  if(e.target.style.backgroundColor === "rgba(226, 141, 141, 0.6)") return;
  iMan.style.backgroundColor = "#fff";
  e.target.style.backgroundColor = "rgba(226, 141, 141, 0.6)";
  k.sex = "woman";
});

iCalculate.addEventListener("click", () => {
  if(!k.sex) {
    iMan.style.borderColor = "#cc0000";
    iWoman.style.borderColor = "#cc0000";
    return spanError.innerHTML = 'Välj man eller kvinna.';
  } else {
    iMan.style.borderColor = "#e28d8d";
    iWoman.style.borderColor = "#e28d8d";
  }

  k.weight = iWeight.value.trim();
  if(!k.weight) {
    iWeight.style.borderColor = "#cc0000";
    return spanError.innerHTML = 'Vikt saknas.';
  } else {
    iWeight.style.borderColor = "#e28d8d";
  }

  k.length = iLength.value.trim();
  if(!k.length) {
    iLength.style.borderColor = "#cc0000";
    return spanError.innerHTML = 'Längd saknas.';
  } else {
    iLength.style.borderColor = "#e28d8d";
  }

  k.age = iAge.value.trim();
  if(!k.age) {
    iAge.style.borderColor = "#cc0000";
    return spanError.innerHTML = 'Ålder saknas.';
  } else {
    iAge.style.borderColor = "#e28d8d";
  }

  k.exercise = iExercise.value;
  if(!k.exercise) {
    iExercise.style.borderColor = "#cc0000";
    return spanError.innerHTML = 'Aktivitetsnivå saknas!';
  } else {
    iAge.style.borderColor = "#e28d8d";
  }

  spanError.innerHTML = null;

  let kcal = 0;
  if(k.sex === "man") kcal += 5;
  if(k.sex === "woman") kcal -= 161;
  kcal += (10*k.weight);
  kcal += (6.25*k.length);
  kcal -= (5*k.age);
  kcal *= k.exercise;

  return divResult.innerHTML = '<div style="margin-top:2rem;font-size:2.6rem"><em>Behåll vikten:</em></div><div style="margin-top:-1.8rem;font-size:9rem">'+Math.round(kcal)+'</div><div style="margin-top:-1.8rem;font-size:2.6rem"><em>kcal per dag</em></div><div style="margin-top:-1.8rem;font-size:2.6rem"><em>ungefär.</em></div>';
});
