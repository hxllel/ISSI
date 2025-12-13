-- ==================================================
-- Datos de Alumnos y Estudiantes
-- ==================================================
-- Descripción: Inserta alumnos con sus datos personales, kardex y estado académico
-- Orden de ejecución: 5
-- Prerequisito: Ejecutar 04_grupos_horarios.sql
-- ==================================================

USE SAES;

SET FOREIGN_KEY_CHECKS = 0;

DELETE FROM datos_personales WHERE tipo_usuario = 'alumno';

INSERT INTO
    datos_personales (
        id,
        contrasena,
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
        calificacion,
        carrera
    )
VALUES
    -- ===== 10 Alumnos IIA =====
    (
        '2024630101',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'María',
        'Gómez',
        'Sánchez',
        '2006-03-21',
        'RFC2024630101',
        'A+',
        'CURP2024630101',
        'mexicana',
        'Calle Ferrer',
        '123',
        'n/a',
        '01234',
        'Colonia Central',
        'Delegacion GAM',
        'CDMX',
        '550101',
        '2024630101@ipn.mx',
        NULL,
        'activo',
        8.5,
        'Ingenieria en Inteligencia Artificial'
    ),
    (
        '2024630102',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Luis',
        'Hernández',
        'Cruz',
        '2005-11-05',
        'RFC2024630102',
        'O-',
        'CURP2024630102',
        'mexicana',
        'Calle Cocos',
        '123',
        'n/a',
        '01234',
        'Colonia Central',
        'Delegacion Iztacalco',
        'CDMX',
        '550102',
        '2024630102@ipn.mx',
        NULL,
        'activo',
        8.5,
        'Ingenieria en Inteligencia Artificial'
    ),
    (
        '2024630103',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Diego',
        'Ruiz',
        'Salazar',
        '2006-04-12',
        'RFC2024630103',
        'O+',
        'CURP2024630103',
        'mexicana',
        'Calle Robles',
        '234',
        'n/a',
        '01240',
        'Colonia Industrial',
        'Delegacion Azcapotzalco',
        'CDMX',
        '550103',
        '2024630103@ipn.mx',
        NULL,
        'activo',
        7.8,
        'Ingenieria en Inteligencia Artificial'
    ),
    (
        '2024630104',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Isabella',
        'Castro',
        'Reyes',
        '2006-06-30',
        'RFC2024630104',
        'A-',
        'CURP2024630104',
        'mexicana',
        'Calle Naranjos',
        '567',
        'n/a',
        '01241',
        'Colonia Centro',
        'Delegacion Cuauhtémoc',
        'CDMX',
        '550104',
        '2024630104@ipn.mx',
        NULL,
        'activo',
        8.9,
        'Ingenieria en Inteligencia Artificial'
    ),
    (
        '2024630105',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Mateo',
        'Vargas',
        'Mendoza',
        '2006-02-18',
        'RFC2024630105',
        'B+',
        'CURP2024630105',
        'mexicana',
        'Calle Eucaliptos',
        '890',
        'n/a',
        '01242',
        'Colonia Roma',
        'Delegacion Cuauhtémoc',
        'CDMX',
        '550105',
        '2024630105@ipn.mx',
        NULL,
        'activo',
        8.2,
        'Ingenieria en Inteligencia Artificial'
    ),
    (
        '2024630106',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Camila',
        'Ortiz',
        'Mora',
        '2006-08-25',
        'RFC2024630106',
        'AB+',
        'CURP2024630106',
        'mexicana',
        'Calle Pinos',
        '123',
        'n/a',
        '01243',
        'Colonia Condesa',
        'Delegacion Cuauhtémoc',
        'CDMX',
        '550106',
        '2024630106@ipn.mx',
        NULL,
        'activo',
        7.5,
        'Ingenieria en Inteligencia Artificial'
    ),
    (
        '2024630107',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Santiago',
        'Ramos',
        'Silva',
        '2006-01-09',
        'RFC2024630107',
        'O-',
        'CURP2024630107',
        'mexicana',
        'Calle Cedros',
        '456',
        'n/a',
        '01244',
        'Colonia Polanco',
        'Delegacion Miguel Hidalgo',
        'CDMX',
        '550107',
        '2024630107@ipn.mx',
        NULL,
        'activo',
        8.6,
        'Ingenieria en Inteligencia Artificial'
    ),
    (
        '2024630108',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Valentina',
        'Navarro',
        'Guzmán',
        '2006-03-15',
        'RFC2024630108',
        'A+',
        'CURP2024630108',
        'mexicana',
        'Calle Sauces',
        '789',
        'n/a',
        '01245',
        'Colonia Del Valle',
        'Delegacion Benito Juárez',
        'CDMX',
        '550108',
        '2024630108@ipn.mx',
        NULL,
        'activo',
        9.1,
        'Ingenieria en Inteligencia Artificial'
    ),
    (
        '2024630109',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Sebastián',
        'Aguilar',
        'Ríos',
        '2006-05-22',
        'RFC2024630109',
        'B-',
        'CURP2024630109',
        'mexicana',
        'Calle Olmos',
        '234',
        'n/a',
        '01246',
        'Colonia Nápoles',
        'Delegacion Benito Juárez',
        'CDMX',
        '550109',
        '2024630109@ipn.mx',
        NULL,
        'activo',
        7.9,
        'Ingenieria en Inteligencia Artificial'
    ),
    (
        '2024630110',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Regina',
        'Flores',
        'Vega',
        '2006-07-08',
        'RFC2024630110',
        'O+',
        'CURP2024630110',
        'mexicana',
        'Calle Álamos',
        '567',
        'n/a',
        '01247',
        'Colonia San Rafael',
        'Delegacion Cuauhtémoc',
        'CDMX',
        '550110',
        '2024630110@ipn.mx',
        NULL,
        'activo',
        8.4,
        'Ingenieria en Inteligencia Artificial'
    ),
    -- ===== 10 Alumnos LCD =====
    (
        '2024630201',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Ana',
        'Díaz',
        'Flores',
        '2006-01-10',
        'RFC2024630201',
        'AB-',
        'CURP2024630201',
        'mexicana',
        'Calle Tulipanes',
        '123',
        'n/a',
        '01230',
        'Colonia Sur',
        'Delegacion Coyoacán',
        'CDMX',
        '550201',
        '2024630201@ipn.mx',
        NULL,
        'activo',
        9.2,
        'Licenciatura en Ciencia de Datos'
    ),
    (
        '2024630202',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Carlos',
        'López',
        'García',
        '2005-07-15',
        'RFC2024630202',
        'B+',
        'CURP2024630202',
        'mexicana',
        'Calle Primavera',
        '456',
        'n/a',
        '01231',
        'Colonia Oriente',
        'Delegacion Benito Juárez',
        'CDMX',
        '550202',
        '2024630202@ipn.mx',
        NULL,
        'activo',
        6.5,
        'Licenciatura en Ciencia de Datos'
    ),
    (
        '2024630203',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Ximena',
        'Medina',
        'Carrillo',
        '2006-02-28',
        'RFC2024630203',
        'B+',
        'CURP2024630203',
        'mexicana',
        'Calle Cipreses',
        '789',
        'n/a',
        '01251',
        'Colonia Guerrero',
        'Delegacion Cuauhtémoc',
        'CDMX',
        '550203',
        '2024630203@ipn.mx',
        NULL,
        'activo',
        8.1,
        'Licenciatura en Ciencia de Datos'
    ),
    (
        '2024630204',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Gabriel',
        'Sandoval',
        'Bravo',
        '2006-04-16',
        'RFC2024630204',
        'A+',
        'CURP2024630204',
        'mexicana',
        'Calle Abetos',
        '234',
        'n/a',
        '01252',
        'Colonia Morelos',
        'Delegacion Cuauhtémoc',
        'CDMX',
        '550204',
        '2024630204@ipn.mx',
        NULL,
        'activo',
        8.8,
        'Licenciatura en Ciencia de Datos'
    ),
    (
        '2024630205',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Renata',
        'Herrera',
        'Pantoja',
        '2006-06-11',
        'RFC2024630205',
        'O-',
        'CURP2024630205',
        'mexicana',
        'Calle Caobas',
        '567',
        'n/a',
        '01253',
        'Colonia Algarín',
        'Delegacion Cuauhtémoc',
        'CDMX',
        '550205',
        '2024630205@ipn.mx',
        NULL,
        'activo',
        7.6,
        'Licenciatura en Ciencia de Datos'
    ),
    (
        '2024630206',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Andrés',
        'Velázquez',
        'Montes',
        '2006-08-03',
        'RFC2024630206',
        'AB+',
        'CURP2024630206',
        'mexicana',
        'Calle Encinos',
        '890',
        'n/a',
        '01254',
        'Colonia Transito',
        'Delegacion Cuauhtémoc',
        'CDMX',
        '550206',
        '2024630206@ipn.mx',
        NULL,
        'activo',
        8.5,
        'Licenciatura en Ciencia de Datos'
    ),
    (
        '2024630207',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Paulina',
        'Moreno',
        'Aguirre',
        '2006-03-27',
        'RFC2024630207',
        'A-',
        'CURP2024630207',
        'mexicana',
        'Calle Ahuehuetes',
        '123',
        'n/a',
        '01255',
        'Colonia Obrera',
        'Delegacion Cuauhtémoc',
        'CDMX',
        '550207',
        '2024630207@ipn.mx',
        NULL,
        'activo',
        9.0,
        'Licenciatura en Ciencia de Datos'
    ),
    (
        '2024630208',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Leonardo',
        'Gil',
        'Coronado',
        '2006-05-19',
        'RFC2024630208',
        'B+',
        'CURP2024630208',
        'mexicana',
        'Calle Bambúes',
        '456',
        'n/a',
        '01256',
        'Colonia Asturias',
        'Delegacion Cuauhtémoc',
        'CDMX',
        '550208',
        '2024630208@ipn.mx',
        NULL,
        'activo',
        7.8,
        'Licenciatura en Ciencia de Datos'
    ),
    (
        '2024630209',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Miranda',
        'Pacheco',
        'Domínguez',
        '2006-07-01',
        'RFC2024630209',
        'O+',
        'CURP2024630209',
        'mexicana',
        'Calle Tulipanes',
        '789',
        'n/a',
        '01257',
        'Colonia Ampliación Asturias',
        'Delegacion Cuauhtémoc',
        'CDMX',
        '550209',
        '2024630209@ipn.mx',
        NULL,
        'activo',
        8.2,
        'Licenciatura en Ciencia de Datos'
    ),
    (
        '2024630210',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Emilio',
        'Ávila',
        'Cabrera',
        '2006-09-23',
        'RFC2024630210',
        'A+',
        'CURP2024630210',
        'mexicana',
        'Calle Gardenias',
        '234',
        'n/a',
        '01258',
        'Colonia Peralvillo',
        'Delegacion Cuauhtémoc',
        'CDMX',
        '550210',
        '2024630210@ipn.mx',
        NULL,
        'activo',
        8.7,
        'Licenciatura en Ciencia de Datos'
    ),
    -- ===== 10 Alumnos ISC =====
    (
        '2024630301',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Roberto',
        'Ramírez',
        'Vargas',
        '2006-05-29',
        'RFC2024630301',
        'A-',
        'CURP2024630301',
        'mexicana',
        'Calle Jacarandas',
        '123',
        'n/a',
        '01234',
        'Colonia Central',
        'Delegacion Coyacán',
        'CDMX',
        '550301',
        '2024630301@ipn.mx',
        NULL,
        'activo',
        8.5,
        'Ingenieria en Sistemas Computacionales'
    ),
    (
        '2024630302',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Ricardo',
        'Torres',
        'Pérez',
        '2005-12-01',
        'RFC2024630302',
        'AB+',
        'CURP2024630302',
        'mexicana',
        'Calle Comunicaciones',
        '123',
        'n/a',
        '01234',
        'Colonia Central',
        'Delegacion Buena Vista',
        'CDMX',
        '550302',
        '2024630302@ipn.mx',
        NULL,
        'activo',
        8.5,
        'Ingenieria en Sistemas Computacionales'
    ),
    (
        '2024630303',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Nicolás',
        'Delgado',
        'Ponce',
        '2006-02-14',
        'RFC2024630303',
        'A+',
        'CURP2024630303',
        'mexicana',
        'Calle Bugambilias',
        '456',
        'n/a',
        '01262',
        'Colonia Buenavista',
        'Delegacion Cuauhtémoc',
        'CDMX',
        '550303',
        '2024630303@ipn.mx',
        NULL,
        'activo',
        8.9,
        'Ingenieria en Sistemas Computacionales'
    ),
    (
        '2024630304',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Alexa',
        'Contreras',
        'Garza',
        '2006-04-07',
        'RFC2024630304',
        'O-',
        'CURP2024630304',
        'mexicana',
        'Calle Azaleas',
        '789',
        'n/a',
        '01263',
        'Colonia Santa María la Ribera',
        'Delegacion Cuauhtémoc',
        'CDMX',
        '550304',
        '2024630304@ipn.mx',
        NULL,
        'activo',
        7.5,
        'Ingenieria en Sistemas Computacionales'
    ),
    (
        '2024630305',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Rodrigo',
        'Maldonado',
        'Chávez',
        '2006-06-24',
        'RFC2024630305',
        'B+',
        'CURP2024630305',
        'mexicana',
        'Calle Orquídeas',
        '234',
        'n/a',
        '01264',
        'Colonia San Simón Tolnáhuac',
        'Delegacion Cuauhtémoc',
        'CDMX',
        '550305',
        '2024630305@ipn.mx',
        NULL,
        'activo',
        8.3,
        'Ingenieria en Sistemas Computacionales'
    ),
    (
        '2024630306',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Natalia',
        'Fuentes',
        'Rosales',
        '2006-08-18',
        'RFC2024630306',
        'AB+',
        'CURP2024630306',
        'mexicana',
        'Calle Claveles',
        '567',
        'n/a',
        '01265',
        'Colonia Ex Hipódromo de Peralvillo',
        'Delegacion Cuauhtémoc',
        'CDMX',
        '550306',
        '2024630306@ipn.mx',
        NULL,
        'activo',
        8.1,
        'Ingenieria en Sistemas Computacionales'
    ),
    (
        '2024630307',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Ángel',
        'Zárate',
        'Guerrero',
        '2006-03-09',
        'RFC2024630307',
        'A-',
        'CURP2024630307',
        'mexicana',
        'Calle Hortensias',
        '890',
        'n/a',
        '01266',
        'Colonia Felipe Pescador',
        'Delegacion Cuauhtémoc',
        'CDMX',
        '550307',
        '2024630307@ipn.mx',
        NULL,
        'activo',
        8.7,
        'Ingenieria en Sistemas Computacionales'
    ),
    (
        '2024630308',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Victoria',
        'Molina',
        'Pedraza',
        '2006-05-26',
        'RFC2024630308',
        'O+',
        'CURP2024630308',
        'mexicana',
        'Calle Dalias',
        '123',
        'n/a',
        '01267',
        'Colonia Moctezuma',
        'Delegacion Venustiano Carranza',
        'CDMX',
        '550308',
        '2024630308@ipn.mx',
        NULL,
        'activo',
        7.2,
        'Ingenieria en Sistemas Computacionales'
    ),
    (
        '2024630309',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Ian',
        'Quintero',
        'Herrera',
        '2006-07-13',
        'RFC2024630309',
        'B-',
        'CURP2024630309',
        'mexicana',
        'Calle Camelias',
        '456',
        'n/a',
        '01268',
        'Colonia Peñón de los Baños',
        'Delegacion Venustiano Carranza',
        'CDMX',
        '550309',
        '2024630309@ipn.mx',
        NULL,
        'activo',
        8.4,
        'Ingenieria en Sistemas Computacionales'
    ),
    (
        '2024630310',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Amanda',
        'Salinas',
        'Nava',
        '2006-09-29',
        'RFC2024630310',
        'A+',
        'CURP2024630310',
        'mexicana',
        'Calle Girasoles',
        '789',
        'n/a',
        '01269',
        'Colonia Jardín Balbuena',
        'Delegacion Venustiano Carranza',
        'CDMX',
        '550310',
        '2024630310@ipn.mx',
        NULL,
        'activo',
        9.2,
        'Ingenieria en Sistemas Computacionales'
    );

