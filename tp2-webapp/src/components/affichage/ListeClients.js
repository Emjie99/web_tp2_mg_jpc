import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';

import FiltresClients from './FiltresClients';

const ListeClients = () => {
    const [clients, setClients] = useState([]);
    const [clientsFiltres, setClientsFiltres] = useState([]);
    const [tri, setTri] = useState({ cle: 'prenom', ascendant: true });

    useEffect(() => {
        const obtenirClients = async () => {
            try {
                const reponse = await fetch(`/api/Clients/`);
                const clientsJSON = await reponse.json();
                setClients(clientsJSON);
                setClientsFiltres(clientsJSON);
            } catch (error) {
                console.error(error);
            }
        };
        obtenirClients();
    }, []);

    const appliquerFiltres = (nouveauxFiltres) => {
        let clientsFiltresAppliques = [...clients];
        Object.keys(nouveauxFiltres).forEach(filtre => {
            if (nouveauxFiltres[filtre].length > 0) {
                clientsFiltresAppliques = clientsFiltresAppliques.filter(client =>
                    client.adresses?.some(adresse =>
                        nouveauxFiltres[filtre].includes(adresse[filtre])
                    )
                );
            }
        });
        setClientsFiltres(clientsFiltresAppliques);
    };

    const appliquerTri = (paramCle) => {
        setTri(triPrecedent => ({
            cle: paramCle,
            ascendant: triPrecedent.cle === paramCle ? !triPrecedent.ascendant : true
        }));
        const clientsTries = [...clientsFiltres].sort((a, b) => {
            if (a[paramCle] < b[paramCle]) {
                return tri.ascendant ? -1 : 1;
            }
            if (a[paramCle] > b[paramCle]) {
                return tri.ascendant ? 1 : -1;
            }
            else {
                return 0;
            }
        });
        setClientsFiltres(clientsTries);
    };

    const formatterDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-CA');
    };

    const placerIconeTri = (key) => {
        if (tri.cle !== key) {
            return null;
        }
        return tri.ascendant ? ' ▼' : ' ▲';
    };

    const optionsFiltres = {
        nomMunicipalite: [...new Set(clients.flatMap(client => client.adresses?.map(adresse => adresse.nomMunicipalite) || []))],
        etat: [...new Set(clients.flatMap(client => client.adresses?.map(adresse => adresse.etat) || []))],
        pays: [...new Set(clients.flatMap(client => client.adresses?.map(adresse => adresse.pays) || []))]
    };

    return (
        <Container>
            <Row>
                <Col md={3}>
                    <FiltresClients setFiltres={appliquerFiltres} options={optionsFiltres} />
                </Col>
                <Col md={9}>
                    <h1>Liste des Clients</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th onClick={() => appliquerTri('prenom')}>
                                    Prénom {placerIconeTri('prenom')}
                                </th>
                                <th onClick={() => appliquerTri('nom')}>
                                    Nom {placerIconeTri('nom')}
                                </th>
                                <th onClick={() => appliquerTri('dateNaissance')}>
                                    Date de Naissance {placerIconeTri('dateNaissance')}
                                </th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientsFiltres.map(client => (
                                <tr key={client.clientId}>
                                    <td>{client.prenom}</td>
                                    <td>{client.nom}</td>
                                    <td>{client.dateNaissance ? formatterDate(client.dateNaissance) : 'N/A'}</td>
                                    <td>
                                        <NavLink to={`/clients/${client.clientId}`}>
                                            <Button variant="warning" className="me-2">Modifier</Button>
                                        </NavLink>
                                        <NavLink to={`/suppression-client/${client.clientId}`}>
                                            <Button variant="danger" className="me-2">Supprimer</Button>
                                        </NavLink>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default ListeClients;
