-- ==================================================================
-- 4. INSERCIÓN DE GRUPOS Y DISTRIBUCIÓN DE HORARIOS
-- Se crean grupos Matutinos (M1) y Vespertinos (V1) para todas las UAs OBLIGATORIAS.
-- ==================================================================
DELETE FROM grupo;
DELETE FROM distribucion;

-- Definición de Patrones de Horario (1.5 horas por sesión)
-- Slot 1: 7:00-8:30 (M) | 3:00-4:30 (V)
-- Slot 2: 8:30-10:00 (M)| 5:00-6:30 (V)
-- Slot 3: 10:30-12:00 (M)| 6:30-8:00 (V)
-- Slot 4: 12:00-1:30 (M) | 8:00-9:30 (V)
-- Slot 5: 1:30-3:00 (M) | N/A (V)

SET @grupo_id_counter = 1;

SET @dist_id_counter = 1;

-- Lista de profesores para rotación
SET @profesores = 'HIJKLMNO,P0001RSV,P0002KND,P0003HGR';

SET @num_profesores = 4;

-- Mapeo de slots de tiempo
SET
    @slot_map_M = 'T1=7:00-8:30,T2=8:30-10:00,T3=10:30-12:00,T4=12:00-1:30,T5=1:30-3:00';

SET
    @slot_map_V = 'T1=3:00-4:30,T2=5:00-6:30,T3=6:30-8:00,T4=8:00-9:30';

-- 3 Sesiones (7.5/6.0 créditos)
SET @D3 = 'Lunes,Martes,Miércoles';

SET @S3_0 = 'T1,T2,T3';
-- Horario 1: (L:T1, M:T2, X:T3)
SET @S3_1 = 'T4,T5,T1';
-- Horario 2: (L:T4, M:T5, X:T1)
SET @S3_2 = 'T2,T3,T4';
-- Horario 3: (L:T2, M:T3, X:T4)
SET @S3_3 = 'T5,T1,T2';
-- Horario 4: (L:T5, M:T1, X:T2)
SET @S3_4 = 'T3,T4,T5';
-- Horario 5: (L:T3, M:T4, X:T5)

-- 4 Sesiones (9.0 créditos)
SET @D4 = 'Lunes,Martes,Miércoles,Jueves';

SET @S4_0 = 'T1,T2,T3,T4';
-- Horario 1: (L:T1, M:T2, X:T3, J:T4)
SET @S4_1 = 'T5,T1,T2,T3';
-- Horario 2: (L:T5, M:T1, X:T2, J:T3)
SET @S4_2 = 'T4,T5,T1,T2';
-- Horario 3: (L:T4, M:T5, X:T1, J:T2)
SET @S4_3 = 'T3,T4,T5,T1';
-- Horario 4: (L:T3, M:T4, X:T5, J:T1)

-- 5 Sesiones (10.5 créditos)
SET @D5 = 'Lunes,Martes,Miércoles,Jueves,Viernes';

SET @S5_0 = 'T1,T2,T3,T4,T5';
-- Horario 1: (L:T1, M:T2, X:T3, J:T4, V:T5)
SET @S5_1 = 'T5,T1,T2,T3,T4';
-- Horario 2: (L:T5, M:T1, X:T2, J:T3, V:T4)

-- 1-2 Sesiones (3.0/4.5/12.0 créditos - Materias de baja frecuencia)
SET @D2_LOW = 'Martes,Jueves';

SET @S2_0 = 'T4,T4';
-- (M:T4, J:T4)
SET @S2_1 = 'T5,T5';
-- (M:T5, J:T5)

-- Cursor para iterar sobre todas las UAs Obligatorias
DELIMITER $$

