import React from 'react';
import { Form } from 'react-bootstrap';

const FiltresClients = ({ setFiltres, options, appliquerFiltres }) => {
    const traitementChangementCheckbox = (e) => {
        const { name, value, checked } = e.target;
        
        setFiltres(filtresPrecedents => {
            const nouveauxFiltres = { ...filtresPrecedents };
            if (checked) {
                if (!nouveauxFiltres[name]) {
                    nouveauxFiltres[name] = [];
                }
                nouveauxFiltres[name].push(value);
            } else {
                nouveauxFiltres[name] = nouveauxFiltres[name].filter(val => val !== value);
            }
            appliquerFiltres(nouveauxFiltres);
            return nouveauxFiltres;
        });
    };

    return (
        <Form className='m-3'>
            <h2>Filtres</h2>
            {Object.keys(options).map(categorie => (
                <div key={categorie}>
                    <h5>{categorie}</h5>
                    {options[categorie].map(option => (
                        <Form.Check
                            key={option}
                            type="checkbox"
                            label={option}
                            name={categorie}
                            value={option}
                            onChange={traitementChangementCheckbox}
                        />
                    ))}
                </div>
            ))}
        </Form>
    );
};

export default FiltresClients;
