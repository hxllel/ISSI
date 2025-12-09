-- ==================================================
-- Inscripciones y Semestre Actual
-- ==================================================
-- Descripción: Inserta registros de inscripciones y materias del semestre actual
-- Orden de ejecución: 6
-- Prerequisito: Ejecutar 06_alumnos.sql
-- ==================================================

USE SAES;

-- ==================================================================
-- 6. INSERCIÓN DE UA APROBADA (HISTORIAL ACADÉMICO REALISTA)
-- Se incluye historial para alumnos de 3er semestre en adelante.
-- ==================================================================
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
VALUES (
        'UAA0001',
        'K2023630107',
        'Fundamentos de Programación',
        8.9,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0002',
        'K2023630107',
        'Matemáticas Discretas',
        8.8,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0003',
        'K2023630107',
        'Cálculo',
        7.9,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0004',
        'K2023630107',
        'Comunicación Oral y Escrita',
        9.4,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0005',
        'K2023630107',
        'Fundamentos Económicos',
        8.7,
        1,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0006',
        'K2023630107',
        'Algoritmos y Estructuras de Datos',
        9.1,
        2,
        '2024-2',
        '2024-12-20',
        'Ordinario'
    ),
    (
        'UAA0007',
        'K2023630107',
        'Álgebra Lineal',
        8.5,
        2,
        '2024-2',
        '2024-12-20',
        'Ordinario'
    ),
    (
        'UAA0008',
        'K2023630107',
        'Mecánica y Electromagnetismo',
        7.3,
        2,
        '2024-2',
        '2024-12-20',
        'Extraordinario'
    ),
    (
        'UAA0009',
        'K2023630107',
        'Ingeniería, Ética y Sociedad',
        9.8,
        2,
        '2024-2',
        '2024-12-20',
        'Ordinario'
    ),
    (
        'UAA0010',
        'K2023630107',
        'Liderazgo Personal',
        8.0,
        2,
        '2024-2',
        '2024-12-20',
        'Ordinario'
    ),
    (
        'UAA0011',
        'K2022630208',
        'Fundamentos de Programación',
        9.5,
        1,
        '2023-1',
        '2023-06-20',
        'Ordinario'
    ),
    (
        'UAA0012',
        'K2022630208',
        'Matemáticas Discretas',
        9.2,
        1,
        '2023-1',
        '2023-06-20',
        'Ordinario'
    ),
    (
        'UAA0013',
        'K2022630208',
        'Cálculo',
        8.1,
        1,
        '2023-1',
        '2023-06-20',
        'Ordinario'
    ),
    (
        'UAA0014',
        'K2022630208',
        'Comunicación Oral y Escrita',
        9.8,
        1,
        '2023-06-20',
        '2023-06-20',
        'Ordinario'
    ),
    (
        'UAA0015',
        'K2022630208',
        'Introducción a la Ciencia de Datos',
        7.7,
        1,
        '2023-1',
        '2023-06-20',
        'Ordinario'
    ),
    (
        'UAA0016',
        'K2022630208',
        'Algoritmos y Estructuras de Datos',
        8.5,
        2,
        '2023-2',
        '2023-12-20',
        'Ordinario'
    ),
    (
        'UAA0017',
        'K2022630208',
        'Álgebra Lineal',
        7.4,
        2,
        '2023-2',
        '2023-12-20',
        'Extraordinario'
    ),
    (
        'UAA0018',
        'K2022630208',
        'Cálculo Multivariable',
        9.0,
        2,
        '2023-2',
        '2023-12-20',
        'Ordinario'
    ),
    (
        'UAA0019',
        'K2022630208',
        'Ética y Legalidad',
        8.8,
        2,
        '2023-2',
        '2023-12-20',
        'Ordinario'
    ),
    (
        'UAA0020',
        'K2022630208',
        'Fundamentos Económicos',
        8.6,
        2,
        '2023-2',
        '2023-12-20',
        'Ordinario'
    ),
    (
        'UAA0021',
        'K2022630208',
        'Análisis y Diseño de Algoritmos',
        8.1,
        3,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0022',
        'K2022630208',
        'Programación para Ciencia de Datos',
        7.8,
        3,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0023',
        'K2022630208',
        'Probabilidad',
        9.3,
        3,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0024',
        'K2022630208',
        'Bases de Datos',
        8.9,
        3,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0025',
        'K2022630208',
        'Métodos Numéricos',
        8.2,
        3,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0026',
        'K2022630208',
        'Finanzas Empresariales',
        9.7,
        3,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0027',
        'K2022630208',
        'Desarrollo de Aplicaciones Web',
        8.5,
        4,
        '2024-2',
        '2024-12-20',
        'Ordinario'
    ),
    (
        'UAA0028',
        'K2022630208',
        'Cómputo de Alto Desempeño',
        8.1,
        4,
        '2024-2',
        '2024-12-20',
        'Ordinario'
    ),
    (
        'UAA0029',
        'K2022630208',
        'Estadística',
        7.0,
        4,
        '2024-2',
        '2024-12-20',
        'Extraordinario'
    ),
    (
        'UAA0030',
        'K2022630208',
        'Base de Datos Avanzadas',
        8.6,
        4,
        '2024-2',
        '2024-12-20',
        'Ordinario'
    ),
    (
        'UAA0031',
        'K2022630208',
        'Desarrollo de Aplicaciones para Análisis de Datos',
        9.1,
        4,
        '2024-2',
        '2024-12-20',
        'Ordinario'
    ),
    (
        'UAA0032',
        'K2022630208',
        'Liderazgo Personal',
        8.3,
        4,
        '2024-2',
        '2024-12-20',
        'Ordinario'
    ),
    (
        'UAA0033',
        'K2021630309',
        'Fundamentos de Programación',
        8.0,
        1,
        '2022-1',
        '2022-06-20',
        'Ordinario'
    ),
    (
        'UAA0034',
        'K2021630309',
        'Matemáticas Discretas',
        7.5,
        1,
        '2022-1',
        '2022-06-20',
        'Ordinario'
    ),
    (
        'UAA0035',
        'K2021630309',
        'Cálculo',
        9.9,
        1,
        '2022-1',
        '2022-06-20',
        'Ordinario'
    ),
    (
        'UAA0036',
        'K2021630309',
        'Análisis Vectorial',
        8.4,
        1,
        '2022-1',
        '2022-06-20',
        'Ordinario'
    ),
    (
        'UAA0037',
        'K2021630309',
        'Comunicación Oral y Escrita',
        9.2,
        1,
        '2022-1',
        '2022-06-20',
        'Ordinario'
    ),
    (
        'UAA0038',
        'K2021630309',
        'Álgebra Lineal',
        8.7,
        2,
        '2022-2',
        '2022-12-20',
        'Ordinario'
    ),
    (
        'UAA0039',
        'K2021630309',
        'Cálculo Aplicado',
        7.0,
        2,
        '2022-2',
        '2022-12-20',
        'Extraordinario'
    ),
    (
        'UAA0040',
        'K2021630309',
        'Mecánica y Electromagnetismo',
        7.8,
        2,
        '2022-2',
        '2022-12-20',
        'Ordinario'
    ),
    (
        'UAA0041',
        'K2021630309',
        'Ingeniería, Ética y Sociedad',
        9.6,
        2,
        '2022-2',
        '2022-12-20',
        'Ordinario'
    ),
    (
        'UAA0042',
        'K2021630309',
        'Fundamentos Económicos',
        8.3,
        2,
        '2022-2',
        '2022-12-20',
        'Ordinario'
    ),
    (
        'UAA0043',
        'K2021630309',
        'Algoritmos y Estructuras de Datos',
        9.1,
        2,
        '2022-2',
        '2022-12-20',
        'Ordinario'
    ),
    (
        'UAA0044',
        'K2021630309',
        'Ecuaciones Diferenciales',
        8.6,
        3,
        '2023-1',
        '2023-06-20',
        'Ordinario'
    ),
    (
        'UAA0045',
        'K2021630309',
        'Circuitos Eléctricos',
        7.5,
        3,
        '2023-1',
        '2023-06-20',
        'Ordinario'
    ),
    (
        'UAA0046',
        'K2021630309',
        'Fundamentos de Diseño Digital',
        7.2,
        3,
        '2023-1',
        '2023-06-20',
        'Recurse'
    ),
    (
        'UAA0047',
        'K2021630309',
        'Bases de Datos',
        9.0,
        3,
        '2023-1',
        '2023-06-20',
        'Ordinario'
    ),
    (
        'UAA0048',
        'K2021630309',
        'Finanzas Empresariales',
        8.1,
        3,
        '2023-1',
        '2023-06-20',
        'Ordinario'
    ),
    (
        'UAA0049',
        'K2021630309',
        'Paradigmas de Programación',
        7.7,
        3,
        '2023-1',
        '2023-06-20',
        'Ordinario'
    ),
    (
        'UAA0050',
        'K2021630309',
        'Análisis y Diseño de Algoritmos',
        8.5,
        3,
        '2023-1',
        '2023-06-20',
        'Ordinario'
    ),
    (
        'UAA0051',
        'K2021630309',
        'Probabilidad y Estadística',
        8.2,
        4,
        '2023-2',
        '2023-12-20',
        'Ordinario'
    ),
    (
        'UAA0052',
        'K2021630309',
        'Matemáticas Avanzadas para la Ingeniería',
        7.6,
        4,
        '2023-2',
        '2023-12-20',
        'Ordinario'
    ),
    (
        'UAA0053',
        'K2021630309',
        'Electrónica Analógica',
        8.8,
        4,
        '2023-2',
        '2023-12-20',
        'Ordinario'
    ),
    (
        'UAA0054',
        'K2021630309',
        'Diseño de Sistemas Digitales',
        9.3,
        4,
        '2023-2',
        '2023-12-20',
        'Ordinario'
    ),
    (
        'UAA0055',
        'K2021630309',
        'Tecnologías para el Desarrollo de Aplicaciones Web',
        8.0,
        4,
        '2023-2',
        '2023-12-20',
        'Ordinario'
    ),
    (
        'UAA0056',
        'K2021630309',
        'Sistemas Operativos',
        7.5,
        4,
        '2023-2',
        '2023-12-20',
        'Ordinario'
    ),
    (
        'UAA0057',
        'K2021630309',
        'Teoría de la Computación',
        8.7,
        4,
        '2023-2',
        '2023-12-20',
        'Ordinario'
    ),
    (
        'UAA0058',
        'K2021630309',
        'Procesamiento Digital de Señales',
        8.4,
        5,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0059',
        'K2021630309',
        'Instrumentación y Control',
        7.8,
        5,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0060',
        'K2021630309',
        'Arquitectura de Computadoras',
        9.1,
        5,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0061',
        'K2021630309',
        'Análisis y Diseño de Sistemas',
        8.2,
        5,
        '2024-06-20',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0062',
        'K2021630309',
        'Formulación y Evaluación de Proyectos Informáticos',
        7.0,
        5,
        '2024-1',
        '2024-06-20',
        'Extraordinario'
    ),
    (
        'UAA0063',
        'K2021630309',
        'Compiladores',
        8.9,
        5,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0064',
        'K2021630309',
        'Redes de Computadoras',
        8.5,
        5,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0065',
        'K2021630309',
        'Sistemas en Chip',
        8.7,
        6,
        '2024-2',
        '2024-12-20',
        'Ordinario'
    ),
    (
        'UAA0068',
        'K2021630309',
        'Métodos Cuantitativos para la Toma de Decisiones',
        8.1,
        6,
        '2024-2',
        '2024-12-20',
        'Ordinario'
    ),
    (
        'UAA0069',
        'K2021630309',
        'Ingeniería de Software',
        9.0,
        6,
        '2024-2',
        '2024-12-20',
        'Ordinario'
    ),
    (
        'UAA0070',
        'K2021630309',
        'Inteligencia Artificial',
        7.4,
        6,
        '2024-2',
        '2024-12-20',
        'Extraordinario'
    ),
    (
        'UAA0071',
        'K2021630309',
        'Aplicaciones para Comunicaciones en Red',
        8.6,
        6,
        '2024-2',
        '2024-12-20',
        'Ordinario'
    ),
    -- Alumno 2021630310 (ISC - 8vo semestre) - Historial completo de semestres 1-7
    -- Semestre 1
    (
        'UAA0072',
        'K2021630310',
        'Fundamentos de Programación',
        8.2,
        1,
        '2022-1',
        '2022-06-20',
        'Ordinario'
    ),
    (
        'UAA0073',
        'K2021630310',
        'Matemáticas Discretas',
        7.8,
        1,
        '2022-1',
        '2022-06-20',
        'Ordinario'
    ),
    (
        'UAA0074',
        'K2021630310',
        'Cálculo',
        8.9,
        1,
        '2022-1',
        '2022-06-20',
        'Ordinario'
    ),
    (
        'UAA0075',
        'K2021630310',
        'Análisis Vectorial',
        8.1,
        1,
        '2022-1',
        '2022-06-20',
        'Ordinario'
    ),
    (
        'UAA0076',
        'K2021630310',
        'Comunicación Oral y Escrita',
        9.0,
        1,
        '2022-1',
        '2022-06-20',
        'Ordinario'
    ),
    -- Semestre 2
    (
        'UAA0077',
        'K2021630310',
        'Álgebra Lineal',
        8.6,
        2,
        '2022-2',
        '2022-12-20',
        'Ordinario'
    ),
    (
        'UAA0078',
        'K2021630310',
        'Cálculo Aplicado',
        7.5,
        2,
        '2022-2',
        '2022-12-20',
        'Extraordinario'
    ),
    (
        'UAA0079',
        'K2021630310',
        'Mecánica y Electromagnetismo',
        8.0,
        2,
        '2022-2',
        '2022-12-20',
        'Ordinario'
    ),
    (
        'UAA0080',
        'K2021630310',
        'Ingeniería, Ética y Sociedad',
        9.5,
        2,
        '2022-2',
        '2022-12-20',
        'Ordinario'
    ),
    (
        'UAA0081',
        'K2021630310',
        'Fundamentos Económicos',
        8.4,
        2,
        '2022-2',
        '2022-12-20',
        'Ordinario'
    ),
    (
        'UAA0082',
        'K2021630310',
        'Algoritmos y Estructuras de Datos',
        8.8,
        2,
        '2022-2',
        '2022-12-20',
        'Ordinario'
    ),
    -- Semestre 3
    (
        'UAA0083',
        'K2021630310',
        'Ecuaciones Diferenciales',
        8.3,
        3,
        '2023-1',
        '2023-06-20',
        'Ordinario'
    ),
    (
        'UAA0084',
        'K2021630310',
        'Circuitos Eléctricos',
        7.9,
        3,
        '2023-1',
        '2023-06-20',
        'Ordinario'
    ),
    (
        'UAA0085',
        'K2021630310',
        'Fundamentos de Diseño Digital',
        8.5,
        3,
        '2023-1',
        '2023-06-20',
        'Ordinario'
    ),
    (
        'UAA0086',
        'K2021630310',
        'Bases de Datos',
        9.2,
        3,
        '2023-1',
        '2023-06-20',
        'Ordinario'
    ),
    (
        'UAA0087',
        'K2021630310',
        'Finanzas Empresariales',
        8.7,
        3,
        '2023-1',
        '2023-06-20',
        'Ordinario'
    ),
    (
        'UAA0088',
        'K2021630310',
        'Paradigmas de Programación',
        8.1,
        3,
        '2023-1',
        '2023-06-20',
        'Ordinario'
    ),
    (
        'UAA0089',
        'K2021630310',
        'Análisis y Diseño de Algoritmos',
        9.0,
        3,
        '2023-1',
        '2023-06-20',
        'Ordinario'
    ),
    -- Semestre 4
    (
        'UAA0090',
        'K2021630310',
        'Probabilidad y Estadística',
        8.4,
        4,
        '2023-2',
        '2023-12-20',
        'Ordinario'
    ),
    (
        'UAA0091',
        'K2021630310',
        'Matemáticas Avanzadas para la Ingeniería',
        7.8,
        4,
        '2023-2',
        '2023-12-20',
        'Ordinario'
    ),
    (
        'UAA0092',
        'K2021630310',
        'Electrónica Analógica',
        8.9,
        4,
        '2023-2',
        '2023-12-20',
        'Ordinario'
    ),
    (
        'UAA0093',
        'K2021630310',
        'Diseño de Sistemas Digitales',
        9.1,
        4,
        '2023-2',
        '2023-12-20',
        'Ordinario'
    ),
    (
        'UAA0094',
        'K2021630310',
        'Tecnologías para el Desarrollo de Aplicaciones Web',
        8.6,
        4,
        '2023-2',
        '2023-12-20',
        'Ordinario'
    ),
    (
        'UAA0095',
        'K2021630310',
        'Sistemas Operativos',
        8.2,
        4,
        '2023-2',
        '2023-12-20',
        'Ordinario'
    ),
    (
        'UAA0096',
        'K2021630310',
        'Teoría de la Computación',
        9.0,
        4,
        '2023-2',
        '2023-12-20',
        'Ordinario'
    ),
    -- Semestre 5
    (
        'UAA0097',
        'K2021630310',
        'Procesamiento Digital de Señales',
        8.7,
        5,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0098',
        'K2021630310',
        'Instrumentación y Control',
        8.0,
        5,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0099',
        'K2021630310',
        'Arquitectura de Computadoras',
        9.3,
        5,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0100',
        'K2021630310',
        'Análisis y Diseño de Sistemas',
        8.5,
        5,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0101',
        'K2021630310',
        'Formulación y Evaluación de Proyectos Informáticos',
        7.2,
        5,
        '2024-1',
        '2024-06-20',
        'Extraordinario'
    ),
    (
        'UAA0102',
        'K2021630310',
        'Compiladores',
        8.8,
        5,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    (
        'UAA0103',
        'K2021630310',
        'Redes de Computadoras',
        8.4,
        5,
        '2024-1',
        '2024-06-20',
        'Ordinario'
    ),
    -- Semestre 6
    (
        'UAA0104',
        'K2021630310',
        'Sistemas en Chip',
        8.6,
        6,
        '2024-2',
        '2024-12-20',
        'Ordinario'
    ),
    (
        'UAA0105',
        'K2021630310',
        'Métodos Cuantitativos para la Toma de Decisiones',
        8.3,
        6,
        '2024-2',
        '2024-12-20',
        'Ordinario'
    ),
    (
        'UAA0106',
        'K2021630310',
        'Ingeniería de Software',
        9.1,
        6,
        '2024-2',
        '2024-12-20',
        'Ordinario'
    ),
    (
        'UAA0107',
        'K2021630310',
        'Inteligencia Artificial',
        8.0,
        6,
        '2024-2',
        '2024-12-20',
        'Ordinario'
    ),
    (
        'UAA0108',
        'K2021630310',
        'Aplicaciones para Comunicaciones en Red',
        8.9,
        6,
        '2024-2',
        '2024-12-20',
        'Ordinario'
    ),
    (
        'UAA0109',
        'K2021630310',
        'Seguridad Informática',
        9.0,
        6,
        '2024-2',
        '2024-12-20',
        'Ordinario'
    ),
    -- Semestre 7
    (
        'UAA0111',
        'K2021630310',
        'Desarrollo de Aplicaciones Móviles Nativas',
        8.4,
        7,
        '2025-1',
        '2025-06-20',
        'Ordinario'
    ),
    (
        'UAA0114',
        'K2021630310',
        'Sistemas Distribuidos',
        8.2,
        7,
        '2025-1',
        '2025-06-20',
        'Ordinario'
    ),
    (
        'UAA0115',
        'K2021630310',
        'Administración de Servicios en Red',
        8.7,
        7,
        '2025-1',
        '2025-06-20',
        'Ordinario'
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
    ('H2024630313', '2024630313');

DELETE FROM inscripcion;

INSERT INTO
    inscripcion (
        id,
        id_alumno,
        fecha_hora_in,
        fecha_hora_cad
    )
VALUES (
        'I2024630101',
        '2024630101',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2024630102',
        '2024630102',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2024630201',
        '2024630201',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2024630202',
        '2024630202',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2024630301',
        '2024630301',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2024630302',
        '2024630302',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2023630107',
        '2023630107',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2022630208',
        '2022630208',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2021630309',
        '2021630309',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2021630310',
        '2021630310',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    -- Nuevos alumnos IIA (11 más)
    (
        'I2024630103',
        '2024630103',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2024630104',
        '2024630104',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2024630105',
        '2024630105',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2024630106',
        '2024630106',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2024630107',
        '2024630107',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2024630108',
        '2024630108',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2024630109',
        '2024630109',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2024630110',
        '2024630110',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2024630111',
        '2024630111',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2024630112',
        '2024630112',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2024630113',
        '2024630113',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    -- Nuevos alumnos LCD (11 más)
    (
        'I2024630203',
        '2024630203',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2024630204',
        '2024630204',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2024630205',
        '2024630205',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2024630206',
        '2024630206',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2024630207',
        '2024630207',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2024630208',
        '2024630208',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2024630209',
        '2024630209',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2024630210',
        '2024630210',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2024630211',
        '2024630211',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2024630212',
        '2024630212',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2024630213',
        '2024630213',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    -- Nuevos alumnos ISC (11 más)
    (
        'I2024630303',
        '2024630303',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2024630304',
        '2024630304',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2024630305',
        '2024630305',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2024630306',
        '2024630306',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2024630307',
        '2024630307',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2024630308',
        '2024630308',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2024630309',
        '2024630309',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2024630310',
        '2024630310',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2024630311',
        '2024630311',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2024630312',
        '2024630312',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    ),
    (
        'I2024630313',
        '2024630313',
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 DAY)
    );

DELETE FROM mat_inscritos;

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES
    -- 1BM1 (IIA) Alumnos: 2024630101, 2024630102
    (
        'M0001',
        'H2024630101',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '1BM1'
                AND id_ua = 'UA0051'
        ),
        NULL
    ),
    (
        'M0002',
        'H2024630101',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '1BM1'
                AND id_ua = 'UA0052'
        ),
        NULL
    ),
    (
        'M0003',
        'H2024630101',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '1BM1'
                AND id_ua = 'UA0053'
        ),
        NULL
    ),
    (
        'M0004',
        'H2024630101',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '1BM1'
                AND id_ua = 'UA0054'
        ),
        NULL
    ),
    (
        'M0005',
        'H2024630101',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '1BM1'
                AND id_ua = 'UA0055'
        ),
        NULL
    ),
    (
        'M0006',
        'H2024630102',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '1BM1'
                AND id_ua = 'UA0051'
        ),
        NULL
    ),
    (
        'M0007',
        'H2024630102',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '1BM1'
                AND id_ua = 'UA0052'
        ),
        NULL
    ),
    (
        'M0008',
        'H2024630102',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '1BM1'
                AND id_ua = 'UA0053'
        ),
        NULL
    ),
    (
        'M0009',
        'H2024630102',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '1BM1'
                AND id_ua = 'UA0054'
        ),
        NULL
    ),
    (
        'M0010',
        'H2024630102',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '1BM1'
                AND id_ua = 'UA0055'
        ),
        NULL
    ),
    -- 1AM1 (LCD) Alumnos: 2024630201, 2024630202
    (
        'M0011',
        'H2024630201',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '1AM1'
                AND id_ua = 'UA0096'
        ),
        NULL
    ),
    (
        'M0012',
        'H2024630201',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '1AM1'
                AND id_ua = 'UA0097'
        ),
        NULL
    ),
    (
        'M0013',
        'H2024630201',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '1AM1'
                AND id_ua = 'UA0098'
        ),
        NULL
    ),
    (
        'M0014',
        'H2024630201',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '1AM1'
                AND id_ua = 'UA0099'
        ),
        NULL
    ),
    (
        'M0015',
        'H2024630201',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '1AM1'
                AND id_ua = 'UA0100'
        ),
        NULL
    ),
    (
        'M0016',
        'H2024630202',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '1AM1'
                AND id_ua = 'UA0096'
        ),
        NULL
    ),
    (
        'M0017',
        'H2024630202',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '1AM1'
                AND id_ua = 'UA0097'
        ),
        NULL
    ),
    (
        'M0018',
        'H2024630202',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '1AM1'
                AND id_ua = 'UA0098'
        ),
        NULL
    ),
    (
        'M0019',
        'H2024630202',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '1AM1'
                AND id_ua = 'UA0099'
        ),
        NULL
    ),
    (
        'M0020',
        'H2024630202',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '1AM1'
                AND id_ua = 'UA0100'
        ),
        NULL
    ),
    -- 1CM1 (ISC) Alumnos: 2024630301, 2024630302
    (
        'M0021',
        'H2024630301',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '1CM1'
                AND id_ua = 'UA0001'
        ),
        NULL
    ),
    (
        'M0022',
        'H2024630301',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '1CM1'
                AND id_ua = 'UA0002'
        ),
        NULL
    ),
    (
        'M0023',
        'H2024630301',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '1CM1'
                AND id_ua = 'UA0003'
        ),
        NULL
    ),
    (
        'M0024',
        'H2024630301',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '1CM1'
                AND id_ua = 'UA0004'
        ),
        NULL
    ),
    (
        'M0025',
        'H2024630301',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '1CM1'
                AND id_ua = 'UA0005'
        ),
        NULL
    ),
    (
        'M0026',
        'H2024630302',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '1CM1'
                AND id_ua = 'UA0001'
        ),
        NULL
    ),
    (
        'M0027',
        'H2024630302',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '1CM1'
                AND id_ua = 'UA0002'
        ),
        NULL
    ),
    (
        'M0028',
        'H2024630302',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '1CM1'
                AND id_ua = 'UA0003'
        ),
        NULL
    ),
    (
        'M0029',
        'H2024630302',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '1CM1'
                AND id_ua = 'UA0004'
        ),
        NULL
    ),
    (
        'M0030',
        'H2024630302',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '1CM1'
                AND id_ua = 'UA0005'
        ),
        NULL
    ),
    -- 3BM1 (IIA) Alumno: 2023630107
    (
        'M0031',
        'H2023630107',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '3BM1'
                AND id_ua = 'UA0061'
        ),
        NULL
    ),
    (
        'M0032',
        'H2023630107',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '3BM1'
                AND id_ua = 'UA0062'
        ),
        NULL
    ),
    (
        'M0033',
        'H2023630107',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '3BM1'
                AND id_ua = 'UA0063'
        ),
        NULL
    ),
    (
        'M0034',
        'H2023630107',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '3BM1'
                AND id_ua = 'UA0064'
        ),
        NULL
    ),
    (
        'M0035',
        'H2023630107',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '3BM1'
                AND id_ua = 'UA0065'
        ),
        NULL
    ),
    (
        'M0036',
        'H2023630107',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '3BM1'
                AND id_ua = 'UA0066'
        ),
        NULL
    ),
    -- 5AM1 (LCD) Alumno: 2022630208
    (
        'M0037',
        'H2022630208',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '5AM1'
                AND id_ua = 'UA0118'
        ),
        NULL
    ),
    (
        'M0038',
        'H2022630208',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '5AM1'
                AND id_ua = 'UA0119'
        ),
        NULL
    ),
    (
        'M0039',
        'H2022630208',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '5AM1'
                AND id_ua = 'UA0120'
        ),
        NULL
    ),
    (
        'M0040',
        'H2022630208',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '5AM1'
                AND id_ua = 'UA0121'
        ),
        NULL
    ),
    (
        'M0041',
        'H2022630208',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '5AM1'
                AND id_ua = 'UA0122'
        ),
        NULL
    ),
    (
        'M0042',
        'H2022630208',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '5AM1'
                AND id_ua = 'UA0123'
        ),
        NULL
    ),
    -- 7CM1 (ISC) Alumno: 2021630309
    (
        'M0043',
        'H2021630309',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '7CM1'
                AND id_ua = 'UA0040'
        ),
        NULL
    ),
    (
        'M0044',
        'H2021630309',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '7CM1'
                AND id_ua = 'UA0043'
        ),
        NULL
    ),
    (
        'M0045',
        'H2021630309',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '7CM1'
                AND id_ua = 'UA0044'
        ),
        NULL
    ),
    -- 8CM1 (ISC) Alumno: 2021630310
    (
        'M0046',
        'H2021630310',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '8CM1'
                AND id_ua = 'UA0045'
        ),
        NULL
    ),
    (
        'M0047',
        'H2021630310',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '8CM1'
                AND id_ua = 'UA0046'
        ),
        NULL
    ),
    (
        'M0048',
        'H2021630310',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '8CM1'
                AND id_ua = 'UA0047'
        ),
        NULL
    ),
    (
        'M0049',
        'H2021630310',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '8CM1'
                AND id_ua = 'UA0048'
        ),
        NULL
    ),
    (
        'M0050',
        'H2021630310',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '8CM1'
                AND id_ua = 'UA0049'
        ),
        NULL
    ),
    (
        'M0051',
        'H2021630310',
        (
            SELECT id
            FROM grupo
            WHERE
                nombre = '8CM1'
                AND id_ua = 'UA0050'
        ),
        NULL
    ),
    -- 1BM1 (IIA) Nuevos alumnos: 2024630103-2024630113 (11 alumnos, 5 materias c/u)
    -- Alumno 2024630103
    ('M0052', 'H2024630103', (SELECT id FROM grupo WHERE nombre = '1BM1' AND id_ua = 'UA0051'), NULL),
    ('M0053', 'H2024630103', (SELECT id FROM grupo WHERE nombre = '2BM1' AND id_ua = 'UA0052'), NULL),
    ('M0054', 'H2024630103', (SELECT id FROM grupo WHERE nombre = '3BM1' AND id_ua = 'UA0053'), NULL),
    ('M0055', 'H2024630103', (SELECT id FROM grupo WHERE nombre = '1BM1' AND id_ua = 'UA0054'), NULL),
    ('M0056', 'H2024630103', (SELECT id FROM grupo WHERE nombre = '2BM1' AND id_ua = 'UA0055'), NULL),
    -- Alumno 2024630104
    ('M0057', 'H2024630104', (SELECT id FROM grupo WHERE nombre = '1BM1' AND id_ua = 'UA0051'), NULL),
    ('M0058', 'H2024630104', (SELECT id FROM grupo WHERE nombre = '2BM1' AND id_ua = 'UA0052'), NULL),
    ('M0059', 'H2024630104', (SELECT id FROM grupo WHERE nombre = '3BM1' AND id_ua = 'UA0053'), NULL),
    ('M0060', 'H2024630104', (SELECT id FROM grupo WHERE nombre = '1BM1' AND id_ua = 'UA0054'), NULL),
    ('M0061', 'H2024630104', (SELECT id FROM grupo WHERE nombre = '2BM1' AND id_ua = 'UA0055'), NULL),
    -- Alumno 2024630105
    ('M0062', 'H2024630105', (SELECT id FROM grupo WHERE nombre = '1BM1' AND id_ua = 'UA0051'), NULL),
    ('M0063', 'H2024630105', (SELECT id FROM grupo WHERE nombre = '2BM1' AND id_ua = 'UA0052'), NULL),
    ('M0064', 'H2024630105', (SELECT id FROM grupo WHERE nombre = '3BM1' AND id_ua = 'UA0053'), NULL),
    ('M0065', 'H2024630105', (SELECT id FROM grupo WHERE nombre = '1BM1' AND id_ua = 'UA0054'), NULL),
    ('M0066', 'H2024630105', (SELECT id FROM grupo WHERE nombre = '2BM1' AND id_ua = 'UA0055'), NULL),
    -- Alumno 2024630106
    ('M0067', 'H2024630106', (SELECT id FROM grupo WHERE nombre = '1BM1' AND id_ua = 'UA0051'), NULL),
    ('M0068', 'H2024630106', (SELECT id FROM grupo WHERE nombre = '2BM1' AND id_ua = 'UA0052'), NULL),
    ('M0069', 'H2024630106', (SELECT id FROM grupo WHERE nombre = '3BM1' AND id_ua = 'UA0053'), NULL),
    ('M0070', 'H2024630106', (SELECT id FROM grupo WHERE nombre = '1BM1' AND id_ua = 'UA0054'), NULL),
    ('M0071', 'H2024630106', (SELECT id FROM grupo WHERE nombre = '2BM1' AND id_ua = 'UA0055'), NULL),
    -- Alumno 2024630107
    ('M0072', 'H2024630107', (SELECT id FROM grupo WHERE nombre = '1BM1' AND id_ua = 'UA0051'), NULL),
    ('M0073', 'H2024630107', (SELECT id FROM grupo WHERE nombre = '2BM1' AND id_ua = 'UA0052'), NULL),
    ('M0074', 'H2024630107', (SELECT id FROM grupo WHERE nombre = '3BM1' AND id_ua = 'UA0053'), NULL),
    ('M0075', 'H2024630107', (SELECT id FROM grupo WHERE nombre = '1BM1' AND id_ua = 'UA0054'), NULL),
    ('M0076', 'H2024630107', (SELECT id FROM grupo WHERE nombre = '2BM1' AND id_ua = 'UA0055'), NULL),
    -- Alumno 2024630108
    ('M0077', 'H2024630108', (SELECT id FROM grupo WHERE nombre = '1BM1' AND id_ua = 'UA0051'), NULL),
    ('M0078', 'H2024630108', (SELECT id FROM grupo WHERE nombre = '2BM1' AND id_ua = 'UA0052'), NULL),
    ('M0079', 'H2024630108', (SELECT id FROM grupo WHERE nombre = '3BM1' AND id_ua = 'UA0053'), NULL),
    ('M0080', 'H2024630108', (SELECT id FROM grupo WHERE nombre = '1BM1' AND id_ua = 'UA0054'), NULL),
    ('M0081', 'H2024630108', (SELECT id FROM grupo WHERE nombre = '2BM1' AND id_ua = 'UA0055'), NULL),
    -- Alumno 2024630109
    ('M0082', 'H2024630109', (SELECT id FROM grupo WHERE nombre = '1BM1' AND id_ua = 'UA0051'), NULL),
    ('M0083', 'H2024630109', (SELECT id FROM grupo WHERE nombre = '2BM1' AND id_ua = 'UA0052'), NULL),
    ('M0084', 'H2024630109', (SELECT id FROM grupo WHERE nombre = '3BM1' AND id_ua = 'UA0053'), NULL),
    ('M0085', 'H2024630109', (SELECT id FROM grupo WHERE nombre = '1BM1' AND id_ua = 'UA0054'), NULL),
    ('M0086', 'H2024630109', (SELECT id FROM grupo WHERE nombre = '2BM1' AND id_ua = 'UA0055'), NULL),
    -- Alumno 2024630110
    ('M0087', 'H2024630110', (SELECT id FROM grupo WHERE nombre = '1BM1' AND id_ua = 'UA0051'), NULL),
    ('M0088', 'H2024630110', (SELECT id FROM grupo WHERE nombre = '2BM1' AND id_ua = 'UA0052'), NULL),
    ('M0089', 'H2024630110', (SELECT id FROM grupo WHERE nombre = '3BM1' AND id_ua = 'UA0053'), NULL),
    ('M0090', 'H2024630110', (SELECT id FROM grupo WHERE nombre = '1BM1' AND id_ua = 'UA0054'), NULL),
    ('M0091', 'H2024630110', (SELECT id FROM grupo WHERE nombre = '2BM1' AND id_ua = 'UA0055'), NULL),
    -- Alumno 2024630111
    ('M0092', 'H2024630111', (SELECT id FROM grupo WHERE nombre = '1BM1' AND id_ua = 'UA0051'), NULL),
    ('M0093', 'H2024630111', (SELECT id FROM grupo WHERE nombre = '2BM1' AND id_ua = 'UA0052'), NULL),
    ('M0094', 'H2024630111', (SELECT id FROM grupo WHERE nombre = '3BM1' AND id_ua = 'UA0053'), NULL),
    ('M0095', 'H2024630111', (SELECT id FROM grupo WHERE nombre = '1BM1' AND id_ua = 'UA0054'), NULL),
    ('M0096', 'H2024630111', (SELECT id FROM grupo WHERE nombre = '2BM1' AND id_ua = 'UA0055'), NULL),
    -- Alumno 2024630112
    ('M0097', 'H2024630112', (SELECT id FROM grupo WHERE nombre = '1BM1' AND id_ua = 'UA0051'), NULL),
    ('M0098', 'H2024630112', (SELECT id FROM grupo WHERE nombre = '2BM1' AND id_ua = 'UA0052'), NULL),
    ('M0099', 'H2024630112', (SELECT id FROM grupo WHERE nombre = '3BM1' AND id_ua = 'UA0053'), NULL),
    ('M0100', 'H2024630112', (SELECT id FROM grupo WHERE nombre = '1BM1' AND id_ua = 'UA0054'), NULL),
    ('M0101', 'H2024630112', (SELECT id FROM grupo WHERE nombre = '2BM1' AND id_ua = 'UA0055'), NULL),
    -- Alumno 2024630113
    ('M0102', 'H2024630113', (SELECT id FROM grupo WHERE nombre = '1BM1' AND id_ua = 'UA0051'), NULL),
    ('M0103', 'H2024630113', (SELECT id FROM grupo WHERE nombre = '2BM1' AND id_ua = 'UA0052'), NULL),
    ('M0104', 'H2024630113', (SELECT id FROM grupo WHERE nombre = '3BM1' AND id_ua = 'UA0053'), NULL),
    ('M0105', 'H2024630113', (SELECT id FROM grupo WHERE nombre = '1BM1' AND id_ua = 'UA0054'), NULL),
    ('M0106', 'H2024630113', (SELECT id FROM grupo WHERE nombre = '2BM1' AND id_ua = 'UA0055'), NULL),
    -- 1AM1 (LCD) Nuevos alumnos: 2024630203-2024630213 (11 alumnos, 5 materias c/u)
    -- Alumno 2024630203
    ('M0107', 'H2024630203', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0096'), NULL),
    ('M0108', 'H2024630203', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0097'), NULL),
    ('M0109', 'H2024630203', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0098'), NULL),
    ('M0110', 'H2024630203', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0099'), NULL),
    ('M0111', 'H2024630203', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0100'), NULL),
    -- Alumno 2024630204
    ('M0112', 'H2024630204', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0096'), NULL),
    ('M0113', 'H2024630204', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0097'), NULL),
    ('M0114', 'H2024630204', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0098'), NULL),
    ('M0115', 'H2024630204', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0099'), NULL),
    ('M0116', 'H2024630204', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0100'), NULL),
    -- Alumno 2024630205
    ('M0117', 'H2024630205', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0096'), NULL),
    ('M0118', 'H2024630205', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0097'), NULL),
    ('M0119', 'H2024630205', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0098'), NULL),
    ('M0120', 'H2024630205', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0099'), NULL),
    ('M0121', 'H2024630205', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0100'), NULL),
    -- Alumno 2024630206
    ('M0122', 'H2024630206', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0096'), NULL),
    ('M0123', 'H2024630206', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0097'), NULL),
    ('M0124', 'H2024630206', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0098'), NULL),
    ('M0125', 'H2024630206', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0099'), NULL),
    ('M0126', 'H2024630206', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0100'), NULL),
    -- Alumno 2024630207
    ('M0127', 'H2024630207', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0096'), NULL),
    ('M0128', 'H2024630207', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0097'), NULL),
    ('M0129', 'H2024630207', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0098'), NULL),
    ('M0130', 'H2024630207', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0099'), NULL),
    ('M0131', 'H2024630207', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0100'), NULL),
    -- Alumno 2024630208
    ('M0132', 'H2024630208', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0096'), NULL),
    ('M0133', 'H2024630208', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0097'), NULL),
    ('M0134', 'H2024630208', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0098'), NULL),
    ('M0135', 'H2024630208', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0099'), NULL),
    ('M0136', 'H2024630208', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0100'), NULL),
    -- Alumno 2024630209
    ('M0137', 'H2024630209', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0096'), NULL),
    ('M0138', 'H2024630209', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0097'), NULL),
    ('M0139', 'H2024630209', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0098'), NULL),
    ('M0140', 'H2024630209', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0099'), NULL),
    ('M0141', 'H2024630209', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0100'), NULL),
    -- Alumno 2024630210
    ('M0142', 'H2024630210', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0096'), NULL),
    ('M0143', 'H2024630210', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0097'), NULL),
    ('M0144', 'H2024630210', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0098'), NULL),
    ('M0145', 'H2024630210', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0099'), NULL),
    ('M0146', 'H2024630210', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0100'), NULL),
    -- Alumno 2024630211
    ('M0147', 'H2024630211', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0096'), NULL),
    ('M0148', 'H2024630211', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0097'), NULL),
    ('M0149', 'H2024630211', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0098'), NULL),
    ('M0150', 'H2024630211', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0099'), NULL),
    ('M0151', 'H2024630211', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0100'), NULL),
    -- Alumno 2024630212
    ('M0152', 'H2024630212', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0096'), NULL),
    ('M0153', 'H2024630212', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0097'), NULL),
    ('M0154', 'H2024630212', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0098'), NULL),
    ('M0155', 'H2024630212', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0099'), NULL),
    ('M0156', 'H2024630212', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0100'), NULL),
    -- Alumno 2024630213
    ('M0157', 'H2024630213', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0096'), NULL),
    ('M0158', 'H2024630213', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0097'), NULL),
    ('M0159', 'H2024630213', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0098'), NULL),
    ('M0160', 'H2024630213', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0099'), NULL),
    ('M0161', 'H2024630213', (SELECT id FROM grupo WHERE nombre = '1AM1' AND id_ua = 'UA0100'), NULL),
    -- 1CM1 (ISC) Nuevos alumnos: 2024630303-2024630313 (11 alumnos, 5 materias c/u)
    -- Alumno 2024630303
    ('M0162', 'H2024630303', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0001'), NULL),
    ('M0163', 'H2024630303', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0002'), NULL),
    ('M0164', 'H2024630303', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0003'), NULL),
    ('M0165', 'H2024630303', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0004'), NULL),
    ('M0166', 'H2024630303', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0005'), NULL),
    -- Alumno 2024630304
    ('M0167', 'H2024630304', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0001'), NULL),
    ('M0168', 'H2024630304', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0002'), NULL),
    ('M0169', 'H2024630304', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0003'), NULL),
    ('M0170', 'H2024630304', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0004'), NULL),
    ('M0171', 'H2024630304', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0005'), NULL),
    -- Alumno 2024630305
    ('M0172', 'H2024630305', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0001'), NULL),
    ('M0173', 'H2024630305', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0002'), NULL),
    ('M0174', 'H2024630305', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0003'), NULL),
    ('M0175', 'H2024630305', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0004'), NULL),
    ('M0176', 'H2024630305', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0005'), NULL),
    -- Alumno 2024630306
    ('M0177', 'H2024630306', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0001'), NULL),
    ('M0178', 'H2024630306', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0002'), NULL),
    ('M0179', 'H2024630306', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0003'), NULL),
    ('M0180', 'H2024630306', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0004'), NULL),
    ('M0181', 'H2024630306', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0005'), NULL),
    -- Alumno 2024630307
    ('M0182', 'H2024630307', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0001'), NULL),
    ('M0183', 'H2024630307', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0002'), NULL),
    ('M0184', 'H2024630307', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0003'), NULL),
    ('M0185', 'H2024630307', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0004'), NULL),
    ('M0186', 'H2024630307', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0005'), NULL),
    -- Alumno 2024630308
    ('M0187', 'H2024630308', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0001'), NULL),
    ('M0188', 'H2024630308', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0002'), NULL),
    ('M0189', 'H2024630308', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0003'), NULL),
    ('M0190', 'H2024630308', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0004'), NULL),
    ('M0191', 'H2024630308', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0005'), NULL),
    -- Alumno 2024630309
    ('M0192', 'H2024630309', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0001'), NULL),
    ('M0193', 'H2024630309', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0002'), NULL),
    ('M0194', 'H2024630309', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0003'), NULL),
    ('M0195', 'H2024630309', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0004'), NULL),
    ('M0196', 'H2024630309', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0005'), NULL),
    -- Alumno 2024630310
    ('M0197', 'H2024630310', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0001'), NULL),
    ('M0198', 'H2024630310', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0002'), NULL),
    ('M0199', 'H2024630310', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0003'), NULL),
    ('M0200', 'H2024630310', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0004'), NULL),
    ('M0201', 'H2024630310', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0005'), NULL),
    -- Alumno 2024630311
    ('M0202', 'H2024630311', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0001'), NULL),
    ('M0203', 'H2024630311', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0002'), NULL),
    ('M0204', 'H2024630311', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0003'), NULL),
    ('M0205', 'H2024630311', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0004'), NULL),
    ('M0206', 'H2024630311', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0005'), NULL),
    -- Alumno 2024630312
    ('M0207', 'H2024630312', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0001'), NULL),
    ('M0208', 'H2024630312', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0002'), NULL),
    ('M0209', 'H2024630312', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0003'), NULL),
    ('M0210', 'H2024630312', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0004'), NULL),
    ('M0211', 'H2024630312', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0005'), NULL),
    -- Alumno 2024630313
    ('M0212', 'H2024630313', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0001'), NULL),
    ('M0213', 'H2024630313', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0002'), NULL),
    ('M0214', 'H2024630313', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0003'), NULL),
    ('M0215', 'H2024630313', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0004'), NULL),
    ('M0216', 'H2024630313', (SELECT id FROM grupo WHERE nombre = '1CM1' AND id_ua = 'UA0005'), NULL);

DELETE FROM mat_inscritos;

INSERT INTO
    mat_inscritos (
        id,
        id_horario,
        id_grupo,
        calificacion_final
    )
VALUES
    -- ==========================================
    -- GRUPO G0001 - 1BM1 (IIA - Fundamentos de Programación) - PROFESOR HIJKLMNO
    -- 5 alumnos IIA: 2024630101-105
    -- ==========================================
    ('M0001', 'H2024630101', 'G0001', NULL),
    ('M0002', 'H2024630102', 'G0001', NULL),
    ('M0003', 'H2024630103', 'G0001', NULL),
    ('M0004', 'H2024630104', 'G0001', NULL),
    ('M0005', 'H2024630105', 'G0001', NULL),
    
    -- ==========================================
    -- GRUPO G0002 - 1AM1 (LCD - Fundamentos de Programación) - PROFESOR HIJKLMNO
    -- 5 alumnos LCD: 2024630201-205
    -- ==========================================
    ('M0006', 'H2024630201', 'G0002', NULL),
    ('M0007', 'H2024630202', 'G0002', NULL),
    ('M0008', 'H2024630203', 'G0002', NULL),
    ('M0009', 'H2024630204', 'G0002', NULL),
    ('M0010', 'H2024630205', 'G0002', NULL),
    
    -- ==========================================
    -- GRUPO G0003 - 1CM1 (ISC - Fundamentos de Programación) - PROFESOR HIJKLMNO
    -- 5 alumnos ISC: 2024630301-305
    -- ==========================================
    ('M0011', 'H2024630301', 'G0003', NULL),
    ('M0012', 'H2024630302', 'G0003', NULL),
    ('M0013', 'H2024630303', 'G0003', NULL),
    ('M0014', 'H2024630304', 'G0003', NULL),
    ('M0015', 'H2024630305', 'G0003', NULL),
    
    -- ==========================================
    -- GRUPO G0004 - 1BM2 (IIA - Matemáticas Discretas) - PROFESOR PROF0001
    -- 5 alumnos IIA: 2024630106-110
    -- ==========================================
    ('M0016', 'H2024630106', 'G0004', NULL),
    ('M0017', 'H2024630107', 'G0004', NULL),
    ('M0018', 'H2024630108', 'G0004', NULL),
    ('M0019', 'H2024630109', 'G0004', NULL),
    ('M0020', 'H2024630110', 'G0004', NULL),
    
    -- ==========================================
    -- GRUPO G0005 - 1AM2 (LCD - Matemáticas Discretas) - PROFESOR PROF0001
    -- 5 alumnos LCD: 2024630206-210
    -- ==========================================
    ('M0021', 'H2024630206', 'G0005', NULL),
    ('M0022', 'H2024630207', 'G0005', NULL),
    ('M0023', 'H2024630208', 'G0005', NULL),
    ('M0024', 'H2024630209', 'G0005', NULL),
    ('M0025', 'H2024630210', 'G0005', NULL),
    
    -- ==========================================
    -- GRUPO G0006 - 1CM2 (ISC - Matemáticas Discretas) - PROFESOR PROF0001
    -- 5 alumnos ISC: 2024630306-310
    -- ==========================================
    ('M0026', 'H2024630306', 'G0006', NULL),
    ('M0027', 'H2024630307', 'G0006', NULL),
    ('M0028', 'H2024630308', 'G0006', NULL),
    ('M0029', 'H2024630309', 'G0006', NULL),
    ('M0030', 'H2024630310', 'G0006', NULL),
    
    -- ==========================================
    -- GRUPO G0007 - 1BM3 (IIA - Cálculo) - PROFESOR PROF0002
    -- 5 alumnos IIA: 2024630111-113 + 2024630101-102 (reutilizando)
    -- ==========================================
    ('M0031', 'H2024630111', 'G0007', NULL),
    ('M0032', 'H2024630112', 'G0007', NULL),
    ('M0033', 'H2024630113', 'G0007', NULL),
    ('M0034', 'H2024630101', 'G0007', NULL),
    ('M0035', 'H2024630102', 'G0007', NULL),
    
    -- ==========================================
    -- GRUPO G0008 - 1AM3 (LCD - Cálculo) - PROFESOR PROF0002
    -- 5 alumnos LCD: 2024630211-213 + 2024630201-202 (reutilizando)
    -- ==========================================
    ('M0036', 'H2024630211', 'G0008', NULL),
    ('M0037', 'H2024630212', 'G0008', NULL),
    ('M0038', 'H2024630213', 'G0008', NULL),
    ('M0039', 'H2024630201', 'G0008', NULL),
    ('M0040', 'H2024630202', 'G0008', NULL),
    
    -- ==========================================
    -- GRUPO G0009 - 1CM3 (ISC - Cálculo) - PROFESOR PROF0002
    -- 5 alumnos ISC: 2024630311-313 + 2024630301-302 (reutilizando)
    -- ==========================================
    ('M0041', 'H2024630311', 'G0009', NULL),
    ('M0042', 'H2024630312', 'G0009', NULL),
    ('M0043', 'H2024630313', 'G0009', NULL),
    ('M0044', 'H2024630301', 'G0009', NULL),
    ('M0045', 'H2024630302', 'G0009', NULL);

-- ==================================================================
-- GRUPOS PARA MATERIAS OPTATIVAS
-- Se agregan grupos para materias OPTATIVAS de cada carrera
-- ==================================================================

-- OPTATIVAS ISC (Ingenieria en Sistemas Computacionales) - Semestre 6
INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo,
        reg_final,
        reg_extra
    )
VALUES (
        'G_OPT_001',
        '6CM1',
        'UA0140',
        'HIJKLMNO',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G_OPT_002',
        '6CM2',
        'UA0141',
        'P0001RSV',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G_OPT_003',
        '6CM3',
        'UA0142',
        'P0002KND',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G_OPT_004',
        '6CM4',
        'UA0143',
        'P0003HGR',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G_OPT_005',
        '6CM5',
        'UA0144',
        'HIJKLMNO',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G_OPT_006',
        '6CM6',
        'UA0145',
        'P0001RSV',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G_OPT_007',
        '6CM7',
        'UA0146',
        'P0002KND',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G_OPT_008',
        '6CM8',
        'UA0147',
        'P0003HGR',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G_OPT_009',
        '6CM9',
        'UA0148',
        'HIJKLMNO',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G_OPT_010',
        '6CM10',
        'UA0149',
        'P0001RSV',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G_OPT_011',
        '6CM11',
        'UA0150',
        'P0002KND',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G_OPT_012',
        '6CM12',
        'UA0151',
        'P0003HGR',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G_OPT_013',
        '6CM13',
        'UA0152',
        'HIJKLMNO',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G_OPT_014',
        '6CM14',
        'UA0153',
        'P0001RSV',
        'Vespertino',
        30,
        0,
        0
    );

-- OPTATIVAS ISC - Semestre 7
INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo,
        reg_final,
        reg_extra
    )
VALUES (
        'G_OPT_015',
        '7CM1',
        'UA0154',
        'P0002KND',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G_OPT_016',
        '7CM2',
        'UA0155',
        'P0003HGR',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G_OPT_017',
        '7CM3',
        'UA0156',
        'HIJKLMNO',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G_OPT_018',
        '7CM4',
        'UA0157',
        'P0001RSV',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G_OPT_019',
        '7CM5',
        'UA0158',
        'P0002KND',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G_OPT_020',
        '7CM6',
        'UA0159',
        'P0003HGR',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G_OPT_021',
        '7CM7',
        'UA0160',
        'HIJKLMNO',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G_OPT_022',
        '7CM8',
        'UA0161',
        'P0001RSV',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G_OPT_023',
        '7CM9',
        'UA0162',
        'P0002KND',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G_OPT_024',
        '7CM10',
        'UA0163',
        'P0003HGR',
        'Vespertino',
        30,
        0,
        0
    );

-- OPTATIVAS IIA (Ingenieria en Inteligencia Artificial) - Semestre 6
INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo,
        reg_final,
        reg_extra
    )
VALUES (
        'G_OPT_025',
        '6BM1',
        'UA0164',
        'HIJKLMNO',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G_OPT_026',
        '6BM2',
        'UA0165',
        'P0001RSV',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G_OPT_027',
        '6BM3',
        'UA0166',
        'P0002KND',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G_OPT_028',
        '6BM4',
        'UA0167',
        'P0003HGR',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G_OPT_029',
        '6BM5',
        'UA0168',
        'HIJKLMNO',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G_OPT_030',
        '6BM6',
        'UA0169',
        'P0001RSV',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G_OPT_031',
        '6BM7',
        'UA0170',
        'P0002KND',
        'Matutino',
        30,
        0,
        0
    );

-- OPTATIVAS IIA - Semestre 7
INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo,
        reg_final,
        reg_extra
    )
VALUES (
        'G_OPT_032',
        '7BM1',
        'UA0171',
        'P0003HGR',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G_OPT_033',
        '7BM2',
        'UA0172',
        'HIJKLMNO',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G_OPT_034',
        '7BM3',
        'UA0173',
        'P0001RSV',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G_OPT_035',
        '7BM4',
        'UA0174',
        'P0002KND',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G_OPT_036',
        '7BM5',
        'UA0175',
        'P0003HGR',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G_OPT_037',
        '7BM6',
        'UA0176',
        'HIJKLMNO',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G_OPT_038',
        '7BM7',
        'UA0177',
        'P0001RSV',
        'Vespertino',
        30,
        0,
        0
    );

-- OPTATIVAS LCD (Licenciatura en Ciencia de Datos) - Semestre 6
INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo,
        reg_final,
        reg_extra
    )
VALUES (
        'G_OPT_039',
        '6AM1',
        'UA0178',
        'P0002KND',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G_OPT_040',
        '6AM2',
        'UA0179',
        'P0003HGR',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G_OPT_041',
        '6AM3',
        'UA0180',
        'HIJKLMNO',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G_OPT_042',
        '6AM4',
        'UA0181',
        'P0001RSV',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G_OPT_043',
        '6AM5',
        'UA0182',
        'P0002KND',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G_OPT_044',
        '6AM6',
        'UA0183',
        'P0003HGR',
        'Vespertino',
        30,
        0,
        0
    );

-- OPTATIVAS LCD - Semestre 7
INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo,
        reg_final,
        reg_extra
    )
VALUES (
        'G_OPT_045',
        '7AM1',
        'UA0184',
        'HIJKLMNO',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G_OPT_046',
        '7AM2',
        'UA0185',
        'P0001RSV',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G_OPT_047',
        '7AM3',
        'UA0186',
        'P0002KND',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G_OPT_048',
        '7AM4',
        'UA0187',
        'P0003HGR',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G_OPT_049',
        '7AM5',
        'UA0188',
        'HIJKLMNO',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G_OPT_050',
        '7AM6',
        'UA0189',
        'P0001RSV',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G_OPT_051',
        '7AM7',
        'UA0190',
        'P0002KND',
        'Matutino',
        30,
        0,
        0
    );

--=== DISTRIBUCIÓN DE HORARIOS PARA GRUPOS OPTATIVAS===
--=== Horario estándar: Lunes, Miércoles, Viernes 10:30-12:00 (Matutino) o 6:30-8:00 (Vespertino)===

-- ISC Semestre 6 - Matutino
INSERT INTO
    distribucion (
        id,
        id_grupo,
        hora_ini,
        hora_fin,
        dia
    )
VALUES (
        'D_OPT_001',
        'G_OPT_001',
        '10:30',
        '12:00',
        'Lunes'
    ),
    (
        'D_OPT_002',
        'G_OPT_001',
        '10:30',
        '12:00',
        'Miércoles'
    ),
    (
        'D_OPT_003',
        'G_OPT_001',
        '10:30',
        '12:00',
        'Viernes'
    ),
    (
        'D_OPT_004',
        'G_OPT_002',
        '8:30',
        '10:00',
        'Lunes'
    ),
    (
        'D_OPT_005',
        'G_OPT_002',
        '8:30',
        '10:00',
        'Miércoles'
    ),
    (
        'D_OPT_006',
        'G_OPT_002',
        '8:30',
        '10:00',
        'Viernes'
    ),
    (
        'D_OPT_007',
        'G_OPT_005',
        '12:00',
        '1:30',
        'Lunes'
    ),
    (
        'D_OPT_008',
        'G_OPT_005',
        '12:00',
        '1:30',
        'Miércoles'
    ),
    (
        'D_OPT_009',
        'G_OPT_005',
        '12:00',
        '1:30',
        'Viernes'
    ),
    (
        'D_OPT_010',
        'G_OPT_007',
        '7:00',
        '8:30',
        'Martes'
    ),
    (
        'D_OPT_011',
        'G_OPT_007',
        '7:00',
        '8:30',
        'Jueves'
    ),
    (
        'D_OPT_012',
        'G_OPT_007',
        '7:00',
        '8:30',
        'Viernes'
    ),
    (
        'D_OPT_013',
        'G_OPT_009',
        '1:30',
        '3:00',
        'Lunes'
    ),
    (
        'D_OPT_014',
        'G_OPT_009',
        '1:30',
        '3:00',
        'Miércoles'
    ),
    (
        'D_OPT_015',
        'G_OPT_009',
        '1:30',
        '3:00',
        'Viernes'
    ),
    (
        'D_OPT_016',
        'G_OPT_011',
        '10:30',
        '12:00',
        'Martes'
    ),
    (
        'D_OPT_017',
        'G_OPT_011',
        '10:30',
        '12:00',
        'Jueves'
    ),
    (
        'D_OPT_018',
        'G_OPT_011',
        '10:30',
        '12:00',
        'Viernes'
    ),
    (
        'D_OPT_019',
        'G_OPT_013',
        '8:30',
        '10:00',
        'Martes'
    ),
    (
        'D_OPT_020',
        'G_OPT_013',
        '8:30',
        '10:00',
        'Jueves'
    ),
    (
        'D_OPT_021',
        'G_OPT_013',
        '8:30',
        '10:00',
        'Viernes'
    );

-- ISC Semestre 6 - Vespertino
INSERT INTO
    distribucion (
        id,
        id_grupo,
        hora_ini,
        hora_fin,
        dia
    )
VALUES (
        'D_OPT_022',
        'G_OPT_003',
        '6:30',
        '8:00',
        'Lunes'
    ),
    (
        'D_OPT_023',
        'G_OPT_003',
        '6:30',
        '8:00',
        'Miércoles'
    ),
    (
        'D_OPT_024',
        'G_OPT_003',
        '6:30',
        '8:00',
        'Viernes'
    ),
    (
        'D_OPT_025',
        'G_OPT_004',
        '5:00',
        '6:30',
        'Lunes'
    ),
    (
        'D_OPT_026',
        'G_OPT_004',
        '5:00',
        '6:30',
        'Miércoles'
    ),
    (
        'D_OPT_027',
        'G_OPT_004',
        '5:00',
        '6:30',
        'Viernes'
    ),
    (
        'D_OPT_028',
        'G_OPT_006',
        '3:00',
        '4:30',
        'Lunes'
    ),
    (
        'D_OPT_029',
        'G_OPT_006',
        '3:00',
        '4:30',
        'Miércoles'
    ),
    (
        'D_OPT_030',
        'G_OPT_006',
        '3:00',
        '4:30',
        'Viernes'
    ),
    (
        'D_OPT_031',
        'G_OPT_008',
        '8:00',
        '9:30',
        'Martes'
    ),
    (
        'D_OPT_032',
        'G_OPT_008',
        '8:00',
        '9:30',
        'Jueves'
    ),
    (
        'D_OPT_033',
        'G_OPT_008',
        '8:00',
        '9:30',
        'Viernes'
    ),
    (
        'D_OPT_034',
        'G_OPT_010',
        '6:30',
        '8:00',
        'Martes'
    ),
    (
        'D_OPT_035',
        'G_OPT_010',
        '6:30',
        '8:00',
        'Jueves'
    ),
    (
        'D_OPT_036',
        'G_OPT_010',
        '6:30',
        '8:00',
        'Viernes'
    ),
    (
        'D_OPT_037',
        'G_OPT_012',
        '5:00',
        '6:30',
        'Martes'
    ),
    (
        'D_OPT_038',
        'G_OPT_012',
        '5:00',
        '6:30',
        'Jueves'
    ),
    (
        'D_OPT_039',
        'G_OPT_012',
        '5:00',
        '6:30',
        'Viernes'
    ),
    (
        'D_OPT_040',
        'G_OPT_014',
        '3:00',
        '4:30',
        'Martes'
    ),
    (
        'D_OPT_041',
        'G_OPT_014',
        '3:00',
        '4:30',
        'Jueves'
    ),
    (
        'D_OPT_042',
        'G_OPT_014',
        '3:00',
        '4:30',
        'Viernes'
    );

-- ISC Semestre 7 - Matutino
INSERT INTO
    distribucion (
        id,
        id_grupo,
        hora_ini,
        hora_fin,
        dia
    )
VALUES (
        'D_OPT_043',
        'G_OPT_015',
        '10:30',
        '12:00',
        'Lunes'
    ),
    (
        'D_OPT_044',
        'G_OPT_015',
        '10:30',
        '12:00',
        'Miércoles'
    ),
    (
        'D_OPT_045',
        'G_OPT_015',
        '10:30',
        '12:00',
        'Viernes'
    ),
    (
        'D_OPT_046',
        'G_OPT_017',
        '8:30',
        '10:00',
        'Lunes'
    ),
    (
        'D_OPT_047',
        'G_OPT_017',
        '8:30',
        '10:00',
        'Miércoles'
    ),
    (
        'D_OPT_048',
        'G_OPT_017',
        '8:30',
        '10:00',
        'Viernes'
    ),
    (
        'D_OPT_049',
        'G_OPT_019',
        '12:00',
        '1:30',
        'Lunes'
    ),
    (
        'D_OPT_050',
        'G_OPT_019',
        '12:00',
        '1:30',
        'Miércoles'
    ),
    (
        'D_OPT_051',
        'G_OPT_019',
        '12:00',
        '1:30',
        'Viernes'
    ),
    (
        'D_OPT_052',
        'G_OPT_021',
        '7:00',
        '8:30',
        'Martes'
    ),
    (
        'D_OPT_053',
        'G_OPT_021',
        '7:00',
        '8:30',
        'Jueves'
    ),
    (
        'D_OPT_054',
        'G_OPT_021',
        '7:00',
        '8:30',
        'Viernes'
    ),
    (
        'D_OPT_055',
        'G_OPT_023',
        '1:30',
        '3:00',
        'Lunes'
    ),
    (
        'D_OPT_056',
        'G_OPT_023',
        '1:30',
        '3:00',
        'Miércoles'
    ),
    (
        'D_OPT_057',
        'G_OPT_023',
        '1:30',
        '3:00',
        'Viernes'
    );

-- ISC Semestre 7 - Vespertino
INSERT INTO
    distribucion (
        id,
        id_grupo,
        hora_ini,
        hora_fin,
        dia
    )
VALUES (
        'D_OPT_058',
        'G_OPT_016',
        '6:30',
        '8:00',
        'Lunes'
    ),
    (
        'D_OPT_059',
        'G_OPT_016',
        '6:30',
        '8:00',
        'Miércoles'
    ),
    (
        'D_OPT_060',
        'G_OPT_016',
        '6:30',
        '8:00',
        'Viernes'
    ),
    (
        'D_OPT_061',
        'G_OPT_018',
        '5:00',
        '6:30',
        'Lunes'
    ),
    (
        'D_OPT_062',
        'G_OPT_018',
        '5:00',
        '6:30',
        'Miércoles'
    ),
    (
        'D_OPT_063',
        'G_OPT_018',
        '5:00',
        '6:30',
        'Viernes'
    ),
    (
        'D_OPT_064',
        'G_OPT_020',
        '3:00',
        '4:30',
        'Lunes'
    ),
    (
        'D_OPT_065',
        'G_OPT_020',
        '3:00',
        '4:30',
        'Miércoles'
    ),
    (
        'D_OPT_066',
        'G_OPT_020',
        '3:00',
        '4:30',
        'Viernes'
    ),
    (
        'D_OPT_067',
        'G_OPT_022',
        '8:00',
        '9:30',
        'Martes'
    ),
    (
        'D_OPT_068',
        'G_OPT_022',
        '8:00',
        '9:30',
        'Jueves'
    ),
    (
        'D_OPT_069',
        'G_OPT_022',
        '8:00',
        '9:30',
        'Viernes'
    ),
    (
        'D_OPT_070',
        'G_OPT_024',
        '6:30',
        '8:00',
        'Martes'
    ),
    (
        'D_OPT_071',
        'G_OPT_024',
        '6:30',
        '8:00',
        'Jueves'
    ),
    (
        'D_OPT_072',
        'G_OPT_024',
        '6:30',
        '8:00',
        'Viernes'
    );

-- IIA Semestre 6 - Matutino
INSERT INTO
    distribucion (
        id,
        id_grupo,
        hora_ini,
        hora_fin,
        dia
    )
VALUES (
        'D_OPT_073',
        'G_OPT_025',
        '10:30',
        '12:00',
        'Lunes'
    ),
    (
        'D_OPT_074',
        'G_OPT_025',
        '10:30',
        '12:00',
        'Miércoles'
    ),
    (
        'D_OPT_075',
        'G_OPT_025',
        '10:30',
        '12:00',
        'Viernes'
    ),
    (
        'D_OPT_076',
        'G_OPT_027',
        '8:30',
        '10:00',
        'Lunes'
    ),
    (
        'D_OPT_077',
        'G_OPT_027',
        '8:30',
        '10:00',
        'Miércoles'
    ),
    (
        'D_OPT_078',
        'G_OPT_027',
        '8:30',
        '10:00',
        'Viernes'
    ),
    (
        'D_OPT_079',
        'G_OPT_029',
        '12:00',
        '1:30',
        'Lunes'
    ),
    (
        'D_OPT_080',
        'G_OPT_029',
        '12:00',
        '1:30',
        'Miércoles'
    ),
    (
        'D_OPT_081',
        'G_OPT_029',
        '12:00',
        '1:30',
        'Viernes'
    ),
    (
        'D_OPT_082',
        'G_OPT_031',
        '7:00',
        '8:30',
        'Martes'
    ),
    (
        'D_OPT_083',
        'G_OPT_031',
        '7:00',
        '8:30',
        'Jueves'
    ),
    (
        'D_OPT_084',
        'G_OPT_031',
        '7:00',
        '8:30',
        'Viernes'
    );

-- IIA Semestre 6 - Vespertino
INSERT INTO
    distribucion (
        id,
        id_grupo,
        hora_ini,
        hora_fin,
        dia
    )
VALUES (
        'D_OPT_085',
        'G_OPT_026',
        '6:30',
        '8:00',
        'Lunes'
    ),
    (
        'D_OPT_086',
        'G_OPT_026',
        '6:30',
        '8:00',
        'Miércoles'
    ),
    (
        'D_OPT_087',
        'G_OPT_026',
        '6:30',
        '8:00',
        'Viernes'
    ),
    (
        'D_OPT_088',
        'G_OPT_028',
        '5:00',
        '6:30',
        'Lunes'
    ),
    (
        'D_OPT_089',
        'G_OPT_028',
        '5:00',
        '6:30',
        'Miércoles'
    ),
    (
        'D_OPT_090',
        'G_OPT_028',
        '5:00',
        '6:30',
        'Viernes'
    ),
    (
        'D_OPT_091',
        'G_OPT_030',
        '3:00',
        '4:30',
        'Lunes'
    ),
    (
        'D_OPT_092',
        'G_OPT_030',
        '3:00',
        '4:30',
        'Miércoles'
    ),
    (
        'D_OPT_093',
        'G_OPT_030',
        '3:00',
        '4:30',
        'Viernes'
    );

-- IIA Semestre 7 - Matutino
INSERT INTO
    distribucion (
        id,
        id_grupo,
        hora_ini,
        hora_fin,
        dia
    )
VALUES (
        'D_OPT_094',
        'G_OPT_033',
        '10:30',
        '12:00',
        'Lunes'
    ),
    (
        'D_OPT_095',
        'G_OPT_033',
        '10:30',
        '12:00',
        'Miércoles'
    ),
    (
        'D_OPT_096',
        'G_OPT_033',
        '10:30',
        '12:00',
        'Viernes'
    ),
    (
        'D_OPT_097',
        'G_OPT_035',
        '8:30',
        '10:00',
        'Lunes'
    ),
    (
        'D_OPT_098',
        'G_OPT_035',
        '8:30',
        '10:00',
        'Miércoles'
    ),
    (
        'D_OPT_099',
        'G_OPT_035',
        '8:30',
        '10:00',
        'Viernes'
    ),
    (
        'D_OPT_100',
        'G_OPT_037',
        '12:00',
        '1:30',
        'Lunes'
    ),
    (
        'D_OPT_101',
        'G_OPT_037',
        '12:00',
        '1:30',
        'Miércoles'
    ),
    (
        'D_OPT_102',
        'G_OPT_037',
        '12:00',
        '1:30',
        'Viernes'
    );

-- IIA Semestre 7 - Vespertino
INSERT INTO
    distribucion (
        id,
        id_grupo,
        hora_ini,
        hora_fin,
        dia
    )
VALUES (
        'D_OPT_103',
        'G_OPT_032',
        '6:30',
        '8:00',
        'Lunes'
    ),
    (
        'D_OPT_104',
        'G_OPT_032',
        '6:30',
        '8:00',
        'Miércoles'
    ),
    (
        'D_OPT_105',
        'G_OPT_032',
        '6:30',
        '8:00',
        'Viernes'
    ),
    (
        'D_OPT_106',
        'G_OPT_034',
        '5:00',
        '6:30',
        'Lunes'
    ),
    (
        'D_OPT_107',
        'G_OPT_034',
        '5:00',
        '6:30',
        'Miércoles'
    ),
    (
        'D_OPT_108',
        'G_OPT_034',
        '5:00',
        '6:30',
        'Viernes'
    ),
    (
        'D_OPT_109',
        'G_OPT_036',
        '3:00',
        '4:30',
        'Lunes'
    ),
    (
        'D_OPT_110',
        'G_OPT_036',
        '3:00',
        '4:30',
        'Miércoles'
    ),
    (
        'D_OPT_111',
        'G_OPT_036',
        '3:00',
        '4:30',
        'Viernes'
    ),
    (
        'D_OPT_112',
        'G_OPT_038',
        '8:00',
        '9:30',
        'Martes'
    ),
    (
        'D_OPT_113',
        'G_OPT_038',
        '8:00',
        '9:30',
        'Jueves'
    ),
    (
        'D_OPT_114',
        'G_OPT_038',
        '8:00',
        '9:30',
        'Viernes'
    );

-- LCD Semestre 6 - Matutino
INSERT INTO
    distribucion (
        id,
        id_grupo,
        hora_ini,
        hora_fin,
        dia
    )
VALUES (
        'D_OPT_115',
        'G_OPT_039',
        '10:30',
        '12:00',
        'Lunes'
    ),
    (
        'D_OPT_116',
        'G_OPT_039',
        '10:30',
        '12:00',
        'Miércoles'
    ),
    (
        'D_OPT_117',
        'G_OPT_039',
        '10:30',
        '12:00',
        'Viernes'
    ),
    (
        'D_OPT_118',
        'G_OPT_041',
        '8:30',
        '10:00',
        'Lunes'
    ),
    (
        'D_OPT_119',
        'G_OPT_041',
        '8:30',
        '10:00',
        'Miércoles'
    ),
    (
        'D_OPT_120',
        'G_OPT_041',
        '8:30',
        '10:00',
        'Viernes'
    ),
    (
        'D_OPT_121',
        'G_OPT_043',
        '12:00',
        '1:30',
        'Lunes'
    ),
    (
        'D_OPT_122',
        'G_OPT_043',
        '12:00',
        '1:30',
        'Miércoles'
    ),
    (
        'D_OPT_123',
        'G_OPT_043',
        '12:00',
        '1:30',
        'Viernes'
    );

-- LCD Semestre 6 - Vespertino
INSERT INTO
    distribucion (
        id,
        id_grupo,
        hora_ini,
        hora_fin,
        dia
    )
VALUES (
        'D_OPT_124',
        'G_OPT_040',
        '6:30',
        '8:00',
        'Lunes'
    ),
    (
        'D_OPT_125',
        'G_OPT_040',
        '6:30',
        '8:00',
        'Miércoles'
    ),
    (
        'D_OPT_126',
        'G_OPT_040',
        '6:30',
        '8:00',
        'Viernes'
    ),
    (
        'D_OPT_127',
        'G_OPT_042',
        '5:00',
        '6:30',
        'Lunes'
    ),
    (
        'D_OPT_128',
        'G_OPT_042',
        '5:00',
        '6:30',
        'Miércoles'
    ),
    (
        'D_OPT_129',
        'G_OPT_042',
        '5:00',
        '6:30',
        'Viernes'
    ),
    (
        'D_OPT_130',
        'G_OPT_044',
        '3:00',
        '4:30',
        'Lunes'
    ),
    (
        'D_OPT_131',
        'G_OPT_044',
        '3:00',
        '4:30',
        'Miércoles'
    ),
    (
        'D_OPT_132',
        'G_OPT_044',
        '3:00',
        '4:30',
        'Viernes'
    );

-- LCD Semestre 7 - Matutino
INSERT INTO
    distribucion (
        id,
        id_grupo,
        hora_ini,
        hora_fin,
        dia
    )
VALUES (
        'D_OPT_133',
        'G_OPT_045',
        '10:30',
        '12:00',
        'Lunes'
    ),
    (
        'D_OPT_134',
        'G_OPT_045',
        '10:30',
        '12:00',
        'Miércoles'
    ),
    (
        'D_OPT_135',
        'G_OPT_045',
        '10:30',
        '12:00',
        'Viernes'
    ),
    (
        'D_OPT_136',
        'G_OPT_047',
        '8:30',
        '10:00',
        'Lunes'
    ),
    (
        'D_OPT_137',
        'G_OPT_047',
        '8:30',
        '10:00',
        'Miércoles'
    ),
    (
        'D_OPT_138',
        'G_OPT_047',
        '8:30',
        '10:00',
        'Viernes'
    ),
    (
        'D_OPT_139',
        'G_OPT_049',
        '12:00',
        '1:30',
        'Lunes'
    ),
    (
        'D_OPT_140',
        'G_OPT_049',
        '12:00',
        '1:30',
        'Miércoles'
    ),
    (
        'D_OPT_141',
        'G_OPT_049',
        '12:00',
        '1:30',
        'Viernes'
    ),
    (
        'D_OPT_142',
        'G_OPT_051',
        '7:00',
        '8:30',
        'Martes'
    ),
    (
        'D_OPT_143',
        'G_OPT_051',
        '7:00',
        '8:30',
        'Jueves'
    ),
    (
        'D_OPT_144',
        'G_OPT_051',
        '7:00',
        '8:30',
        'Viernes'
    );

-- LCD Semestre 7 - Vespertino
INSERT INTO
    distribucion (
        id,
        id_grupo,
        hora_ini,
        hora_fin,
        dia
    )
VALUES (
        'D_OPT_145',
        'G_OPT_046',
        '6:30',
        '8:00',
        'Lunes'
    ),
    (
        'D_OPT_146',
        'G_OPT_046',
        '6:30',
        '8:00',
        'Miércoles'
    ),
    (
        'D_OPT_147',
        'G_OPT_046',
        '6:30',
        '8:00',
        'Viernes'
    ),
    (
        'D_OPT_148',
        'G_OPT_048',
        '5:00',
        '6:30',
        'Lunes'
    ),
    (
        'D_OPT_149',
        'G_OPT_048',
        '5:00',
        '6:30',
        'Miércoles'
    ),
    (
        'D_OPT_150',
        'G_OPT_048',
        '5:00',
        '6:30',
        'Viernes'
    ),
    (
        'D_OPT_151',
        'G_OPT_050',
        '3:00',
        '4:30',
        'Lunes'
    ),
    (
        'D_OPT_152',
        'G_OPT_050',
        '3:00',
        '4:30',
        'Miércoles'
    ),
    (
        'D_OPT_153',
        'G_OPT_050',
        '3:00',
        '4:30',
        'Viernes'
    );
