import React, { useEffect, useState,  } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

import FormModifierAdresse from '../FormAdresse/FormModifierAdresse.js';
import FormAjouterAdresse from '../FormAdresse/FormAjouterAdresse.js';
import FormSuppressionAdresse from '../FormAdresse/FormSuppressionAdresse.js';

const ListeAdresses = () => {
    const { clientId } = useParams();
    const [client, setClient] = useState({ nom: '', prenom: '', adresses: [] });
    const [adresseSelectionne, setAdresseSelectionne] = useState(null);
    const [nouvelleAdresse, setNouvelleAdresse] = useState(null);
    const [supprimerAdresse, setSupprimerAdresse] = useState(null);
    const [afficherListe, setAfficherListe] = useState(true);
    
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

    useEffect(() => {
        obtenirClient();
    }, [clientId, obtenirClient]);

    const gererNouvelleAdresse = () => {
        setNouvelleAdresse({ numeroCivique: '', informationSupplementaire: '', odonyme: '', typeVoie: '', codePostal: '', nomMunicipalite: '', etat: '', pays: '' });
        setAdresseSelectionne(null);
        setSupprimerAdresse(null);
        setAfficherListe(false);
    };

    const gererModifierAdresse = (adresse) => {
        setAdresseSelectionne(adresse);
        setNouvelleAdresse(null);
        setSupprimerAdresse(null);
        setAfficherListe(false);
    };

    const gererSupprimerAdresse = (adresse) => {
        setSupprimerAdresse(adresse);
        setAdresseSelectionne(null);
        setNouvelleAdresse(null);
        setAfficherListe(false);
    };

        const miseAJourAdresses = (action) => {
            let adressesMiseAJour = [...client.adresses];
    
            switch (action) {
                case 'delete':
                    obtenirClient();
                    setSupprimerAdresse(null);
                    setAfficherListe(true);
                    break;
                case 'create':
                    obtenirClient();
                    setNouvelleAdresse(null);
                    setAfficherListe(true);
                    break;
                case 'update':
                    obtenirClient();
                    setAdresseSelectionne(null);
                    setAfficherListe(true);
                    break;
                case 'cancel':
                    setAdresseSelectionne(null);
                    setNouvelleAdresse(null);
                    setSupprimerAdresse(null);
                    setAfficherListe(true);
                    break;
                default:
            }

            client.adresses = adressesMiseAJour;
            let clientUpdate = {...client}
            setClient(clientUpdate);
        };

    return (
        <div>

            <h1>Client : {client.nom} {client.prenom}</h1>

            {adresseSelectionne && (
                <FormModifierAdresse
                    key={adresseSelectionne.adresseId}
                    clientId={clientId}
                    adresseSelectionne={adresseSelectionne} 
                    miseAJourAdresses={miseAJourAdresses}
                />
            )}

            {nouvelleAdresse && (
                <FormAjouterAdresse
                    key={nouvelleAdresse.adresseId}
                    clientId={clientId}
                    setNouvelleAdresse={setNouvelleAdresse}
                    miseAJourAdresses={miseAJourAdresses}
                />
            )}

            {supprimerAdresse && (
                <FormSuppressionAdresse
                    key={supprimerAdresse.adresseId}    
                    clientId={clientId}
                    adresseId={supprimerAdresse.adresseId}
                    miseAJourAdresses={miseAJourAdresses}
                />
            )}

            {afficherListe && (
                <>
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
                                        <Button variant="danger" className="me-2" onClick={() => gererSupprimerAdresse(adresse)}>Supprimer</Button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
                <Button variant="primary" onClick={gererNouvelleAdresse} className="m-3">Ajouter une adresse</Button>
                <Button variant="secondary" href={`/clients/${clientId}`} className="m-3">Retour</Button>
                </>
            )}
        </div>
    );  
};

export default ListeAdresses;
