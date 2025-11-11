DROP DATABASE IF EXISTS SAES;

CREATE DATABASE SAES;

USE SAES;

DROP TABLE IF EXISTS datos_personales;

DROP TABLE IF EXISTS datos_medicos;

DROP TABLE IF EXISTS enfermedades;

DROP TABLE IF EXISTS estudiante;

DROP TABLE IF EXISTS unidad_de_aprendizaje;

DROP TABLE IF EXISTS grupo;

DROP TABLE IF EXISTS distribucion;

DROP TABLE IF EXISTS horario;

DROP TABLE IF EXISTS mat_inscritos;

DROP TABLE IF EXISTS inscripcion;

DROP TABLE IF EXISTS resena;

DROP TABLE IF EXISTS kardex;

DROP TABLE IF EXISTS ua_aprobada;

DROP TABLE IF EXISTS borrador_horario;

DROP TABLE IF EXISTS mensaje_chat;

DROP TABLE IF EXISTS contador;

DROP TABLE IF EXISTS materia_reprobada;

DROP TABLE IF EXISTS ets;

DROP TABLE IF EXISTS ets_grupo;
DROP TABLE IF EXISTS avisos;

DROP TABLE IF EXISTS fechas_relevantes;

CREATE TABLE datos_personales (
    id VARCHAR(15) NOT NULL,
    contrasena TEXT NOT NULL,
    tipo_usuario TEXT NOT NULL,
    nombre TEXT NOT NULL,
    ape_paterno TEXT NOT NULL,
    ape_materno TEXT NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    RFC TEXT,
    tipo_sangre TEXT NOT NULL,
    CURP TEXT NOT NULL,
    nacionalidad TEXT NOT NULL,
    calle TEXT NOT NULL,
    num_exterior TEXT NOT NULL,
    num_interior TEXT NOT NULL,
    codigo_postal TEXT NOT NULL,
    colonia TEXT NOT NULL,
    delegacion TEXT NOT NULL,
    telefono TEXT NOT NULL,
    ciudad TEXT NOT NULL,
    email TEXT NOT NULL,
    foto BLOB,
    grado TEXT,
    carrera TEXT,
    situacion TEXT,
    calificacion FLOAT,
    CONSTRAINT PK_USUARIOS PRIMARY KEY (id)
);

CREATE TABLE datos_medicos (
    id VARCHAR(15) NOT NULL,
    id_usuario VARCHAR(15) NOT NULL,
    peso FLOAT NOT NULL,
    altura FLOAT NOT NULL,
    tipo_sangre TEXT NOT NULL,
    nss TEXT NOT NULL,
    CONSTRAINT PK_DM PRIMARY KEY (id),
    CONSTRAINT FK_DM_DP FOREIGN KEY (id_usuario) REFERENCES datos_personales (id)
);

CREATE TABLE enfermedades (
    id VARCHAR(15) NOT NULL,
    id_dat_med VARCHAR(15) NOT NULL,
    descri TEXT NOT NULL,
    CONSTRAINT PK_E PRIMARY KEY (id),
    CONSTRAINT FK_E_DM FOREIGN KEY (id_dat_med) REFERENCES datos_medicos (id)
);

CREATE TABLE estudiante (
    id VARCHAR(15) NOT NULL,
    id_usuario VARCHAR(15) NOT NULL,
    promedio FLOAT NOT NULL,
    creditos_disponibles FLOAT NOT NULL,
    estado_academico TEXT NOT NULL,
    CONSTRAINT PK_ES PRIMARY KEY (id),
    CONSTRAINT FK_ES_DP FOREIGN KEY (id_usuario) REFERENCES datos_personales (id)
);

CREATE TABLE carrera (
    nombre VARCHAR(40) NOT NULL,
    creditos_iniciales INT NOT NULL,
    prefijo_grupo TEXT NOT NULL,
    duracion_max INT NOT NULL,
    CONSTRAINT PK_CAR PRIMARY KEY (nombre)
);