CREATE PROCEDURE generate_groups_and_schedules()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE ua_id_val VARCHAR(15);
    DECLARE ua_carrera VARCHAR(40);
    DECLARE ua_sem INT;
    DECLARE ua_credito FLOAT;
    
    DECLARE prefijo CHAR(1);
    DECLARE sem_name VARCHAR(15);
    DECLARE prof_id VARCHAR(15);
    
    -- Variables de control de la iteración (para rotación de horarios por semestre)
    DECLARE current_sem INT DEFAULT 0;
    DECLARE current_carrera VARCHAR(40) DEFAULT '';
    DECLARE semester_ua_index INT DEFAULT 0; -- Índice para rotación de slots (0, 1, 2, 3...)
    
    -- Definir cursor para UAs OBLIGATORIAS
    DECLARE ua_cursor CURSOR FOR
        SELECT id, carrera, semestre, credito FROM unidad_de_aprendizaje WHERE tipo = 'OBLIGATORIA' ORDER BY carrera, semestre, id;
        
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    OPEN ua_cursor;
    
    -- Iteración con LOOP
    ua_loop: LOOP
        FETCH ua_cursor INTO ua_id_val, ua_carrera, ua_sem, ua_credito;
        IF done THEN
            LEAVE ua_loop;
        END IF;

        -- Lógica para restablecer el índice de rotación al inicio de un nuevo bloque Semestre-Carrera
        IF ua_sem != current_sem OR ua_carrera != current_carrera THEN
            SET current_sem = ua_sem;
            SET current_carrera = ua_carrera;
            SET semester_ua_index = 0; -- Resetear el índice de rotación para este semestre
        END IF;
        
        SET prefijo = (SELECT prefijo_grupo FROM carrera WHERE nombre = ua_carrera);
        SET sem_name = CONCAT(ua_sem, prefijo);

        -- Asignar profesor de forma rotativa (Rotación entre los 4 profesores)
        SET prof_id = SUBSTRING_INDEX(SUBSTRING_INDEX(@profesores, ',', (semester_ua_index % @num_profesores) + 1), ',', -1);

        -- Determinar Patrones de Horario basados en crédito y el índice de rotación
        SET @sesiones = '';
        SET @slots_M = '';
        SET @slots_V = ''; -- Inicializar slots_V
        
        -- 1. Asignación de Patrones (Días y Slots)
        IF ua_credito >= 12.0 OR ua_credito = 3.0 OR ua_credito = 4.5 THEN 
            -- Trabajo Terminal, Estancia, Habilidades Sociales (Baja frecuencia)
            SET @sesiones = @D2_LOW;
            IF semester_ua_index % 2 = 0 THEN
                SET @slots_M = @S2_0; -- T4
                SET @slots_V = 'T3,T3'; -- V3
            ELSE
                SET @slots_M = @S2_1; -- T5
                SET @slots_V = 'T4,T4'; -- V4
            END IF;
            
        ELSEIF ua_credito >= 10.5 THEN
            -- 10.5 créditos (5 sesiones)
            SET @sesiones = @D5;
            IF semester_ua_index % 2 = 0 THEN
                SET @slots_M = @S5_0; -- T1,T2,T3,T4,T5
                SET @slots_V = 'T1,T2,T3,T4,T4'; -- Mapeado a 4 slots vespertinos + 1 duplicado
            ELSE
                 SET @slots_M = @S5_1; -- T5,T1,T2,T3,T4
                 SET @slots_V = 'T4,T1,T2,T3,T4';
            END IF;
            
        ELSEIF ua_credito = 9.0 THEN
            -- 9.0 créditos (4 sesiones)
            SET @sesiones = @D4;
            CASE semester_ua_index % 4 -- Rotación entre 4 patrones de 9.0
                WHEN 0 THEN SET @slots_M = @S4_0; SET @slots_V = 'T1,T2,T3,T4'; -- L1, M2, X3, J4
                WHEN 1 THEN SET @slots_M = @S4_1; SET @slots_V = 'T4,T1,T2,T3'; -- L5, M1, X2, J3
                WHEN 2 THEN SET @slots_M = @S4_2; SET @slots_V = 'T4,T4,T1,T2'; -- L4, M5, X1, J2
                WHEN 3 THEN SET @slots_M = @S4_3; SET @slots_V = 'T3,T4,T4,T1'; -- L3, M4, X5, J1
            END CASE;
            
        ELSEIF ua_credito >= 6.0 AND ua_credito <= 7.5 THEN
            -- 7.5 / 6.0 créditos (3 sesiones)
            SET @sesiones = @D3;
            CASE semester_ua_index % 5 -- Rotación entre 5 patrones de 7.5
                WHEN 0 THEN SET @slots_M = @S3_0; SET @slots_V = 'T1,T2,T3'; -- L1, M2, X3
                WHEN 1 THEN SET @slots_M = @S3_1; SET @slots_V = 'T4,T4,T1'; -- L4, M5, X1
                WHEN 2 THEN SET @slots_M = @S3_2; SET @slots_V = 'T2,T3,T4'; -- L2, M3, X4
                WHEN 3 THEN SET @slots_M = @S3_3; SET @slots_V = 'T4,T1,T2'; -- L5, M1, X2
                WHEN 4 THEN SET @slots_M = @S3_4; SET @slots_V = 'T3,T4,T4'; -- L3, M4, X5
            END CASE;
            
        END IF;

        -- Generar GRUPO MATUTINO (M1)
        SET @grupo_nombre_M = CONCAT(sem_name, 'M1');
        SET @grupo_id_M = CONCAT('G', LPAD(@grupo_id_counter, 4, '0'));
        
        -- Insertar Grupo Matutino
        INSERT INTO grupo (id, nombre, id_ua, id_prof, turno, cupo, reg_final, reg_extra)
        VALUES (@grupo_id_M, @grupo_nombre_M, ua_id_val, prof_id, 'Matutino', 35, NULL, NULL);
        
        SET @grupo_id_counter = @grupo_id_counter + 1;

        -- Generar GRUPO VESPERTINO (V1)
        SET @grupo_nombre_V = CONCAT(sem_name, 'V1');
        SET @grupo_id_V = CONCAT('G', LPAD(@grupo_id_counter, 4, '0'));

        -- Insertar Grupo Vespertino
        INSERT INTO grupo (id, nombre, id_ua, id_prof, turno, cupo, reg_final, reg_extra)
        VALUES (@grupo_id_V, @grupo_nombre_V, ua_id_val, prof_id, 'Vespertino', 35, NULL, NULL);
        
        SET @grupo_id_counter = @grupo_id_counter + 1;

        -- Insertar Distribucion Matutino
        SET @i = 0;
        SET @num_sesiones = LENGTH(@sesiones) - LENGTH(REPLACE(@sesiones, ',', '')) + 1;
        
        WHILE @i < @num_sesiones DO
            SET @dia = SUBSTRING_INDEX(SUBSTRING_INDEX(@sesiones, ',', @i + 1), ',', -1);
            SET @slot_id = SUBSTRING_INDEX(SUBSTRING_INDEX(@slots_M, ',', @i + 1), ',', -1);
            
            -- Obtener el slot de tiempo usando @slot_map_M
            SET @slot_time = SUBSTRING_INDEX(SUBSTRING_INDEX(@slot_map_M, @slot_id, -1), ',', 1);
            SET @hora_full = SUBSTRING_INDEX(@slot_time, '=', -1);
            SET @hora_ini = SUBSTRING_INDEX(@hora_full, '-', 1);
            SET @hora_fin = SUBSTRING_INDEX(@hora_full, '-', -1);
            
            INSERT INTO distribucion (id, id_grupo, hora_ini, hora_fin, dia)
            VALUES (CONCAT('D', LPAD(@dist_id_counter, 4, '0')), @grupo_id_M, @hora_ini, @hora_fin, @dia);
            SET @dist_id_counter = @dist_id_counter + 1;
            SET @i = @i + 1;
        END WHILE;

        -- Insertar Distribucion Vespertino
        SET @i = 0;
        WHILE @i < @num_sesiones DO
            SET @dia = SUBSTRING_INDEX(SUBSTRING_INDEX(@sesiones, ',', @i + 1), ',', -1);
            SET @slot_id = SUBSTRING_INDEX(SUBSTRING_INDEX(@slots_V, ',', @i + 1), ',', -1);
            
            -- Obtener el slot de tiempo usando @slot_map_V
            SET @slot_time = SUBSTRING_INDEX(SUBSTRING_INDEX(@slot_map_V, @slot_id, -1), ',', 1);
            SET @hora_full = SUBSTRING_INDEX(@slot_time, '=', -1);
            SET @hora_ini = SUBSTRING_INDEX(@hora_full, '-', 1);
            SET @hora_fin = SUBSTRING_INDEX(@hora_full, '-', -1);
            
            INSERT INTO distribucion (id, id_grupo, hora_ini, hora_fin, dia)
            VALUES (CONCAT('D', LPAD(@dist_id_counter, 4, '0')), @grupo_id_V, @hora_ini, @hora_fin, @dia);
            SET @dist_id_counter = @dist_id_counter + 1;
            SET @i = @i + 1;
        END WHILE;

        SET semester_ua_index = semester_ua_index + 1; -- Incrementar el índice de rotación dentro del semestre
    END LOOP ua_loop;

    CLOSE ua_cursor;
