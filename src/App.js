import "./App.css";
import { useState } from "react";
import { Formulario } from "./components/formulario/Formulario";
import { Alumno } from "./components/alumno/Alumno";
import { ChatbotAsistente } from "./components/alumno/Chat";
import { Administrador } from "./components/admin/Administrador";
import { Profesor } from "./components/profesor/Profesor";
import { ClasesImpartidas } from "./components/profesor/ClasesImpartidas";
import { RegistrarAlumnos } from "./components/admin/RegistrarAlumnos";
import { RegistrarProfesores } from "./components/admin/RegistrarProfesores";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RegistrarCursos } from "./components/admin/RegistrarCursos";
import { GestionarAlumnos } from "./components/admin/GestionarAlumnos";
import { GestionarProfesores } from "./components/admin/GestionarProfesores";
import { GestionarCursos } from "./components/admin/GestionarCursos";
import { EditarAlumnos } from "./components/admin/EditarAlumnos";
import { EditarProfesores } from "./components/admin/EditarProfesores";
import { EditarGrupo } from "./components/admin/EditarGrupo";
import { Distribucion } from "./components/admin/Distribucion";
import { Inscripcion } from "./components/alumno/Inscripcion";
import Horarios from "./components/alumno/Horarios";
import { EditarDatos } from "./components/alumno/EditarDatosPersonales";
import { PaseLista } from "./components/profesor/PaseLista";
import { HistorialAcademico } from "./components/alumno/HistorialAcademico";
import { MateriasReprobadas } from "./components/alumno/MateriasReprobadas";
import { ETS } from "./components/admin/ETS";
import { EvaluacionProfesores } from "./components/alumno/EvaluacionProfesores";
import { Carreras } from "./pages/Carreras";
import { Unidades } from "./pages/Unidades";
import { DatosMedicos } from "./pages/DatosMedicos";
import { RegistrarCalificaciones } from "./components/profesor/RegistrarCalificaciones";
import { ConsultarCalificaciones } from "./components/alumno/ConsultarCalificaciones";
import { PublicarNoticia } from "./components/admin/PublicarNoticia";
import RecuperarContra from "./components/formulario/RecuperarContra";

function App() {
  const [success, setSuccess] = useState("");
  const [id2, setId2] = useState("");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              !success ? (
                <Formulario setSuccess={setSuccess} setId2={setId2} />
              ) : success === "alumno" ? (
                <Navigate to={`/alumno/${id2}`} replace />
              ) : success === "administrador" ? (
                <Navigate to="/administrador" replace />
              ) : success === "profesor" ? (
                <Navigate to={`/profesor/${id2}`} replace />
              ) : (
                <p>Tipo de usuario no reconocido.</p>
              )
            }
          />
          <Route path="/recuperar-contrasena" element={<RecuperarContra />} />
          <Route path="/alumno/:id" element={<Alumno />} />
          <Route path="/alumno/Chat" element={<ChatbotAsistente />} />
          <Route path="/alumno/horarios/:id" element={<Horarios />} />
          <Route
            path="/alumno/evaluacion/:id"
            element={<EvaluacionProfesores />}
          />

          <Route path="/administrador" element={<Administrador />} />
          <Route path="/profesor/:id" element={<Profesor />} />
          <Route path="/profesor/:id/clases" element={<ClasesImpartidas />} />
          <Route
            path="administrador/gestionarCursos"
            element={<GestionarCursos />}
          />
          <Route
            path="administrador/gestionarCursos/registrarCurso"
            element={<RegistrarCursos />}
          />

          <Route path="administrador/carreras" element={<Carreras />} />
          <Route path="administrador/unidades" element={<Unidades />} />

          <Route
            path="administrador/gestionarProfesores/registrarProfesor"
            element={<RegistrarProfesores />}
          />
          <Route
            path="administrador/gestionarProfesores"
            element={<GestionarProfesores />}
          />
          <Route
            path="administrador/gestionarAlumnos"
            element={<GestionarAlumnos />}
          />
          <Route
            path="administrador/gestionarAlumnos/registrarAlumno"
            element={<RegistrarAlumnos />}
          />
          <Route
            path="/admin/gestionarAlumnos/editarAlumnos/:id"
            element={<EditarAlumnos />}
          />
          <Route
            path="administrador/gestionarProfesores/editarProfesor/:id"
            element={<EditarProfesores />}
          />
          <Route
            path="administrador/gestionarCursos/editarCurso/:id"
            element={<EditarGrupo />}
          />
          <Route
            path="administrador/gestionarCursos/distribucionHorarios/:id"
            element={<Distribucion />}
          />
          <Route path="administrador/datosMedicos" element={<DatosMedicos />} />

          <Route path="alumno/inscripcion/:id" element={<Inscripcion />} />
          <Route path="alumno/editarDatos/:id" element={<EditarDatos />} />
          <Route path="/profesor/paseLista/:id" element={<PaseLista />} />

          <Route path="/alumno/Kardex" element={<HistorialAcademico />} />

          <Route
            path="/alumno/MateriasReprobadas"
            element={<MateriasReprobadas />}
          />
          <Route path="/administrador/ETS" element={<ETS />} />

          <Route
            path="/profesor/RegistrarCalificaciones/:id/:periodo"
            element={<RegistrarCalificaciones />}
          />
          <Route
            path="/alumno/ConsultarCalificaciones"
            element={<ConsultarCalificaciones />}
          <Route
            path="/administrador/publicarNoticia"
            element={<PublicarNoticia />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
