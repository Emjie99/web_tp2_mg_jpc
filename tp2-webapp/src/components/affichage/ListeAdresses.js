import React, { useEffect, useState,  } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

import FormModifierAdresse from '../FormAdresse/FormModifierAdresse.js';
import FormAjouterAdresse from '../FormAdresse/FormAjouterAdresse.js';

const ListeAdresses = () => {
    const { clientId } = useParams();
    const [client, setClient] = useState({ nom: '', prenom: '', adresses: [] });
    const [adresseSelectionne, setAdresseSelectionne] = useState(null);
    const [nouvelleAdresse, setNouvelleAdresse] = useState(null);
    
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

    const gererNouvelleAdresse = () => {
        var adresse = { numeroCivique: '', informationSupplementaire: '', odonyme: '', typeVoie: '', codePostal: '', nomMunicipalite: '', etat: '', pays: '' };
        setNouvelleAdresse(adresse);
        setAdresseSelectionne(null);
    };

    const gererModifierAdresse = (adresse) => {
        setNouvelleAdresse(null);
        setAdresseSelectionne(adresse);
    };

    const miseAJourAdresses = (adresseModifiee, estNouvelle = false) => {
        let adressesMiseAJour = client.adresses;
        if (estNouvelle) {
            adressesMiseAJour = [...client.adresses, adresseModifiee];
        } else {
            adressesMiseAJour = client.adresses.map(adresse =>
            adresse.adresseId === adresseModifiee.adresseId ? adresseModifiee : adresse
            );
        }
        setClient(client => ({ ...client, adresses: adressesMiseAJour }));
    };

    return (
        <div>

            <h1>Client : {client.nom} {client.prenom}</h1>

            {adresseSelectionne && (
                <FormModifierAdresse
                    adresseSelectionne={adresseSelectionne}
                    setAdresseSelectionne={setAdresseSelectionne}
                    clientID={clientId}
                    miseAJourAdresses={miseAJourAdresses}
                />
            )}

            {nouvelleAdresse && (
                <FormAjouterAdresse
                    clientID={clientId}
                    adresse={nouvelleAdresse}
                    miseAJourAdresses={miseAJourAdresses}
                    setNouvelleAdresse={setNouvelleAdresse}
                />
            )}

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
                                <td>
                                    <Button variant="warning" className="me-2" onClick={() => gererModifierAdresse(adresse)}>Modifier</Button>
                                    <Button variant="danger" >Supprimer</Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
            <Button variant="primary" onClick={gererNouvelleAdresse} className="m-3">Ajouter une adresse</Button>
            <Button variant="secondary" href={`/clients/${clientId}`} className="m-3">Retour</Button>
        </div>
    );
};

export default ListeAdresses;