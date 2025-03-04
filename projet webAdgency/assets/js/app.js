//recuperation des elements du formulaire
// const monFormulaire = document.getElementById('monFormulaire')
// const inputName = document.getElementById('inputName');
// const inputEmail = document.getElementById('inputEmail');
// const inputSubject = document.getElementById('inputSubject');
// const inputMessage = document.getElementById('inputMessage');

// // //ajouter un ecouteur pour le formulaire et comportement par defaut 
// monFormulaire.addEventListener('submit', function (e) {
//     e.preventDefault();

//     if (inputName.value.trim() === '' || inputEmail.value.trim() === '' || inputSubject.value.trim() === '' || inputMessage == null) {
//         inputName.value = 'erreur : le champ ne peut pas etre vide';
//         console.log(inputName);
//         //inputName.style.borderColor = 'red';
//         // inputName.style.borderWidth = '1px';
//         // inputName.style.borderStyle = 'solid';
//         //    inputName.style.color = 'red';
//         inputName.style.border = 'solid 1px red';
//         return;
//     }
//     inputName.textContent = `formulaire soumis avec le nom : ${inputName},${inputEmail},${inputSubject},${inputMessage}`;
//     inputName.style.border = 'solid 1px green';
//     console.log(`formulaire soumis avec le nom : ${inputName},${inputEmail},${inputSubject},${inputMessage}`);
//     monFormulaire.reset();

// });

// // fonction de verification du formulaire 
// function checkForm() {
//     const inputs = document.querySelectorAll('#monFormulaire input,#monFormulaire textarea');
//     let formIsValid = true;

//     inputs.forEach(input => {
//         if (input.value.trim() === '') {
//             input.style.border = '2px solid red';
//             formIsValid = false;
//         } else {
//             input.style.border = '2px solid green'
//         }
//     })
// }
// //verification a la soumission 

// document.getElementById('monFormulaire').addEventListener('submit', function (event) {
//     if (!checkForm()) {
//         event.preventDefault();
//         alert('veuillez remplir tous les champs du formulaire.');
//     }
// });

// //verification en temps reels
// document.querySelectorAll('#monFormulaire input,#monFormulaire textarea').forEach(input => {
//     input.addEventListener('input', function () {
//         if (this.value.trim() === '') {
//             this.style.border = '2px solid red';
//         } else {
//             this.style.border = '2px solid green'
//         }
//     })
// })

//attendre que le dom soit completement chargé
document.addEventListener('DOMContentLoaded', function () {


    // ===== PROTECTION CONTRE LES ATTAQUES XSS =====

    // La fonction escapeHtml convertit les caractères spéciaux en entités HTML
    // Cela empêche l'injection de code malveillant (attaques XSS)
    // Par exemple: "<script>" devient "&lt;script&gt;" et ne sera pas exécuté comme du code
    function escapeHTML(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;") //remplace & par &amp;
            .replace(/</g, "&lt;") // remplace < par &lt;
            .replace(/>/g, "&gt;") //remplace > par &gt;
            .replace(/"/g, "&quot;") //remplace " par &quot;
            .replace(/'/g, "&039;"); // remplace ' par &039;
    }


    //====== VALIDATION DU FORMULAIRE ======
    //cette fonction verifie si tous les champs du formulaire sont remplis
    function checkForm() {
        //selectionne tous les champs du formulaire (inputs et textareas)
        const inputs = document.querySelectorAll('#monFormulaire input,#monFormulaire textarea');
        let formIsValid = true;

        //parcourt chaque champs pour vérifier s'il est vide
        inputs.forEach(input => {
            //trim()enleve les espaces au début et à la fin du texte
            if (input.value.trim() === '') {
                //si le champ est vide, on ajoute une bordure rouge
                input.style.border = '2px solid red';
                formIsValid = false;
            } else {
                //si le champs est rempli, on ajoute une bordure verte
                input.style.border = ' 2px solid green';
            }
        });
        //retourne true si tous les champs sont remplis, false sinon
        return formIsValid;

    }
    //======PREPARATION DES DONNEES POUR LE BACKEND ====
    // cette fonction recupere les valeurs du formulaires et les sécurise contre les attaques xss

    function prepareDataForBackend() {
        //selectionne tous les champs du formulaire (inputs et textareas)
        const formElements = document.querySelectorAll('#monFormulaire input,#monFormulaire textarea');
        //crée un objet vide pour stocker les données 
        const sanitazeData = {};

        //parcourt chaque champ du formulaire
        formElements.forEach(input => {
            if (input.name) {
                //pour chaque champ, on ajoute sa valeur sécurisée à l'objet
                // la clé est le nom du champ (name), la valeur est le contenu sécurisé
                sanitazeData[input.name] = escapeHTML(input.value);
            }
        });
        //retourne l'objet contenant toutes les données sécurisés
        return sanitazeData;
    }



    //====== gestion de la soumission du formulaire ======
    // recupere le formulaire par son ID
    const form = document.getElementById('monformulaire');

    if (form) {
        //ajoute un ecouteur d'événement sur la soumission du formulaire
        form.addEventListener('submit', function (event) {
            //empeche le comportement par default (rechargement de la page)
            event.preventDefault();

            //verifie si le formulaire est valide (tous les champs sont remplis)
            if (!checkForm()) {
                //verifie si le formulaire est valide (tous les champs sont remplis )
                alert('veuillez remplir tous les champs du formulaire.');
                return;
            }

            // si le formulaire est valide, je prepare les données sécurisées
            const sanitazeData = prepareDataForBackend();

            //affiche les données dans la console (pour demonstration)
            //dans une cas reel, on enverrait ces donnes a un serveur
            consol.log('Données prêtes pour envoi au backend:', sanitazeData);

            //AFFICHAGE DU MESSAGE DE SUCCES =====
            //recupere les elements necessaires
            const form = document.getElementById('monFormulaire');
            const succesMessage = document.getElementById('sucess-message');

            //cache le formulaire et affiche le message de succes 
            if (form && succesMessage) {
                form.style.display = 'none';
                succesMessage.style.display = 'block';
            }
        })
    }
    //======= validation en temps reel =====
});