END $$

DELIMITER ;

CALL generate_groups_and_schedules ();

DROP PROCEDURE generate_groups_and_schedules;

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

-- Grupos IIA 8vo Semestre - Materias Obligatorias
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
        'G0021',
        '8BM1',
        'UA0089',
        'PROF0001',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G0022',
        '8BM2',
        'UA0090',
        'PROF0002',
        'Matutino',
        25,
        0,
        0
    ),
    (
        'G0023',
        '8BM3',
        'UA0091',
        'HIJKLMNO',
        'Vespertino',
        25,
        0,
        0
    );

-- Grupos IIA 7mo Semestre - Materias Obligatorias
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
        'G0024',
        '7BM8',
        'UA0083',
        'PROF0001',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G0025',
        '7BM9',
        'UA0084',
        'PROF0002',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G0026',
        '7BM10',
        'UA0085',
        'HIJKLMNO',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G0027',
        '7BM11',
        'UA0086',
        'P0001RSV',
        'Vespertino',
        30,
        0,
        0
    );

-- Grupos IIA 6to Semestre - Materias Obligatorias
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
        'G0028',
        '6BM8',
        'UA0078',
        'PROF0001',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G0029',
        '6BM9',
        'UA0079',
        'PROF0002',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G0030',
        '6BM10',
        'UA0080',
        'HIJKLMNO',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G0031',
        '6BM11',
        'UA0081',
        'P0001RSV',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G0032',
        '6BM12',
        'UA0082',
        'PROF0001',
        'Matutino',
        30,
        0,
        0
    );

