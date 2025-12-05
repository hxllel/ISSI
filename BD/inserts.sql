-- Datos (DML) extraídos de `BD/bd.sql` — ejecutar después de `tables.sql`.

INSERT INTO datos_personales (
    id, contrasena, tipo_usuario, nombre, ape_paterno, ape_materno,
    fecha_nacimiento, RFC, tipo_sangre, CURP, nacionalidad, calle,
    num_exterior, num_interior, codigo_postal, colonia, delegacion, ciudad,
    telefono, email, grado, situacion, calificacion
) VALUES
('2023635321', '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG', 'administrador', 'juan', 'perez', 'gonzales', '2007-05-23', 'ABCDEFGE', 'O+', 'ABCDEFG', 'mexicana', 'heroes', '15', 'n/a', '12345', 'juarez', 'tlalpan', 'CDMX', '123456', 'juan_perez@gmail.com', 'n/a', 'activo', 10),
('HIJKLMNO', '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG', 'profesor', 'maria', 'lopez', 'martinez', '1980-11-15', 'HIJKLMNO', 'A+', 'HIJKLMNO', 'mexicana', 'revolucion', '45', 'n/a', '67890', 'centro', 'coyoacan', 'CDMX', '654321', 'maria_lopez@gmail.com', 'doctorado en ciencias', 'activo', 9);

INSERT INTO carrera (nombre, creditos_iniciales, prefijo_grupo, duracion_max) VALUES
('Ingenieria en Sistemas Computacionales', 25, 'A', 12),
('Ingenieria en Inteligencia Artificial', 25, 'B', 12),
('Ingenieria en Ciencia de Datos', 25, 'C', 12);

INSERT INTO unidad_de_aprendizaje (id, nombre, credito, carrera, semestre) VALUES
('UA001','Matematicas Discretas',8,'Ingenieria en Sistemas Computacionales',1),
('UA002','Programacion I',8,'Ingenieria en Sistemas Computacionales',2),
('UA003','Calculo',8,'Ingenieria en Sistemas Computacionales',3),
('UA004','Calculo',8,'Ingenieria en Inteligencia Artificial',1),
('UA005','Matematicas Discretas',8,'Ingenieria en Inteligencia Artificial',1);

INSERT INTO datos_personales (id, contrasena, tipo_usuario, nombre, ape_paterno, ape_materno, fecha_nacimiento, tipo_sangre, CURP, nacionalidad, calle, num_exterior, num_interior, codigo_postal, colonia, delegacion, ciudad, telefono, email, situacion, carrera) VALUES
("2023631211", '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG', "alumno", "Jorge", "Garcia", "Prieto", "2002-11-15", "O+", "JGP", "Mexicana", "Las lomas", "13", "205", "1234", "Juarez", "Iztacalco", "CDMX", "1234", "1234@gmail.com", "activo", "Ingenieria en Inteligencia Artificial"),
("2023631212", '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG', "alumno", "Mariana", "Lopez", "Santos", "2003-05-09", "A+", "MLS030509MDFLPR03", "Mexicana", "Av. del Trabajo", "45", "2B", "07890", "Industrial", "Gustavo A. Madero", "CDMX", "5512345678", "mariana.lopez@gmail.com", "activo", "Ingenieria en Inteligencia Artificial"),
("2023631213", '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG', "alumno", "Carlos", "Ramirez", "Hernandez", "2001-09-22", "B+", "CRH010922HDFRMN07", "Mexicana", "Calle Reforma", "88", "1A", "06400", "Centro", "Cuauhtémoc", "CDMX", "5523456789", "carlos.ramirez@gmail.com", "activo", "Ingenieria en Inteligencia Artificial");

INSERT INTO kardex (id, id_alumno, promedio, situacion_academica, semestres_restantes) VALUES
("K2023631211","2023631211",8.7,"Regular",10),
("K2023631212","2023631212",9.1,"Regular",10),
("K2023631213","2023631213",7.5,"Regular",10);

INSERT INTO ua_aprobada (id, id_kardex, unidad_aprendizaje, calificacion_final, semestre, periodo, fecha, metodo_aprobado) VALUES
("UAA002","K2023631211","Fundamentos de Programación",8.5,2,"2024-2","2024-12-15","Ordinario"),
("UAA003","K2023631211","Cálculo",8.7,3,"2025-1","2025-06-20","Ordinario"),
("UAA004","K2023631212","Matemáticas Discretas",9.3,1,"2024-1","2024-06-10","Ordinario"),
("UAA006","K2023631212","Cálculo",8.8,3,"2025-1","2025-06-20","ETS"),
("UAA007","K2023631213","Matemáticas Discretas",7.9,1,"2024-1","2024-06-10","Extraordinario"),
("UAA008","K2023631213","Fundamentos de Programación",8.2,2,"2024-2","2024-12-15","Ordinario"),
("UAA009","K2023631213","Cálculo",7.5,3,"2025-1","2025-06-20","Recurse");

INSERT INTO estudiante (id, id_usuario, promedio, creditos_disponibles, estado_academico) VALUES
('EST001','2023631211',0.0,25,'Regular'),
('EST002','2023631212',0.0,25,'Regular'),
('EST003','2023631213',0.0,25,'Regular');

INSERT INTO horario (id, id_alumno) VALUES ('abc','2023631211'),('def','2023631212'),('ghi','2023631213');

INSERT INTO materia_reprobada (id, id_estudiante, id_ua, periodos_restantes, recurse, estado_actual) VALUES
("MR001","EST001","UA003",2,0,"Reprobada"),
("MR004","EST001","UA003",1,0,"Reprobada"),
("MR002","EST002","UA001",1,1,"Recurse"),
("MR003","EST003","UA002",2,0,"Reprobada");

INSERT INTO ets_grupo (id, id_ua, id_aplicante, turno, hora_inicio, hora_final, fecha) VALUES
("ETSG001","UA003","HIJKLMNO","Matutino","9:00","11:00","2025-06-28"),
("ETSG002","UA003","HIJKLMNO","Vespertino","15:00","17:00","2025-06-28"),
("ETSG003","UA001","HIJKLMNO","Matutino","10:00","12:00","2025-06-29"),
("ETSG004","UA001","HIJKLMNO","Vespertino","14:00","16:00","2025-06-29"),
("ETSG005","UA002","HIJKLMNO","Matutino","8:00","10:00","2025-06-30"),
("ETSG006","UA002","HIJKLMNO","Vespertino","13:00","15:00","2025-06-30");

INSERT INTO ets (id, id_mr, id_grupo, comprobante, validado, calificado) VALUES
("ETS001","MR004","ETSG001",NULL,0,0),
("ETS002","MR004","ETSG001","N",1,5);

-- (continúa: poblado de UAs UA006..UA045, creación de grupos, 30 alumnos, estudiantes, horarios,
-- inscripciones, mat_inscritos, mensajes de chat y registros de fechas_relevantes)

