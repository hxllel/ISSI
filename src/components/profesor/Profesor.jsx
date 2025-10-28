import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

print("Profesor component loaded");

export function Profesor() {
    const navigate = useNavigate();

    const { id } = useParams();
    const handleClickLista = () =>{
        navigate('/profesor/PaseLista/e094b42ee71249a')
    }

    return (
        <div>
            <h1>Profesor</h1>
            <Link to={`/profesor/${id}/clases`}>
                <button type="button">Clases impartidas</button>
                <button onClick = {() => {handleClickLista()}}>Pase de lista</button>

            </Link>
        </div>
    );
}