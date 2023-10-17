
const url = 'http://localhost:3000';

export async function fetchUpdateEvent(e, id, updatedEvent) {
    e.preventDefault();
    console.log('id from fetchUpdateEvent : ', id);
    console.log('updatedEvent from fetchUpdateEvent : ', updatedEvent);

    fetch(`${url}/api/events/${id}/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvent),
    })
        .then((response) => {
            if (response.ok) {
                console.log("Événement mis à jour avec succès.");
            } else {
                console.error("Erreur lors de la mise à jour de l'événement.");
            }
            // // Masquer le formulaire
            // let updateForm = document.querySelector('.modalUpdate');
            // updateForm.classList.remove('active');
        })
        .catch((error) => {
            console.error("Erreur lors de la requête PATCH (fetchUpdateEvent) :", error);
        });

}