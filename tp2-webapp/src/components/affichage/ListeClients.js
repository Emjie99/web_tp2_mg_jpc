import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

const ListeClients = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const obtenirClients = async () => {
        try {
            const reponse = await fetch(`/api/Clients/`);
            const clientsJSON = await reponse.json();
            setClients(clientsJSON);
        } catch (error) {
            console.error(error);
        } 
    };
    obtenirClients();
    });

    const handleDelete = (id) => {
        window.location.href = `/confirmation-suppression/${id}`;
    };

    const formatterDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-CA');
    };

    return (
        <div>
            <h1>Liste des Clients</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Prénom</th>
                        <th>Nom</th>
                        <th>Date de Naissance</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client.clientId}>
                            <td>{client.prenom}</td>
                            <td>{client.nom}</td>
                            <td>{client.dateNaissance ? formatterDate(client.dateNaissance) : 'N/A'}</td>
                            <td>
                                <NavLink to={`/gestion-client/${client.clientId}`}>
                                    <Button variant="warning" className="me-2">Modifier</Button>
                                </NavLink>
                                <Button variant="danger" onClick={() => handleDelete(client.clientId)}>Supprimer</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ListeClients;