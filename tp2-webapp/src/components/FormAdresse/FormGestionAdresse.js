import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

const FormGestionAdresses = () => {
    const { clientId } = useParams(); 

    return (

        <div>
            <h1>Liste des Adresses</h1>
        </div>
    );
};

export default FormGestionAdresses;