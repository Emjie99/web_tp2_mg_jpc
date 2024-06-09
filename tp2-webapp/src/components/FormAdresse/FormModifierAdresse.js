import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';


const FormModifierAdresse = ({ clientId, adresseSelectionne, miseAJourAdresses  }) => {
    const [numeroCivique, setNumeroCivique] = useState(adresseSelectionne.numeroCivique);
    const [informationSupplementaire, setInformationSupplementaire] = useState(adresseSelectionne.informationSupplementaire);
    const [odonyme, setOdonyme] = useState(adresseSelectionne.odonyme);
    const [typeVoie, setTypeVoie] = useState(adresseSelectionne.typeVoie);
    const [codePostal, setCodePostal] = useState(adresseSelectionne.codePostal);
    const [nomMunicipalite, setNomMunicipalite] = useState(adresseSelectionne.nomMunicipalite);
    const [etat, setEtat] = useState(adresseSelectionne.etat);
    const [pays, setPays] = useState(adresseSelectionne.pays);


    const SoumettreModificationAdresse = async (event) => {
        event.preventDefault();

        const adresse = {
            "adresseId" : adresseSelectionne.adresseId,
            "numeroCivique" : numeroCivique,
            "informationSupplementaire" : informationSupplementaire,
            "odonyme" : odonyme,
            "typeVoie" : typeVoie,
            "codePostal" : codePostal,
            "nomMunicipalite" : nomMunicipalite,
            "etat" : etat,
            "pays" : pays
        };

        try {
            const response = await fetch(`/api/clients/${clientId}/Adresses/${adresseSelectionne.adresseId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(adresse)
            });

            if (response.ok) {
                miseAJourAdresses('update');
            } else {
                alert('Une erreur est survenue lors de la modification de l adresse.');
            }
        } catch (error) {
            console.error(error);
        } 
    }

    return (
        <div>
        <h2>Modification Adresse</h2>
        <Form onSubmit={SoumettreModificationAdresse}>
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
            <Button variant="primary" type="submit" className="m-3">Modifier l'adresse</Button>
            <Button variant="danger" onClick={() => miseAJourAdresses('cancel')} className="m-3">Annuler</Button>
        </Form>
        </div>
    );
};

export default FormModifierAdresse;