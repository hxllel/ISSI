import React from "react";
import { Link, useParams } from "react-router-dom";

export function Profesor() {

    const { id } = useParams();
    

    return (
        <div>
            <h1>Profesor</h1>
            <Link to={`/profesor/${id}/clases`}>
                <button type="button">Clases impartidas</button>

            </Link>
        </div>
    );
}