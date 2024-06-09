import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const FormSupressionClient = () => {
    const { clientId } = useParams();
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');

    useEffect(() => {
        const obtenirClient = async () => {
            try {
                const response = await fetch(`/api/Clients/${clientId}`);
                const clientExistant = await response.json();
                if (!response.ok) {
                    alert('Une erreur est survenue lors de la récupération du client.');
                }

                setNom(clientExistant.nom);
                setPrenom(clientExistant.prenom);

            } catch (err) {
                console.error(err);
            }
        }
        obtenirClient();
    });

    const SoumettreSuppressionClient = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`/api/Clients/${clientId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                alert('Le client a été supprimé avec succès!');
            } else {
                alert('Une erreur est survenue lors de la suppression du client.');
            }
        } catch (err) {
            console.error(err);
        } 
    }

    return (
        <Form onSubmit={SoumettreSuppressionClient}>

            <h1>Suppression</h1>

            <h3>Êtes-vous sûr(e) de vouloir supprimer {prenom} {nom}?</h3>

            <Button variant="danger" type="submit">Supprimer le client</Button>
            <Button variant="primary" href={`/clients`} className="m-3">Retour à la liste</Button>

        </Form>
    )
}

export default FormSupressionClient;