-- Grupos IIA 5to Semestre - Materias Obligatorias
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
        'G0033',
        '5BM8',
        'UA0073',
        'PROF0002',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G0034',
        '5BM9',
        'UA0074',
        'HIJKLMNO',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G0035',
        '5BM10',
        'UA0075',
        'PROF0001',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G0036',
        '5BM11',
        'UA0076',
        'P0001RSV',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G0037',
        '5BM12',
        'UA0077',
        'PROF0002',
        'Matutino',
        30,
        0,
        0
    );

-- Grupos ISC 1er Semestre
INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo,
        reg_final,
        validacion
    )
VALUES
    (
        'G0049',
        '1CV1',
        'UA0001',
        'PROF0001',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G0050',
        '1CV2',
        'UA0002',
        'PROF0002',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G0051',
        '1CV3',
        'UA0003',
        'HIJKLMNO',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G0052',
        '1CV4',
        'UA0004',
        'P0001RSV',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G0053',
        '1CV5',
        'UA0005',
        'PROF0001',
        'Vespertino',
        30,
        0,
        0
    );

-- Grupos IIA 1er Semestre
INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo,
        reg_final,
        validacion
    )
VALUES
    (
        'G0054',
        '1BM1',
        'UA0051',
        'PROF0002',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G0055',
        '1BM2',
        'UA0052',
        'HIJKLMNO',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G0056',
        '1BM3',
        'UA0053',
        'PROF0001',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G0057',
        '1BM4',
        'UA0054',
        'P0001RSV',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G0058',
        '1BM5',
        'UA0055',
        'PROF0002',
        'Vespertino',
        30,
        0,
        0
    );

-- Grupos LCD 1er Semestre
INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo,
        reg_final,
        validacion
    )
VALUES
    (
        'G0059',
        '1BV1',
        'UA0096',
        'HIJKLMNO',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G0060',
        '1BV2',
        'UA0097',
        'PROF0001',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G0061',
        '1BV3',
        'UA0098',
        'PROF0002',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G0062',
        '1BV4',
        'UA0099',
        'P0001RSV',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G0063',
        '1BV5',
        'UA0100',
        'HIJKLMNO',
        'Vespertino',
        30,
        0,
        0
    );
