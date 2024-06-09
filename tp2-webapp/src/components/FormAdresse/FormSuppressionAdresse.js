import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const FormSupressionAdresse = ({clientId, adresseId, miseAJourAdresses}) => {

    const SoumettreSuppressionAdresse = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`/api/Clients/${clientId}/Adresses/${adresseId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                miseAJourAdresses(null, 'delete');
            } else {
                alert('Une erreur est survenue lors de la suppression du client.');
            }
        } catch (err) {
            console.error(err);
        } 
    }

    return (
        <Form onSubmit={SoumettreSuppressionAdresse}>

            <h1>Suppression</h1>

            <h3>Êtes-vous sûr(e) de vouloir supprimer l'adresse?</h3>

            <Button variant="danger" type="submit">Supprimer l'adresse</Button>
            <Button variant="primary" href={`/adresses/${clientId}`} className="m-3">Retour à la liste</Button>

        </Form>
    )
}

export default FormSupressionAdresse;