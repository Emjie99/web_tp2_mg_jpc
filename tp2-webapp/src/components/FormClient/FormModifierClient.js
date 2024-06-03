import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function FormModifierClient() {
    const { clientId } = useParams(); 
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');

    useEffect(() => {
        const obtenirClient = async () => {
        try {
            const response = await fetch(`/api/Clients/${clientId}`);
            const clientExistant = await response.json();
            

            if(clientExistant.dateNaissance !== null){

            let dateModifier = new Date(clientExistant.dateNaissance );
            dateModifier = dateModifier.toLocaleDateString('fr-CA');
            setDateNaissance(dateModifier);
            }

            setNom(clientExistant.nom);
            setPrenom(clientExistant.prenom);
            if (!response.ok) {
                alert('Une erreur est survenue lors de la récupération du client.');
            }    
        } catch (error) {
            console.error(error);
        } 
    };
    obtenirClient();
    }, [clientId]);


    const SoumettreModifierClient = async (event) => {
        event.preventDefault();

        const client = {
            "clientId" : clientId,
            "nom" : nom,
            "prenom" : prenom,
            "dateNaissance" : dateNaissance
        };

        try {
            const response = await fetch(`/api/Clients/${clientId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(client)
            });
            if (response.ok) {
                alert('Le client a été modifié avec succès!');
            } else {
                alert('Une erreur est survenue lors de la modification du client.');
            }
        } catch (error) {
            console.error(error);
        } 
    }


    return (
        <Form onSubmit={SoumettreModifierClient}>

            <h1>Modification d'un client</h1>

            <Form.Group>
                <Form.Label>Nom</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Entrer le nom"
                    value={nom}
                    onChange={(eventNom) => setNom(eventNom.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Prénom</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Entrer le prenom"
                    value={prenom}
                    onChange={(eventPrenom) => setPrenom(eventPrenom.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Date de Naissance</Form.Label>
                <Form.Control
                    type="date"
                    value={dateNaissance ?? ""}
                    onChange={(eventDate) => setDateNaissance(eventDate.target.value)}
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit">Modifier le client</Button>
            <Button variant="primary" href={`/gestion-adresse/${clientId}`} className="m-3">gestion adresse</Button>
            <Button variant="secondary" href="/liste-clients" className="m-3">Retour</Button>

        </Form>
    );
}

export default FormModifierClient;