-- Grupos ISC 4to Semestre
INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo,
        reg_final,
        validacion
    )
VALUES
    (
        'G0086', 
        '4CV1', 
        'UA0019', 
        'P0003', 
        'Matutino', 
        35,
        0,
        0
    ),
    (
        'G0087', 
        '4CV2', 
        'UA0020', 
        'P0004', 
        'Matutino', 
        35,
        0,
        0
    ),
    (
        'G0088', 
        '4CV3', 
        'UA0021', 
        'P0005', 
        'Vespertino', 
        30,
        0,
        0
    ),
    (
        'G0089', 
        '4CV4', 
        'UA0022', 
        'P0006', 
        'Vespertino', 
        30,
        0,
        0
    ),
    (
        'G0090', 
        '4CV5', 
        'UA0023', 
        'P0007', 
        'Matutino', 
        35,
        0,
        0
    ),
    (
        'G0091', 
        '4CV6', 
        'UA0024', 
        'P0008', 
        'Vespertino', 
        30,
        0,
        0
    ),
    (
        'G0092', 
        '4CV7', 
        'UA0025', 
        'P0009', 
        'Matutino', 
        35,
        0,
        0);

-- Grupos IIA 4to Semestre
INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo,
        reg_final,
        validacion
    )
VALUES
    (
        'G0093', 
        '4BM1', 
        'UA0067', 
        'P0010', 
        'Matutino', 
        30,
        0,
        0
    ),
    (
        'G0094', 
        '4BM2', 
        'UA0068', 
        'P0011', 
        'Matutino', 
        30,
        0,
        0
    ),
    (
        'G0095', 
        '4BM3', 
        'UA0069', 
        'P0012', 
        'Vespertino', 
        25,
        0,
        0
    ),
    (
        'G0096', 
        '4BM4', 
        'UA0070', 
        'P0013', 
        'Vespertino', 
        25,
        0,
        0
    ),
    (
        'G0097', 
        '4BM5', 
        'UA0071', 
        'P0014', 
        'Matutino', 
        30,
        0,
        0
    );
-- Grupos LCD 4to Semestre
INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo,
        reg_final,
        validacion
    )
VALUES
    (
        'G0098', 
        '4BV1', 
        'UA0112', 
        'P0015', 
        'Vespertino', 
        25,
        0,
        0
    ),
    (
        'G0099', 
        '4BV2', 
        'UA0113', 
        'P0016', 
        'Matutino', 
        30,
        0,
        0
    ),
    (
        'G0100', 
        '4BV3', 
        'UA0114', 
        'P0017', 
        'Matutino', 
        30,
        0,
        0
    ),
    (
        'G0101', 
        '4BV4', 
        'UA0115', 
        'P0018', 
        'Vespertino', 
        25,
        0,
        0
    ),
    (
        'G0102', 
        '4BV5', 
        'UA0116', 
        'P0019', 
        'Vespertino', 
        25,
        0,
        0
    ),
    (
        'G0103', 
        '4BV6', 
        'UA0117', 
        'P0020', 
        'Matutino', 
        30,
        0,
        0
    );
-- Grupos IIA 3er Semestre
INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo,
        reg_final,
        validacion
    )
VALUES
    (
        'G0074',
        '3BM1',
        'UA0061',
        'PROF0001',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G0075',
        '3BM2',
        'UA0062',
        'PROF0002',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G0076',
        '3BM3',
        'UA0063',
        'HIJKLMNO',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G0077',
        '3BM4',
        'UA0064',
        'P0001RSV',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G0078',
        '3BM5',
        'UA0065',
        'PROF0001',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G0079',
        '3BM6',
        'UA0066',
        'PROF0002',
        'Vespertino',
        30,
        0,
        0
    );

-- Grupos LCD 3er Semestre
INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo,
        reg_final,
        validacion
    )
VALUES
    (
        'G0080',
        '3BV1',
        'UA0106',
        'HIJKLMNO',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G0081',
        '3BV2',
        'UA0107',
        'PROF0001',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G0082',
        '3BV3',
        'UA0108',
        'PROF0002',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G0083',
        '3BV4',
        'UA0109',
        'P0001RSV',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G0084',
        '3BV5',
        'UA0110',
        'HIJKLMNO',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G0085',
        '3BV6',
        'UA0111',
        'PROF0001',
        'Vespertino',
        30,
        0,
        0
    );