CREATE TABLE unidad_de_aprendizaje (
    id VARCHAR(15) NOT NULL,
    nombre TEXT NOT NULL,
    credito FLOAT NOT NULL,
    carrera VARCHAR(40),
    semestre INT NOT NULL,
    CONSTRAINT PK_UA PRIMARY KEY (id),
    CONSTRAINT FK_UA_CAR FOREIGN KEY (carrera) REFERENCES carrera (nombre)
);

CREATE TABLE grupo (
    id VARCHAR(15) NOT NULL,
    nombre TEXT NOT NULL,
    id_ua VARCHAR(15) NOT NULL,
    id_prof VARCHAR(15) NOT NULL,
    turno TEXT NOT NULL,
    cupo INT NOT NULL,
    CONSTRAINT PK_GRU PRIMARY KEY (id),
    CONSTRAINT FK_GRU_DP FOREIGN KEY (id_prof) REFERENCES datos_personales (id),
    CONSTRAINT FK_GRU_UA FOREIGN KEY (id_ua) REFERENCES unidad_de_aprendizaje (id)
);

CREATE TABLE distribucion (
    id VARCHAR(15) NOT NULL,
    id_grupo VARCHAR(15) NOT NULL,
    hora_ini TEXT NOT NULL,
    hora_fin TEXT NOT NULL,
    dia TEXT NOT NULL,
    CONSTRAINT PK_DIS PRIMARY KEY (id),
    CONSTRAINT FK_DIS_GRU FOREIGN KEY (id_grupo) REFERENCES grupo (id)
);

CREATE TABLE horario (
    id VARCHAR(15) NOT NULL,
    id_alumno VARCHAR(15) NOT NULL,
    CONSTRAINT PK_HOR PRIMARY KEY (id),
    CONSTRAINT FK_HOR_DP FOREIGN KEY (id_alumno) REFERENCES datos_personales (id)
);

CREATE TABLE mat_inscritos (
    id VARCHAR(15) NOT NULL,
    id_horario VARCHAR(15) NOT NULL,
    id_grupo VARCHAR(15) NOT NULL,
    calificacion FLOAT,
    CONSTRAINT PK_MAT PRIMARY KEY (id),
    CONSTRAINT FK_MAT_HOR FOREIGN KEY (id_horario) REFERENCES horario (id),
    CONSTRAINT FK_MAT_GRU FOREIGN KEY (id_grupo) REFERENCES grupo (id)
);

CREATE TABLE inscripcion (
    id VARCHAR(15) NOT NULL,
    id_alumno VARCHAR(15) NOT NULL,
    fecha_hora_in TIMESTAMP NOT NULL,
    fecha_hora_cad TIMESTAMP NOT NULL,
    CONSTRAINT PK_INS PRIMARY KEY (id),
    CONSTRAINT FK_INS_DP FOREIGN KEY (id_alumno) REFERENCES datos_personales (id)
);

CREATE TABLE resena (
    id VARCHAR(15) NOT NULL,
    id_profesor VARCHAR(15) NOT NULL,
    id_alumno VARCHAR(15) NOT NULL,
    calificacion FLOAT NOT NULL,
    comentarios TEXT,
    fecha DATE NOT NULL,
    CONSTRAINT PK_RE PRIMARY KEY (id),
    CONSTRAINT FK_RE_PRO FOREIGN KEY (id_profesor) REFERENCES datos_personales (id),
    CONSTRAINT FK_RE_ALU FOREIGN KEY (id_alumno) REFERENCES datos_personales (id)
);

CREATE TABLE kardex (
    id VARCHAR(15) NOT NULL,
    id_alumno VARCHAR(15) NOT NULL,
    promedio FLOAT NOT NULL,
    situacion_academica TEXT NOT NULL,
    semestres_restantes INT NOT NULL,
    CONSTRAINT PK_KAR PRIMARY KEY (id),
    CONSTRAINT FK_KAR_DP FOREIGN KEY (id_alumno) REFERENCES datos_personales (id)
);

CREATE TABLE ua_aprobada (
    id VARCHAR(15) NOT NULL,
    id_kardex VARCHAR(15) NOT NULL,
    unidad_aprendizaje TEXT NOT NULL,
    calificacion_final FLOAT NOT NULL,
    semestre INT NOT NULL,
    periodo TEXT NOT NULL,
    fecha DATE NOT NULL,
    metodo_aprobado TEXT NOT NULL,
    CONSTRAINT PK_UAA PRIMARY KEY (id),
    CONSTRAINT FK_UAA_KAR FOREIGN KEY (id_kardex) REFERENCES kardex (id)
);

CREATE TABLE borrador_horario (
    id VARCHAR(15) NOT NULL,
    id_grupo VARCHAR(15) NOT NULL,
    id_alumno VARCHAR(15) NOT NULL,
    id_profesor VARCHAR(15) NOT NULL,
    calificacion TEXT NOT NULL,
    materia TEXT NOT NULL,
    horas_lun TEXT,
    horas_mar TEXT,
    horas_mie TEXT,
    horas_jue TEXT,
    horas_vie TEXT,
    creditos_necesarios FLOAT NOT NULL,
    valido TINYINT(1),
    CONSTRAINT PK_BOR PRIMARY KEY (id),
    CONSTRAINT FK_BOR_DP FOREIGN KEY (id_alumno) REFERENCES datos_personales (id),
    CONSTRAINT FK_BOR_PRO FOREIGN KEY (id_profesor) REFERENCES datos_personales (id),
    CONSTRAINT FK_BOR_GRU FOREIGN KEY (id_grupo) REFERENCES grupo (id)
);

CREATE TABLE lista (
    id VARCHAR(15) NOT NULL,
    id_inscrito VARCHAR(15) NOT NULL,
    fecha DATE NOT NULL,
    asistencia TEXT NOT NULL,
    CONSTRAINT PK_LIS PRIMARY KEY (id),
    CONSTRAINT FK_LIS_MAI FOREIGN KEY (id_inscrito) REFERENCES mat_inscritos (id)
);

CREATE TABLE mensaje_chat (
    id VARCHAR(15) NOT NULL,
    id_usuario VARCHAR(15) NOT NULL,
    fecha DATETIME NOT NULL,
    pregunta_realizada TEXT NOT NULL,
    respuesta_obtenida TEXT,
    CONSTRAINT PK_MEN PRIMARY KEY (id),
    CONSTRAINT FK_MEN_DP FOREIGN KEY (id_usuario) REFERENCES datos_personales (id)
);

CREATE TABLE contador (
    id_profesor VARCHAR(15) NOT NULL,
    suma INTEGER NOT NULL,
    registrados INTEGER NOT NULL,
    CONSTRAINT FK_CON_DP FOREIGN KEY (id_profesor) REFERENCES datos_personales (id)
);

create table materia_reprobada (
    id VARCHAR(15) NOT NULL,
    id_estudiante VARCHAR(15) NOT NULL,
    id_ua VARCHAR(15) NOT NULL,
    periodos_restantes integer not null,
    recurse integer not null,
    estado_actual TEXT NOT NULL,
    CONSTRAINT PK_MR PRIMARY KEY (id),
    CONSTRAINT FK_MR_ES FOREIGN KEY (id_estudiante) REFERENCES estudiante (id),
    CONSTRAINT FK_MR_UA FOREIGN KEY (id_ua) REFERENCES unidad_de_aprendizaje (id)
);

create table ets_grupo (
    id VARCHAR(15) NOT NULL,
    id_ua VARCHAR(15) NOT NULL,
    id_aplicante VARCHAR(15) NOT NULL,
    turno TEXT NOT NULL,
    hora_inicio TEXT NOT NULL,
    hora_final TEXT NOT NULL,
    fecha DATE NOT NULL,
    CONSTRAINT PK_ETS_G PRIMARY KEY (id),
    CONSTRAINT FK_ETSG_UA FOREIGN KEY (id_ua) REFERENCES unidad_de_aprendizaje (id),
    CONSTRAINT FK_ETSG_DP FOREIGN KEY (id_aplicante) REFERENCES datos_personales (id)
);