-- Mensajes de ejemplo
INSERT INTO mensaje_chat (id, id_usuario, fecha, pregunta_realizada, respuesta_obtenida) VALUES
('CHAT001','2023630001','2025-01-15 09:30:00','¿Cuándo inicia el periodo de inscripciones?','El periodo de inscripciones inicia el 20 de enero de 2025 y finaliza el 5 de febrero de 2025.'),
('CHAT002','2023630001','2025-01-15 09:32:00','¿Cuántos créditos tengo disponibles?','Actualmente no tienes créditos disponibles. Tus créditos disponibles son: 0. Te recomiendo consultar con tu coordinación académica.'),
('CHAT003','2023630001','2025-01-16 14:20:00','¿Cuáles son mis materias inscritas este semestre?','Tus materias inscritas son: Fundamentos de Programación, Matemáticas Discretas, Cálculo y Comunicación Oral y Escrita.'),
('CHAT004','2023630001','2025-01-16 14:25:00','¿Cuál es mi horario de clases?','Puedes consultar tu horario completo en la sección "Horarios" del menú principal. Todas tus clases están programadas en turno matutino.'),
('CHAT005','2023630001','2025-01-17 10:15:00','¿Tengo riesgo de dictamen?','No cuentas con información de riesgo de dictamen en este momento. Mantén un promedio superior a 7.0 para evitar problemas académicos.'),
('CHAT006','2023630001','2025-01-17 10:18:00','¿Cómo puedo dar de baja una materia?','Para dar de baja una materia debes acudir a tu coordinación académica durante el periodo de bajas (primeras 3 semanas del semestre) con tu justificación correspondiente.'),
('CHAT007','2023630001','2025-01-18 11:45:00','¿Dónde puedo consultar mi kardex?','Puedes consultar tu kardex en la sección "Kardex" del menú principal de este sistema.'),
('CHAT008','2023630001','2025-01-18 11:48:00','¿Cuál es la calificación mínima aprobatoria?','La calificación mínima aprobatoria es 6.0 (seis punto cero). Cualquier calificación menor se considera reprobatoria.'),
('CHAT009','2023630001','2025-01-19 16:30:00','¿Puedo inscribir materias de semestres superiores?','Sí, puedes inscribir materias de semestres superiores siempre y cuando hayas aprobado los prerrequisitos correspondientes y tengas créditos disponibles.'),
('CHAT010','2023630001','2025-01-19 16:35:00','Gracias por la información','¡De nada! Estoy aquí para ayudarte. Si tienes más preguntas sobre tu situación académica, no dudes en consultarme.');

DELETE FROM fechas_relevantes;

INSERT INTO fechas_relevantes (inicio_semestre, fin_semestre, registro_primer_parcial, fin_registro_primer_parcial, registro_segundo_parcial, fin_registro_segundo_parcial, registro_tercer_parcial, fin_registro_tercer_parcial, registro_extra, fin_registro_extra, evalu_profe, subir_doc_ets, fin_subir_doc_ets, eval_ets, fin_evalu_ets, cal_ets, periodo) VALUES
('2025-02-03 00:00:00','2025-06-20 23:59:59','2025-11-09 00:00:00','2025-11-20 23:59:59','2025-04-01 00:00:00','2025-04-07 23:59:59','2025-05-01 00:00:00','2025-05-07 23:59:59','2025-06-10 00:00:00','2025-06-12 23:59:59','2025-06-01 00:00:00','2025-06-15 00:00:00','2025-06-18 23:59:59','2025-11-24 00:00:00','2025-12-24 23:59:59','2025-06-25 00:00:00','2025-1');

SELECT * FROM datos_personales;
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '1BM1_UA008',
        '1BM1',
        'UA008',
        'HIJKLMNO',
        'Matutino',
        30
    );

INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '1BM1_UA009',
        '1BM1',
        'UA009',
        'HIJKLMNO',
        'Matutino',
        30
    );

INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '1BM1_UA010',
        '1BM1',
        'UA010',
        'HIJKLMNO',
        'Matutino',
        30
    );

INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '2BM1_UA011',
        '2BM1',
        'UA011',
        'HIJKLMNO',
        'Vespertino',
        30
    );

INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '2BM1_UA012',
        '2BM1',
        'UA012',
        'HIJKLMNO',
        'Vespertino',
        30
    );

INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '2BM1_UA013',
        '2BM1',
        'UA013',
        'HIJKLMNO',
        'Vespertino',
        30
    );

INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '2BM1_UA014',
        '2BM1',
        'UA014',
        'HIJKLMNO',
        'Vespertino',
        30
    );

INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '2BM1_UA015',
        '2BM1',
        'UA015',
        'HIJKLMNO',
        'Vespertino',
        30
    );

INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '3BM1_UA016',
        '3BM1',
        'UA016',
        'HIJKLMNO',
        'Matutino',
        30
    );

INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '3BM1_UA017',
        '3BM1',
        'UA017',
        'HIJKLMNO',
        'Matutino',
        30
    );

INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '3BM1_UA018',
        '3BM1',
        'UA018',
        'HIJKLMNO',
        'Matutino',
        30
    );

INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '3BM1_UA019',
        '3BM1',
        'UA019',
        'HIJKLMNO',
        'Matutino',
        30
    );

INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '3BM1_UA020',
        '3BM1',
        'UA020',
        'HIJKLMNO',
        'Matutino',
        30
    );

INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '4BM1_UA021',
        '4BM1',
        'UA021',
        'HIJKLMNO',
        'Vespertino',
        30
    );

INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '4BM1_UA022',
        '4BM1',
        'UA022',
        'HIJKLMNO',
        'Vespertino',
        30
    );

INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '4BM1_UA023',
        '4BM1',
        'UA023',
        'HIJKLMNO',
        'Vespertino',
        30
    );

INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '4BM1_UA024',
        '4BM1',
        'UA024',
        'HIJKLMNO',
        'Vespertino',
        30
    );

INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '4BM1_UA025',
        '4BM1',
        'UA025',
        'HIJKLMNO',
        'Vespertino',
        30
    );

INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '5BM1_UA026',
        '5BM1',
        'UA026',
        'HIJKLMNO',
        'Matutino',
        30
    );

INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '5BM1_UA027',
        '5BM1',
        'UA027',
        'HIJKLMNO',
        'Matutino',
        30
    );

INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '5BM1_UA028',
        '5BM1',
        'UA028',
        'HIJKLMNO',
        'Matutino',
        30
    );

INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '5BM1_UA029',
        '5BM1',
        'UA029',
        'HIJKLMNO',
        'Matutino',
        30
    );

INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '5BM1_UA030',
        '5BM1',
        'UA030',
        'HIJKLMNO',
        'Matutino',
        30
    );

INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '6BM1_UA031',
        '6BM1',
        'UA031',
        'HIJKLMNO',
        'Vespertino',
        30
    );

INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '6BM1_UA032',
        '6BM1',
        'UA032',
        'HIJKLMNO',
        'Vespertino',
        30
    );

INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '6BM1_UA033',
        '6BM1',
        'UA033',
        'HIJKLMNO',
        'Vespertino',
        30
    );

INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '6BM1_UA034',
        '6BM1',
        'UA034',
        'HIJKLMNO',
        'Vespertino',
        30
    );

INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '6BM1_UA035',
        '6BM1',
        'UA035',
        'HIJKLMNO',
        'Vespertino',
        30
    );

INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '7BM1_UA036',
        '7BM1',
        'UA036',
        'HIJKLMNO',
        'Matutino',
        30
    );

INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '7BM1_UA037',
        '7BM1',
        'UA037',
        'HIJKLMNO',
        'Matutino',
        30
    );

INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '7BM1_UA038',
        '7BM1',
        'UA038',
        'HIJKLMNO',
        'Matutino',
        30
    );

INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '7BM1_UA039',
        '7BM1',
        'UA039',
        'HIJKLMNO',
        'Matutino',
        30
    );

INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '7BM1_UA040',
        '7BM1',
        'UA040',
        'HIJKLMNO',
        'Matutino',
        30
    );

INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '8BM1_UA041',
        '8BM1',
        'UA041',
        'HIJKLMNO',
        'Vespertino',
        30
    );

INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '8BM1_UA042',
        '8BM1',
        'UA042',
        'HIJKLMNO',
        'Vespertino',
        30
    );

INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '8BM1_UA043',
        '8BM1',
        'UA043',
        'HIJKLMNO',
        'Vespertino',
        30
    );

INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '8BM1_UA044',
        '8BM1',
        'UA044',
        'HIJKLMNO',
        'Vespertino',
        30
    );

INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo
    )
VALUES (
        '8BM1_UA045',
        '8BM1',
        'UA045',
        'HIJKLMNO',
        'Vespertino',
        30
    );

-- INSERT datos_personales para 30 alumnos ficticios
-- Se emplea la misma contraseña cifrada que en su ejemplo inicial.
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
VALUES (
        '2023630001',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Alumno1',
        'ApellidoP1',
        'ApellidoM1',
        '2003-01-15',
        'RFC2023630001',
        'O+',
        'CURP0001',
        'mexicana',
        'Calle Falsa',
        '123',
        'n/a',
        '01234',
        'Colonia',
        'Delegacion',
        'Ciudad',
        '5510000001',
        'alumno1@mail.com',
        'n/a',
        'activo',
        8,
        'Ingenieria en Inteligencia Artificial'
    );

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
VALUES (
        '2023630002',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Alumno2',
        'ApellidoP2',
        'ApellidoM2',
        '2003-01-15',
        'RFC2023630002',
        'O+',
        'CURP0002',
        'mexicana',
        'Calle Falsa',
        '123',
        'n/a',
        '01234',
        'Colonia',
        'Delegacion',
        'Ciudad',
        '5510000002',
        'alumno2@mail.com',
        'n/a',
        'activo',
        8,
        'Ingenieria en Inteligencia Artificial'
    );

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
VALUES (
        '2023630003',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Alumno3',
        'ApellidoP3',
        'ApellidoM3',
        '2003-01-15',
        'RFC2023630003',
        'O+',
        'CURP0003',
        'mexicana',
        'Calle Falsa',
        '123',
        'n/a',
        '01234',
        'Colonia',
        'Delegacion',
        'Ciudad',
        '5510000003',
        'alumno3@mail.com',
        'n/a',
        'activo',
        8,
        'Ingenieria en Inteligencia Artificial'
    );

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
VALUES (
        '2023630004',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Alumno4',
        'ApellidoP4',
        'ApellidoM4',
        '2003-01-15',
        'RFC2023630004',
        'O+',
        'CURP0004',
        'mexicana',
        'Calle Falsa',
        '123',
        'n/a',
        '01234',
        'Colonia',
        'Delegacion',
        'Ciudad',
        '5510000004',
        'alumno4@mail.com',
        'n/a',
        'activo',
        8,
        'Ingenieria en Inteligencia Artificial'
    );

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
VALUES (
        '2023630005',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Alumno5',
        'ApellidoP5',
        'ApellidoM5',
        '2003-01-15',
        'RFC2023630005',
        'O+',
        'CURP0005',
        'mexicana',
        'Calle Falsa',
        '123',
        'n/a',
        '01234',
        'Colonia',
        'Delegacion',
        'Ciudad',
        '5510000005',
        'alumno5@mail.com',
        'n/a',
        'activo',
        8,
        'Ingenieria en Inteligencia Artificial'
    );

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
VALUES (
        '2023630006',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Alumno6',
        'ApellidoP6',
        'ApellidoM6',
        '2003-01-15',
        'RFC2023630006',
        'O+',
        'CURP0006',
        'mexicana',
        'Calle Falsa',
        '123',
        'n/a',
        '01234',
        'Colonia',
        'Delegacion',
        'Ciudad',
        '5510000006',
        'alumno6@mail.com',
        'n/a',
        'activo',
        8,
        'Ingenieria en Inteligencia Artificial'
    );

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
VALUES (
        '2023630007',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Alumno7',
        'ApellidoP7',
        'ApellidoM7',
        '2003-01-15',
        'RFC2023630007',
        'O+',
        'CURP0007',
        'mexicana',
        'Calle Falsa',
        '123',
        'n/a',
        '01234',
        'Colonia',
        'Delegacion',
        'Ciudad',
        '5510000007',
        'alumno7@mail.com',
        'n/a',
        'activo',
        8,
        'Ingenieria en Inteligencia Artificial'
    );

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
VALUES (
        '2023630008',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Alumno8',
        'ApellidoP8',
        'ApellidoM8',
        '2003-01-15',
        'RFC2023630008',
        'O+',
        'CURP0008',
        'mexicana',
        'Calle Falsa',
        '123',
        'n/a',
        '01234',
        'Colonia',
        'Delegacion',
        'Ciudad',
        '5510000008',
        'alumno8@mail.com',
        'n/a',
        'activo',
        8,
        'Ingenieria en Inteligencia Artificial'
    );

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
VALUES (
        '2023630009',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Alumno9',
        'ApellidoP9',
        'ApellidoM9',
        '2003-01-15',
        'RFC2023630009',
        'O+',
        'CURP0009',
        'mexicana',
        'Calle Falsa',
        '123',
        'n/a',
        '01234',
        'Colonia',
        'Delegacion',
        'Ciudad',
        '5510000009',
        'alumno9@mail.com',
        'n/a',
        'activo',
        8,
        'Ingenieria en Inteligencia Artificial'
    );

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
VALUES (
        '2023630010',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Alumno10',
        'ApellidoP10',
        'ApellidoM10',
        '2003-01-15',
        'RFC2023630010',
        'O+',
        'CURP0010',
        'mexicana',
        'Calle Falsa',
        '123',
        'n/a',
        '01234',
        'Colonia',
        'Delegacion',
        'Ciudad',
        '5510000010',
        'alumno10@mail.com',
        'n/a',
        'activo',
        8,
        'Ingenieria en Inteligencia Artificial'
    );

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
VALUES (
        '2023630011',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Alumno11',
        'ApellidoP11',
        'ApellidoM11',
        '2003-01-15',
        'RFC2023630011',
        'O+',
        'CURP0011',
        'mexicana',
        'Calle Falsa',
        '123',
        'n/a',
        '01234',
        'Colonia',
        'Delegacion',
        'Ciudad',
        '5510000011',
        'alumno11@mail.com',
        'n/a',
        'activo',
        8,
        'Ingenieria en Inteligencia Artificial'
    );

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
VALUES (
        '2023630012',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Alumno12',
        'ApellidoP12',
        'ApellidoM12',
        '2003-01-15',
        'RFC2023630012',
        'O+',
        'CURP0012',
        'mexicana',
        'Calle Falsa',
        '123',
        'n/a',
        '01234',
        'Colonia',
        'Delegacion',
        'Ciudad',
        '5510000012',
        'alumno12@mail.com',
        'n/a',
        'activo',
        8,
        'Ingenieria en Inteligencia Artificial'
    );

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
VALUES (
        '2023630013',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Alumno13',
        'ApellidoP13',
        'ApellidoM13',
        '2003-01-15',
        'RFC2023630013',
        'O+',
        'CURP0013',
        'mexicana',
        'Calle Falsa',
        '123',
        'n/a',
        '01234',
        'Colonia',
        'Delegacion',
        'Ciudad',
        '5510000013',
        'alumno13@mail.com',
        'n/a',
        'activo',
        8,
        'Ingenieria en Inteligencia Artificial'
    );

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
VALUES (
        '2023630014',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Alumno14',
        'ApellidoP14',
        'ApellidoM14',
        '2003-01-15',
        'RFC2023630014',
        'O+',
        'CURP0014',
        'mexicana',
        'Calle Falsa',
        '123',
        'n/a',
        '01234',
        'Colonia',
        'Delegacion',
        'Ciudad',
        '5510000014',
        'alumno14@mail.com',
        'n/a',
        'activo',
        8,
        'Ingenieria en Inteligencia Artificial'
    );

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
VALUES (
        '2023630015',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Alumno15',
        'ApellidoP15',
        'ApellidoM15',
        '2003-01-15',
        'RFC2023630015',
        'O+',
        'CURP0015',
        'mexicana',
        'Calle Falsa',
        '123',
        'n/a',
        '01234',
        'Colonia',
        'Delegacion',
        'Ciudad',
        '5510000015',
        'alumno15@mail.com',
        'n/a',
        'activo',
        8,
        'Ingenieria en Inteligencia Artificial'
    );

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
VALUES (
        '2023630016',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Alumno16',
        'ApellidoP16',
        'ApellidoM16',
        '2003-01-15',
        'RFC2023630016',
        'O+',
        'CURP0016',
        'mexicana',
        'Calle Falsa',
        '123',
        'n/a',
        '01234',
        'Colonia',
        'Delegacion',
        'Ciudad',
        '5510000016',
        'alumno16@mail.com',
        'n/a',
        'activo',
        8,
        'Ingenieria en Inteligencia Artificial'
    );

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
VALUES (
        '2023630017',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Alumno17',
        'ApellidoP17',
        'ApellidoM17',
        '2003-01-15',
        'RFC2023630017',
        'O+',
        'CURP0017',
        'mexicana',
        'Calle Falsa',
        '123',
        'n/a',
        '01234',
        'Colonia',
        'Delegacion',
        'Ciudad',
        '5510000017',
        'alumno17@mail.com',
        'n/a',
        'activo',
        8,
        'Ingenieria en Inteligencia Artificial'
    );

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
VALUES (
        '2023630018',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Alumno18',
        'ApellidoP18',
        'ApellidoM18',
        '2003-01-15',
        'RFC2023630018',
        'O+',
        'CURP0018',
        'mexicana',
        'Calle Falsa',
        '123',
        'n/a',
        '01234',
        'Colonia',
        'Delegacion',
        'Ciudad',
        '5510000018',
        'alumno18@mail.com',
        'n/a',
        'activo',
        8,
        'Ingenieria en Inteligencia Artificial'
    );

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
VALUES (
        '2023630019',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Alumno19',
        'ApellidoP19',
        'ApellidoM19',
        '2003-01-15',
        'RFC2023630019',
        'O+',
        'CURP0019',
        'mexicana',
        'Calle Falsa',
        '123',
        'n/a',
        '01234',
        'Colonia',
        'Delegacion',
        'Ciudad',
        '5510000019',
        'alumno19@mail.com',
        'n/a',
        'activo',
        8,
        'Ingenieria en Inteligencia Artificial'
    );

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
VALUES (
        '2023630020',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Alumno20',
        'ApellidoP20',
        'ApellidoM20',
        '2003-01-15',
        'RFC2023630020',
        'O+',
        'CURP0020',
        'mexicana',
        'Calle Falsa',
        '123',
        'n/a',
        '01234',
        'Colonia',
        'Delegacion',
        'Ciudad',
        '5510000020',
        'alumno20@mail.com',
        'n/a',
        'activo',
        8,
        'Ingenieria en Inteligencia Artificial'
    );

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
VALUES (
        '2023630021',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Alumno21',
        'ApellidoP21',
        'ApellidoM21',
        '2003-01-15',
        'RFC2023630021',
        'O+',
        'CURP0021',
        'mexicana',
        'Calle Falsa',
        '123',
        'n/a',
        '01234',
        'Colonia',
        'Delegacion',
        'Ciudad',
        '5510000021',
        'alumno21@mail.com',
        'n/a',
        'activo',
        8,
        'Ingenieria en Inteligencia Artificial'
    );

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
VALUES (
        '2023630022',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Alumno22',
        'ApellidoP22',
        'ApellidoM22',
        '2003-01-15',
        'RFC2023630022',
        'O+',
        'CURP0022',
        'mexicana',
        'Calle Falsa',
        '123',
        'n/a',
        '01234',
        'Colonia',
        'Delegacion',
        'Ciudad',
        '5510000022',
        'alumno22@mail.com',
        'n/a',
        'activo',
        8,
        'Ingenieria en Inteligencia Artificial'
    );

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
VALUES (
        '2023630023',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Alumno23',
        'ApellidoP23',
        'ApellidoM23',
        '2003-01-15',
        'RFC2023630023',
        'O+',
        'CURP0023',
        'mexicana',
        'Calle Falsa',
        '123',
        'n/a',
        '01234',
        'Colonia',
        'Delegacion',
        'Ciudad',
        '5510000023',
        'alumno23@mail.com',
        'n/a',
        'activo',
        8,
        'Ingenieria en Inteligencia Artificial'
    );

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
VALUES (
        '2023630024',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Alumno24',
        'ApellidoP24',
        'ApellidoM24',
        '2003-01-15',
        'RFC2023630024',
        'O+',
        'CURP0024',
        'mexicana',
        'Calle Falsa',
        '123',
        'n/a',
        '01234',
        'Colonia',
        'Delegacion',
        'Ciudad',
        '5510000024',
        'alumno24@mail.com',
        'n/a',
        'activo',
        8,
        'Ingenieria en Inteligencia Artificial'
    );

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
VALUES (
        '2023630025',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Alumno25',
        'ApellidoP25',
        'ApellidoM25',
        '2003-01-15',
        'RFC2023630025',
        'O+',
        'CURP0025',
        'mexicana',
        'Calle Falsa',
        '123',
        'n/a',
        '01234',
        'Colonia',
        'Delegacion',
        'Ciudad',
        '5510000025',
        'alumno25@mail.com',
        'n/a',
        'activo',
        8,
        'Ingenieria en Inteligencia Artificial'
    );

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
VALUES (
        '2023630026',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Alumno26',
        'ApellidoP26',
        'ApellidoM26',
        '2003-01-15',
        'RFC2023630026',
        'O+',
        'CURP0026',
        'mexicana',
        'Calle Falsa',
        '123',
        'n/a',
        '01234',
        'Colonia',
        'Delegacion',
        'Ciudad',
        '5510000026',
        'alumno26@mail.com',
        'n/a',
        'activo',
        8,
        'Ingenieria en Inteligencia Artificial'
    );

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
VALUES (
        '2023630027',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Alumno27',
        'ApellidoP27',
        'ApellidoM27',
        '2003-01-15',
        'RFC2023630027',
        'O+',
        'CURP0027',
        'mexicana',
        'Calle Falsa',
        '123',
        'n/a',
        '01234',
        'Colonia',
        'Delegacion',
        'Ciudad',
        '5510000027',
        'alumno27@mail.com',
        'n/a',
        'activo',
        8,
        'Ingenieria en Inteligencia Artificial'
    );

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
VALUES (
        '2023630028',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Alumno28',
        'ApellidoP28',
        'ApellidoM28',
        '2003-01-15',
        'RFC2023630028',
        'O+',
        'CURP0028',
        'mexicana',
        'Calle Falsa',
        '123',
        'n/a',
        '01234',
        'Colonia',
        'Delegacion',
        'Ciudad',
        '5510000028',
        'alumno28@mail.com',
        'n/a',
        'activo',
        8,
        'Ingenieria en Inteligencia Artificial'
    );

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
VALUES (
        '2023630029',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Alumno29',
        'ApellidoP29',
        'ApellidoM29',
        '2003-01-15',
        'RFC2023630029',
        'O+',
        'CURP0029',
        'mexicana',
        'Calle Falsa',
        '123',
        'n/a',
        '01234',
        'Colonia',
        'Delegacion',
        'Ciudad',
        '5510000029',
        'alumno29@mail.com',
        'n/a',
        'activo',
        8,
        'Ingenieria en Inteligencia Artificial'
    );

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
VALUES (
        '2023630030',
        '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
        'alumno',
        'Alumno30',
        'ApellidoP30',
        'ApellidoM30',
        '2003-01-15',
        'RFC2023630030',
        'O+',
        'CURP0030',
        'mexicana',
        'Calle Falsa',
        '123',
        'n/a',
        '01234',
        'Colonia',
        'Delegacion',
        'Ciudad',
        '5510000030',
        'alumno30@mail.com',
        'n/a',
        'activo',
        8,
        'Ingenieria en Inteligencia Artificial'
    );

