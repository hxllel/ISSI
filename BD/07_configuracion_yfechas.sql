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

-- ==================================================
-- DATOS MÉDICOS
-- ==================================================
DELETE FROM enfermedades;
DELETE FROM datos_medicos;

INSERT INTO datos_medicos (id, id_usuario, peso, altura, tipo_sangre, nss)
VALUES 
    ('DM0001', '2024630101', 70.5, 1.75, 'O+', '12345678901'),
    ('DM0002', '2024630201', 65.0, 1.68, 'A+', '12345678902'),
    ('DM0003', '2024630301', 80.0, 1.80, 'B+', '12345678903'),
    ('DM0004', 'HIJKLMNO', 75.0, 1.78, 'O+', '98765432101'),
    ('DM0005', 'PROF0001', 72.0, 1.76, 'AB+', '98765432102');

-- ==================================================
-- ENFERMEDADES
-- ==================================================
INSERT INTO enfermedades (id, id_dat_med, descri)
VALUES 
    ('ENF001', 'DM0001', 'Asma leve controlada'),
    ('ENF002', 'DM0002', 'Ninguna enfermedad crónica'),
    ('ENF003', 'DM0003', 'Hipertensión controlada con medicamento');

-- ==================================================
-- CONTADOR DE EVALUACIONES
-- ==================================================
DELETE FROM contador;

INSERT INTO contador (id_profesor, suma, registrados)
VALUES 
    ('HIJKLMNO', 42, 5),
    ('PROF0001', 38, 4),
    ('PROF0002', 45, 5);

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

