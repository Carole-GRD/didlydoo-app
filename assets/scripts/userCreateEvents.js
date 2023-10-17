//----AFFICHER LE FORM AVEC UN EVENT LISTENNER (il est masqué par defaut)-----
const addButton = document.querySelector(".add-event button");
addButton.addEventListener("click", () => {
  createEventForm.style.display = "flex";
  createEventForm.style.flexDirection = "column";
});
//-----------------------------------------------------

// --------------- CREATION DU FORMULAIRE-----------------------------
const parentElement = document.querySelector(".modal-content");

// creation du form
const form = document.createElement("form");
form.id = "event-form"; // on lui donne un ID

// label + input pour le NOM de l'event
const eventNameLabel = document.createElement("label");
const eventNameInput = document.createElement("input");

eventNameInput.placeholder = "Event name";
eventNameInput.type = "text";
eventNameInput.id = "event-name";
eventNameInput.maxLength = 256;

form.appendChild(eventNameLabel); // label est enfant du form
form.appendChild(eventNameInput); // input est enfant de form

// label et input pour les DATES de l'envent
const eventDatesLabel = document.createElement("label");
const eventDatesInput = document.createElement("input");

eventDatesInput.placeholder = "(YYYY-MM-DD)";
eventDatesInput.type = "date";
eventDatesInput.id = "event-dates";

form.appendChild(eventDatesLabel);
form.appendChild(eventDatesInput);

// label et input pour L'AUTEUR de l'event
const eventAuthorLabel = document.createElement("label");
const eventAuthorInput = document.createElement("input");

eventAuthorInput.placeholder = "Author";
eventAuthorInput.type = "text";
eventAuthorInput.id = "event-author";
eventAuthorInput.maxLength = 256;

form.appendChild(eventAuthorLabel);
form.appendChild(eventAuthorInput);

// label et input pour LA DESCRIPTION de l'event
const eventDescriptionLabel = document.createElement("label");
const eventDescriptionTextarea = document.createElement("textarea");
eventDescriptionTextarea.placeholder = "Event description";
eventDescriptionTextarea.id = "event-description";
eventDescriptionTextarea.maxLength = 256;

form.appendChild(eventDescriptionLabel);
form.appendChild(eventDescriptionTextarea);

// bouton "creer event"
const submitButton = document.createElement("button");
submitButton.type = "submit";
submitButton.textContent = "Create Event";
submitButton.id = "submitBtn";

form.appendChild(submitButton);

// on ajoute le formulaire a parentElement (= la div modal-content)
parentElement.appendChild(form);

// ------------ MODAL-------------------
const modal = document.getElementById("modalForm");
const closeBtn = document.querySelector(".closeCross");

// ouverture du modal
addButton.addEventListener("click", function () {
  modal.style.display = "block";
});

// fermeture du  modal
closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
  const modalContent = document.querySelector(".modal-content");
  modalContent.appendChild(form);

  // Réinitialise les inputs
  let name = document.getElementById("event-name");
  let dates = document.getElementById("event-dates");
  let author = document.getElementById("event-author");
  let description = document.getElementById("event-description");
  if (name.value || dates.value || author.value || description.value) {
    name.value = '';
    dates.value = '';
    author.value = '';
    description.value = '';
  }
});






// Récupére la date du jour pour vérifier si la date de l'évènement à entrer n'est pas déjà passée
let today = new Date();
let todayFormatted = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
// Récupère la date de l'input
let dateInput = document.querySelector("#event-dates");
let isDateOk = false;
if (dateInput) {
  // écoute si la valeur de la date change
  dateInput.addEventListener('change', function() {
    let isDateInFutur = (dateInput.value > todayFormatted) ? true : false;
    // console.log('isDateInFutur : ', isDateInFutur);
    if (!isDateInFutur) {
      
      let previousMessage = document.querySelector('#event-form p');
      if (previousMessage) {
        previousMessage.remove();
      }
      let eventForm = document.querySelector('#event-form');
      let authorInput = document.querySelector('#event-author');
      let message = document.createElement('p');
      message.classList.add('message-create-event');
      message.textContent = 'Date passée !'
      eventForm.insertBefore(message, authorInput);
      isDateOk = false;
    }
    else  {
      let previousMessage = document.querySelector('#event-form p');
      if (previousMessage) {
        previousMessage.remove();
      }
      // console.log('date OK');
      isDateOk = true;
    }
  })
}



// -------------------------------------

// --------------RECUP DES DONNEES ET ENVOI VERS L API----------------
const createEventForm = document.getElementById("event-form"); //form

createEventForm.addEventListener("submit", function (event) {
  event.preventDefault(); // on veut pas que l'user envoie un formulaire vide

  // on recup les valeurs  du formulaire
  let eventName = document.getElementById("event-name").value;
  // const eventDates = document.getElementById("event-dates").value.split(","); //on separe les dates avec des virgules
  let eventDates = document.getElementById("event-dates").value;
  let eventAuthor = document.getElementById("event-author").value;
  let eventDescription = document.getElementById("event-description").value;
  
  if (isDateOk) {
    // on cree un objet avec les données du formulaire (pour l'envoyer dans l'API)
    const eventData = {
      name: eventName,
      dates: [eventDates],
      author: eventAuthor,
      description: eventDescription,
    };
    console.log('eventData : ', eventData);

    // fetch puis POST pour envoyer l'objet dans l'API
    fetch("http://localhost:3000/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Événement créé avec succès.");
        } else {
          console.error("Erreur lors de la création de l'événement.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la requête POST :", error);
      });
  }
});