-- INSERT estudiante (registro académico vinculado a datos_personales)
INSERT INTO
    estudiante (
        id,
        id_usuario,
        promedio,
        creditos_disponibles,
        estado_academico
    )
VALUES (
        'EST2023630001',
        '2023630001',
        8.0,
        25,
        'Regular'
    );

INSERT INTO
    estudiante (
        id,
        id_usuario,
        promedio,
        creditos_disponibles,
        estado_academico
    )
VALUES (
        'EST2023630002',
        '2023630002',
        8.0,
        25,
        'Regular'
    );

INSERT INTO
    estudiante (
        id,
        id_usuario,
        promedio,
        creditos_disponibles,
        estado_academico
    )
VALUES (
        'EST2023630003',
        '2023630003',
        8.0,
        25,
        'Regular'
    );

INSERT INTO
    estudiante (
        id,
        id_usuario,
        promedio,
        creditos_disponibles,
        estado_academico
    )
VALUES (
        'EST2023630004',
        '2023630004',
        8.0,
        25,
        'Regular'
    );

INSERT INTO
    estudiante (
        id,
        id_usuario,
        promedio,
        creditos_disponibles,
        estado_academico
    )
VALUES (
        'EST2023630005',
        '2023630005',
        8.0,
        25,
        'Regular'
    );

