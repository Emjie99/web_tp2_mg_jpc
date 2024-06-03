import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

const FormGestionAdresses = () => {
    const { clientId } = useParams();
    const [client, setClient] = useState('');

    useEffect(() => {
        const obtenirClient = async () => {
        try {
            const response = await fetch(`/api/Clients/${clientId}`);
            const clientExistant = await response.json();
            setClient(clientExistant);

            if (response.ok) {
                alert('Le client a été récupéré avec succès!');
            }
            else {
                alert('Une erreur est survenue lors de la récupération du client.');
            }       
        } catch (error) {
            console.error(error);
        } 
    };
    obtenirClient();
    }, [clientId]);

    return (

        <div>
            <h1>Liste des Adresses</h1>
        </div>
    );
};

export default FormGestionAdresses;