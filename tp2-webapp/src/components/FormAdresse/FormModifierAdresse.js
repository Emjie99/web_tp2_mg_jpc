import React, { useState } from 'react';

const FormModifierAdresse = ({ adresseInitiale }) => {
    const [adresse, setAdresse] = useState(adresseInitiale);

    return (
        <div>
            <h1>Modification Adresse</h1>
            <p>Numéro Civique: {adresse.numeroCivique}</p>
            <p>Information Supplémentaire: {adresse.informationSupplementaire}</p>
            <p>Odonyme: {adresse.odonyme}</p>
            <p>Type de Voie: {adresse.typeVoie}</p>
            <p>Code Postal: {adresse.codePostal}</p>
            <p>Nom de la Municipalité: {adresse.nomMunicipalite}</p>
            <p>État: {adresse.etat}</p>
            <p>Pays: {adresse.pays}</p>
        </div>
    );
};

export default FormModifierAdresse;