INSERT INTO ets (id, id_mr, id_grupo, comprobante, validado, calificado)
VALUES 
    ('ETS001', '457', 'ETSG001', NULL, 1, 0.0),
    -- Inscripciones ETS del alumno desfasado (2022630400)
    -- Fundamentos de Diseño Digital
    ('ETS002', '458', 'ETSG002', NULL, 1, 0.0),
    -- Bases de Datos
    ('ETS003', '459', 'ETSG003', NULL, 1, 0.0),
    -- Finanzas Empresariales
    ('ETS004', '460', 'ETSG004', NULL, 0, 0.0),
    -- Inscripciones ETS del alumno sin semestres (2019630500)
    -- Materia de 3er semestre LCD
    ('ETS005', '464', 'ETSG005', NULL, 1, 0.0),
    -- Materia de 4to semestre LCD
    ('ETS006', '465', 'ETSG006', NULL, 1, 0.0),
    -- Materia de 5to semestre LCD
    ('ETS007', '466', 'ETSG007', NULL, 0, 0.0);

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
VALUES (
        '457',
        'EST2021630309',
        'UA0008',
        '2',
        '1',
        'Reprobada'
    ),
    -- Materias reprobadas del alumno desfasado (2022630400)
    -- Solo las materias que AÚN están reprobadas (sin recuperar)
    -- Materia reprobada de 3er semestre: Fundamentos de Diseño Digital (desfasada - cursándola actualmente)
    (
        '458',
        'EST2022630400',
        'UA0014',
        '2',
        '1',
        'Desfasada'
    ),
    -- Materia reprobada de 3er semestre: Bases de Datos (desfasada - cursándola actualmente)
    (
        '459',
        'EST2022630400',
        'UA0015',
        '2',
        '1',
        'Desfasada'
    ),
    -- Materia reprobada de 3er semestre: Finanzas Empresariales (desfasada - pendiente)
    (
        '460',
        'EST2022630400',
        'UA0016',
        '3',
        '0',
        'Desfasada'
    ),
    -- Materias reprobadas de 4to semestre (desfasadas)
    (
        '461',
        'EST2022630400',
        'UA0019',
        '2',
        '1',
        'Desfasada'
    ),
    (
        '462',
        'EST2022630400',
        'UA0022',
        '2',
        '0',
        'Desfasada'
    ),
    (
        '463',
        'EST2022630400',
        'UA0023',
        '2',
        '0',
        'Desfasada'
    ),
    -- Materias reprobadas del alumno sin semestres (2019630500)
    -- Alumno de LCD que ha agotado sus semestres disponibles
    -- Materias pendientes de 3er semestre
    (
        '464',
        'EST2019630500',
        'UA0066',
        '0',
        '3',
        'Sin Semestres'
    ),
    -- Materias pendientes de 4to semestre
    (
        '465',
        'EST2019630500',
        'UA0071',
        '0',
        '2',
        'Sin Semestres'
    ),
    -- Materias pendientes de 5to semestre
    (
        '466',
        'EST2019630500',
        'UA0077',
        '0',
        '2',
        'Sin Semestres'
    ),
    -- Materias pendientes de 6to semestre
    (
        '467',
        'EST2019630500',
        'UA0082',
        '0',
        '1',
        'Sin Semestres'
    ),
    -- Materias pendientes de 7mo semestre
    (
        '468',
        'EST2019630500',
        'UA0088',
        '0',
        '1',
        'Sin Semestres'
    ),
    (
        '469',
        'EST2019630500',
        'UA0089',
        '0',
        '1',
        'Sin Semestres'
    ),
    -- Materias reprobadas del alumno regular 7mo semestre IIA con reprobadas (2022630700)
    -- Materias de semestres anteriores que aún no ha recuperado
    -- Materia de 2do semestre - Mecánica y Electromagnetismo (ya recuperada por Extraordinario)
    -- Materia de 3er semestre - Ecuaciones Diferenciales (ya recuperada por ETS)
    -- Materias de 4to semestre pendientes
    (
        '470',
        'EST2022630700',
        'UA0067',
        '2',
        '1',
        'Reprobada'
    ),
    (
        '471',
        'EST2022630700',
        'UA0069',
        '2',
        '0',
        'Reprobada'
    ),
    -- Materias reprobadas y recuperadas del alumno 4to semestre (2025631000)
    -- Reprobadas de 1er semestre (ya recuperadas)
    (
        '472',
        'EST2025631000',
        'UA0065',
        '0',
        '1',
        'Aprobada'
    ),
    (
        '473',
        'EST2025631000',
        'UA0067',
        '0',
        '1',
        'Aprobada'
    ),
    -- Reprobada de 2do semestre (ya recuperada)
    (
        '474',
        'EST2025631000',
        'UA0070',
        '0',
        '1',
        'Aprobada'
    ),
    -- Reprobadas de 3er semestre (ya recuperadas)
    (
        '475',
        'EST2025631000',
        'UA0074',
        '0',
        '1',
        'Aprobada'
    ),
    (
        '476',
        'EST2025631000',
        'UA0076',
        '0',
        '1',
        'Aprobada'
    ),
    -- Materias reprobadas y recuperadas del alumno 2do semestre ISC (2027631200)
    -- Reprobadas de 1er semestre (ya recuperadas)
    (
        '477',
        'EST2027631200',
        'UA0001',
        '0',
        '1',
        'Aprobada'
    ),
    (
        '478',
        'EST2027631200',
        'UA0003',
        '0',
        '1',
        'Aprobada'
    ),
    (
        '479',
        'EST2027631200',
        'UA0004',
        '0',
        '1',
        'Aprobada'
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

-- Actualizar fecha de inscripción para alumno desfasado
UPDATE inscripcion
set
    fecha_hora_in = "2025-11-25 09:00:00",
    fecha_hora_cad = "2025-12-05 23:59:59"
where
    id_alumno = "2022630400";

UPDATE inscripcion
set
    fecha_hora_in = "2025-11-24 18:00:00",
    fecha_hora_cad = "2025-11-24 22:00:00"
where
    id_alumno = "2021630310";

-- ==================================================================
-- ACTUALIZAR MAT_INSCRITOS CON CALIFICACIONES FINALES Y EXTRA
-- ==================================================================

UPDATE mat_inscritos
SET
    calificacion_final = 8.0,
    extra = NULL
WHERE
    id = 'M0001';

UPDATE mat_inscritos
SET
    calificacion_final = 8.3,
    extra = NULL
WHERE
    id = 'M0002';

UPDATE mat_inscritos
SET
    calificacion_final = 7.5,
    extra = NULL
WHERE
    id = 'M0003';

UPDATE mat_inscritos
SET
    calificacion_final = 8.9,
    extra = NULL
WHERE
    id = 'M0004';

UPDATE mat_inscritos
SET
    calificacion_final = 8.5,
    extra = NULL
WHERE
    id = 'M0005';

UPDATE mat_inscritos
SET
    calificacion_final = 8.2,
    extra = NULL
WHERE
    id = 'M0006';

UPDATE mat_inscritos
SET
    calificacion_final = 8.0,
    extra = NULL
WHERE
    id = 'M0007';

UPDATE mat_inscritos
SET
    calificacion_final = 8.6,
    extra = NULL
WHERE
    id = 'M0008';

UPDATE mat_inscritos
SET
    calificacion_final = 7.6,
    extra = NULL
WHERE
    id = 'M0009';

UPDATE mat_inscritos
SET
    calificacion_final = 8.8,
    extra = NULL
WHERE
    id = 'M0010';

UPDATE mat_inscritos
SET
    calificacion_final = 8.2,
    extra = NULL
WHERE
    id = 'M0011';

UPDATE mat_inscritos
SET
    calificacion_final = 9.0,
    extra = NULL
WHERE
    id = 'M0012';

UPDATE mat_inscritos
SET
    calificacion_final = 7.9,
    extra = NULL
WHERE
    id = 'M0013';

UPDATE mat_inscritos
SET
    calificacion_final = 8.5,
    extra = NULL
WHERE
    id = 'M0014';

UPDATE mat_inscritos
SET
    calificacion_final = 8.8,
    extra = NULL
WHERE
    id = 'M0015';

UPDATE mat_inscritos
SET
    calificacion_final = 7.4,
    extra = NULL
WHERE
    id = 'M0016';

UPDATE mat_inscritos
SET
    calificacion_final = 8.4,
    extra = NULL
WHERE
    id = 'M0017';

UPDATE mat_inscritos
SET
    calificacion_final = 8.0,
    extra = NULL
WHERE
    id = 'M0018';

UPDATE mat_inscritos
SET
    calificacion_final = 6.9,
    extra = NULL
WHERE
    id = 'M0019';

UPDATE mat_inscritos
SET
    calificacion_final = 8.2,
    extra = NULL
WHERE
    id = 'M0020';

UPDATE mat_inscritos
SET
    calificacion_final = 8.3,
    extra = NULL
WHERE
    id = 'M0021';

UPDATE mat_inscritos
SET
    calificacion_final = 9.0,
    extra = NULL
WHERE
    id = 'M0022';

UPDATE mat_inscritos
SET
    calificacion_final = 7.7,
    extra = NULL
WHERE
    id = 'M0023';

UPDATE mat_inscritos
SET
    calificacion_final = 8.8,
    extra = NULL
WHERE
    id = 'M0024';

UPDATE mat_inscritos
SET
    calificacion_final = 8.5,
    extra = NULL
WHERE
    id = 'M0025';

UPDATE mat_inscritos
SET
    calificacion_final = 7.9,
    extra = NULL
WHERE
    id = 'M0026';

UPDATE mat_inscritos
SET
    calificacion_final = 8.3,
    extra = NULL
WHERE
    id = 'M0027';

UPDATE mat_inscritos
SET
    calificacion_final = 8.6,
    extra = NULL
WHERE
    id = 'M0028';

UPDATE mat_inscritos
SET
    calificacion_final = 7.5,
    extra = NULL
WHERE
    id = 'M0029';

UPDATE mat_inscritos
SET
    calificacion_final = 8.9,
    extra = NULL
WHERE
    id = 'M0030';

-- Alumno 2023630107 - 3BM1 (IIA) - Semestre 3 completado
UPDATE mat_inscritos
SET
    calificacion_final = 8.6,
    extra = NULL
WHERE
    id = 'M0031';

UPDATE mat_inscritos
SET
    calificacion_final = 8.2,
    extra = NULL
WHERE
    id = 'M0032';

UPDATE mat_inscritos
SET
    calificacion_final = 8.9,
    extra = NULL
WHERE
    id = 'M0033';

UPDATE mat_inscritos
SET
    calificacion_final = 8.1,
    extra = NULL
WHERE
    id = 'M0034';

UPDATE mat_inscritos
SET
    calificacion_final = 8.7,
    extra = NULL
WHERE
    id = 'M0035';

UPDATE mat_inscritos
SET
    calificacion_final = 8.4,
    extra = NULL
WHERE
    id = 'M0036';

-- Alumno 2022630208 - 5AM1 (LCD) - Semestre 5 completado
UPDATE mat_inscritos
SET
    calificacion_final = 8.1,
    extra = NULL
WHERE
    id = 'M0037';

UPDATE mat_inscritos
SET
    calificacion_final = 9.2,
    extra = NULL
WHERE
    id = 'M0038';

UPDATE mat_inscritos
SET
    calificacion_final = 8.5,
    extra = NULL
WHERE
    id = 'M0039';

UPDATE mat_inscritos
SET
    calificacion_final = 7.8,
    extra = NULL
WHERE
    id = 'M0040';

UPDATE mat_inscritos
SET
    calificacion_final = 8.7,
    extra = NULL
WHERE
    id = 'M0041';

UPDATE mat_inscritos
SET
    calificacion_final = 8.3,
    extra = NULL
WHERE
    id = 'M0042';

-- Alumno 2021630309 - 7CM1 (ISC) - Semestre 7
UPDATE mat_inscritos
SET
    calificacion_final = 8.5,
    extra = NULL
WHERE
    id = 'M0043';

UPDATE mat_inscritos
SET
    calificacion_final = 8.2,
    extra = NULL
WHERE
    id = 'M0044';

UPDATE mat_inscritos
SET
    calificacion_final = 8.8,
    extra = NULL
WHERE
    id = 'M0045';

-- Alumno 2021630310 - 8CM1 (ISC) - Semestre 8
UPDATE mat_inscritos
SET
    calificacion_final = 8.7,
    extra = NULL
WHERE
    id = 'M0046';

UPDATE mat_inscritos
SET
    calificacion_final = 9.1,
    extra = NULL
WHERE
    id = 'M0047';

UPDATE mat_inscritos
SET
    calificacion_final = 8.4,
    extra = NULL
WHERE
    id = 'M0048';

UPDATE mat_inscritos
SET
    calificacion_final = 8.9,
    extra = NULL
WHERE
    id = 'M0049';

UPDATE mat_inscritos
SET
    calificacion_final = 8.5,
    extra = NULL
WHERE
    id = 'M0050';

UPDATE mat_inscritos
SET
    calificacion_final = 8.8,
    extra = NULL
WHERE
    id = 'M0051';

-- ==================================================================
-- AGREGAR CALIFICACIONES EXTRA PARA ALGUNOS ALUMNOS (RECUPERACIÓN)
-- ==================================================================

-- Alumno 2024630101 - Una materia con extra (reprobó en ordinario)
UPDATE mat_inscritos
SET
    calificacion_final = 5.2,
    extra = 7.5
WHERE
    id = 'M0003';

-- Alumno 2024630102 - Una materia con extra
UPDATE mat_inscritos
SET
    calificacion_final = 5.8,
    extra = 8.0
WHERE
    id = 'M0009';

-- Alumno 2024630201 - Una materia reprobada sin recuperación
UPDATE mat_inscritos
SET
    calificacion_final = 4.5,
    extra = NULL
WHERE
    id = 'M0013';

-- Alumno 2024630202 - Una materia con extra
UPDATE mat_inscritos
SET
    calificacion_final = 5.0,
    extra = 7.2
WHERE
    id = 'M0019';

-- Alumno 2024630301 - Una materia reprobada
UPDATE mat_inscritos
SET
    calificacion_final = 4.9,
    extra = NULL
WHERE
    id = 'M0023';

-- Alumno 2024630302 - Una materia con extra
UPDATE mat_inscritos
SET
    calificacion_final = 5.3,
    extra = 7.8
WHERE
    id = 'M0029';

-- Alumno 2023630107 - Una materia reprobada pero pasó
UPDATE mat_inscritos
SET
    calificacion_final = 6.0,
    extra = NULL
WHERE
    id = 'M0034';

-- Alumno 2022630208 - Una materia con extra
UPDATE mat_inscritos
SET
    calificacion_final = 5.5,
    extra = 7.9
WHERE
    id = 'M0040';

-- Alumno 2021630309 - Fundamentos de Diseño Digital reprobada (según historial)
UPDATE mat_inscritos
SET
    calificacion_final = 7.2,
    extra = NULL
WHERE
    id = 'M0045';

-- Alumno 2021630310 - Sin reprobaciones (alumno excelente)
-- Se mantienen todas sus calificaciones sin cambios

-- Verificar las actualizaciones
SELECT
    g.nombre AS grupo,
    ua.nombre AS materia,
    mi.calificacion_primer,
    mi.calificacion_segundo,
    mi.calificacion_tercer,
    mi.calificacion_final,
    mi.extra,
    k.creditos_obtenidos,
    e.creditos_disponibles
FROM
    mat_inscritos mi
    INNER JOIN horario h ON mi.id_horario = h.id
    INNER JOIN grupo g ON mi.id_grupo = g.id
    INNER JOIN unidad_de_aprendizaje ua ON g.id_ua = ua.id
    INNER JOIN kardex k ON k.id_alumno = h.id_alumno
    INNER JOIN estudiante e ON e.id_usuario = h.id_alumno
ORDER BY h.id_alumno, g.nombre;

SELECT h.id, k.promedio, k.situacion_academica, e.promedio, e.estado_academico
FROM
    datos_personales h
    INNER JOIN kardex k ON k.id_alumno = h.id
    INNER JOIN estudiante e ON e.id_usuario = h.id
WHERE
    h.id = "2021630309";

-- ==================================================
-- BORRADORES DE HORARIO
-- ==================================================
DELETE FROM borrador_horario;

INSERT INTO borrador_horario (
    id, id_grupo, id_alumno, id_profesor, calificacion, materia,
    horas_lun, horas_mar, horas_mie, horas_jue, horas_vie,
    creditos_necesarios, valido
)
VALUES 
    ('BH001', 'G0001', '2024630101', 'HIJKLMNO', 'NA', 'Fundamentos de Programación',
     '07:00-08:30', NULL, '07:00-08:30', NULL, NULL, 7.5, 1),
    ('BH002', 'G0004', '2024630106', 'PROF0001', 'NA', 'Matemáticas Discretas',
     '09:00-10:30', NULL, '09:00-10:30', NULL, NULL, 7.5, 1),
    ('BH003', 'G0007', '2024630111', 'PROF0002', 'NA', 'Cálculo Diferencial',
     '11:00-12:30', NULL, '11:00-12:30', NULL, NULL, 7.5, 0);

-- ==================================================
-- RESEÑAS (EVALUACIONES DE PROFESORES)
-- ==================================================
DELETE FROM resena;

INSERT INTO resena (id, id_profesor, id_alumno, calificacion, comentarios, fecha)
VALUES 
    ('RES001', 'HIJKLMNO', '2024630101', 9.0, 'Excelente profesor, explica muy bien los conceptos', '2025-12-05'),
    ('RES002', 'HIJKLMNO', '2024630102', 8.5, 'Domina el tema y resuelve dudas eficientemente', '2025-12-05'),
    ('RES003', 'HIJKLMNO', '2024630103', 8.0, 'Buen profesor, aunque a veces va muy rápido', '2025-12-06'),
    ('RES004', 'HIJKLMNO', '2024630104', 9.5, 'El mejor profesor que he tenido, muy dedicado', '2025-12-06'),
    ('RES005', 'HIJKLMNO', '2024630105', 8.8, 'Excelente metodología de enseñanza', '2025-12-07'),
    ('RES006', 'PROF0001', '2024630106', 7.5, 'Buen profesor pero podría mejorar la organización', '2025-12-05'),
    ('RES007', 'PROF0001', '2024630107', 8.5, 'Clases dinámicas y ejemplos prácticos', '2025-12-06'),
    ('RES008', 'PROF0001', '2024630108', 8.0, 'Explica bien los temas complejos', '2025-12-06'),
    ('RES009', 'PROF0001', '2024630109', 8.2, 'Buen dominio de la materia', '2025-12-07'),
    ('RES010', 'PROF0002', '2024630111', 9.0, 'Excelente profesora, muy paciente', '2025-12-05'),
    ('RES011', 'PROF0002', '2024630112', 9.2, 'La mejor profesora, siempre disponible para dudas', '2025-12-06'),
    ('RES012', 'PROF0002', '2024630113', 9.5, 'Hace que el cálculo sea fácil de entender', '2025-12-06'),
    ('RES013', 'PROF0002', '2024630101', 8.8, 'Excelente didáctica y paciencia', '2025-12-07'),
    ('RES014', 'PROF0002', '2024630102', 9.0, 'Clases muy bien estructuradas', '2025-12-07');

-- ==================================================
-- LISTAS DE ASISTENCIA
-- ==================================================
DELETE FROM lista;

INSERT INTO lista (id, id_inscrito, fecha, asistencia)
VALUES 
    -- Grupo G0001 (HIJKLMNO - IIA Fundamentos)
    ('L0001', 'M0001', '2025-02-03', 'Asistencia'),
    ('L0002', 'M0002', '2025-02-03', 'Asistencia'),
    ('L0003', 'M0003', '2025-02-03', 'Asistencia'),
    ('L0004', 'M0004', '2025-02-03', 'Asistencia'),
    ('L0005', 'M0005', '2025-02-03', 'Retardo'),
    ('L0006', 'M0001', '2025-02-05', 'Asistencia'),
    ('L0007', 'M0002', '2025-02-05', 'Asistencia'),
    ('L0008', 'M0003', '2025-02-05', 'Falta'),
    ('L0009', 'M0004', '2025-02-05', 'Asistencia'),
    ('L0010', 'M0005', '2025-02-05', 'Asistencia'),
    -- Grupo G0004 (PROF0001 - IIA Matemáticas)
    ('L0011', 'M0016', '2025-02-03', 'Asistencia'),
    ('L0012', 'M0017', '2025-02-03', 'Asistencia'),
    ('L0013', 'M0018', '2025-02-03', 'Retardo'),
    ('L0014', 'M0019', '2025-02-03', 'Asistencia'),
    ('L0015', 'M0020', '2025-02-03', 'Asistencia'),
    -- Grupo G0007 (PROF0002 - IIA Cálculo)
    ('L0016', 'M0031', '2025-02-03', 'Asistencia'),
    ('L0017', 'M0032', '2025-02-03', 'Asistencia'),
    ('L0018', 'M0033', '2025-02-03', 'Asistencia'),
    ('L0019', 'M0034', '2025-02-03', 'Falta'),
    ('L0020', 'M0035', '2025-02-03', 'Asistencia');

-- ==================================================
-- AVISOS Y NOTICIAS
-- ==================================================
DELETE FROM avisos;

INSERT INTO avisos (id, titulo, descripcion, imagen, objetivo, fecha_vencimiento)
VALUES 
    ('AV001', 
     'Inicio del Semestre 2025-1', 
     'Les damos la bienvenida al semestre 2025-1. Las clases inician el 3 de febrero de 2025. Por favor revisen sus horarios y grupos asignados.',
     NULL,
     'Todos',
     '2025-02-10 23:59:59'),
    ('AV002', 
     'Registro de Calificaciones Primer Parcial', 
     'Profesores: El periodo para registrar calificaciones del primer parcial es del 1 al 7 de diciembre de 2025. No olviden subir las calificaciones en tiempo y forma.',
     NULL,
     'Profesores',
     '2025-12-07 23:59:59'),
    ('AV003', 
     'Evaluación Docente', 
     'Alumnos: Ya está disponible la evaluación docente. Tu opinión es muy importante para mejorar la calidad educativa. Periodo: del 1 al 15 de diciembre.',
     NULL,
     'Alumnos',
     '2025-12-15 23:59:59'),
    ('AV004', 
     'Examen a Título de Suficiencia (ETS)', 
     'Se abre el periodo de inscripción para exámenes ETS. Si tienes materias reprobadas, esta es tu oportunidad. Periodo del 1 al 30 de diciembre de 2025.',
     NULL,
     'Alumnos',
     '2025-12-30 23:59:59'),
    ('AV005', 
     'Mantenimiento del Sistema', 
     'El sistema SAES estará en mantenimiento el día 10 de diciembre de 2025 de 22:00 a 24:00 hrs. Disculpen las molestias.',
     NULL,
     'Todos',
     '2025-12-10 23:59:59'),
    ('AV006', 
     'Actualización de Datos Personales', 
     'Recuerden mantener actualizados sus datos personales y de contacto en el sistema. Esto es importante para recibir notificaciones oficiales.',
     NULL,
     'Todos',
     '2025-06-20 23:59:59');


