import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function FormCreationDeClient() {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');

    const SoumettreCreationClient = async (event) => {
        event.preventDefault();

        const client = {
            "nom" : nom,
            "prenom" : prenom,
            "dateNaissance" : dateNaissance
        };

        try {
            const response = await fetch('/api/Clients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(client)
            });

            if (response.ok) {
                alert('Le client a été créé avec succès!');
                setNom('');
                setPrenom('');
                setDateNaissance('');
            } else {
                alert('Une erreur est survenue lors de la création du client.');
            }

        } catch (error) {
            console.error(error);
        } 
    };

    return (
        <Form onSubmit={SoumettreCreationClient}>

            <h1>Creation d'un client</h1>

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
                <Form.Label>Prenom</Form.Label>
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
                    value={dateNaissance}
                    onChange={(eventDate) => setDateNaissance(eventDate.target.value)}
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit">Creer le client</Button>

        </Form>
    );
}

export default FormCreationDeClient;