-- ==================================================================
-- 5. INSERCIÓN DE ESTUDIANTE Y KARDEX
-- ==================================================================
DELETE FROM estudiante;

INSERT INTO
    estudiante (
        id,
        id_usuario,
        promedio,
        creditos_disponibles,
        estado_academico
    )
VALUES
    -- IIA (10)
    (
        'EST2024630101',
        '2024630101',
        8.5,
        25.0,
        'Regular'
    ),
    (
        'EST2024630102',
        '2024630102',
        8.5,
        25.0,
        'Regular'
    ),
    (
        'EST2024630103',
        '2024630103',
        7.8,
        25.0,
        'Regular'
    ),
    (
        'EST2024630104',
        '2024630104',
        8.9,
        25.0,
        'Irregular'
    ),
    (
        'EST2024630105',
        '2024630105',
        8.2,
        25.0,
        'Regular'
    ),
    (
        'EST2024630106',
        '2024630106',
        7.5,
        25.0,
        'Regular'
    ),
    (
        'EST2024630107',
        '2024630107',
        8.6,
        25.0,
        'Regular'
    ),
    (
        'EST2024630108',
        '2024630108',
        9.1,
        25.0,
        'Regular'
    ),
    (
        'EST2024630109',
        '2024630109',
        7.9,
        25.0,
        'Regular'
    ),
    (
        'EST2024630110',
        '2024630110',
        8.4,
        25.0,
        'Regular'
    ),
    -- LCD (10)
    (
        'EST2024630201',
        '2024630201',
        9.2,
        25.0,
        'Regular'
    ),
    (
        'EST2024630202',
        '2024630202',
        6.5,
        25.0,
        'Irregular'
    ),
    (
        'EST2024630203',
        '2024630203',
        8.1,
        25.0,
        'Regular'
    ),
    (
        'EST2024630204',
        '2024630204',
        8.8,
        25.0,
        'Regular'
    ),
    (
        'EST2024630205',
        '2024630205',
        7.6,
        25.0,
        'Regular'
    ),
    (
        'EST2024630206',
        '2024630206',
        8.5,
        25.0,
        'Regular'
    ),
    (
        'EST2024630207',
        '2024630207',
        9.0,
        25.0,
        'Irregular'
    ),
    (
        'EST2024630208',
        '2024630208',
        7.8,
        25.0,
        'Regular'
    ),
    (
        'EST2024630209',
        '2024630209',
        8.2,
        25.0,
        'Regular'
    ),
    (
        'EST2024630210',
        '2024630210',
        8.7,
        25.0,
        'Regular'
    ),
    -- ISC (10)
    (
        'EST2024630301',
        '2024630301',
        8.5,
        25.0,
        'Regular'
    ),
    (
        'EST2024630302',
        '2024630302',
        8.5,
        25.0,
        'Regular'
    ),
    (
        'EST2024630303',
        '2024630303',
        8.9,
        25.0,
        'Regular'
    ),
    (
        'EST2024630304',
        '2024630304',
        7.5,
        25.0,
        'Irregular'
    ),
    (
        'EST2024630305',
        '2024630305',
        8.3,
        25.0,
        'Regular'
    ),
    (
        'EST2024630306',
        '2024630306',
        8.1,
        25.0,
        'Irregular'
    ),
    (
        'EST2024630307',
        '2024630307',
        8.7,
        25.0,
        'Regular'
    ),
    (
        'EST2024630308',
        '2024630308',
        7.2,
        25.0,
        'Regular'
    ),
    (
        'EST2024630309',
        '2024630309',
        8.4,
        25.0,
        'Regular'
    ),
    (
        'EST2024630310',
        '2024630310',
        9.2,
        25.0,
        'Regular'
    );

