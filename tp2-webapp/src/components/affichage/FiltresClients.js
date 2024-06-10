import React from 'react';
import { Form } from 'react-bootstrap';

const FiltresClients = ({ setFiltres, options, clients }) => {
    const traiterChangementCheckbox = (e) => {
        const { name, value, checked } = e.target;
        setFiltres(filtresPrecedents => {
            const nouveauxFiltres = { ...filtresPrecedents };
            if (checked) {
                if (!nouveauxFiltres[name]) {
                    nouveauxFiltres[name] = [];
                }
                nouveauxFiltres[name].push(value);
            } else {
                nouveauxFiltres[name] = nouveauxFiltres[name].filter(valeur => valeur !== value);
            }
            setFiltres(nouveauxFiltres);
            return nouveauxFiltres;
        });
    };

    const etiquettes = {
        nomMunicipalite: 'Municipalité',
        etat: 'État',
        pays: 'Pays'
    };

    const compterClients = (categorie, option) => {
        return clients.filter(client =>
            client.adresses?.some(adresse =>
                adresse[categorie] === option
            )
        ).length;
    };

    return (
        <Form className='m-3 p-2 bg-light rounded'>
            {Object.keys(options).map(categorie => (
                <div key={categorie} className='pb-3'>
                    <h5>{etiquettes[categorie]}</h5>
                    {options[categorie].map(option => (
                        <Form.Check
                            key={option}
                            type="checkbox"
                            label={`${option} (${compterClients(categorie, option)})`}
                            name={categorie}
                            value={option}
                            onChange={traiterChangementCheckbox}
                        />
                    ))}
                </div>
            ))}
        </Form>
    );
};

export default FiltresClients;
