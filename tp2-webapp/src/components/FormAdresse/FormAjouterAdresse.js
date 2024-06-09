import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const FormAjouterAdresse = ({ clientId, miseAJourAdresses}) => {
    const [numeroCivique, setNumeroCivique] = useState('');
    const [informationSupplementaire, setInformationSupplementaire] = useState('');
    const [odonyme, setOdonyme] = useState('');
    const [typeVoie, setTypeVoie] = useState('');
    const [codePostal, setCodePostal] = useState('');
    const [nomMunicipalite, setNomMunicipalite] = useState('');
    const [etat, setEtat] = useState('');
    const [pays, setPays] = useState('');

    const ajouterNouvelleAdresse = async (event) => {
        event.preventDefault();

        const nouvelleAdresse = {
            numeroCivique,
            informationSupplementaire,
            odonyme,
            typeVoie,
            codePostal,
            nomMunicipalite,
            etat,
            pays
        };

        try {
            const response = await fetch(`/api/clients/${clientId}/Adresses`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nouvelleAdresse)
            });

            if (response.ok) {
                miseAJourAdresses('create');
            } else {
                alert('Une erreur est survenue lors de l ajout de l adresse.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Ajouter une nouvelle adresse</h2>
            <Form onSubmit={ajouterNouvelleAdresse}>
            <Form.Group controlId="numeroCivique">
                <Form.Label>Numéro Civique</Form.Label>
                <Form.Control
                    type="text"
                    value={numeroCivique}
                    onChange={(event) => setNumeroCivique(event.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="informationSupplementaire">
                <Form.Label>Information Supplémentaire</Form.Label>
                <Form.Control
                    type="text"
                    value={informationSupplementaire}
                    onChange={(event) => setInformationSupplementaire(event.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="odonyme">
                <Form.Label>Odonyme</Form.Label>
                <Form.Control
                    type="text"
                    value={odonyme}
                    onChange={(event) => setOdonyme(event.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="typeVoie">
                <Form.Label>Type de Voie</Form.Label>
                <Form.Control
                    type="text"
                    value={typeVoie}
                    onChange={(event) => setTypeVoie(event.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="codePostal">
                <Form.Label>Code Postal</Form.Label>
                <Form.Control
                    type="text"
                    value={codePostal}
                    onChange={(event) => setCodePostal(event.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="nomMunicipalite">
                <Form.Label>Nom de la Municipalité</Form.Label>
                <Form.Control
                    type="text"
                    value={nomMunicipalite}
                    onChange={(event) => setNomMunicipalite(event.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="etat">
                <Form.Label>État</Form.Label>
                <Form.Control
                    type="text"
                    value={etat}
                    onChange={(event) => setEtat(event.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="pays">
                <Form.Label>Pays</Form.Label>
                <Form.Control
                    type="text"
                    value={pays}
                    onChange={(event) => setPays(event.target.value)}
                    required
                />
            </Form.Group>
                <Button variant="primary" type="submit" className="m-3">Ajouter</Button>
                <Button variant="danger" onClick={() => miseAJourAdresses('cancel')} className="m-3">Annuler</Button>
            </Form>
        </div>
    );
};

export default FormAjouterAdresse;