-- Grupos ISC 2do Semestre
INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo,
        reg_final,
        validacion
    )
VALUES
    (
        'G0043',
        '2CV1',
        'UA0006',
        'PROF0001',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G0044',
        '2CV2',
        'UA0007',
        'PROF0002',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G0045',
        '2CV3',
        'UA0008',
        'HIJKLMNO',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G0046',
        '2CV4',
        'UA0009',
        'P0001RSV',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G0047',
        '2CV5',
        'UA0010',
        'PROF0001',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G0048',
        '2CV6',
        'UA0011',
        'PROF0002',
        'Matutino',
        30,
        0,
        0
    );
-- Grupos IIA 2do Semestre
INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo,
        reg_final,
        validacion
    )
VALUES
    (
        'G0064',
        '2BM1',
        'UA0056',
        'PROF0001',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G0065',
        '2BM2',
        'UA0057',
        'PROF0002',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G0066',
        '2BM3',
        'UA0058',
        'HIJKLMNO',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G0067',
        '2BM4',
        'UA0059',
        'P0001RSV',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G0068',
        '2BM5',
        'UA0060',
        'PROF0001',
        'Vespertino',
        30,
        0,
        0
    );

-- Grupos LCD 2do Semestre
INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo,
        reg_final,
        validacion
    )
VALUES
    (
        'G0069',
        '2BV1',
        'UA0101',
        'PROF0002',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G0070',
        '2BV2',
        'UA0102',
        'HIJKLMNO',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G0071',
        '2BV3',
        'UA0103',
        'PROF0001',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G0072',
        '2BV4',
        'UA0104',
        'P0001RSV',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G0073',
        '2BV5',
        'UA0105',
        'PROF0002',
        'Vespertino',
        30,
        0,
        0
    );
-- Grupos ISC 3er Semestre
INSERT INTO
    grupo (
        id,
        nombre,
        id_ua,
        id_prof,
        turno,
        cupo,
        reg_final,
        validacion
    )
