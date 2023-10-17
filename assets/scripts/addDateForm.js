
import { fetchAddDate } from "./fetchAddDate.js";

export function addDateForm(id, dates) {
    // console.log('id : ', id);
    // console.log('dates : ', dates);

    // Afficher le formulaire
    let updateForm = document.querySelector('.modalAddDate');
    updateForm.classList.add('active');

    // Masquer le formulaire
    let close = document.querySelector('.modalAddDate .close');
    close.addEventListener('click', function() {
        updateForm.classList.remove('active')
    })

    // Crée un conteneur dans le fomrulaire qui contient toutes les dates à ajouter
    let datesContainer = document.querySelector('#add-date-event-form .dates-container');
    // Réinitiliser le formulaire
    while (datesContainer.firstChild) {
        datesContainer.firstChild.remove();
    }
    

    function addOneMoreDate() {
        // Crée un conteneur par date (avec input et bouton pour ajouter une autre date)
        let dateToAdd = document.createElement('div');
        dateToAdd.classList.add('dateToAdd');
        // Input
        let date = document.createElement('input');
        date.setAttribute('type', 'date');
        date.classList.add('date');
        // Bouton
        let addDateBtn = document.createElement('button');
        addDateBtn.setAttribute('type', 'button');
        addDateBtn.classList.add('addDateBtn');
        addDateBtn.textContent = '+';
        addDateBtn.addEventListener('click', function() {

            // Récupére la date du jour pour vérifier si la date à entrer est déjà passée
            let today = new Date();
            let todayFormatted = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
            // console.log(date.value > todayFormatted);

            // Récupére les dates entrées dans les inputs pour vérifier si la date est déjà présente
            let datesAlreadyAdd = document.querySelectorAll('.date');   // NodeList
            let datesAlreadyAddTab = [...datesAlreadyAdd];              // Array
            let dateToCompare = datesAlreadyAddTab.map(date => date.value);
            let isDateAlreadyEnter = false;
            for (let i = 0; i < (dateToCompare.length - 1); i++) {
                if (dateToCompare[i] === date.value) {
                    isDateAlreadyEnter = true;
                }
            }

            // Récupére les dates déjà affichées dans le DOM pour vérifier si la date est déjà présente dans la DB
            console.log('dates : ', dates);
            console.log('dates.map(proposal => proposal.date) : ', dates.map(proposal => proposal.date));
            let dateAlreadyInDB = dates.map(proposal => proposal.date);
            let isDateAlreadyInDB = false;
            for (let i = 0; i < dateAlreadyInDB.length; i++) {
                if (dateAlreadyInDB[i] === date.value) {
                    isDateAlreadyInDB = true;
                }
            }


            if (date.value <= todayFormatted && this.classList.contains('addDateBtn')) {
                // Si la date est déjà passée...
                
                // Si un message est déjà affiché... retire le message 
                if (this.nextSibling) {
                    this.nextSibling.remove();
                }
                // Crée le message à afficher
                let message = document.createElement('p');
                message.textContent = 'Date passée !';
                dateToAdd.appendChild(message);
            }
            else if (isDateAlreadyEnter && this.classList.contains('addDateBtn')) {
                // si la date est déjà entrée dans un autre input
                if (this.nextSibling) {
                    this.nextSibling.remove();
                }
                let message = document.createElement('p');
                message.textContent = 'Date déjà entrée !';
                dateToAdd.appendChild(message);
            }
            else if (isDateAlreadyInDB && this.classList.contains('addDateBtn')) {
                // si la date est déjà enregistrée dans la DB
                if (this.nextSibling) {
                    this.nextSibling.remove();
                }
                let message = document.createElement('p');
                message.textContent = 'Date déjà enregistrée !';
                dateToAdd.appendChild(message);
            }
            else if (date.value && this.classList.contains('addDateBtn')) {
                // Si la date est valide...

                // Modifie le bouton 
                this.classList.remove('addDateBtn');
                this.classList.add('deleteDateBtn');
                this.textContent = '-';

                // Si un message est déjà affiché... retire le message 
                if (this.nextSibling) {
                    this.nextSibling.remove();
                }

                // Ajoute un nouvel input pour ajouter une autre date
                addOneMoreDate();
            }
            else if (date.value && this.classList.contains('deleteDateBtn')) {
                console.log('à supprimer');
                this.parentElement.remove();
            }
        })
        dateToAdd.appendChild(date);
        dateToAdd.appendChild(addDateBtn);

        datesContainer.appendChild(dateToAdd);
    }
    addOneMoreDate();



    // Envoie du formulaire
    let form = document.querySelector('#add-date-event-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Récupère les "participants" de l'évènement
        let attendees = dates[0].attendees;
        console.log(attendees);

        // Récupére les dates entrées dans les inputs
        let datesToAdd = document.querySelectorAll('.date');   // NodeList
        let datesToAddTab = [...datesToAdd];              // Array
        let datesToAddMap = datesToAddTab.map(date => date.value);
        let data = [];
        // ↓ (datesToAddValues.length - 1) car le dernier input est vide, on ne le prend donc pas
        for (let i = 0; i < (datesToAddMap.length - 1); i++) {
            data = [...data, datesToAddMap[i]];
        }

        fetchAddDate(id, data);

        // // Masquer le formulaire
        // let modalAddDate = document.querySelector('.modalAddDate');
        // modalAddDate.classList.remove('active');
    })
}