DELETE FROM kardex;

INSERT INTO
    kardex (
        id,
        id_alumno,
        promedio,
        situacion_academica,
        semestres_restantes,
        creditos_obtenidos
    )
VALUES
    -- IIA (10)
    (
        'K2024630101',
        '2024630101',
        8.5,
        'Regular',
        7,
        22.5
    ),
    (
        'K2024630102',
        '2024630102',
        8.5,
        'Regular',
        7,
        22.5
    ),
    (
        'K2024630103',
        '2024630103',
        7.8,
        'Regular',
        7,
        22.5
    ),
    (
        'K2024630104',
        '2024630104',
        8.9,
        'Irregular',
        7,
        22.5
    ),
    (
        'K2024630105',
        '2024630105',
        8.2,
        'Regular',
        7,
        22.5
    ),
    (
        'K2024630106',
        '2024630106',
        7.5,
        'Regular',
        7,
        22.5
    ),
    (
        'K2024630107',
        '2024630107',
        8.6,
        'Regular',
        7,
        22.5
    ),
    (
        'K2024630108',
        '2024630108',
        9.1,
        'Regular',
        7,
        22.5
    ),
    (
        'K2024630109',
        '2024630109',
        7.9,
        'Regular',
        7,
        22.5
    ),
    (
        'K2024630110',
        '2024630110',
        8.4,
        'Regular',
        7,
        22.5
    ),
    -- LCD (10)
    (
        'K2024630201',
        '2024630201',
        9.2,
        'Regular',
        7,
        22.5
    ),
    (
        'K2024630202',
        '2024630202',
        6.5,
        'Irregular',
        7,
        22.5
    ),
    (
        'K2024630203',
        '2024630203',
        8.1,
        'Regular',
        7,
        22.5
    ),
    (
        'K2024630204',
        '2024630204',
        8.8,
        'Regular',
        7,
        22.5
    ),
    (
        'K2024630205',
        '2024630205',
        7.6,
        'Regular',
        7,
        22.5
    ),
    (
        'K2024630206',
        '2024630206',
        8.5,
        'Regular',
        7,
        22.5
    ),
    (
        'K2024630207',
        '2024630207',
        9.0,
        'Irregular',
        7,
        22.5
    ),
    (
        'K2024630208',
        '2024630208',
        7.8,
        'Regular',
        7,
        22.5
    ),
    (
        'K2024630209',
        '2024630209',
        8.2,
        'Regular',
        7,
        22.5
    ),
    (
        'K2024630210',
        '2024630210',
        8.7,
        'Regular',
        7,
        22.5
    ),
    -- ISC (10)
    (
        'K2024630301',
        '2024630301',
        8.5,
        'Regular',
        7,
        22.5
    ),
    (
        'K2024630302',
        '2024630302',
        8.5,
        'Regular',
        7,
        22.5
    ),
    (
        'K2024630303',
        '2024630303',
        8.9,
        'Regular',
        7,
        22.5
    ),
    (
        'K2024630304',
        '2024630304',
        7.5,
        'Irregular',
        7,
        22.5
    ),
    (
        'K2024630305',
        '2024630305',
        8.3,
        'Regular',
        7,
        22.5
    ),
    (
        'K2024630306',
        '2024630306',
        8.1,
        'Irregular',
        7,
        22.5
    ),
    (
        'K2024630307',
        '2024630307',
        8.7,
        'Regular',
        7,
        22.5
    ),
    (
        'K2024630308',
        '2024630308',
        7.2,
        'Regular',
        7,
        22.5
    ),
    (
        'K2024630309',
        '2024630309',
        8.4,
        'Regular',
        7,
        22.5
    ),
    (
        'K2024630310',
        '2024630310',
        9.2,
        'Regular',
        7,
        22.5
    );

