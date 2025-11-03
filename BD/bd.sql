DROP DATABASE IF EXISTS SAES;

CREATE DATABASE SAES;

USE SAES

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

create table datos_personales (
    id varchar(15) not null,
    contrasena varchar(200) not null,
    tipo_usuario varchar(15) not null,
    nombre varchar(25) not null,
    ape_paterno varchar(25) not null,
    ape_materno varchar(25) not null,
    fecha_nacimiento date not null,
    RFC varchar(50),
    tipo_sangre varchar(15) not null,
    CURP varchar(50) not null,
    nacionalidad varchar(50) not null,
    calle varchar(50) not null,
    num_exterior varchar(50) not null,
    num_interior varchar(50) not null,
    codigo_postal varchar(50) not null,
    colonia varchar(50) not null,
    delegacion varchar(50) not null,
    telefono varchar(50) not null,
    ciudad varchar(50) not null,
    email varchar(50) not null,
    foto BLOB,
    grado varchar(50),
    carrera varchar(40),
    situacion varchar(50),
    calificacion int,
    CONSTRAINT PK_USUARIOS PRIMARY KEY (id)
);

create table datos_medicos (
    id varchar(15) not null,
    id_usuario varchar(15) not null,
    peso float not null,
    altura float not null,
    tipo_sangre varchar(5) not null,
    nss varchar(30) not null,
    CONSTRAINT PK_DM PRIMARY KEY (id),
    CONSTRAINT FK_DM_DP FOREIGN KEY (id_usuario) REFERENCES datos_personales (id)
);

create table enfermedades (
    id varchar(15) not null,
    id_dat_med varchar(15) not null,
    descri varchar(500) not null,
    CONSTRAINT PK_E PRIMARY KEY (id),
    CONSTRAINT FK_E_DM FOREIGN KEY (id_dat_med) REFERENCES datos_medicos (id)
);

create table estudiante (
    id varchar(15) not null,
    id_usuario varchar(15) not null,
    promedio float not null,
    creditos_disponibles float not null,
    estado_academico varchar(50) not null,
    constraint PK_ES PRIMARY KEY (id),
    CONSTRAINT FK_ES_DP FOREIGN KEY (id_usuario) REFERENCES datos_personales (id)
);

create table carrera (
    nombre varchar(40) not null,
    creditos_iniciales int not null,
    prefijo_grupo varchar(10) not null,
    duracion_max int not null,
    CONSTRAINT PK_CAR PRIMARY KEY (nombre)
);

create table unidad_de_aprendizaje (
    id varchar(15) not null,
    nombre varchar(25) not null,
    credito float not null,
    carrera varchar(50),
    semestre int not null,
    CONSTRAINT PK_UA PRIMARY KEY (id),
    CONSTRAINT FK_UA_CAR FOREIGN KEY (carrera) REFERENCES carrera (nombre)
);

create table grupo (
    id varchar(15) not null,
    nombre varchar(25) not null,
    id_ua varchar(15) not null,
    id_prof varchar(15) not null,
    turno varchar(15) not null,
    cupo int not null,
    CONSTRAINT PK_GRU PRIMARY KEY (id),
    CONSTRAINT FK_GRU_DP FOREIGN KEY (id_prof) REFERENCES datos_personales (id),
    CONSTRAINT FK_GRU_UA FOREIGN KEY (id_ua) REFERENCES unidad_de_aprendizaje (id)
);

create table distribucion (
    id varchar(15) not null,
    id_grupo varchar(15) not null,
    hora_ini varchar(15) not null,
    hora_fin varchar(15) not null,
    dia varchar(15) not null,
    CONSTRAINT PK_DIS PRIMARY KEY (id),
    CONSTRAINT FK_DIS_GRU FOREIGN KEY (id_grupo) REFERENCES grupo (id)
);

create table horario (
    id varchar(15) not null,
    id_alumno varchar(15) not null,
    CONSTRAINT PK_HOR PRIMARY KEY (id),
    CONSTRAINT FK_HOR_DP FOREIGN KEY (id_alumno) REFERENCES datos_personales (id)
);

create table mat_inscritos (
    id varchar(15) not null,
    id_horario varchar(15) not null,
    id_grupo varchar(15) not null,
    calificacion float,
    CONSTRAINT PK_MAT PRIMARY KEY (id),
    CONSTRAINT FK_MAT_HOR FOREIGN KEY (id_horario) REFERENCES horario (id),
    CONSTRAINT FK_MAT_GRU FOREIGN KEY (id_grupo) REFERENCES grupo (id)
);

