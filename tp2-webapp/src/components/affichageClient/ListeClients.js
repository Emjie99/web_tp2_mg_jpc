import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const ListeClients = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const obtenirClient = async () => {
        try {
            const reponse = await fetch(`/api/Clients/`);
            const clientsJSON = await reponse.json();
            setClients(clientsJSON);
        } catch (error) {
            console.error(error);
        } 
    };
    obtenirClient();
    });

    const handleDelete = (id) => {
        window.location.href = `/confirmation-suppression/${id}`;
    };

    return (
        <div>
            <h1>Liste des Clients</h1>
            <ul>
                {clients.map(client => (
                    <li key={client.clientId}>
                        {client.prenom} {client.nom}
                        <br />
                        Date de Naissance: {client.dateNaissance ? client.dateNaissance : 'N/A'}
                        <NavLink to={`/modification-client/${client.clientId}`}><button>Modifier</button></NavLink>
                        <button onClick={() => handleDelete(client.clientId)}>Supprimer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListeClients;