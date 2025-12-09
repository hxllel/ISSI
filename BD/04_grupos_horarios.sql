-- ==================================================
-- Grupos y Distribución de Horarios
-- ==================================================
-- Descripción: Inserta grupos de materias con sus horarios
-- Orden de ejecución: 4
-- Prerequisito: Ejecutar 04_unidades_aprendizaje.sql
-- ==================================================

USE SAES;
-- ==================================================
DELETE FROM grupo;

DELETE FROM distribucion;

-- Crear 9 grupos manualmente (3 profesores x 3 carreras)
-- 1 grupo por profesor para cada carrera (IIA, LCD, ISC)

-- Grupos para HIJKLMNO
INSERT INTO grupo (id, nombre, id_ua, id_prof, turno, cupo, reg_final, reg_extra)
VALUES 
    ('G0001', '1BM1', 'UA0051', 'HIJKLMNO', 'Matutino', 35, NULL, NULL), -- IIA - Fundamentos de Programación
    ('G0002', '1AM1', 'UA0096', 'HIJKLMNO', 'Matutino', 35, NULL, NULL), -- LCD - Fundamentos de Programación  
    ('G0003', '1CM1', 'UA0001', 'HIJKLMNO', 'Matutino', 35, NULL, NULL); -- ISC - Fundamentos de Programación

-- Grupos para PROF0001
INSERT INTO grupo (id, nombre, id_ua, id_prof, turno, cupo, reg_final, reg_extra)
VALUES 
    ('G0004', '1BM2', 'UA0052', 'PROF0001', 'Matutino', 35, NULL, NULL), -- IIA - Matemáticas Discretas
    ('G0005', '1AM2', 'UA0097', 'PROF0001', 'Matutino', 35, NULL, NULL), -- LCD - Matemáticas Discretas
    ('G0006', '1CM2', 'UA0002', 'PROF0001', 'Matutino', 35, NULL, NULL); -- ISC - Matemáticas Discretas

-- Grupos para PROF0002
INSERT INTO grupo (id, nombre, id_ua, id_prof, turno, cupo, reg_final, reg_extra)
VALUES 
    ('G0007', '1BM3', 'UA0053', 'PROF0002', 'Matutino', 35, NULL, NULL), -- IIA - Cálculo
    ('G0008', '1AM3', 'UA0098', 'PROF0002', 'Matutino', 35, NULL, NULL), -- LCD - Cálculo
    ('G0009', '1CM3', 'UA0003', 'PROF0002', 'Matutino', 35, NULL, NULL); -- ISC - Cálculo

-- Distribución de horarios para los grupos
-- Patrón de horario: Lunes, Martes, Miércoles (7:00-8:30, 8:30-10:00, 10:30-12:00)

-- HIJKLMNO - Grupos de Fundamentos de Programación (3 sesiones por semana)
INSERT INTO distribucion (id, id_grupo, hora_ini, hora_fin, dia)
VALUES 
    -- Grupo 1BM1 (IIA)
    ('D0001', 'G0001', '7:00', '8:30', 'Lunes'),
    ('D0002', 'G0001', '7:00', '8:30', 'Martes'),
    ('D0003', 'G0001', '7:00', '8:30', 'Miércoles'),
    -- Grupo 1AM1 (LCD)
    ('D0004', 'G0002', '8:30', '10:00', 'Lunes'),
    ('D0005', 'G0002', '8:30', '10:00', 'Martes'),
    ('D0006', 'G0002', '8:30', '10:00', 'Miércoles'),
    -- Grupo 1CM1 (ISC)
    ('D0007', 'G0003', '10:30', '12:00', 'Lunes'),
    ('D0008', 'G0003', '10:30', '12:00', 'Martes'),
    ('D0009', 'G0003', '10:30', '12:00', 'Miércoles');

-- PROF0001 - Grupos de Matemáticas Discretas (3 sesiones por semana)
INSERT INTO distribucion (id, id_grupo, hora_ini, hora_fin, dia)
VALUES 
    -- Grupo 1BM2 (IIA)
    ('D0010', 'G0004', '7:00', '8:30', 'Lunes'),
    ('D0011', 'G0004', '7:00', '8:30', 'Martes'),
    ('D0012', 'G0004', '7:00', '8:30', 'Miércoles'),
    -- Grupo 1AM2 (LCD)
    ('D0013', 'G0005', '8:30', '10:00', 'Lunes'),
    ('D0014', 'G0005', '8:30', '10:00', 'Martes'),
    ('D0015', 'G0005', '8:30', '10:00', 'Miércoles'),
    -- Grupo 1CM2 (ISC)
    ('D0016', 'G0006', '10:30', '12:00', 'Lunes'),
    ('D0017', 'G0006', '10:30', '12:00', 'Martes'),
    ('D0018', 'G0006', '10:30', '12:00', 'Miércoles');

-- PROF0002 - Grupos de Cálculo (3-5 sesiones por semana según carrera)
INSERT INTO distribucion (id, id_grupo, hora_ini, hora_fin, dia)
VALUES 
    -- Grupo 1BM3 (IIA - Cálculo 10.5 créditos = 5 sesiones)
    ('D0019', 'G0007', '7:00', '8:30', 'Lunes'),
    ('D0020', 'G0007', '7:00', '8:30', 'Martes'),
    ('D0021', 'G0007', '7:00', '8:30', 'Miércoles'),
    ('D0022', 'G0007', '7:00', '8:30', 'Jueves'),
    ('D0023', 'G0007', '7:00', '8:30', 'Viernes'),
    -- Grupo 1AM3 (LCD - Cálculo 7.5 créditos = 3 sesiones)
    ('D0024', 'G0008', '8:30', '10:00', 'Lunes'),
    ('D0025', 'G0008', '8:30', '10:00', 'Martes'),
    ('D0026', 'G0008', '8:30', '10:00', 'Miércoles'),
    -- Grupo 1CM3 (ISC - Cálculo 7.5 créditos = 3 sesiones)
    ('D0027', 'G0009', '10:30', '12:00', 'Lunes'),
    ('D0028', 'G0009', '10:30', '12:00', 'Martes'),
    ('D0029', 'G0009', '10:30', '12:00', 'Miércoles');