create table ets (
    id VARCHAR(15) NOT NULL,
    id_mr VARCHAR(15) NOT NULL,
    id_grupo VARCHAR(15) NOT NULL,
    comprobante LONGBLOB,
    validado INTEGER NOT NULL,
    calificado FLOAT NOT NULL,
    CONSTRAINT PK_ETS PRIMARY KEY (id),
    CONSTRAINT FK_ETS_MR FOREIGN KEY (id_mr) REFERENCES materia_reprobada (id),
    CONSTRAINT FK_ETS_AP FOREIGN KEY (id_grupo) REFERENCES ets_grupo (id)
CREATE TABLE avisos (
    id VARCHAR(15) NOT NULL,
    titulo TEXT NOT NULL,
    descripcion TEXT NOT NULL,
    fecha_vencimiento DATETIME NOT NULL,
    CONSTRAINT PK_AVI PRIMARY KEY (id)
);

CREATE TABLE fechas_relevantes (
    inicio_semestre DATETIME NOT NULL,
    fin_semestre DATETIME NOT NULL,
    registro_primer_parcial DATETIME NOT NULL,
    registro_segundo_parcial DATETIME NOT NULL,
    registro_tercer_parcial DATETIME NOT NULL,
    registro_final DATETIME NOT NULL,
    evalu_profe DATETIME NOT NULL,
    subir_doc_ets DATETIME NOT NULL,
    cal_ets DATETIME NOT NULL
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
        "Ingenieria en Sistemas Computacionales"
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
        "Ingenieria en Sistemas Computacionales"
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
        "Ingenieria en Sistemas Computacionales"
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
);

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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
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
        calificacion
    )
VALUES (
        'M0050',
        'HOR2023630013',
        '5BM1_UA027',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0051',
        'HOR2023630013',
        '5BM1_UA028',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0052',
        'HOR2023630013',
        '5BM1_UA029',
        NULL
    );

INSERT INTO
    horario (id, id_alumno)
VALUES ('HOR2023630014', '2023630014');

INSERT INTO
    inscripcion (
        id,
        id_alumno,
        fecha_hora_in,
        fecha_hora_cad
    )
VALUES (
        'INS2023630014',
        '2023630014',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0053',
        'HOR2023630014',
        '6BM1_UA031',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0054',
        'HOR2023630014',
        '6BM1_UA032',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0055',
        'HOR2023630014',
        '6BM1_UA033',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0056',
        'HOR2023630014',
        '6BM1_UA034',
        NULL
    );

INSERT INTO
    horario (id, id_alumno)
VALUES ('HOR2023630015', '2023630015');

INSERT INTO
    inscripcion (
        id,
        id_alumno,
        fecha_hora_in,
        fecha_hora_cad
    )
VALUES (
        'INS2023630015',
        '2023630015',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0057',
        'HOR2023630015',
        '7BM1_UA036',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0058',
        'HOR2023630015',
        '7BM1_UA037',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0059',
        'HOR2023630015',
        '7BM1_UA038',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0060',
        'HOR2023630015',
        '7BM1_UA039',
        NULL
    );

INSERT INTO
    horario (id, id_alumno)
VALUES ('HOR2023630016', '2023630016');

INSERT INTO
    inscripcion (
        id,
        id_alumno,
        fecha_hora_in,
        fecha_hora_cad
    )
VALUES (
        'INS2023630016',
        '2023630016',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0061',
        'HOR2023630016',
        '8BM1_UA041',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0062',
        'HOR2023630016',
        '8BM1_UA042',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0063',
        'HOR2023630016',
        '8BM1_UA043',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0064',
        'HOR2023630016',
        '8BM1_UA044',
        NULL
    );

INSERT INTO
    horario (id, id_alumno)
VALUES ('HOR2023630017', '2023630017');

INSERT INTO
    inscripcion (
        id,
        id_alumno,
        fecha_hora_in,
        fecha_hora_cad
    )
VALUES (
        'INS2023630017',
        '2023630017',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0065',
        'HOR2023630017',
        '1BM1_UA006',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0066',
        'HOR2023630017',
        '1BM1_UA007',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0067',
        'HOR2023630017',
        '1BM1_UA008',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0068',
        'HOR2023630017',
        '1BM1_UA009',
        NULL
    );

INSERT INTO
    horario (id, id_alumno)
VALUES ('HOR2023630018', '2023630018');

INSERT INTO
    inscripcion (
        id,
        id_alumno,
        fecha_hora_in,
        fecha_hora_cad
    )
VALUES (
        'INS2023630018',
        '2023630018',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0069',
        'HOR2023630018',
        '2BM1_UA011',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0070',
        'HOR2023630018',
        '2BM1_UA012',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0071',
        'HOR2023630018',
        '2BM1_UA013',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0072',
        'HOR2023630018',
        '2BM1_UA014',
        NULL
    );

INSERT INTO
    horario (id, id_alumno)
VALUES ('HOR2023630019', '2023630019');

INSERT INTO
    inscripcion (
        id,
        id_alumno,
        fecha_hora_in,
        fecha_hora_cad
    )
VALUES (
        'INS2023630019',
        '2023630019',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0073',
        'HOR2023630019',
        '3BM1_UA016',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0074',
        'HOR2023630019',
        '3BM1_UA017',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0075',
        'HOR2023630019',
        '3BM1_UA018',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0076',
        'HOR2023630019',
        '3BM1_UA019',
        NULL
    );

INSERT INTO
    horario (id, id_alumno)
VALUES ('HOR2023630020', '2023630020');

INSERT INTO
    inscripcion (
        id,
        id_alumno,
        fecha_hora_in,
        fecha_hora_cad
    )
VALUES (
        'INS2023630020',
        '2023630020',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0077',
        'HOR2023630020',
        '4BM1_UA021',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0078',
        'HOR2023630020',
        '4BM1_UA022',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0079',
        'HOR2023630020',
        '4BM1_UA023',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0080',
        'HOR2023630020',
        '4BM1_UA024',
        NULL
    );

INSERT INTO
    horario (id, id_alumno)
VALUES ('HOR2023630021', '2023630021');

INSERT INTO
    inscripcion (
        id,
        id_alumno,
        fecha_hora_in,
        fecha_hora_cad
    )
VALUES (
        'INS2023630021',
        '2023630021',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0081',
        'HOR2023630021',
        '5BM1_UA026',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0082',
        'HOR2023630021',
        '5BM1_UA027',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0083',
        'HOR2023630021',
        '5BM1_UA028',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0084',
        'HOR2023630021',
        '5BM1_UA029',
        NULL
    );

INSERT INTO
    horario (id, id_alumno)
VALUES ('HOR2023630022', '2023630022');

INSERT INTO
    inscripcion (
        id,
        id_alumno,
        fecha_hora_in,
        fecha_hora_cad
    )
VALUES (
        'INS2023630022',
        '2023630022',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0085',
        'HOR2023630022',
        '6BM1_UA031',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0086',
        'HOR2023630022',
        '6BM1_UA032',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0087',
        'HOR2023630022',
        '6BM1_UA033',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0088',
        'HOR2023630022',
        '6BM1_UA034',
        NULL
    );

INSERT INTO
    horario (id, id_alumno)
VALUES ('HOR2023630023', '2023630023');

INSERT INTO
    inscripcion (
        id,
        id_alumno,
        fecha_hora_in,
        fecha_hora_cad
    )
VALUES (
        'INS2023630023',
        '2023630023',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0089',
        'HOR2023630023',
        '7BM1_UA036',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0090',
        'HOR2023630023',
        '7BM1_UA037',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0091',
        'HOR2023630023',
        '7BM1_UA038',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0092',
        'HOR2023630023',
        '7BM1_UA039',
        NULL
    );

