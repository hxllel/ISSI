import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import ModalPDF from "./ModalPDF"
import { AdminSidebar } from "./AdminSidebar";


export function GenerarCitas(){
    const [fecha_ini, setFecha_ini] = useState("");
    const [fecha_fin, setFecha_fin] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [edo, setEdo] = useState("");
      const API = 'http://localhost:4000';

    const handleHoraInicio = (e) => {
        const nuevaFechaini = e.target.value;
        setFecha_ini(nuevaFechaini);

    if (fecha_fin && nuevaFechaini >= fecha_fin) {
      alert("La fecha de inicio no puede ser mayor o igual que la fecha de fin");
      setFecha_ini("");
    }
  };

  const handleHoraFin = (e) => {
    const nuevaFechaFin = e.target.value;
    setFecha_fin(nuevaFechaFin);

    if (fecha_ini && nuevaFechaFin <= fecha_ini) {
      alert("La fecha de fin no puede ser menor o igual que la fecha de inicio");
      setFecha_fin("");
    }
  };

  const handleRegulares = () =>{
    setModalOpen(true);
    setEdo("Regular");
  }
  const handleIrregulares = () =>{
    setModalOpen(true);
    setEdo("Irregular");
  }
  const enviarFormulario = (e) =>{
    e.preventDefault();
    fetch(`${API}/GenerarCitas/${edo}`, {
        method:"POST",
        credentials: "include",
        headers : {"Content-Type": "application/json"},
        body : JSON.stringify({fecha_ini, fecha_fin})
    }).then((res) =>res.json())
      .then((data) =>{
        if(data.success){
            alert("Las citas se generaron exitosamente")
        }
        else{
            alert("Error")
        }
      }).catch((err) => console.error("Error: ", err));
  }

    return (
        <section>
            
            <button onClick = {handleRegulares}>Crear fechas de inscripcion para los alumnos regulares</button>
            <button onClick = {handleIrregulares}>Crear fechas de inscripcion para los alumnos irregulares</button>
            
             <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <h1>FECHAS DE INSCRIPCION</h1>
                <form onSubmit={enviarFormulario}> 
                <label>Fecha de inicio</label>
                <input type = "date" required value = {fecha_ini} onChange={handleHoraInicio}/>

                <label>Fecha final</label>
                <input type = "date" required value = {fecha_fin} onChange = {handleHoraFin}/>

                <button type= "submit">
                    Enviar
                </button>
            </form>
            </Modal>
        </section>
       
    )
}