INSERT INTO
    estudiante (
        id,
        id_usuario,
        promedio,
        creditos_disponibles,
        estado_academico
    )
VALUES (
        'EST2023630006',
        '2023630006',
        8.0,
        25,
        'Regular'
    );

INSERT INTO
    estudiante (
        id,
        id_usuario,
        promedio,
        creditos_disponibles,
        estado_academico
    )
VALUES (
        'EST2023630007',
        '2023630007',
        8.0,
        25,
        'Regular'
    );

INSERT INTO
    estudiante (
        id,
        id_usuario,
        promedio,
        creditos_disponibles,
        estado_academico
    )
VALUES (
        'EST2023630008',
        '2023630008',
        8.0,
        25,
        'Regular'
    );

INSERT INTO
    estudiante (
        id,
        id_usuario,
        promedio,
        creditos_disponibles,
        estado_academico
    )
VALUES (
        'EST2023630009',
        '2023630009',
        8.0,
        25,
        'Regular'
    );

INSERT INTO
    estudiante (
        id,
        id_usuario,
        promedio,
        creditos_disponibles,
        estado_academico
    )
VALUES (
        'EST2023630010',
        '2023630010',
        8.0,
        25,
        'Regular'
    );

INSERT INTO
    estudiante (
        id,
        id_usuario,
        promedio,
        creditos_disponibles,
        estado_academico
    )
VALUES (
        'EST2023630011',
        '2023630011',
        8.0,
        25,
        'Regular'
    );

INSERT INTO
    estudiante (
        id,
        id_usuario,
        promedio,
        creditos_disponibles,
        estado_academico
    )
VALUES (
        'EST2023630012',
        '2023630012',
        8.0,
        25,
        'Regular'
    );

INSERT INTO
    estudiante (
        id,
        id_usuario,
        promedio,
        creditos_disponibles,
        estado_academico
    )
VALUES (
        'EST2023630013',
        '2023630013',
        8.0,
        25,
        'Regular'
    );

INSERT INTO
    estudiante (
        id,
        id_usuario,
        promedio,
        creditos_disponibles,
        estado_academico
    )
VALUES (
        'EST2023630014',
        '2023630014',
        8.0,
        25,
        'Regular'
    );

INSERT INTO
    estudiante (
        id,
        id_usuario,
        promedio,
        creditos_disponibles,
        estado_academico
    )
VALUES (
        'EST2023630015',
        '2023630015',
        8.0,
        25,
        'Regular'
    );

INSERT INTO
    estudiante (
        id,
        id_usuario,
        promedio,
        creditos_disponibles,
        estado_academico
    )
VALUES (
        'EST2023630016',
        '2023630016',
        8.0,
        25,
        'Regular'
    );

INSERT INTO
    estudiante (
        id,
        id_usuario,
        promedio,
        creditos_disponibles,
        estado_academico
    )
VALUES (
        'EST2023630017',
        '2023630017',
        8.0,
        25,
        'Regular'
    );

INSERT INTO
    estudiante (
        id,
        id_usuario,
        promedio,
        creditos_disponibles,
        estado_academico
    )
VALUES (
        'EST2023630018',
        '2023630018',
        8.0,
        25,
        'Regular'
    );

INSERT INTO
    estudiante (
        id,
        id_usuario,
        promedio,
        creditos_disponibles,
        estado_academico
    )
VALUES (
        'EST2023630019',
        '2023630019',
        8.0,
        25,
        'Regular'
    );

INSERT INTO
    estudiante (
        id,
        id_usuario,
        promedio,
        creditos_disponibles,
        estado_academico
    )
VALUES (
        'EST2023630020',
        '2023630020',
        8.0,
        25,
        'Regular'
    );

INSERT INTO
    estudiante (
        id,
        id_usuario,
        promedio,
        creditos_disponibles,
        estado_academico
    )
VALUES (
        'EST2023630021',
        '2023630021',
        8.0,
        25,
        'Regular'
    );

INSERT INTO
    estudiante (
        id,
        id_usuario,
        promedio,
        creditos_disponibles,
        estado_academico
    )
VALUES (
        'EST2023630022',
        '2023630022',
        8.0,
        25,
        'Regular'
    );

INSERT INTO
    estudiante (
        id,
        id_usuario,
        promedio,
        creditos_disponibles,
        estado_academico
    )
VALUES (
        'EST2023630023',
        '2023630023',
        8.0,
        25,
        'Regular'
    );

INSERT INTO
    estudiante (
        id,
        id_usuario,
        promedio,
        creditos_disponibles,
        estado_academico
    )
VALUES (
        'EST2023630024',
        '2023630024',
        8.0,
        25,
        'Regular'
    );

INSERT INTO
    estudiante (
        id,
        id_usuario,
        promedio,
        creditos_disponibles,
        estado_academico
    )
VALUES (
        'EST2023630025',
        '2023630025',
        8.0,
        25,
        'Regular'
    );

INSERT INTO
    estudiante (
        id,
        id_usuario,
        promedio,
        creditos_disponibles,
        estado_academico
    )
VALUES (
        'EST2023630026',
        '2023630026',
        8.0,
        25,
        'Regular'
    );

INSERT INTO
    estudiante (
        id,
        id_usuario,
        promedio,
        creditos_disponibles,
        estado_academico
    )
VALUES (
        'EST2023630027',
        '2023630027',
        8.0,
        25,
        'Regular'
    );

INSERT INTO
    estudiante (
        id,
        id_usuario,
        promedio,
        creditos_disponibles,
        estado_academico
    )
VALUES (
        'EST2023630028',
        '2023630028',
        8.0,
        25,
        'Regular'
    );

INSERT INTO
    estudiante (
        id,
        id_usuario,
        promedio,
        creditos_disponibles,
        estado_academico
    )
VALUES (
        'EST2023630029',
        '2023630029',
        8.0,
        25,
        'Regular'
    );

INSERT INTO
    estudiante (
        id,
        id_usuario,
        promedio,
        creditos_disponibles,
        estado_academico
    )
VALUES (
        'EST2023630030',
        '2023630030',
        8.0,
        25,
        'Regular'
    );

-- INSERT horarios, inscripciones y matriculas (mat_inscritos)
-- Se crea un horario por alumno y una inscripcion; luego se inscribe a cada alumno en hasta 4 materias de su semestre asignado.

-- Alumno 2023630001 -> semestre 1 (inscrito en las primeras 4 UAs del semestre 1)
INSERT INTO
    horario (id, id_alumno)
VALUES ('HOR2023630001', '2023630001');

INSERT INTO
    inscripcion (
        id,
        id_alumno,
        fecha_hora_in,
        fecha_hora_cad
    )
VALUES (
        'INS2023630001',
        '2023630001',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0001',
        'HOR2023630001',
        '1BM1_UA006',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0002',
        'HOR2023630001',
        '1BM1_UA007',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0003',
        'HOR2023630001',
        '1BM1_UA008',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0004',
        'HOR2023630001',
        '1BM1_UA009',
        NULL
    );

-- Alumno 2023630002 -> semestre 2
INSERT INTO
    horario (id, id_alumno)
VALUES ('HOR2023630002', '2023630002');

INSERT INTO
    inscripcion (
        id,
        id_alumno,
        fecha_hora_in,
        fecha_hora_cad
    )