-- ==================================================================
-- 7. INSCRIPCIONES DEL SEMESTRE ACTUAL (HORARIOS Y MATRÍCULAS)
-- Los alumnos están inscritos en grupos según su asignación
-- ==================================================================
DELETE FROM horario;

INSERT INTO
    horario (id, id_alumno)
VALUES
    -- Alumnos IIA (15)
    ('H2024630101', '2024630101'),
    ('H2024630102', '2024630102'),
    ('H2024630103', '2024630103'),
    ('H2024630104', '2024630104'),
    ('H2024630105', '2024630105'),
    ('H2024630106', '2024630106'),
    ('H2024630107', '2024630107'),
    ('H2024630108', '2024630108'),
    ('H2024630109', '2024630109'),
    ('H2024630110', '2024630110'),
    ('H2024630111', '2024630111'),
    ('H2024630112', '2024630112'),
    ('H2024630113', '2024630113'),
    -- Alumnos LCD (15)
    ('H2024630201', '2024630201'),
    ('H2024630202', '2024630202'),
    ('H2024630203', '2024630203'),
    ('H2024630204', '2024630204'),
    ('H2024630205', '2024630205'),
    ('H2024630206', '2024630206'),
    ('H2024630207', '2024630207'),
    ('H2024630208', '2024630208'),
    ('H2024630209', '2024630209'),
    ('H2024630210', '2024630210'),
    ('H2024630211', '2024630211'),
    ('H2024630212', '2024630212'),
    ('H2024630213', '2024630213'),
    -- Alumnos ISC (15)
    ('H2024630301', '2024630301'),
    ('H2024630302', '2024630302'),
    ('H2024630303', '2024630303'),
    ('H2024630304', '2024630304'),
    ('H2024630305', '2024630305'),
    ('H2024630306', '2024630306'),
    ('H2024630307', '2024630307'),
    ('H2024630308', '2024630308'),
    ('H2024630309', '2024630309'),
    ('H2024630310', '2024630310'),
    ('H2024630311', '2024630311'),
    ('H2024630312', '2024630312'),
    ('H2024630313', '2024630313'),
    -- Horario Alumno Desfasado (cursando materias de 3ro, 4to y 5to)
    ('H2022630400', '2022630400'),
    -- Horario Alumno Sin Semestres (cursando materias pendientes)
    ('H2019630500', '2019630500'),
    -- Horario Alumno Regular 8vo Semestre IIA
    ('H2021630600', '2021630600'),
    -- Horario Alumno Regular 7mo Semestre IIA con Reprobadas
    ('H2022630700', '2022630700'),
    -- Horario Alumno Regular 6to Semestre IIA con Reprobadas Recuperadas
    ('H2023630800', '2023630800'),
    -- Horario Alumno Regular 5to Semestre IIA sin Reprobadas
    ('H2024630900', '2024630900'),
    -- Horario Alumno Regular 4to Semestre IIA con Materias Recuperadas
    ('H2025631000', '2025631000'),
    -- Horario Alumno Regular 3er Semestre ISC sin Reprobadas
    ('H2026631100', '2026631100'),
    -- Horario Alumno Regular 2do Semestre ISC con Reprobadas
    ('H2027631200', '2027631200');

DELETE FROM ua_aprobada;

INSERT INTO
    ua_aprobada (
        id,
        id_kardex,
        unidad_aprendizaje,
        calificacion_final,
        semestre,
        periodo,
        fecha,
        metodo_aprobado
    )
