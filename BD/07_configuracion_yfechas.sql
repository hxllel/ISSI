-- ==================================================
-- Configuración del Sistema y Fechas
-- ==================================================
-- Descripción: Fechas relevantes, materias reprobadas, ETS, avisos y mensajes
-- Orden de ejecución: 7
-- Prerequisito: Ejecutar 07_ins_semestrea.sql
-- ==================================================

USE SAES;

-- ==================================================
-- FECHAS RELEVANTES Y CHAT DEL SISTEMA
-- ==================================================
-- ==================================================================
-- 8. OTROS DATOS DE PRUEBA NECESARIOS (Fechas y Chat originales)
-- ==================================================================

-- ==================================================
-- DATOS MÉDICOS
-- ==================================================

-- ==================================================
-- CONTADOR DE EVALUACIONES
-- ==================================================

-- ==================================================
-- GRUPOS ETS
-- ==================================================
DELETE FROM ets_grupo;

INSERT INTO
    ets_grupo (
        id,
        id_ua,
        id_aplicante,
        turno,
        hora_inicio,
        hora_final,
        fecha,
        periodo,
        cupo
    )
VALUES (
        'ETSG001',
        'UA0001',
        'HIJKLMNO',
        'Matutino',
        '08:00',
        '10:00',
        '2025-12-15',
        '2025-1',
        30
    ),
    -- Grupos ETS para alumno desfasado (2022630400) - ISC
    -- Fundamentos de Diseño Digital (3er semestre ISC)
    (
        'ETSG002',
        'UA0014',
        'PROF0001',
        'Matutino',
        '10:00',
        '12:00',
        '2025-12-16',
        '2025-1',
        25
    ),
    -- Bases de Datos (3er semestre ISC)
    (
        'ETSG003',
        'UA0015',
        'PROF0002',
        'Vespertino',
        '14:00',
        '16:00',
        '2025-12-17',
        '2025-1',
        25
    ),
    -- Finanzas Empresariales (3er semestre ISC)
    (
        'ETSG004',
        'UA0016',
        'HIJKLMNO',
        'Matutino',
        '08:00',
        '10:00',
        '2025-12-18',
        '2025-1',
        30
    ),
    -- Grupos ETS para alumno sin semestres (2019630500) - LCD
    -- Materia de 3er semestre LCD
    (
        'ETSG005',
        'UA0066',
        'PROF0001',
        'Vespertino',
        '16:00',
        '18:00',
        '2025-12-16',
        '2025-1',
        20
    ),
    -- Materia de 4to semestre LCD
    (
        'ETSG006',
        'UA0071',
        'PROF0002',
        'Matutino',
        '10:00',
        '12:00',
        '2025-12-19',
        '2025-1',
        20
    ),
    -- Materia de 5to semestre LCD
    (
        'ETSG007',
        'UA0077',
        'HIJKLMNO',
        'Vespertino',
        '14:00',
        '16:00',
        '2025-12-20',
        '2025-1',
        25
    );

-- ==================================================
-- INSCRIPCIONES A ETS
-- ==================================================
DELETE FROM ets;

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
        'ETS001',
        '457',
        'ETSG001',
        NULL,
        1,
        0.0
    ),
    -- Inscripciones ETS del alumno desfasado (2022630400)
    -- Fundamentos de Diseño Digital
    (
        'ETS002',
        '458',
        'ETSG002',
        NULL,
        1,
        0.0
    ),
    -- Bases de Datos
    (
        'ETS003',
        '459',
        'ETSG003',
        NULL,
        1,
        0.0
    ),
    -- Finanzas Empresariales
    (
        'ETS004',
        '460',
        'ETSG004',
        NULL,
        0,
        0.0
    ),
    -- Inscripciones ETS del alumno sin semestres (2019630500)
    -- Materia de 3er semestre LCD
    (
        'ETS005',
        '464',
        'ETSG005',
        NULL,
        1,
        0.0
    ),
    -- Materia de 4to semestre LCD
    (
        'ETS006',
        '465',
        'ETSG006',
        NULL,
        1,
        0.0
    ),
    -- Materia de 5to semestre LCD
    (
        'ETS007',
        '466',
        'ETSG007',
        NULL,
        0,
        0.0
    );

SELECT * FROM unidad_de_aprendizaje WHERE tipo = "OBLIGATORIA";

SELECT * FROM unidad_de_aprendizaje;

SELECT * FROM datos_personales;

delete from inscripcion;

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
        '0',
        '1',
        'Aprobada'
    ),
    (
        '466',
        'EST2024630108',
        'UA0057',
        '0',
        '1',
        'Aprobada'
    ),
    -- Alumno ISC 2024630304 (EST2024630304): 2 materias reprobadas
    (
        '467',
        'EST2024630304',
        'UA0020',
        '2',
        '1',
        'Reprobada'
    ),
    (
        '468',
        'EST2024630304',
        'UA0027',
        '2',
        '0',
        'Reprobada'
    );

SELECT
    e.id AS id_estudiante,
    e.id_usuario,
    e.promedio,
    e.creditos_disponibles,
    e.estado_academico,
    i.id AS id_inscripcion,
    i.fecha_hora_in,
    i.fecha_hora_cad
FROM estudiante e
    INNER JOIN inscripcion i ON e.id_usuario = i.id_alumno
ORDER BY e.promedio DESC;