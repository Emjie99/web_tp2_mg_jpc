import React, { useEffect, useState,  } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

const FormGestionAdresses = () => {
    const { clientId } = useParams();
    const [client, setClient] = useState({ nom: '', prenom: '', adresses: [] });
    

    useEffect(() => {
        const obtenirClient = async () => {
        try {
            const response = await fetch(`/api/Clients/${clientId}`);
            const clientExistant = await response.json();
            setClient(clientExistant);

            if (!response.ok) {
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
            <h1>{client.nom}, {client.prenom}</h1>
            <h2>Liste d'adresses</h2>
            <Table striped bordered hover>
                
                <thead>
                    <tr>
                        <th>Numéro Civique</th>
                        <th>Information Supplémentaire</th>
                        <th>Odonyme</th>
                        <th>Type de Voie</th>
                        <th>Code Postal</th>
                        <th>Nom de la Municipalité</th>
                        <th>État</th>
                        <th>Pays</th>
                    </tr>
                </thead>

                <tbody>
                    {client.adresses.map(adresse => (
                            <tr key={adresse.adresseId}>
                                <td>{adresse.numeroCivique}</td>
                                <td>{adresse.informationSupplementaire}</td>
                                <td>{adresse.odonyme}</td>
                                <td>{adresse.typeVoie}</td>
                                <td>{adresse.codePostal}</td>
                                <td>{adresse.nomMunicipalite}</td>
                                <td>{adresse.etat}</td>
                                <td>{adresse.pays}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </div>
    );
};

export default FormGestionAdresses;