INSERT INTO
    horario (id, id_alumno)
VALUES ('HOR2023630024', '2023630024');

INSERT INTO
    inscripcion (
        id,
        id_alumno,
        fecha_hora_in,
        fecha_hora_cad
    )
VALUES (
        'INS2023630024',
        '2023630024',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0093',
        'HOR2023630024',
        '8BM1_UA041',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0094',
        'HOR2023630024',
        '8BM1_UA042',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0095',
        'HOR2023630024',
        '8BM1_UA043',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0096',
        'HOR2023630024',
        '8BM1_UA044',
        NULL
    );

INSERT INTO
    horario (id, id_alumno)
VALUES ('HOR2023630025', '2023630025');

INSERT INTO
    inscripcion (
        id,
        id_alumno,
        fecha_hora_in,
        fecha_hora_cad
    )
VALUES (
        'INS2023630025',
        '2023630025',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0097',
        'HOR2023630025',
        '1BM1_UA006',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0098',
        'HOR2023630025',
        '1BM1_UA007',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0099',
        'HOR2023630025',
        '1BM1_UA008',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0100',
        'HOR2023630025',
        '1BM1_UA009',
        NULL
    );

INSERT INTO
    horario (id, id_alumno)
VALUES ('HOR2023630026', '2023630026');

INSERT INTO
    inscripcion (
        id,
        id_alumno,
        fecha_hora_in,
        fecha_hora_cad
    )
VALUES (
        'INS2023630026',
        '2023630026',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0101',
        'HOR2023630026',
        '2BM1_UA011',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0102',
        'HOR2023630026',
        '2BM1_UA012',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0103',
        'HOR2023630026',
        '2BM1_UA013',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0104',
        'HOR2023630026',
        '2BM1_UA014',
        NULL
    );

INSERT INTO
    horario (id, id_alumno)
VALUES ('HOR2023630027', '2023630027');

INSERT INTO
    inscripcion (
        id,
        id_alumno,
        fecha_hora_in,
        fecha_hora_cad
    )
VALUES (
        'INS2023630027',
        '2023630027',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0105',
        'HOR2023630027',
        '3BM1_UA016',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0106',
        'HOR2023630027',
        '3BM1_UA017',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0107',
        'HOR2023630027',
        '3BM1_UA018',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0108',
        'HOR2023630027',
        '3BM1_UA019',
        NULL
    );

INSERT INTO
    horario (id, id_alumno)
VALUES ('HOR2023630028', '2023630028');

INSERT INTO
    inscripcion (
        id,
        id_alumno,
        fecha_hora_in,
        fecha_hora_cad
    )
VALUES (
        'INS2023630028',
        '2023630028',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0109',
        'HOR2023630028',
        '4BM1_UA021',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0110',
        'HOR2023630028',
        '4BM1_UA022',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0111',
        'HOR2023630028',
        '4BM1_UA023',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0112',
        'HOR2023630028',
        '4BM1_UA024',
        NULL
    );

INSERT INTO
    horario (id, id_alumno)
VALUES ('HOR2023630029', '2023630029');

INSERT INTO
    inscripcion (
        id,
        id_alumno,
        fecha_hora_in,
        fecha_hora_cad
    )
VALUES (
        'INS2023630029',
        '2023630029',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0113',
        'HOR2023630029',
        '5BM1_UA026',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0114',
        'HOR2023630029',
        '5BM1_UA027',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0115',
        'HOR2023630029',
        '5BM1_UA028',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0116',
        'HOR2023630029',
        '5BM1_UA029',
        NULL
    );

INSERT INTO
    horario (id, id_alumno)
VALUES ('HOR2023630030', '2023630030');

INSERT INTO
    inscripcion (
        id,
        id_alumno,
        fecha_hora_in,
        fecha_hora_cad
    )
VALUES (
        'INS2023630030',
        '2023630030',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0117',
        'HOR2023630030',
        '6BM1_UA031',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0118',
        'HOR2023630030',
        '6BM1_UA032',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0119',
        'HOR2023630030',
        '6BM1_UA033',
        NULL
    );

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion
    )
