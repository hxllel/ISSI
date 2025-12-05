import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// FORMULARIO
import { Formulario } from "./components/formulario/Formulario";
import RecuperarContra from "./components/formulario/RecuperarContra";

// ALUMNO

import { ConocenosAlumno } from "./components/alumno/ConocenosAlumno";
import { Alumno } from "./components/alumno/Alumno";
import { ChatbotAsistente } from "./components/alumno/Chat";
import Horarios from "./components/alumno/Horarios";
import { Inscripcion } from "./components/alumno/Inscripcion";
import { EditarDatos } from "./components/alumno/EditarDatosPersonales";
import { HistorialAcademico } from "./components/alumno/HistorialAcademico";
import { MateriasReprobadas } from "./components/alumno/MateriasReprobadas";
import { EvaluacionProfesores } from "./components/alumno/EvaluacionProfesores";
import { DatosPersonales } from "./components/alumno/DatosPersonales";
import { ConsultarCalificaciones } from "./components/alumno/ConsultarCalificaciones";
import ResenarProfesores from "./components/alumno/ResenarProfesores";
import DetalleProfesorResenas from "./components/alumno/DetalleProfesorResenas";
import MapasCurriculares from "./components/alumno/MapasCurriculares";
// PROFESOR
import { Profesor } from "./components/profesor/Profesor";
import { ChatbotProfesor } from "./components/profesor/Chat";
import { ClasesImpartidas } from "./components/profesor/ClasesImpartidas";
import { PaseLista } from "./components/profesor/PaseLista";
import { RegistrarCalificaciones } from "./components/profesor/RegistrarCalificaciones";
import { InformacionPersonal } from "./components/profesor/InformacionPersonal";
import { EditarDatosPersonales } from "./components/profesor/EditarDatosPersonales";
import { ETS as ETSProfesor } from "./components/profesor/ETS";
import EvaluacionDocente from "./components/profesor/EvaluacionDocente";
import { Reglamentos } from "./pages/Reglamentos";

// PROFESOR

// ADMIN
import { Administrador } from "./components/admin/Administrador";
import { RegistrarAlumnos } from "./components/admin/RegistrarAlumnos";
import { RegistrarProfesores } from "./components/admin/RegistrarProfesores";
import { RegistrarCursos } from "./components/admin/RegistrarCursos";
import { GestionarAlumnos } from "./components/admin/GestionarAlumnos";
import { GestionarProfesores } from "./components/admin/GestionarProfesores";
import { GestionarCursos } from "./components/admin/GestionarCursos";
import { EditarAlumnos } from "./components/admin/EditarAlumnos";
import { EditarProfesores } from "./components/admin/EditarProfesores";
import { EditarGrupo } from "./components/admin/EditarGrupo";
import { Distribucion } from "./components/admin/Distribucion";
import { ETS } from "./components/admin/ETS";
import { PublicarNoticia } from "./components/admin/PublicarNoticia";
import { GenerarCitas } from "./components/admin/GenerarCitas";
import { InscripcionAdmin } from "./components/admin/InscripcionAdmin";

import { SituacionesEspeciales } from "./components/admin/SituacionesEspeciales";
// PAGINAS INDIVIDUALES
import { Carreras } from "./pages/Carreras";
import { Unidades } from "./pages/Unidades";
import { DatosMedicos } from "./pages/DatosMedicos";
import { ErrorView } from "./pages/Errores";