VALUES
    -- IIA historial de 1er semestre (10 x 3 materias)
    (
        'UAA0001',
        'K2024630101',
        'Fundamentos de Programación',
        8.9,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0002',
        'K2024630101',
        'Matemáticas Discretas',
        8.8,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0003',
        'K2024630101',
        'Cálculo',
        7.9,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0004',
        'K2024630102',
        'Fundamentos de Programación',
        8.5,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0005',
        'K2024630102',
        'Matemáticas Discretas',
        8.2,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0006',
        'K2024630102',
        'Cálculo',
        8.1,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0007',
        'K2024630103',
        'Fundamentos de Programación',
        7.8,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0008',
        'K2024630103',
        'Matemáticas Discretas',
        7.5,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0009',
        'K2024630103',
        'Cálculo',
        8.2,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0010',
        'K2024630104',
        'Fundamentos de Programación',
        8.9,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0011',
        'K2024630104',
        'Matemáticas Discretas',
        9.1,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0012',
        'K2024630104',
        'Cálculo',
        8.7,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0013',
        'K2024630105',
        'Fundamentos de Programación',
        8.2,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0014',
        'K2024630105',
        'Matemáticas Discretas',
        8.0,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0015',
        'K2024630105',
        'Cálculo',
        8.4,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0016',
        'K2024630106',
        'Fundamentos de Programación',
        7.5,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0017',
        'K2024630106',
        'Matemáticas Discretas',
        7.3,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0018',
        'K2024630106',
        'Cálculo',
        7.6,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0019',
        'K2024630107',
        'Fundamentos de Programación',
        8.6,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0020',
        'K2024630107',
        'Matemáticas Discretas',
        8.5,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0021',
        'K2024630107',
        'Cálculo',
        8.7,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0022',
        'K2024630108',
        'Fundamentos de Programación',
        9.1,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0023',
        'K2024630108',
        'Matemáticas Discretas',
        9.0,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0024',
        'K2024630108',
        'Cálculo',
        9.3,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0025',
        'K2024630109',
        'Fundamentos de Programación',
        7.9,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0026',
        'K2024630109',
        'Matemáticas Discretas',
        7.8,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0027',
        'K2024630109',
        'Cálculo',
        8.0,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0028',
        'K2024630110',
        'Fundamentos de Programación',
        8.4,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0029',
        'K2024630110',
        'Matemáticas Discretas',
        8.5,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0030',
        'K2024630110',
        'Cálculo',
        8.2,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    -- LCD historial (10 x 3 materias)
    (
        'UAA0031',
        'K2024630201',
        'Fundamentos de Programación',
        9.2,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0032',
        'K2024630201',
        'Introducción a Ciencia de Datos',
        9.4,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0033',
        'K2024630201',
        'Cálculo',
        8.9,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0034',
        'K2024630202',
        'Fundamentos de Programación',
        6.5,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0035',
        'K2024630202',
        'Introducción a Ciencia de Datos',
        6.8,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0036',
        'K2024630202',
        'Cálculo',
        6.0,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0037',
        'K2024630203',
        'Fundamentos de Programación',
        8.1,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0038',
        'K2024630203',
        'Introducción a Ciencia de Datos',
        8.0,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0039',
        'K2024630203',
        'Cálculo',
        8.2,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0040',
        'K2024630204',
        'Fundamentos de Programación',
        8.8,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0041',
        'K2024630204',
        'Introducción a Ciencia de Datos',
        8.9,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0042',
        'K2024630204',
        'Cálculo',
        8.7,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0043',
        'K2024630205',
        'Fundamentos de Programación',
        7.6,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0044',
        'K2024630205',
        'Introducción a Ciencia de Datos',
        7.5,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0045',
        'K2024630205',
        'Cálculo',
        7.7,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0046',
        'K2024630206',
        'Fundamentos de Programación',
        8.5,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0047',
        'K2024630206',
        'Introducción a Ciencia de Datos',
        8.4,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0048',
        'K2024630206',
        'Cálculo',
        8.6,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0049',
        'K2024630207',
        'Fundamentos de Programación',
        9.0,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0050',
        'K2024630207',
        'Introducción a Ciencia de Datos',
        9.1,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0051',
        'K2024630207',
        'Cálculo',
        8.9,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0052',
        'K2024630208',
        'Fundamentos de Programación',
        7.8,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0053',
        'K2024630208',
        'Introducción a Ciencia de Datos',
        7.7,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0054',
        'K2024630208',
        'Cálculo',
        7.9,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0055',
        'K2024630209',
        'Fundamentos de Programación',
        8.2,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0056',
        'K2024630209',
        'Introducción a Ciencia de Datos',
        8.1,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0057',
        'K2024630209',
        'Cálculo',
        8.4,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0058',
        'K2024630210',
        'Fundamentos de Programación',
        8.7,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0059',
        'K2024630210',
        'Introducción a Ciencia de Datos',
        8.8,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0060',
        'K2024630210',
        'Cálculo',
        8.6,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    -- ISC historial (10 x 3 materias)
    (
        'UAA0061',
        'K2024630301',
        'Fundamentos de Programación',
        8.5,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0062',
        'K2024630301',
        'Matemáticas Discretas',
        8.6,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0063',
        'K2024630301',
        'Cálculo',
        8.3,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0064',
        'K2024630302',
        'Fundamentos de Programación',
        8.5,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0065',
        'K2024630302',
        'Matemáticas Discretas',
        8.4,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0066',
        'K2024630302',
        'Cálculo',
        8.6,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0067',
        'K2024630303',
        'Fundamentos de Programación',
        8.9,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0068',
        'K2024630303',
        'Matemáticas Discretas',
        9.0,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0069',
        'K2024630303',
        'Cálculo',
        8.8,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0070',
        'K2024630304',
        'Fundamentos de Programación',
        7.5,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0071',
        'K2024630304',
        'Matemáticas Discretas',
        7.4,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0072',
        'K2024630304',
        'Cálculo',
        7.6,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0073',
        'K2024630305',
        'Fundamentos de Programación',
        8.3,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0074',
        'K2024630305',
        'Matemáticas Discretas',
        8.2,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0075',
        'K2024630305',
        'Cálculo',
        8.5,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0076',
        'K2024630306',
        'Fundamentos de Programación',
        8.1,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0077',
        'K2024630306',
        'Matemáticas Discretas',
        8.0,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0078',
        'K2024630306',
        'Cálculo',
        8.3,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0079',
        'K2024630307',
        'Fundamentos de Programación',
        8.7,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0080',
        'K2024630307',
        'Matemáticas Discretas',
        8.8,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0081',
        'K2024630307',
        'Cálculo',
        8.6,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0082',
        'K2024630308',
        'Fundamentos de Programación',
        7.2,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0083',
        'K2024630308',
        'Matemáticas Discretas',
        7.1,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0084',
        'K2024630308',
        'Cálculo',
        7.4,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0085',
        'K2024630309',
        'Fundamentos de Programación',
        8.4,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0086',
        'K2024630309',
        'Matemáticas Discretas',
        8.3,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0087',
        'K2024630309',
        'Cálculo',
        8.6,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0088',
        'K2024630310',
        'Fundamentos de Programación',
        9.2,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0089',
        'K2024630310',
        'Matemáticas Discretas',
        9.3,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0090',
        'K2024630310',
        'Cálculo',
        9.1,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    );

-- ==================================================================
-- 5. INSERCIÓN DE HORARIOS PARA ESTUDIANTES
-- ==================================================================
DELETE FROM mat_inscritos;

-- ===== INSCRIPCIONES A MATERIAS (mat_inscritos) =====
-- IIA - Fundamentos de Programación
INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_primer,
        calificacion_segundo,
        calificacion_tercer,
        calificacion_final,
        extra
    )
VALUES (
        'MAT20246301011',
        'HOR2024630101',
        'G00001',
        8.5,
        8.8,
        9.0,
        8.8,
        NULL
    ),
    (
        'MAT20246301021',
        'HOR2024630102',
        'G00001',
        8.2,
        8.5,
        8.7,
        8.5,
        NULL
    ),
    (
        'MAT20246301031',
        'HOR2024630103',
        'G00001',
        7.8,
        8.0,
        8.2,
        8.0,
        NULL
    ),
    (
        'MAT20246301041',
        'HOR2024630104',
        'G00001',
        8.9,
        9.0,
        9.2,
        9.0,
        NULL
    ),
    (
        'MAT20246301051',
        'HOR2024630105',
        'G00001',
        8.0,
        8.3,
        8.4,
        8.2,
        NULL
    ),
    (
        'MAT20246301061',
        'HOR2024630106',
        'G00002',
        7.5,
        7.6,
        7.7,
        7.6,
        NULL
    ),
    (
        'MAT20246301071',
        'HOR2024630107',
        'G00002',
        8.5,
        8.7,
        8.8,
        8.7,
        NULL
    ),
    (
        'MAT20246301081',
        'HOR2024630108',
        'G00002',
        9.0,
        9.1,
        9.3,
        9.1,
        NULL
    ),
    (
        'MAT20246301091',
        'HOR2024630109',
        'G00002',
        7.8,
        8.0,
        8.1,
        8.0,
        NULL
    ),
    (
        'MAT20246301101',
        'HOR2024630110',
        'G00002',
        8.3,
        8.5,
        8.6,
        8.5,
        NULL
    );

-- IIA - Matemáticas Discretas
INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_primer,
        calificacion_segundo,
        calificacion_tercer,
        calificacion_final,
        extra
    )
VALUES (
        'MAT20246301012',
        'HOR2024630101',
        'G00003',
        8.8,
        8.9,
        8.7,
        8.8,
        NULL
    ),
    (
        'MAT20246301022',
        'HOR2024630102',
        'G00003',
        8.0,
        8.3,
        8.4,
        8.2,
        NULL
    ),
    (
        'MAT20246301032',
        'HOR2024630103',
        'G00003',
        7.3,
        7.6,
        7.8,
        7.5,
        NULL
    ),
    (
        'MAT20246301042',
        'HOR2024630104',
        'G00003',
        9.1,
        9.0,
        9.2,
        9.1,
        NULL
    ),
    (
        'MAT20246301052',
        'HOR2024630105',
        'G00003',
        7.9,
        8.1,
        8.2,
        8.0,
        NULL
    ),
    (
        'MAT20246301062',
        'HOR2024630106',
        'G00004',
        7.1,
        7.4,
        7.5,
        7.3,
        NULL
    ),
    (
        'MAT20246301072',
        'HOR2024630107',
        'G00004',
        8.4,
        8.6,
        8.7,
        8.5,
        NULL
    ),
    (
        'MAT20246301082',
        'HOR2024630108',
        'G00004',
        8.9,
        9.1,
        9.0,
        9.0,
        NULL
    ),
    (
        'MAT20246301092',
        'HOR2024630109',
        'G00004',
        7.6,
        7.9,
        8.0,
        7.8,
        NULL
    ),
    (
        'MAT20246301102',
        'HOR2024630110',
        'G00004',
        8.4,
        8.6,
        8.5,
        8.5,
        NULL
    );

