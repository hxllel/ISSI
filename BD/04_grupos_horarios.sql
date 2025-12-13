-- ==================================================================
-- 4. INSERCION DE GRUPOS Y DISTRIBUCION DE HORARIOS (DINAMICO - VERSION DIRECTA)
-- Se crean grupos de forma dinamica para UAs OBLIGATORIAS y OPTATIVAS
-- Distribucion equitativa entre 30 profesores: 178 grupos / 30 = 6 grupos por profesor
-- ==================================================================

USE saes;

SET FOREIGN_KEY_CHECKS = 0;
DELETE FROM mat_inscritos;
DELETE FROM distribucion;
DELETE FROM grupo;
SET FOREIGN_KEY_CHECKS = 1;

-- Variables globales para contadores
SET @grupo_id_counter = 1;
SET @dist_id_counter = 1;
SET @prof_index = 0;

-- Lista de 30 profesores para rotacion equitativa
SET @profesores = 'HIJKLMNO,PROF0001,PROF0002,P0001RSV,P0002KND,P0003HGR,P0004ABC,P0005DEF,P0006GHI,P0007JKL,P0008MNO,P0009PQR,P0010STU,P0011VWX,P0012YZA,P0013BCD,P0014EFG,P0015HIJ,P0016KLM,P0017NOP,P0018QRS,P0019TUV,P0020ABC,P0021DEF,P0022GHI,P0023JKL,P0024MNO,P0025PQR,P0026STU,P0027VWX,P0028YZA,P0029BCD';
SET @num_profesores = 30;

SELECT 'Generando grupos obligatorios...' AS status;

-- ==================================================================
-- INSERTAR GRUPOS OBLIGATORIOS CON DISTRIBUCIONES
-- ==================================================================

INSERT INTO grupo (id, nombre, id_ua, id_prof, turno, cupo, reg_final, reg_extra)
SELECT 
    CONCAT('G', LPAD(@grupo_id_counter := @grupo_id_counter + 1, 5, '0')) AS id,
    CONCAT(semestre, 
           (SELECT prefijo_grupo FROM carrera WHERE nombre = ua.carrera),
           IF(@grupo_id_counter % 2 = 0, 'M', 'V'),
           '1') AS nombre,
    ua.id AS id_ua,
    SUBSTRING_INDEX(SUBSTRING_INDEX(@profesores, ',', ((@prof_index := @prof_index + 1) % @num_profesores) + 1), ',', -1) AS id_prof,
    IF(@grupo_id_counter % 2 = 0, 'Matutino', 'Vespertino') AS turno,
    35 AS cupo,
    0 AS reg_final,
    0 AS reg_extra
FROM unidad_de_aprendizaje ua
WHERE tipo = 'OBLIGATORIA'
ORDER BY carrera, semestre, id;

SELECT CONCAT('Grupos obligatorios generados: ', COUNT(*)) AS resultado
FROM grupo;

SELECT 'Generando distribuciones para grupos obligatorios...' AS status;

-- ==================================================================
-- GENERAR DISTRIBUCIONES PARA GRUPOS OBLIGATORIOS
-- ==================================================================

-- Insertar distribuciones (3-5 sesiones por grupo según créditos)
INSERT INTO distribucion (id, id_grupo, hora_ini, hora_fin, dia)
SELECT
    CONCAT('D', LPAD((@dist_id_counter := @dist_id_counter + 1), 5, '0')) AS id,
    g.id AS id_grupo,
    CASE 
        WHEN g.turno = 'Matutino' THEN
            CASE (FLOOR((@prof_index - 1) / @num_profesores)) % 4
                WHEN 0 THEN '7:00'
                WHEN 1 THEN '8:30'
                WHEN 2 THEN '10:30'
                WHEN 3 THEN '12:00'
            END
        ELSE
            CASE (FLOOR((@prof_index - 1) / @num_profesores)) % 4
                WHEN 0 THEN '15:00'
                WHEN 1 THEN '16:30'
                WHEN 2 THEN '18:30'
                WHEN 3 THEN '20:00'
            END
    END AS hora_ini,
    CASE 
        WHEN g.turno = 'Matutino' THEN
            CASE (FLOOR((@prof_index - 1) / @num_profesores)) % 4
                WHEN 0 THEN '8:30'
                WHEN 1 THEN '10:00'
                WHEN 2 THEN '12:00'
                WHEN 3 THEN '13:30'
            END
        ELSE
            CASE (FLOOR((@prof_index - 1) / @num_profesores)) % 4
                WHEN 0 THEN '16:30'
                WHEN 1 THEN '18:00'
                WHEN 2 THEN '20:00'
                WHEN 3 THEN '21:30'
            END
    END AS hora_fin,
    CASE sesion_num
        WHEN 1 THEN IF(g.turno = 'Matutino', 'Lunes', 'Martes')
        WHEN 2 THEN IF(g.turno = 'Matutino', 'Miercoles', 'Jueves')
        WHEN 3 THEN 'Viernes'
        WHEN 4 THEN IF(g.turno = 'Matutino', 'Martes', 'Lunes')
        WHEN 5 THEN IF(g.turno = 'Matutino', 'Jueves', 'Miercoles')
    END AS dia
FROM grupo g
INNER JOIN unidad_de_aprendizaje ua ON ua.id = g.id_ua
CROSS JOIN (
    SELECT 1 AS sesion_num UNION ALL
    SELECT 2 UNION ALL
    SELECT 3 UNION ALL
    SELECT 4 UNION ALL
    SELECT 5
) sesiones
WHERE ua.tipo = 'OBLIGATORIA'
  AND sesion_num <= CASE 
    WHEN ua.credito >= 10.5 THEN 5
    WHEN ua.credito = 9.0 THEN 4
    ELSE 3
  END