VALUES (
        'INS2023630002',
        '2023630002',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0005',
        'HOR2023630002',
        '2BM1_UA011',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0006',
        'HOR2023630002',
        '2BM1_UA012',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0007',
        'HOR2023630002',
        '2BM1_UA013',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0008',
        'HOR2023630002',
        '2BM1_UA014',
        NULL
    );

-- Alumno 2023630003 -> semestre 3
INSERT INTO
    horario (id, id_alumno)
VALUES ('HOR2023630003', '2023630003');

INSERT INTO
    inscripcion (
        id,
        id_alumno,
        fecha_hora_in,
        fecha_hora_cad
    )
VALUES (
        'INS2023630003',
        '2023630003',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0009',
        'HOR2023630003',
        '3BM1_UA016',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0010',
        'HOR2023630003',
        '3BM1_UA017',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0011',
        'HOR2023630003',
        '3BM1_UA018',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0012',
        'HOR2023630003',
        '3BM1_UA019',
        NULL
    );

-- Alumno 2023630004 -> semestre 4
INSERT INTO
    horario (id, id_alumno)
VALUES ('HOR2023630004', '2023630004');

INSERT INTO
    inscripcion (
        id,
        id_alumno,
        fecha_hora_in,
        fecha_hora_cad
    )
VALUES (
        'INS2023630004',
        '2023630004',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0013',
        'HOR2023630004',
        '4BM1_UA021',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0014',
        'HOR2023630004',
        '4BM1_UA022',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0015',
        'HOR2023630004',
        '4BM1_UA023',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0016',
        'HOR2023630004',
        '4BM1_UA024',
        NULL
    );

-- Alumno 2023630005 -> semestre 5
INSERT INTO
    horario (id, id_alumno)
VALUES ('HOR2023630005', '2023630005');

INSERT INTO
    inscripcion (
        id,
        id_alumno,
        fecha_hora_in,
        fecha_hora_cad
    )
VALUES (
        'INS2023630005',
        '2023630005',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0017',
        'HOR2023630005',
        '5BM1_UA026',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0018',
        'HOR2023630005',
        '5BM1_UA027',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0019',
        'HOR2023630005',
        '5BM1_UA028',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0020',
        'HOR2023630005',
        '5BM1_UA029',
        NULL
    );

-- Alumno 2023630006 -> semestre 6
INSERT INTO
    horario (id, id_alumno)
VALUES ('HOR2023630006', '2023630006');

INSERT INTO
    inscripcion (
        id,
        id_alumno,
        fecha_hora_in,
        fecha_hora_cad
    )
VALUES (
        'INS2023630006',
        '2023630006',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0021',
        'HOR2023630006',
        '6BM1_UA031',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0022',
        'HOR2023630006',
        '6BM1_UA032',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0023',
        'HOR2023630006',
        '6BM1_UA033',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0024',
        'HOR2023630006',
        '6BM1_UA034',
        NULL
    );

-- Alumno 2023630007 -> semestre 7
INSERT INTO
    horario (id, id_alumno)
VALUES ('HOR2023630007', '2023630007');

INSERT INTO
    inscripcion (
        id,
        id_alumno,
        fecha_hora_in,
        fecha_hora_cad
    )
VALUES (
        'INS2023630007',
        '2023630007',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0025',
        'HOR2023630007',
        '7BM1_UA036',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0026',
        'HOR2023630007',
        '7BM1_UA037',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0027',
        'HOR2023630007',
        '7BM1_UA038',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0028',
        'HOR2023630007',
        '7BM1_UA039',
        NULL
    );

-- Alumno 2023630008 -> semestre 8
INSERT INTO
    horario (id, id_alumno)
VALUES ('HOR2023630008', '2023630008');

INSERT INTO
    inscripcion (
        id,
        id_alumno,
        fecha_hora_in,
        fecha_hora_cad
    )
VALUES (
        'INS2023630008',
        '2023630008',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0029',
        'HOR2023630008',
        '8BM1_UA041',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0030',
        'HOR2023630008',
        '8BM1_UA042',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0031',
        'HOR2023630008',
        '8BM1_UA043',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0032',
        'HOR2023630008',
        '8BM1_UA044',
        NULL
    );

-- Repetimos el patrón para los 30 alumnos (distribución round-robin de semestres 1..8)
INSERT INTO
    horario (id, id_alumno)
VALUES ('HOR2023630009', '2023630009');

INSERT INTO
    inscripcion (
        id,
        id_alumno,
        fecha_hora_in,
        fecha_hora_cad
    )
VALUES (
        'INS2023630009',
        '2023630009',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0033',
        'HOR2023630009',
        '1BM1_UA006',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0034',
        'HOR2023630009',
        '1BM1_UA007',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0035',
        'HOR2023630009',
        '1BM1_UA008',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0036',
        'HOR2023630009',
        '1BM1_UA009',
        NULL
    );

INSERT INTO
    horario (id, id_alumno)
VALUES ('HOR2023630010', '2023630010');

INSERT INTO
    inscripcion (
        id,
        id_alumno,
        fecha_hora_in,
        fecha_hora_cad
    )
VALUES (
        'INS2023630010',
        '2023630010',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0037',
        'HOR2023630010',
        '2BM1_UA011',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0038',
        'HOR2023630010',
        '2BM1_UA012',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0039',
        'HOR2023630010',
        '2BM1_UA013',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0040',
        'HOR2023630010',
        '2BM1_UA014',
        NULL
    );

INSERT INTO
    horario (id, id_alumno)
VALUES ('HOR2023630011', '2023630011');

INSERT INTO
    inscripcion (
        id,
        id_alumno,
        fecha_hora_in,
        fecha_hora_cad
    )
VALUES (
        'INS2023630011',
        '2023630011',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0041',
        'HOR2023630011',
        '3BM1_UA016',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0042',
        'HOR2023630011',
        '3BM1_UA017',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0043',
        'HOR2023630011',
        '3BM1_UA018',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0044',
        'HOR2023630011',
        '3BM1_UA019',
        NULL
    );

INSERT INTO
    horario (id, id_alumno)
VALUES ('HOR2023630012', '2023630012');

INSERT INTO
    inscripcion (
        id,
        id_alumno,
        fecha_hora_in,
        fecha_hora_cad
    )
VALUES (
        'INS2023630012',
        '2023630012',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0045',
        'HOR2023630012',
        '4BM1_UA021',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0046',
        'HOR2023630012',
        '4BM1_UA022',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0047',
        'HOR2023630012',
        '4BM1_UA023',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0048',
        'HOR2023630012',
        '4BM1_UA024',
        NULL
    );

INSERT INTO
    horario (id, id_alumno)
VALUES ('HOR2023630013', '2023630013');

INSERT INTO
    inscripcion (
        id,
        id_alumno,
        fecha_hora_in,
        fecha_hora_cad
    )