-- IIA - Cálculo
INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_primer,
        calificacion_segundo,
        calificacion_tercer,
        calificacion_final,
        extra
    )
VALUES (
        'MAT20246301013',
        'HOR2024630101',
        'G00005',
        7.8,
        8.0,
        8.1,
        7.9,
        NULL
    ),
    (
        'MAT20246301023',
        'HOR2024630102',
        'G00005',
        8.0,
        8.2,
        8.3,
        8.1,
        NULL
    ),
    (
        'MAT20246301033',
        'HOR2024630103',
        'G00005',
        8.0,
        8.3,
        8.4,
        8.2,
        NULL
    ),
    (
        'MAT20246301043',
        'HOR2024630104',
        'G00005',
        8.5,
        8.8,
        8.9,
        8.7,
        NULL
    ),
    (
        'MAT20246301053',
        'HOR2024630105',
        'G00005',
        8.2,
        8.5,
        8.6,
        8.4,
        NULL
    ),
    (
        'MAT20246301063',
        'HOR2024630106',
        'G00006',
        7.4,
        7.6,
        7.8,
        7.6,
        NULL
    ),
    (
        'MAT20246301073',
        'HOR2024630107',
        'G00006',
        8.6,
        8.8,
        8.9,
        8.7,
        NULL
    ),
    (
        'MAT20246301083',
        'HOR2024630108',
        'G00006',
        9.1,
        9.3,
        9.4,
        9.3,
        NULL
    ),
    (
        'MAT20246301093',
        'HOR2024630109',
        'G00006',
        7.8,
        8.0,
        8.2,
        8.0,
        NULL
    ),
    (
        'MAT20246301103',
        'HOR2024630110',
        'G00006',
        8.1,
        8.3,
        8.4,
        8.2,
        NULL
    );

-- LCD - Fundamentos de Programación
INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_primer,
        calificacion_segundo,
        calificacion_tercer,
        calificacion_final,
        extra
    )
VALUES (
        'MAT20246302011',
        'HOR2024630201',
        'G00007',
        9.0,
        9.2,
        9.4,
        9.2,
        NULL
    ),
    (
        'MAT20246302021',
        'HOR2024630202',
        'G00007',
        6.5,
        6.7,
        6.8,
        6.7,
        NULL
    ),
    (
        'MAT20246302031',
        'HOR2024630203',
        'G00007',
        8.0,
        8.2,
        8.3,
        8.1,
        NULL
    ),
    (
        'MAT20246302041',
        'HOR2024630204',
        'G00007',
        8.6,
        8.8,
        9.0,
        8.8,
        NULL
    ),
    (
        'MAT20246302051',
        'HOR2024630205',
        'G00007',
        7.5,
        7.7,
        7.8,
        7.6,
        NULL
    ),
    (
        'MAT20246302061',
        'HOR2024630206',
        'G00008',
        8.4,
        8.6,
        8.7,
        8.5,
        NULL
    ),
    (
        'MAT20246302071',
        'HOR2024630207',
        'G00008',
        8.8,
        9.0,
        9.2,
        9.0,
        NULL
    ),
    (
        'MAT20246302081',
        'HOR2024630208',
        'G00008',
        7.6,
        7.8,
        8.0,
        7.8,
        NULL
    ),
    (
        'MAT20246302091',
        'HOR2024630209',
        'G00008',
        8.0,
        8.2,
        8.4,
        8.2,
        NULL
    ),
    (
        'MAT20246302101',
        'HOR2024630210',
        'G00008',
        8.5,
        8.7,
        8.9,
        8.7,
        NULL
    );

-- LCD - Introducción a Ciencia de Datos
INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_primer,
        calificacion_segundo,
        calificacion_tercer,
        calificacion_final,
        extra
    )
VALUES (
        'MAT20246302012',
        'HOR2024630201',
        'G00009',
        9.2,
        9.4,
        9.5,
        9.4,
        NULL
    ),
    (
        'MAT20246302022',
        'HOR2024630202',
        'G00009',
        6.6,
        6.8,
        7.0,
        6.8,
        NULL
    ),
    (
        'MAT20246302032',
        'HOR2024630203',
        'G00009',
        8.0,
        8.1,
        8.2,
        8.0,
        NULL
    ),
    (
        'MAT20246302042',
        'HOR2024630204',
        'G00009',
        8.8,
        8.9,
        9.1,
        8.9,
        NULL
    ),
    (
        'MAT20246302052',
        'HOR2024630205',
        'G00009',
        7.4,
        7.6,
        7.7,
        7.5,
        NULL
    ),
    (
        'MAT20246302062',
        'HOR2024630206',
        'G00010',
        8.3,
        8.5,
        8.6,
        8.4,
        NULL
    ),
    (
        'MAT20246302072',
        'HOR2024630207',
        'G00010',
        9.0,
        9.2,
        9.3,
        9.2,
        NULL
    ),
    (
        'MAT20246302082',
        'HOR2024630208',
        'G00010',
        7.7,
        7.9,
        8.1,
        7.9,
        NULL
    ),
    (
        'MAT20246302092',
        'HOR2024630209',
        'G00010',
        8.1,
        8.2,
        8.4,
        8.2,
        NULL
    ),
    (
        'MAT20246302102',
        'HOR2024630210',
        'G00010',
        8.6,
        8.8,
        9.0,
        8.8,
        NULL
    );

-- LCD - Cálculo
INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_primer,
        calificacion_segundo,
        calificacion_tercer,
        calificacion_final,
        extra
    )
VALUES (
        'MAT20246302013',
        'HOR2024630201',
        'G00011',
        8.8,
        9.0,
        9.1,
        8.9,
        NULL
    ),
    (
        'MAT20246302023',
        'HOR2024630202',
        'G00011',
        5.8,
        6.0,
        6.2,
        6.0,
        NULL
    ),
    (
        'MAT20246302033',
        'HOR2024630203',
        'G00011',
        8.0,
        8.2,
        8.4,
        8.2,
        NULL
    ),
    (
        'MAT20246302043',
        'HOR2024630204',
        'G00011',
        8.6,
        8.8,
        8.9,
        8.7,
        NULL
    ),
    (
        'MAT20246302053',
        'HOR2024630205',
        'G00011',
        7.5,
        7.7,
        7.9,
        7.7,
        NULL
    ),
    (
        'MAT20246302063',
        'HOR2024630206',
        'G00012',
        8.4,
        8.6,
        8.8,
        8.6,
        NULL
    ),
    (
        'MAT20246302073',
        'HOR2024630207',
        'G00012',
        8.7,
        8.9,
        9.1,
        8.9,
        NULL
    ),
    (
        'MAT20246302083',
        'HOR2024630208',
        'G00012',
        7.7,
        7.9,
        8.1,
        7.9,
        NULL
    ),
    (
        'MAT20246302093',
        'HOR2024630209',
        'G00012',
        8.2,
        8.4,
        8.6,
        8.4,
        NULL
    ),
    (
        'MAT20246302103',
        'HOR2024630210',
        'G00012',
        8.4,
        8.6,
        8.8,
        8.6,
        NULL
    );

-- ISC - Fundamentos de Programación
INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_primer,
        calificacion_segundo,
        calificacion_tercer,
        calificacion_final,
        extra
    )
