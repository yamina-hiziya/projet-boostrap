//recuperation dees elements du formulaire
const monFormulaire = document.getElementById('monFormulaire')
const inputname = document.getElementById('inputName');
const inputEmail = document.getElementById('inputEmail');
const inputSubject = document.getElementById('inputSubject');
const inputMessage = document.getElementById('inputMessage');

monFormulaire.addEventListener('submit', function (e) {
    e.preventdefault();
})