function App() {
  const [success, setSuccess] = useState("");
  const [id2, setId2] = useState("");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* LOGIN */}
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

          {/* ALUMNO */}
          <Route path="/alumno/:id" element={<Alumno />} />
          <Route path="/alumno/Chat" element={<ChatbotAsistente />} />
          <Route path="/alumno/horarios/:id" element={<Horarios />} />
          <Route
            path="/alumno/evaluacion/:id"
            element={<EvaluacionProfesores />}
          />
          <Route path="/alumno/conocenosAlumno" element={<ConocenosAlumno />} />
          <Route path="/alumno/inscripcion/:id" element={<Inscripcion />} />
          <Route path="/alumno/editarDatos/:id" element={<EditarDatos />} />
          <Route path="/alumno/Kardex" element={<HistorialAcademico />} />
          <Route
            path="/alumno/MateriasReprobadas"
            element={<MateriasReprobadas />}
          />
          <Route
            path="/alumno/datosPersonales/:id"
            element={<DatosPersonales />}
          />
          <Route
            path="/alumno/ConsultarCalificaciones"
            element={<ConsultarCalificaciones />}
          />
          <Route
            path="/alumno/resenar-profesores"
            element={<ResenarProfesores />}
          />
          <Route
            path="/alumno/resenas-profesor/:id"
            element={<DetalleProfesorResenas />}
          />
          <Route
            path="/alumno/MapasCurriculares"
            element={<MapasCurriculares />}
          />
          {/* PROFESOR */}
          <Route path="/profesor/:id" element={<Profesor />} />
          <Route path="/profesor/Chat" element={<ChatbotProfesor />} />
          <Route path="/profesor/:id/clases" element={<ClasesImpartidas />} />
          <Route path="/profesor/:id/ets" element={<ETSProfesor />} />
          <Route path="/profesor/:id/evaluacion" element={<EvaluacionDocente />} />
          <Route path="/profesor/paseLista/:id" element={<PaseLista />} />
          <Route
            path="/profesor/RegistrarCalificaciones/:id/:periodo"
            element={<RegistrarCalificaciones />}
          />
          <Route
            path="/profesor/datosPersonalesProf/:id"
            element={<DatosPersonales />}
          />
          <Route
            path="/profesor/informacionPersonal/:id"
            element={<InformacionPersonal />}
          />
          <Route
            path="/profesor/editarDatosPersonales/:id"
            element={<EditarDatosPersonales />}
          />

          <Route path="/administrador" element={<Administrador />} />
          <Route path="/administrador/ETS" element={<ETS />} />
          <Route
            path="/administrador/publicarNoticia"
            element={<PublicarNoticia />}
          />

          {/* ADMINISTRADOR - CRUD */}
          <Route
            path="/administrador/gestionarAlumnos"
            element={<GestionarAlumnos />}
          />
          <Route
            path="/administrador/gestionarAlumnos/registrarAlumno"
            element={<RegistrarAlumnos />}
          />
          <Route
            path="/administrador/gestionarAlumnos/editarAlumnos/:id"
            element={<EditarAlumnos />}
          />
          <Route
            path="/administrador/gestionarProfesores"
            element={<GestionarProfesores />}
          />
          <Route
            path="/administrador/gestionarProfesores/registrarProfesor"
            element={<RegistrarProfesores />}
          />
          <Route
            path="/administrador/gestionarProfesores/editarProfesor/:id"
            element={<EditarProfesores />}
          />
          <Route
            path="/administrador/gestionarCursos"
            element={<GestionarCursos />}
          />
          <Route
            path="/administrador/gestionarCursos/registrarCurso"
            element={<RegistrarCursos />}
          />
          <Route
            path="/administrador/gestionarCursos/editarCurso/:id"
            element={<EditarGrupo />}
          />
          <Route
            path="/administrador/gestionarCursos/distribucionHorarios/:id"
            element={<Distribucion />}
          />
          <Route
            path="/administrador/gestionarAlumnos/inscripcion/:id"
            element={<InscripcionAdmin />}
          />
          <Route
            path="administrador/datosMedicos/:id"
            element={<DatosMedicos />}
          />

          {/* ADMIN PÁGINAS */}
          <Route path="/administrador/carreras" element={<Carreras />} />
          <Route path="/administrador/unidades" element={<Unidades />} />
          <Route path="/administrador/Fechas" element={<GenerarCitas />} />
          <Route
            path="/administrador/SituacionesEspeciales"
            element={<SituacionesEspeciales />}
          />
          <Route path="/error" element={<ErrorView />} />
          <Route path="*" element={<ErrorView />} />
          <Route path="/reglamentos" element={<Reglamentos />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
