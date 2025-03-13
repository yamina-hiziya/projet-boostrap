//Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function () {


    // ===== PROTECTION CONTRE LES ATTAQUES XSS =====
    // La fonction escapeHtml convertit les caractères spéciaux en entités HTML
    // Cela empêche l'injection de code malveillant (attaques XSS)
    // Par exemple: "<script>" devient "&lt;script&gt;" et ne sera pas exécuté comme du code
    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;") // Remplace & par &amp;
            .replace(/</g, "&lt;") // Remplace < par &lt;
            .replace(/>/g, "&gt;") // Remplace > par &gt;
            .replace(/"/g, "&quot;") // Remplace " par &quot;
            .replace(/'/g, "&#039;"); // Remplace ' par &#039;
    }


    // ===== VALIDATION DU FORMULAIRE =====
    // Cette fonction vérifie si tous les champs du formulaire sont remplis
    function checkForm() {
        // Sélectionne tous les champs du formulaire (inputs et textareas)
        const inputs = document.querySelectorAll('#monFormulaire input, #monFormulaire textarea');
        let formIsValid = true;

        // Parcourt chaque champ pour vérifier s'il est vide
        inputs.forEach(input => {
            // trim() enlève les espaces au début et à la fin du texte
            if (input.value.trim() === '') {
                // Si le champ est vide, on ajoute une bordure rouge
                input.style.border = '2px solid red';
                formIsValid = false;
            } else {
                // Si le champ est rempli, on ajoute une bordure verte
                input.style.border = '2px solid green';
            }
        });
        // Retourne true si tous les champs sont remplis, false sinon
        return formIsValid;
    }

    // ===== PRÉPARATION DES DONNÉES POUR LE BACKEND =====
    // Cette fonction récupère les valeurs du formulaire et les sécurise contre les attaques XSS

    function prepareDataForBackend() {
        // Sélectionne tous les champs du formulaire (inputs et textareas)
        const formElements = document.querySelectorAll('#monFormulaire input, #monFormulaire textarea');
        // Crée un objet vide pour stocker les données
        const sanitizedData = {};


        // Parcourt chaque champ du formulaire
        formElements.forEach(input => {
            if (input.name) {
                // Pour chaque champ, on ajoute sa valeur sécurisée à l'objet
                // La clé est le nom du champ (name), la valeur est le contenu sécurisé
                sanitizedData[input.name] = escapeHtml(input.value);
            }
        });
        // Retourne l'objet contenant toutes les données sécurisées
        return sanitizedData;
    }


    // ===== GESTION DE LA SOUMISSION DU FORMULAIRE =====
    // Récupère le formulaire par son ID
    const form = document.getElementById('monFormulaire');

    if (form) {
        // Ajoute un écouteur d'événement sur la soumission du formulaire
        form.addEventListener('submit', function (event) {
            // Empêche le comportement par défaut (rechargement de la page)
            event.preventDefault();
            //

            // Vérifie si le formulaire est valide (tous les champs remplis)
            if (!checkForm()) {
                // Vérifie si le formulaire est valide (tous les champs remplis)
                alert(' Veuillez remplir tous les champs du formulaire. ');
                return;
            }

            //Si le formulaire est valide, prépare les données sécurisées
            const sanitizedData = prepareDataForBackend();

            // Affiche les données dans la console (pour démonstration)
            // Dans un cas réel, on enverrait ces données à un serveur
            console.log('Données prêtes pour envoi au backend:', sanitizedData);

            // ===== AFFICHAGE DU MESSAGE DE SUCCÈS =====
            //Récupère les elements nécessaires
            const form = document.getElementById('form-container');
            const successMessage = document.getElementById('success-message');

            //Cache le formulaire et affiche le message de succès
            if (form && successMessage) {
                form.style.display = 'none';
                successMessage.style.display = 'block';
            }
        });
    }
    // ===== VALIDATION EN TEMPS RÉEL =====
    //Sélectionne tous les les champs du formulaires
    const inputs = document.querySelectorAll('#monFormulaire input, #monFormulaire textarea');
    //pour chaque champ, ajoute un écouteur d'événement sur la saisie
    inputs.forEach(input => {
        //l'événement 'input' se déclanche à chaque modification du champ
        input.addEventListener('input', function () {
            //vérifie si le champ est vide 
            if (input.value.trim() === '') {
                //si vide, bordure rouge
                input.style.border = '2px solid red';
            } else {
                //si rempli, bordure verte
                input.style.border = '2px solid green'
            }
        })
    })
});