create table inscripcion (
    id varchar(15) not null,
    id_alumno varchar(15) not null,
    fecha_hora_in timestamp not null,
    fecha_hora_cad timestamp not null,
    CONSTRAINT PK_INS PRIMARY KEY (id),
    CONSTRAINT FK_INS_DP FOREIGN KEY (id_alumno) REFERENCES datos_personales (id)
);

create table resena (
    id varchar(15) not null,
    id_profesor varchar(15) not null,
    id_alumno varchar(15) not null,
    calificacion float not null,
    comentarios varchar(200),
    fecha date not null,
    CONSTRAINT PK_RE PRIMARY KEY (id),
    CONSTRAINT FK_RE_PRO FOREIGN KEY (id_profesor) REFERENCES datos_personales (id),
    CONSTRAINT FK_RE_ALU FOREIGN KEY (id_alumno) REFERENCES datos_personales (id)
);

create table kardex (
    id varchar(15) not null,
    id_alumno varchar(15) not null,
    promedio float not null,
    situacion_academica varchar(25) not null,
    semestres_restantes int not null,
    CONSTRAINT PK_KAR PRIMARY KEY (id),
    CONSTRAINT FK_KAR_DP FOREIGN KEY (id_alumno) REFERENCES datos_personales (id)
);

create table ua_aprobada (
    id varchar(15) not null,
    id_kardex varchar(15) not null,
    unidad_aprendizaje varchar(25) not null,
    calificacion_final float not null,
    semestre int not null,
    periodo varchar(25) not null,
    fecha date not null,
    metodo_aprobado varchar(15) not null,
    CONSTRAINT PK_UAA PRIMARY KEY (id),
    CONSTRAINT FK_UAA_KAR FOREIGN KEY (id_kardex) REFERENCES kardex (id)
);

create table borrador_horario (
    id varchar(15) not null,
    id_grupo varchar(15) not null,
    id_alumno varchar(15) not null,
    id_profesor varchar(15) not null,
    calificacion varchar(25) not null,
    materia varchar(25) not null,
    horas_lun varchar(50),
    horas_mar varchar(50),
    horas_mie varchar(50),
    horas_jue varchar(50),
    horas_vie varchar(50),
    creditos_necesarios float not null,
    valido tinyint(1),
    CONSTRAINT PK_BOR PRIMARY KEY (id),
    CONSTRAINT FK_BOR_DP FOREIGN KEY (id_alumno) REFERENCES datos_personales (id),
    CONSTRAINT FK_BOR_PRO FOREIGN KEY (id_profesor) REFERENCES datos_personales (id),
    CONSTRAINT FK_BOR_GRU FOREIGN KEY (id_grupo) REFERENCES grupo (id)
);

create table lista (
    id varchar(15) not null,
    id_inscrito varchar(15) not null,
    fecha date not null,
    asistencia varchar(15) not null,
    CONSTRAINT PK_LIS PRIMARY KEY (id),
    CONSTRAINT FK_LIS_MAI FOREIGN KEY (id_inscrito) REFERENCES mat_inscritos (id)
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
        "UAA001",
        "K2023631211",
        "Matematicas Discretas",
        9.0,
        1,
        "2024-1",
        "2024-06-10",
        "Ordinario"
    ),
    (
        "UAA002",
        "K2023631211",
        "Programacion I",
        8.5,
        2,
        "2024-2",
        "2024-12-15",
        "Ordinario"
    ),
    (
        "UAA003",
        "K2023631211",
        "Calculo",
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
    "Matematicas Discretas",
    9.3,
    1,
    "2024-1",
    "2024-06-10",
    "Ordinario"
),
(
    "UAA005",
    "K2023631212",
    "Programacion I",
    9.0,
    2,
    "2024-2",
    "2024-12-15",
    "Ordinario"
),
(
    "UAA006",
    "K2023631212",
    "Calculo",
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
    "Matematicas Discretas",
    7.9,
    1,
    "2024-1",
    "2024-06-10",
    "Extraordinario"
),
(
    "UAA008",
    "K2023631213",
    "Programacion I",
    8.2,
    2,
    "2024-2",
    "2024-12-15",
    "Ordinario"
),
(
    "UAA009",
    "K2023631213",
    "Calculo",
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