import React from "react";
import { Link, useParams } from "react-router-dom";

export function Registrar_Calificaciones() {

    const API = '${API}';
    useEffect(() => {

        fetch(`${API}/ObtenerGrupos`, { credentials: "include" })
    }, []);
    
    return (
        <div>
            <h1>Registrar Calificaciones</h1>
        </div>
    );
}