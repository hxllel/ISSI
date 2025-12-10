-- ==================================================
-- Datos básicos: Usuarios y Carreras
-- ==================================================
-- Descripción: Inserta usuarios iniciales (admin, profesores) y catálogo de carreras
-- Orden de ejecución: 2
-- Prerequisito: Ejecutar 01_init.sql
-- ==================================================

USE SAES;

-- ==================================================
-- USUARIOS INICIALES (Administrador y Profesores)
-- ==================================================

INSERT INTO datos_personales (
    id, contrasena, 
    tipo_usuario, 
    nombre, 
    ape_paterno, 
    ape_materno,
    fecha_nacimiento, 
    RFC, 
    tipo_sangre, 
    CURP, 
    nacionalidad, 
    calle,
    num_exterior, 
    num_interior, 
    codigo_postal, 
    colonia, 
    delegacion, 
    ciudad,
    telefono, 
    email, 
    grado, 
    situacion, 
    calificacion
) VALUES
('2023635321', 
'$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG', 
'administrador', 
'juan', 
'perez', 
'gonzales', 
'2007-05-23', 
'ABCDEFGE', 
'O+',
'ABCDEFG', 
'mexicana', 
'heroes', 
'15', 
'n/a', 
'12345', 
'juarez', 
'tlalpan', 
'CDMX', 
'123456', 
'juan_perez@gmail.com', 
'n/a', 
'activo',
10
),

(
'HIJKLMNO',
'$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG', 
'profesor', 
'maria', 
'lopez', 
'martinez', 
'1980-11-15', 
'HIJKLMNO', 
'A+', 
'HIJKLMNO', 
'mexicana', 
'revolucion', 
'45', 
'n/a', 
'67890', 
'centro', 
'coyoacan', 
'CDMX', 
'654321', 
'maria_lopez@gmail.com', 
'doctorado en ciencias', 
'activo',
9
),

(
'PROF0001',
'$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG', 
'profesor', 
'carlos', 
'mendoza', 
'rivera', 
'1978-06-22', 
'MERC780622', 
'O+', 
'MERC780622HDFRV09', 
'mexicana', 
'av. politecnico', 
'567', 
'n/a', 
'07738', 
'lindavista', 
'gustavo a madero', 
'CDMX', 
'5523456789', 
'carlos_mendoza@ipn.mx', 
'maestria en computacion', 
'activo',
8
),

(
'PROF0002',
'$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG', 
'profesor', 
'ana', 
'fernandez', 
'torres', 
'1985-02-14', 
'FETA850214', 
'A-', 
'FETA850214MDFRRN05', 
'mexicana', 
'insurgentes sur', 
'890', 
'piso 3', 
'03940', 
'narvarte', 
'benito juarez', 
'CDMX', 
'5534567890', 
'ana_fernandez@ipn.mx', 
'doctorado en inteligencia artificial', 
'activo',
9
);

-- ==================================================
-- CATÁLOGO DE CARRERAS
-- =================================================-
INSERT INTO carrera (nombre, creditos_iniciales, prefijo_grupo, duracion_max) VALUES
('Ingenieria en Sistemas Computacionales', 25, 'A', 12),
('Ingenieria en Inteligencia Artificial', 25, 'B', 12),
('Licenciatura en Ciencia de Datos', 25, 'C', 12);