VALUES (
        'M0120',
        'HOR2023630030',
        '6BM1_UA034',
        NULL
    );

INSERT INTO
    mensaje_chat (
        id,
        id_usuario,
        fecha,
        pregunta_realizada,
        respuesta_obtenida
    )
VALUES (
        'CHAT001',
        '2023630001',
        '2025-01-15 09:30:00',
        '¿Cuándo inicia el periodo de inscripciones?',
        'El periodo de inscripciones inicia el 20 de enero de 2025 y finaliza el 5 de febrero de 2025.'
    ),
    (
        'CHAT002',
        '2023630001',
        '2025-01-15 09:32:00',
        '¿Cuántos créditos tengo disponibles?',
        'Actualmente no tienes créditos disponibles. Tus créditos disponibles son: 0. Te recomiendo consultar con tu coordinación académica.'
    ),
    (
        'CHAT003',
        '2023630001',
        '2025-01-16 14:20:00',
        '¿Cuáles son mis materias inscritas este semestre?',
        'Tus materias inscritas son: Fundamentos de Programación, Matemáticas Discretas, Cálculo y Comunicación Oral y Escrita.'
    ),
    (
        'CHAT004',
        '2023630001',
        '2025-01-16 14:25:00',
        '¿Cuál es mi horario de clases?',
        'Puedes consultar tu horario completo en la sección "Horarios" del menú principal. Todas tus clases están programadas en turno matutino.'
    ),
    (
        'CHAT005',
        '2023630001',
        '2025-01-17 10:15:00',
        '¿Tengo riesgo de dictamen?',
        'No cuentas con información de riesgo de dictamen en este momento. Mantén un promedio superior a 7.0 para evitar problemas académicos.'
    ),
    (
        'CHAT006',
        '2023630001',
        '2025-01-17 10:18:00',
        '¿Cómo puedo dar de baja una materia?',
        'Para dar de baja una materia debes acudir a tu coordinación académica durante el periodo de bajas (primeras 3 semanas del semestre) con tu justificación correspondiente.'
    ),
    (
        'CHAT007',
        '2023630001',
        '2025-01-18 11:45:00',
        '¿Dónde puedo consultar mi kardex?',
        'Puedes consultar tu kardex en la sección "Kardex" del menú principal de este sistema.'
    ),
    (
        'CHAT008',
        '2023630001',
        '2025-01-18 11:48:00',
        '¿Cuál es la calificación mínima aprobatoria?',
        'La calificación mínima aprobatoria es 6.0 (seis punto cero). Cualquier calificación menor se considera reprobatoria.'
    ),
    (
        'CHAT009',
        '2023630001',
        '2025-01-19 16:30:00',
        '¿Puedo inscribir materias de semestres superiores?',
        'Sí, puedes inscribir materias de semestres superiores siempre y cuando hayas aprobado los prerrequisitos correspondientes y tengas créditos disponibles.'
    ),
    (
        'CHAT010',
        '2023630001',
        '2025-01-19 16:35:00',
        'Gracias por la información',
        '¡De nada! Estoy aquí para ayudarte. Si tienes más preguntas sobre tu situación académica, no dudes en consultarme.'
    );

INSERT INTO fechas_relevantes (
    inicio_semestre,
    fin_semestre,
    registro_primer_parcial,
    registro_segundo_parcial,
    registro_tercer_parcial,
    registro_final,
    evalu_profe,
    subir_doc_ets,
    cal_ets
) VALUES (
    '2025-08-01 00:00:00',
    '2025-12-20 00:00:00',
    '2025-09-15 00:00:00',
    '2025-10-15 00:00:00',
    '2025-11-15 00:00:00',
    '2025-12-10 00:00:00',
    '2025-11-12 00:00:00',  -- fecha de evaluacion de profesores
    '2025-12-01 00:00:00',
    '2025-12-15 00:00:00'
);

select * from datos_personales;