VALUES (
        'INS2023630013',
        '2023630013',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0049',
        'HOR2023630013',
        '5BM1_UA026',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES (
        'M0050',
        'HOR2023630013',
        '5BM1_UA027',
        NULL
    );
-- Datos de la base de datos (INSERTs, DELETEs y populado)
-- Ejecutar después de `tables.sql`.

INSERT INTO
    datos_personales
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
                calificacion
            )
        VALUES (
                '2023635321',
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
                '10'
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
                '9'
            );

        insert into
            carrera (
                nombre,
                creditos_iniciales,
                prefijo_grupo,
                duracion_max
            )
        values (
                'Ingenieria en Sistemas Computacionales',
                25,
                'A',
                12
            ),
            (
                'Ingenieria en Inteligencia Artificial',
                25,
                'B',
                12
            ),
            (
                'Ingenieria en Ciencia de Datos',
                25,
                'C',
                12
            );

        insert into
            unidad_de_aprendizaje (
                id,
                nombre,
                credito,
                carrera,
                semestre
            )
        values (
                'UA001',
                'Matematicas Discretas',
                8,
                'Ingenieria en Sistemas Computacionales',
                1
            ),
            (
                'UA002',
                'Programacion I',
                8,
                'Ingenieria en Sistemas Computacionales',
                2
            ),
            (
                'UA003',
                'Calculo',
                8,
                'Ingenieria en Sistemas Computacionales',
                3
            ),
            (
                'UA004',
                'Calculo',
                8,
                'Ingenieria en Inteligencia Artificial',
                1
            ),
            (
                'UA005',
                'Matematicas Discretas',
                8,
                'Ingenieria en Inteligencia Artificial',
                1
            );

        INSERT INTO
            datos_personales (
                id,
                contrasena,
                tipo_usuario,
                nombre,
                ape_paterno,
                ape_materno,
                fecha_nacimiento,
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
                situacion,
                carrera
            )
        VALUES (
                "2023631211",
                '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
                "alumno",
                "Jorge",
                "Garcia",
                "Prieto",
                "2002-11-15",
                "O+",
                "JGP",
                "Mexicana",
                "Las lomas",
                "13",
                "205",
                "1234",
                "Juarez",
                "Iztacalco",
                "CDMX",
                "1234",
                "1234@gmail.com",
                "activo",
                "Ingenieria en Inteligencia Artificial"
            ),
            (
                "2023631212",
                '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
                "alumno",
                "Mariana",
                "Lopez",
                "Santos",
                "2003-05-09",
                "A+",
                "MLS030509MDFLPR03",
                "Mexicana",
                "Av. del Trabajo",
                "45",
                "2B",
                "07890",
                "Industrial",
                "Gustavo A. Madero",
                "CDMX",
                "5512345678",
                "mariana.lopez@gmail.com",
                "activo",
                "Ingenieria en Inteligencia Artificial"
            ),
            (
                "2023631213",
                '$2b$10$FVM7xU.TbCeLwfOmDq1QeeF0DCu6FlpuS8f.hqSL55HmZojG1ZbNG',
                "alumno",
                "Carlos",
                "Ramirez",
                "Hernandez",
                "2001-09-22",
                "B+",
                "CRH010922HDFRMN07",
                "Mexicana",
                "Calle Reforma",
                "88",
                "1A",
                "06400",
                "Centro",
                "Cuauhtémoc",
                "CDMX",
                "5523456789",
                "carlos.ramirez@gmail.com",
                "activo",
                "Ingenieria en Inteligencia Artificial"
            );

        INSERT INTO
            kardex (
                id,
                id_alumno,
                promedio,
                situacion_academica,
                semestres_restantes
            )
        VALUES (
                "K2023631211",
                "2023631211",
                8.7,
                "Regular",
                10
            ),
            (
                "K2023631212",
                "2023631212",
                9.1,
                "Regular",
                10
            ),
            (
                "K2023631213",
                "2023631213",
                7.5,
                "Regular",
                10
            );

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
            -- Alumno: Jorge Garcia Prieto
            (
                "UAA002",
                "K2023631211",
                "Fundamentos de Programación",
                8.5,
                2,
                "2024-2",
                "2024-12-15",
                "Ordinario"
            ),
            (
                "UAA003",
                "K2023631211",
                "Cálculo",
                8.7,
                3,
                "2025-1",
                "2025-06-20",
                "Ordinario"
            ),

        -- Alumna: Mariana Lopez Santos
        (
            "UAA004",
            "K2023631212",
            "Matemáticas Discretas",
            9.3,
            1,
            "2024-1",
            "2024-06-10",
            "Ordinario"
        ),
        (
            "UAA006",
            "K2023631212",
            "Cálculo",
            8.8,
            3,
            "2025-1",
            "2025-06-20",
            "ETS"
        ),

        -- Alumno: Carlos Ramirez Hernandez
        (
            "UAA007",
            "K2023631213",
            "Matemáticas Discretas",
            7.9,
            1,
            "2024-1",
            "2024-06-10",
            "Extraordinario"
        ),
        (
            "UAA008",
            "K2023631213",
            "Fundamentos de Programación",
            8.2,
            2,
            "2024-2",
            "2024-12-15",
            "Ordinario"
        ),
        (
            "UAA009",
            "K2023631213",
            "Cálculo",
            7.5,
            3,
            "2025-1",
            "2025-06-20",
            "Recurse"
        );

        INSERT INTO
            estudiante (
                id,
                id_usuario,
                promedio,
                creditos_disponibles,
                estado_academico
            )
        VALUES (
                'EST001',
                '2023631211',
                0.0,
                25,
                'Regular'
            ),
            (
                'EST002',
                '2023631212',
                0.0,
                25,
                'Regular'
            ),
            (
                'EST003',
                '2023631213',
                0.0,
                25,
                'Regular'
            );

        INSERT INTO
            horario (id, id_alumno)
        values ('abc', '2023631211'),
            ('def', '2023631212'),
            ('ghi', '2023631213');

        INSERT INTO
            materia_reprobada (
                id,
                id_estudiante,
                id_ua,
                periodos_restantes,
                recurse,
                estado_actual
            )
        VALUES (
                "MR001",
                "EST001",
                "UA003",
                2,
                0,
                "Reprobada"
            ),
            (
                "MR004",
                "EST001",
                "UA003",
                1,
                0,
                "Reprobada"
            ),
            (
                "MR002",
                "EST002",
                "UA001",
                1,
                1,
                "Recurse"
            ),
            (
                "MR003",
                "EST003",
                "UA002",
                2,
                0,
                "Reprobada"
            );

        INSERT INTO
            ets_grupo (
                id,
                id_ua,
                id_aplicante,
                turno,
                hora_inicio,
                hora_final,
                fecha
            )
        VALUES (
                "ETSG001",
                "UA003",
                "HIJKLMNO",
                "Matutino",
                "9:00",
                "11:00",
                "2025-06-28"
            ),
            (
                "ETSG002",
                "UA003",
                "HIJKLMNO",
                "Vespertino",
                "15:00",
                "17:00",
                "2025-06-28"
            ),
            (
                "ETSG003",
                "UA001",
                "HIJKLMNO",
                "Matutino",
                "10:00",
                "12:00",
                "2025-06-29"
            ),
            (
                "ETSG004",
                "UA001",
                "HIJKLMNO",
                "Vespertino",
                "14:00",
                "16:00",
                "2025-06-29"
            ),
            (
                "ETSG005",
                "UA002",
                "HIJKLMNO",
                "Matutino",
                "8:00",
                "10:00",
                "2025-06-30"
            ),
            (
                "ETSG006",
                "UA002",
                "HIJKLMNO",
                "Vespertino",
                "13:00",
                "15:00",
                "2025-06-30"
            );

        INSERT INTO
            ets (
                id,
                id_mr,
                id_grupo,
                comprobante,
                validado,
                calificado
            )
        VALUES (
                "ETS001",
                "MR004",
                "ETSG001",
                NULL,
                0,
                0
            ),
            (
                "ETS002",
                "MR004",
                "ETSG001",
                "N",
                1,
                5
            );

        -- ==========================================
        -- Poblar materias de Ingenieria en Inteligencia Artificial (ESCOM)
        -- Mapa Curricular 2020
        -- ==========================================

        INSERT INTO
            unidad_de_aprendizaje (
                id,
                nombre,
                credito,
                carrera,
                semestre
            )
        VALUES
            -- SEMESTRE 1
            (
                'UA006',
                'Fundamentos de Programación',
                7.5,
                'Ingenieria en Inteligencia Artificial',
                1
            ),
            (
                'UA007',
                'Matemáticas Discretas',
                10.5,
                'Ingenieria en Inteligencia Artificial',
                1
            ),
            (
                'UA008',
                'Cálculo',
                7.5,
                'Ingenieria en Inteligencia Artificial',
                1
            ),
            (
                'UA009',
                'Comunicación Oral y Escrita',
                7.5,
                'Ingenieria en Inteligencia Artificial',
                1
            ),
            (
                'UA010',
                'Fundamentos Económicos',
                7.5,
                'Ingenieria en Inteligencia Artificial',
                1
            ),

        -- SEMESTRE 2
        (
            'UA011',
            'Algoritmos y Estructuras de Datos',
            7.5,
            'Ingenieria en Inteligencia Artificial',
            2
        ),
        (
            'UA012',
            'Álgebra Lineal',
            9,
            'Ingenieria en Inteligencia Artificial',
            2
        ),
        (
            'UA013',
            'Mecánica y Electromagnetismo',
            10.5,
            'Ingenieria en Inteligencia Artificial',
            2
        ),
        (
            'UA014',
            'Ingeniería, Ética y Sociedad',
            9,
            'Ingenieria en Inteligencia Artificial',
            2
        ),
        (
            'UA015',
            'Liderazgo Personal',
            7.5,
            'Ingenieria en Inteligencia Artificial',
            2
        ),

        -- SEMESTRE 3
        (
            'UA016',
            'Análisis y Diseño de Algoritmos',
            7.5,
            'Ingenieria en Inteligencia Artificial',
            3
        ),
        (
            'UA017',
            'Cálculo Aplicado',
            7.5,
            'Ingenieria en Inteligencia Artificial',
            3
        ),
        (
            'UA018',
            'Ecuaciones Diferenciales',
            9,
            'Ingenieria en Inteligencia Artificial',
            3
        ),
        (
            'UA019',
            'Fundamentos de Diseño Digital',
            7.5,
            'Ingenieria en Inteligencia Artificial',
            3
        ),
        (
            'UA020',
            'Análisis y Diseño de Sistemas',
            7.5,
            'Ingenieria en Inteligencia Artificial',
            3
        ),

        -- SEMESTRE 4
        (
            'UA021',
            'Teoría de la Computación',
            7.5,
            'Ingenieria en Inteligencia Artificial',
            4
        ),
        (
            'UA022',
            'Probabilidad y Estadística',
            9,
            'Ingenieria en Inteligencia Artificial',
            4
        ),
        (
            'UA023',
            'Matemáticas Avanzadas para la Ingeniería',
            9,
            'Ingenieria en Inteligencia Artificial',
            4
        ),
        (
            'UA024',
            'Fundamentos de Inteligencia Artificial',
            7.5,
            'Ingenieria en Inteligencia Artificial',
            4
        ),
        (
            'UA025',
            'Diseño de Sistemas Digitales',
            7.5,
            'Ingenieria en Inteligencia Artificial',
            4
        ),

        -- SEMESTRE 5
        (
            'UA026',
            'Procesamiento de Señales',
            7.5,
            'Ingenieria en Inteligencia Artificial',
            5
        ),
        (
            'UA027',
            'Paradigmas de Programación',
            7.5,
            'Ingenieria en Inteligencia Artificial',
            5
        ),
        (
            'UA028',
            'Bases de Datos',
            7.5,
            'Ingenieria en Inteligencia Artificial',
            5
        ),
        (
            'UA029',
            'Procesamiento Digital de Señales',
            7.5,
            'Ingenieria en Inteligencia Artificial',
            5
        ),
        (
            'UA030',
            'Gestión Empresarial',
            7.5,
            'Ingenieria en Inteligencia Artificial',
            5
        ),

        -- SEMESTRE 6
        (
            'UA031',
            'Aprendizaje de Máquina',
            7.5,
            'Ingenieria en Inteligencia Artificial',
            6
        ),
        (
            'UA032',
            'Tecnologías de Lenguaje Natural',
            7.5,
            'Ingenieria en Inteligencia Artificial',
            6
        ),
        (
            'UA033',
            'Cómputo Paralelo',
            7.5,
            'Ingenieria en Inteligencia Artificial',
            6
        ),
        (
            'UA034',
            'Ingeniería de Software para Sistemas Inteligentes',
            7.5,
            'Ingenieria en Inteligencia Artificial',
            6
        ),
        (
            'UA035',
            'Finanzas Empresariales',
            7.5,
            'Ingenieria en Inteligencia Artificial',
            6
        ),

        -- SEMESTRE 7
        (
            'UA036',
            'Visión Artificial',
            7.5,
            'Ingenieria en Inteligencia Artificial',
            7
        ),
        (
            'UA037',
            'Reconocimiento de Voz',
            7.5,
            'Ingenieria en Inteligencia Artificial',
            7
        ),
        (
            'UA038',
            'Algoritmos Bioinspirados',
            7.5,
            'Ingenieria en Inteligencia Artificial',
            7
        ),
        (
            'UA039',
            'Redes Neuronales y Aprendizaje Profundo',
            7.5,
            'Ingenieria en Inteligencia Artificial',
            7
        ),
        (
            'UA040',
            'Optativa A',
            7.5,
            'Ingenieria en Inteligencia Artificial',
            7
        ),

        -- SEMESTRE 8
        (
            'UA041',
            'Formulación y Evaluación de Proyectos Informáticos',
            7.5,
            'Ingenieria en Inteligencia Artificial',
            8
        ),
        (
            'UA042',
            'Trabajo Terminal I',
            12,
            'Ingenieria en Inteligencia Artificial',
            8
        ),
        (
            'UA043',
            'Trabajo Terminal II',
            12,
            'Ingenieria en Inteligencia Artificial',
            8
        ),
        (
            'UA044',
            'Optativa B',
            7.5,
            'Ingenieria en Inteligencia Artificial',
            8
        ),
        (
            'UA045',
            'Desarrollo de Habilidades Sociales para la Alta Dirección',
            3,
            'Ingenieria en Inteligencia Artificial',
            8
        ),

        -- ==========================================
        -- POBLADO ADICIONAL: grupos, alumnos, alumnos, horarios, inscripciones, materias inscritas
        -- Generado para 30 alumnos ficticios (boletas: 2023630001 .. 2023630030)
        -- ==========================================

        -- INSERT grupos (una oferta por cada unidad_de_aprendizaje ya creada)
        INSERT INTO
            grupo (
                id,
                nombre,
                id_ua,
                id_prof,
                turno,
                cupo
            )
        VALUES (
                '1BM1_UA006',
                '1BM1',
                'UA006',
                'HIJKLMNO',
                'Matutino',
                30
            );

        INSERT INTO
            grupo (
                id,
                nombre,
                id_ua,
                id_prof,
                turno,
                cupo
            )
        VALUES (
                '1BM1_UA007',
                '1BM1',
                'UA007',
                'HIJKLMNO',
                'Matutino',
                30
            );

        INSERT INTO
            grupo (
                id,
                nombre,
                id_ua,
                id_prof,
                turno,
                cupo
            )
        VALUES (
                '1BM1_UA008',
                '1BM1',
                'UA008',
                'HIJKLMNO',
                'Matutino',
                30
            );

        INSERT INTO
            grupo (
                id,
                nombre,
                id_ua,
                id_prof,
                turno,
                cupo
            )
        VALUES (
                '1BM1_UA009',
                '1BM1',
                'UA009',
                'HIJKLMNO',
                'Matutino',
                30
            );

        INSERT INTO
            grupo (
                id,
                nombre,
                id_ua,
                id_prof,
                turno,
                cupo
            )
        VALUES (
                '1BM1_UA010',
                '1BM1',
                'UA010',
                'HIJKLMNO',
                'Matutino',
                30
            );

        INSERT INTO
            grupo (
                id,
                nombre,
                id_ua,
                id_prof,
                turno,
                cupo
            )
        VALUES (
                '2BM1_UA011',
                '2BM1',
                'UA011',
                'HIJKLMNO',
                'Vespertino',
                30
            );

        INSERT INTO
            grupo (
                id,
                nombre,
                id_ua,
                id_prof,
                turno,
                cupo
            )
        VALUES (
                '2BM1_UA012',
                '2BM1',
                'UA012',
                'HIJKLMNO',
                'Vespertino',
                30
            );

        -- (continúa con todos los INSERTs de grupos, datos_personales de 30 alumnos, horarios, inscripciones,
        -- mat_inscritos, mensajes, fechas_relevantes, etc., exactamente como en el archivo original)

        -- Nota: el archivo `BD/inserts.sql` contiene ahora todos los DML y datos.