VALUES
    (
        'G0038',
        '3CV1',
        'UA0012',
        'PROF0001',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G0039',
        '3CV2',
        'UA0013',
        'PROF0002',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G0040',
        '3CV3',
        'UA0014',
        'HIJKLMNO',
        'Matutino',
        30,
        0,
        0
    ),
    (
        'G0041',
        '3CV4',
        'UA0015',
        'P0001RSV',
        'Vespertino',
        30,
        0,
        0
    ),
    (
        'G0042',
        '3CV5',
        'UA0016',
        'PROF0001',
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

-- DISTRIBUCIÓN DE HORARIOS PARA GRUPOS OPTATIVAS
-- Horario estándar: Lunes, Miércoles, Viernes 10:30-12:00 (Matutino) o 6:30-8:00 (Vespertino)
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
        '08:30',
        '10:00',
        'Lunes'
    ),
    (
        'D_OPT_005',
        'G_OPT_002',
        '08:30',
        '10:00',
        'Miércoles'
    ),
    (
        'D_OPT_006',
        'G_OPT_002',
        '08:30',
        '10:00',
        'Viernes'
    ),
    (
        'D_OPT_007',
        'G_OPT_005',
        '12:00',
        '13:30',
        'Lunes'
    ),
    (
        'D_OPT_008',
        'G_OPT_005',
        '12:00',
        '13:30',
        'Miércoles'
    ),
    (
        'D_OPT_009',
        'G_OPT_005',
        '12:00',
        '13:30',
        'Viernes'
    ),
    (
        'D_OPT_010',
        'G_OPT_007',
        '07:00',
        '08:30',
        'Martes'
    ),
    (
        'D_OPT_011',
        'G_OPT_007',
        '07:00',
        '08:30',
        'Jueves'
    ),
    (
        'D_OPT_012',
        'G_OPT_007',
        '07:00',
        '08:30',
        'Viernes'
    ),
    (
        'D_OPT_013',
        'G_OPT_009',
        '13:30',
        '15:00',
        'Lunes'
    ),
    (
        'D_OPT_014',
        'G_OPT_009',
        '13:30',
        '15:00',
        'Miércoles'
    ),
    (
        'D_OPT_015',
        'G_OPT_009',
        '13:30',
        '15:00',
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
        '08:30',
        '10:00',
        'Martes'
    ),
    (
        'D_OPT_020',
        'G_OPT_013',
        '08:30',
        '10:00',
        'Jueves'
    ),
    (
        'D_OPT_021',
        'G_OPT_013',
        '08:30',
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
        '18:30',
        '20:00',
        'Lunes'
    ),
    (
        'D_OPT_023',
        'G_OPT_003',
        '18:30',
        '20:00',
        'Miércoles'
    ),
    (
        'D_OPT_024',
        'G_OPT_003',
        '18:30',
        '20:00',
        'Viernes'
    ),
    (
        'D_OPT_025',
        'G_OPT_004',
        '17:00',
        '18:30',
        'Lunes'
    ),
    (
        'D_OPT_026',
        'G_OPT_004',
        '17:00',
        '18:30',
        'Miércoles'
    ),
    (
        'D_OPT_027',
        'G_OPT_004',
        '17:00',
        '18:30',
        'Viernes'
    ),
    (
        'D_OPT_028',
        'G_OPT_006',
        '15:00',
        '16:30',
        'Lunes'
    ),
    (
        'D_OPT_029',
        'G_OPT_006',
        '15:00',
        '16:30',
        'Miércoles'
    ),
    (
        'D_OPT_030',
        'G_OPT_006',
        '15:00',
        '16:30',
        'Viernes'
    ),
    (
        'D_OPT_031',
        'G_OPT_008',
        '20:00',
        '21:30',
        'Martes'
    ),
    (
        'D_OPT_032',
        'G_OPT_008',
        '20:00',
        '21:30',
        'Jueves'
    ),
    (
        'D_OPT_033',
        'G_OPT_008',
        '20:00',
        '21:30',
        'Viernes'
    ),
    (
        'D_OPT_034',
        'G_OPT_010',
        '18:30',
        '20:00',
        'Martes'
    ),
    (
        'D_OPT_035',
        'G_OPT_010',
        '18:30',
        '20:00',
        'Jueves'
    ),
    (
        'D_OPT_036',
        'G_OPT_010',
        '18:30',
        '20:00',
        'Viernes'
    ),
    (
        'D_OPT_037',
        'G_OPT_012',
        '17:00',
        '18:30',
        'Martes'
    ),
    (
        'D_OPT_038',
        'G_OPT_012',
        '17:00',
        '18:30',
        'Jueves'
    ),
    (
        'D_OPT_039',
        'G_OPT_012',
        '17:00',
        '18:30',
        'Viernes'
    ),
    (
        'D_OPT_040',
        'G_OPT_014',
        '15:00',
        '16:30',
        'Martes'
    ),
    (
        'D_OPT_041',
        'G_OPT_014',
        '15:00',
        '16:30',
        'Jueves'
    ),
    (
        'D_OPT_042',
        'G_OPT_014',
        '15:00',
        '16:30',
        'Viernes'
    );

-- ISC 5to Semestre - Matutino
INSERT INTO
    distribucion (
        id,
        id_grupo,
        hora_ini,
        hora_fin,
        dia
    )
VALUES
    ('D1001', 'G0033', '7:00', '8:30', 'Lunes'),
    ('D1002', 'G0033', '8:30', '10:00', 'Miércoles'),
    ('D1003', 'G0034', '15:00', '16:30', 'Martes'),
    ('D1004', 'G0034', '16:30', '18:00', 'Jueves');

-- LCD 5to Semestre - Distribución de horarios
INSERT INTO
    distribucion (
        id,
        id_grupo,
        hora_ini,
        hora_fin,
        dia
    )
VALUES
    ('D1005', 'G0035', '7:00', '8:30', 'Martes'),
    ('D1006', 'G0035', '8:30', '10:00', 'Jueves'),
    ('D1007', 'G0036', '15:00', '16:30', 'Lunes'),
    ('D1008', 'G0036', '16:30', '18:00', 'Miércoles');