VALUES (
        'MAT20246303011',
        'HOR2024630301',
        'G00013',
        8.4,
        8.6,
        8.7,
        8.5,
        NULL
    ),
    (
        'MAT20246303021',
        'HOR2024630302',
        'G00013',
        8.4,
        8.6,
        8.7,
        8.5,
        NULL
    ),
    (
        'MAT20246303031',
        'HOR2024630303',
        'G00013',
        8.8,
        9.0,
        9.1,
        8.9,
        NULL
    ),
    (
        'MAT20246303041',
        'HOR2024630304',
        'G00013',
        7.4,
        7.6,
        7.7,
        7.5,
        NULL
    ),
    (
        'MAT20246303051',
        'HOR2024630305',
        'G00013',
        8.2,
        8.3,
        8.5,
        8.3,
        NULL
    ),
    (
        'MAT20246303061',
        'HOR2024630306',
        'G00014',
        8.0,
        8.2,
        8.3,
        8.1,
        NULL
    ),
    (
        'MAT20246303071',
        'HOR2024630307',
        'G00014',
        8.6,
        8.8,
        8.9,
        8.7,
        NULL
    ),
    (
        'MAT20246303081',
        'HOR2024630308',
        'G00014',
        7.1,
        7.3,
        7.4,
        7.2,
        NULL
    ),
    (
        'MAT20246303091',
        'HOR2024630309',
        'G00014',
        8.3,
        8.5,
        8.6,
        8.4,
        NULL
    ),
    (
        'MAT20246303101',
        'HOR2024630310',
        'G00014',
        9.0,
        9.2,
        9.3,
        9.2,
        NULL
    );

-- ISC - Matemáticas Discretas
INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_primer,
        calificacion_segundo,
        calificacion_tercer,
        calificacion_final,
        extra
    )
VALUES (
        'MAT20246303012',
        'HOR2024630301',
        'G00015',
        8.5,
        8.7,
        8.8,
        8.6,
        NULL
    ),
    (
        'MAT20246303022',
        'HOR2024630302',
        'G00015',
        8.3,
        8.5,
        8.6,
        8.4,
        NULL
    ),
    (
        'MAT20246303032',
        'HOR2024630303',
        'G00015',
        8.9,
        9.1,
        9.2,
        9.0,
        NULL
    ),
    (
        'MAT20246303042',
        'HOR2024630304',
        'G00015',
        7.3,
        7.5,
        7.6,
        7.4,
        NULL
    ),
    (
        'MAT20246303052',
        'HOR2024630305',
        'G00015',
        8.1,
        8.3,
        8.4,
        8.2,
        NULL
    ),
    (
        'MAT20246303062',
        'HOR2024630306',
        'G00016',
        7.9,
        8.1,
        8.2,
        8.0,
        NULL
    ),
    (
        'MAT20246303072',
        'HOR2024630307',
        'G00016',
        8.7,
        8.9,
        9.0,
        8.8,
        NULL
    ),
    (
        'MAT20246303082',
        'HOR2024630308',
        'G00016',
        7.0,
        7.2,
        7.3,
        7.1,
        NULL
    ),
    (
        'MAT20246303092',
        'HOR2024630309',
        'G00016',
        8.2,
        8.4,
        8.5,
        8.3,
        NULL
    ),
    (
        'MAT20246303102',
        'HOR2024630310',
        'G00016',
        9.2,
        9.3,
        9.4,
        9.3,
        NULL
    );

-- ISC - Cálculo
INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_primer,
        calificacion_segundo,
        calificacion_tercer,
        calificacion_final,
        extra
    )
VALUES (
        'MAT20246303013',
        'HOR2024630301',
        'G00017',
        8.2,
        8.4,
        8.5,
        8.3,
        NULL
    ),
    (
        'MAT20246303023',
        'HOR2024630302',
        'G00017',
        8.5,
        8.7,
        8.8,
        8.6,
        NULL
    ),
    (
        'MAT20246303033',
        'HOR2024630303',
        'G00017',
        8.7,
        8.9,
        9.0,
        8.8,
        NULL
    ),
    (
        'MAT20246303043',
        'HOR2024630304',
        'G00017',
        7.5,
        7.7,
        7.8,
        7.6,
        NULL
    ),
    (
        'MAT20246303053',
        'HOR2024630305',
        'G00017',
        8.4,
        8.6,
        8.7,
        8.5,
        NULL
    ),
    (
        'MAT20246303063',
        'HOR2024630306',
        'G00018',
        8.2,
        8.4,
        8.5,
        8.3,
        NULL
    ),
    (
        'MAT20246303073',
        'HOR2024630307',
        'G00018',
        8.5,
        8.7,
        8.8,
        8.6,
        NULL
    ),
    (
        'MAT20246303083',
        'HOR2024630308',
        'G00018',
        7.3,
        7.5,
        7.6,
        7.5,
        NULL
    ),
    (
        'MAT20246303093',
        'HOR2024630309',
        'G00018',
        8.5,
        8.7,
        8.8,
        8.6,
        NULL
    ),
    (
        'MAT20246303103',
        'HOR2024630310',
        'G00018',
        9.0,
        9.2,
        9.3,
        9.1,
        NULL
    );

SET FOREIGN_KEY_CHECKS = 1;

DELETE FROM resena;

INSERT INTO
    resena (
        id,
        id_profesor,
        id_alumno,
        calificacion,
        comentarios,
        fecha
    )
VALUES (
        'RES001',
        'HIJKLMNO',
        '2024630101',
        9.0,
        'Excelente profesor, explica muy bien los conceptos',
        '2025-12-05'
    ),
    (
        'RES002',
        'HIJKLMNO',
        '2024630102',
        8.5,
        'Domina el tema y resuelve dudas eficientemente',
        '2025-12-05'
    ),
    (
        'RES003',
        'HIJKLMNO',
        '2024630103',
        8.0,
        'Buen profesor, aunque a veces va muy rápido',
        '2025-12-06'
    ),
    (
        'RES004',
        'HIJKLMNO',
        '2024630104',
        9.5,
        'El mejor profesor que he tenido, muy dedicado',
        '2025-12-06'
    ),
    (
        'RES005',
        'HIJKLMNO',
        '2024630105',
        8.8,
        'Excelente metodología de enseñanza',
        '2025-12-07'
    ),
    (
        'RES006',
        'PROF0001',
        '2024630106',
        7.5,
        'Buen profesor pero podría mejorar la organización',
        '2025-12-05'
    ),
    (
        'RES007',
        'PROF0001',
        '2024630107',
        8.5,
        'Clases dinámicas y ejemplos prácticos',
        '2025-12-06'
    ),
    (
        'RES008',
        'PROF0001',
        '2024630108',
        8.0,
        'Explica bien los temas complejos',
        '2025-12-06'
    ),
    (
        'RES009',
        'PROF0001',
        '2024630109',
        8.2,
        'Buen dominio de la materia',
        '2025-12-07'
    ),
    (
        'RES010',
        'PROF0002',
        '2024630111',
        9.0,
        'Excelente profesora, muy paciente',
        '2025-12-05'
    ),
    (
        'RES011',
        'PROF0002',
        '2024630112',
        9.2,
        'La mejor profesora, siempre disponible para dudas',
        '2025-12-06'
    ),
    (
        'RES012',
        'PROF0002',
        '2024630113',
        9.5,
        'Hace que el cálculo sea fácil de entender',
        '2025-12-06'
    ),
    (
        'RES013',
        'PROF0002',
        '2024630101',
        8.8,
        'Excelente didáctica y paciencia',
        '2025-12-07'
    ),
    (
        'RES014',
        'PROF0002',
        '2024630102',
        9.0,
        'Clases muy bien estructuradas',
        '2025-12-07'
    );

