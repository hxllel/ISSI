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

-- Se utiliza lista de columnas explicitas para asegurar compatibilidad con la definición de tablas en 01_init.sql
INSERT INTO datos_personales (
    id, contrasena, tipo_usuario, nombre, ape_paterno, ape_materno,
    fecha_nacimiento, RFC, tipo_sangre, CURP, nacionalidad, calle,
    num_exterior, num_interior, codigo_postal, colonia, delegacion, telefono, ciudad, email, foto, grado, carrera, situacion, calificacion
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
'123456', 
'CDMX', 
'juan_perez@gmail.com', 
NULL, 
'n/a', 
'Ingenieria en Sistemas Computacionales', 
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
'654321', 
'CDMX', 
'maria_lopez@gmail.com', 
NULL, 
'doctorado en ciencias', 
'Ingenieria en Inteligencia Artificial', 
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
'5523456789', 
'CDMX', 
'carlos_mendoza@ipn.mx', 
NULL, 
'maestria en computacion', 
'Ingenieria en Sistemas Computacionales', 
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
'5534567890', 
'CDMX', 
'ana_fernandez@ipn.mx', 
NULL, 
'doctorado en inteligencia artificial', 
'Ingenieria en Sistemas Computacionales', 
'activo',
9
),

-- Agregar usuarios que aparecen en bd.sql (P0001RSV, P0002KND, P0003HGR) para reproducir exactamente los registros de bd.sql
(
'P0001RSV',
'$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
'profesor',
'Ricardo',
'Solís',
'Vega',
'1975-08-10',
'RSV750810ABC',
'O-',
'RSV750810HDFLPR03',
'mexicana',
'Calle 10',
'101',
'B',
'03100',
'Narvarte',
'Benito Juárez',
'5598765432',
'CDMX',
'r.solis.v@escom.ipn.mx',
NULL,
'Maestría en TI',
NULL,
'activo',
8.5
),

(
'P0002KND',
'$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
'profesor',
'Karla',
'Núñez',
'Díaz',
'1990-03-05',
'KND900305ABC',
'B+',
'KND900305HDFLPR03',
'mexicana',
'Av. Cien',
'25',
'3A',
'07500',
'San Juan',
'GAM',
'5511223344',
'CDMX',
'karla.nunez@escom.ipn.mx',
NULL,
'Doctorado en IA',
NULL,
'activo',
9.3
),

(
'P0003HGR',
'$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
'profesor',
'Héctor',
'Gil',
'Ramos',
'1985-12-24',
'HGR851224ABC',
'A-',
'HGR851224HDFLPR03',
'mexicana',
'Eje Central',
'50',
'10B',
'06000',
'Centro Histórico',
'Cuauhtémoc',
'5544332211',
'CDMX',
'hector.gil@escom.ipn.mx',
NULL,
'Maestría en Ciencia de Datos',
NULL,
'activo',
8.9
);

-- ==================================================
-- CATÁLOGO DE CARRERAS (alineado a bd.sql)
-- ==================================================
INSERT INTO carrera (nombre, creditos_iniciales, prefijo_grupo, duracion_max) VALUES
('Ingenieria en Sistemas Computacionales', 25, 'C', 12),
('Ingenieria en Inteligencia Artificial', 25, 'B', 12),
('Licenciatura en Ciencia de Datos', 25, 'A', 12);