ORDER BY g.id, sesion_num;

SELECT CONCAT('Distribuciones generadas: ', COUNT(*)) AS resultado
FROM distribucion;

SELECT 'Generando grupos optativos...' AS status;

-- ==================================================================
-- INSERTAR GRUPOS OPTATIVOS CON DISTRIBUCIONES
-- ==================================================================

INSERT INTO grupo (id, nombre, id_ua, id_prof, turno, cupo, reg_final, reg_extra)
SELECT 
    CONCAT('G', LPAD(@grupo_id_counter := @grupo_id_counter + 1, 5, '0')) AS id,
    CONCAT(semestre, 
           (SELECT prefijo_grupo FROM carrera WHERE nombre = ua.carrera),
           IF(@grupo_id_counter % 2 = 0, 'M', 'V'),
           '1') AS nombre,
    ua.id AS id_ua,
    SUBSTRING_INDEX(SUBSTRING_INDEX(@profesores, ',', ((@prof_index := @prof_index + 1) % @num_profesores) + 1), ',', -1) AS id_prof,
    IF(@grupo_id_counter % 2 = 0, 'Matutino', 'Vespertino') AS turno,
    30 AS cupo,
    0 AS reg_final,
    0 AS reg_extra
FROM unidad_de_aprendizaje ua
WHERE tipo = 'OPTATIVA'
ORDER BY carrera, semestre, id;

SELECT CONCAT('Grupos optativos generados: ', @grupo_id_counter - 1) AS resultado;

SELECT 'Generando distribuciones para grupos optativos...' AS status;

-- ==================================================================
-- GENERAR DISTRIBUCIONES PARA GRUPOS OPTATIVOS
-- ==================================================================

INSERT INTO distribucion (id, id_grupo, hora_ini, hora_fin, dia)
SELECT
    CONCAT('D', LPAD((@dist_id_counter := @dist_id_counter + 1), 5, '0')) AS id,
    g.id AS id_grupo,
    CASE 
        WHEN g.turno = 'Matutino' THEN
            CASE (FLOOR((@prof_index - 1) / @num_profesores)) % 4
                WHEN 0 THEN '7:00'
                WHEN 1 THEN '8:30'
                WHEN 2 THEN '10:30'
                WHEN 3 THEN '12:00'
            END
        ELSE
            CASE (FLOOR((@prof_index - 1) / @num_profesores)) % 4
                WHEN 0 THEN '15:00'
                WHEN 1 THEN '16:30'
                WHEN 2 THEN '18:30'
                WHEN 3 THEN '20:00'
            END
    END AS hora_ini,
    CASE 
        WHEN g.turno = 'Matutino' THEN
            CASE (FLOOR((@prof_index - 1) / @num_profesores)) % 4
                WHEN 0 THEN '8:30'
                WHEN 1 THEN '10:00'
                WHEN 2 THEN '12:00'
                WHEN 3 THEN '13:30'
            END
        ELSE
            CASE (FLOOR((@prof_index - 1) / @num_profesores)) % 4
                WHEN 0 THEN '16:30'
                WHEN 1 THEN '18:00'
                WHEN 2 THEN '20:00'
                WHEN 3 THEN '21:30'
            END
    END AS hora_fin,
    CASE sesion_num
        WHEN 1 THEN IF(g.turno = 'Matutino', 'Lunes', 'Martes')
        WHEN 2 THEN IF(g.turno = 'Matutino', 'Miercoles', 'Jueves')
        WHEN 3 THEN 'Viernes'
        WHEN 4 THEN IF(g.turno = 'Matutino', 'Martes', 'Lunes')
        WHEN 5 THEN IF(g.turno = 'Matutino', 'Jueves', 'Miercoles')
    END AS dia
FROM grupo g
INNER JOIN unidad_de_aprendizaje ua ON ua.id = g.id_ua
CROSS JOIN (
    SELECT 1 AS sesion_num UNION ALL
    SELECT 2 UNION ALL
    SELECT 3 UNION ALL
    SELECT 4 UNION ALL
    SELECT 5
) sesiones
WHERE ua.tipo = 'OPTATIVA'
  AND sesion_num <= CASE 
    WHEN ua.credito >= 10.5 THEN 5
    WHEN ua.credito = 9.0 THEN 4
    ELSE 3
  END
ORDER BY g.id, sesion_num;

SELECT CONCAT('Total distribuciones generadas: ', @dist_id_counter - 1) AS resultado;

-- ==================================================================
-- RESUMEN DE DISTRIBUCION
-- ==================================================================

SELECT 
    '=== RESUMEN DE GENERACION DE GRUPOS ===' AS titulo;

SELECT 
    COUNT(*) AS total_grupos,
    SUM(CASE WHEN turno = 'Matutino' THEN 1 ELSE 0 END) AS grupos_matutino,
    SUM(CASE WHEN turno = 'Vespertino' THEN 1 ELSE 0 END) AS grupos_vespertino
FROM grupo;

SELECT 
    id_prof AS profesor,
    COUNT(*) AS grupos_asignados
FROM grupo
GROUP BY id_prof
ORDER BY grupos_asignados DESC, id_prof;

SELECT 
    CONCAT('Total de grupos: ', COUNT(DISTINCT g.id), 
           ' | Distribuciones: ', COUNT(d.id),
           ' | Profesores: ', @num_profesores, 
           ' | Promedio: ', ROUND(COUNT(DISTINCT g.id) / @num_profesores, 2), ' grupos/profesor') AS distribucion
FROM grupo g
LEFT JOIN distribucion d ON d.id_grupo = g.id;