DELETE FROM avisos;

INSERT INTO
    avisos (
        id,
        titulo,
        descripcion,
        imagen,
        objetivo,
        fecha_vencimiento
    )
VALUES (
        'AV001',
        'Inicio del Semestre 2025-1',
        'Les damos la bienvenida al semestre 2025-1. Las clases inician el 3 de febrero de 2025. Por favor revisen sus horarios y grupos asignados.',
        NULL,
        'Todos',
        '2025-02-10 23:59:59'
    ),
    (
        'AV002',
        'Registro de Calificaciones Primer Parcial',
        'Profesores: El periodo para registrar calificaciones del primer parcial es del 1 al 7 de diciembre de 2025. No olviden subir las calificaciones en tiempo y forma.',
        NULL,
        'Profesores',
        '2025-12-07 23:59:59'
    ),
    (
        'AV003',
        'Evaluación Docente',
        'Alumnos: Ya está disponible la evaluación docente. Tu opinión es muy importante para mejorar la calidad educativa. Periodo: del 1 al 15 de diciembre.',
        NULL,
        'Alumnos',
        '2025-12-15 23:59:59'
    ),
    (
        'AV004',
        'Examen a Título de Suficiencia (ETS)',
        'Se abre el periodo de inscripción para exámenes ETS. Si tienes materias reprobadas, esta es tu oportunidad. Periodo del 1 al 30 de diciembre de 2025.',
        NULL,
        'Alumnos',
        '2025-12-30 23:59:59'
    ),
    (
        'AV005',
        'Mantenimiento del Sistema',
        'El sistema SAES estará en mantenimiento el día 10 de diciembre de 2025 de 22:00 a 24:00 hrs. Disculpen las molestias.',
        NULL,
        'Todos',
        '2025-12-10 23:59:59'
    ),
    (
        'AV006',
        'Actualización de Datos Personales',
        'Recuerden mantener actualizados sus datos personales y de contacto en el sistema. Esto es importante para recibir notificaciones oficiales.',
        NULL,
        'Todos',
        '2025-06-20 23:59:59'
    );

DELETE FROM materia_reprobada;

INSERT INTO
    materia_reprobada (
        id,
        id_estudiante,
        id_ua,
        periodos_restantes,
        recurse,
        estado_actual
    )
VALUES
    -- Alumno LCD 2024630202 (EST2024630202): 2 materias reprobadas
    (
        '457',
        'EST2024630202',
        'UA0098',
        '2',
        '1',
        'Reprobada'
    ),
    (
        '458',
        'EST2024630202',
        'UA0101',
        '2',
        '0',
        'Reprobada'
    ),
    -- Alumno IIA 2024630104 (EST2024630104): 3 materias reprobadas
    (
        '459',
        'EST2024630104',
        'UA0058',
        '2',
        '1',
        'Reprobada'
    ),
    (
        '460',
        'EST2024630104',
        'UA0061',
        '2',
        '1',
        'Reprobada'
    ),
    (
        '461',
        'EST2024630104',
        'UA0065',
        '1',
        '0',
        'Reprobada'
    ),
    -- Alumno ISC 2024630306 (EST2024630306): 2 materias reprobadas
    (
        '462',
        'EST2024630306',
        'UA0010',
        '2',
        '1',
        'Reprobada'
    ),
    (
        '463',
        'EST2024630306',
        'UA0015',
        '2',
        '0',
        'Reprobada'
    ),
    -- Alumno LCD 2024630207 (EST2024630207): 1 materia reprobada
    (
        '464',
        'EST2024630207',
        'UA0106',
        '3',
        '1',
        'Reprobada'
    ),
    -- Alumno IIA 2024630108 (EST2024630108): 2 materias recuperadas
    (
        '465',
        'EST2024630108',
        'UA0052',
        '1',
        '1',
        'Reprobada'
    ),
    (
        '466',
        'EST2024630108',
        'UA0057',
        '1',
        '0',
        'Desfasada'
    ),
    -- Alumno ISC 2024630304 (EST2024630304): 2 materias reprobadas
    (
        '467',
        'EST2024630304',
        'UA0020',
        '0',
        '0',
        'Desfasada'
    ),
    (
        '468',
        'EST2024630304',
        'UA0027',
        '2',
        '0',
        'Reprobada'
    );

DELETE FROM fechas_relevantes;

INSERT INTO
    fechas_relevantes (
        inicio_semestre,
        fin_semestre,
        registro_primer_parcial,
        fin_registro_primer_parcial,
        registro_segundo_parcial,
        fin_registro_segundo_parcial,
        registro_tercer_parcial,
        fin_registro_tercer_parcial,
        registro_extra,
        fin_registro_extra,
        evalu_profe,
        fin_evalu_profe,
        inscribir_ets,
        fin_inscribir_ets,
        subir_doc_ets,
        fin_subir_doc_ets,
        eval_ets,
        fin_evalu_ets,
        periodo
    )
VALUES (
        '2025-02-03 00:00:00', -- inicio_semestre
        '2025-06-20 23:59:59', -- fin_semestre
        '2025-12-01 00:00:00', -- registro_primer_parcial
        '2025-12-07 23:59:59', -- fin_registro_primer_parcial
        '2025-04-01 00:00:00', -- registro_segundo_parcial
        '2025-04-07 23:59:59', -- fin_registro_segundo_parcial
        '2025-05-01 00:00:00', -- registro_tercer_parcial
        '2025-05-07 23:59:59', -- fin_registro_tercer_parcial
        '2025-06-10 00:00:00', -- registro_extra
        '2025-06-12 23:59:59', -- fin_registro_extra
        '2025-12-01 00:00:00', -- evalu_profe
        '2025-12-15 23:59:59', -- fin_evalu_profe
        '2025-12-01 00:00:00', -- inscribir_ets
        '2025-12-30 23:59:59', -- fin_inscribir_ets
        '2025-12-01 00:00:00', -- subir_doc_ets
        '2025-12-03 23:59:59', -- fin_subir_doc_ets
        '2025-12-01 00:00:00', -- eval_ets
        '2025-12-30 23:59:59', -- fin_evalu_ets
        '2025-1' -- periodo
    );

DELETE FROM enfermedades;

DELETE FROM datos_medicos;

INSERT INTO
    datos_medicos (
        id,
        id_usuario,
        peso,
        altura,
        tipo_sangre,
        nss
    )
VALUES (
        'DM0001',
        '2024630101',
        70.5,
        1.75,
        'O+',
        '12345678901'
    ),
    (
        'DM0002',
        '2024630201',
        65.0,
        1.68,
        'A+',
        '12345678902'
    ),
    (
        'DM0003',
        '2024630301',
        80.0,
        1.80,
        'B+',
        '12345678903'
    ),
    (
        'DM0004',
        'HIJKLMNO',
        75.0,
        1.78,
        'O+',
        '98765432101'
    ),
    (
        'DM0005',
        'PROF0001',
        72.0,
        1.76,
        'AB+',
        '98765432102'
    );

-- ==================================================
-- ENFERMEDADES
-- ==================================================
INSERT INTO
    enfermedades (id, id_dat_med, descri)
VALUES (
        'ENF001',
        'DM0001',
        'Asma leve controlada'
    ),
    (
        'ENF002',
        'DM0002',
        'Ninguna enfermedad crónica'
    ),
    (
        'ENF003',
        'DM0003',
        'Hipertensión controlada con medicamento'
    );

DELETE FROM contador;

INSERT INTO
    contador (
        id_profesor,
        suma,
        registrados
    )
VALUES ('HIJKLMNO', 42, 5),
    ('PROF0001', 38, 4),
    ('PROF0002', 45, 5);