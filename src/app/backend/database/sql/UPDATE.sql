UPDATE alimentos SET caloria = '0,01' WHERE caloria = 0.01;
UPDATE alimentos SET proteina = '0,01' WHERE proteina = 0.01;
UPDATE alimentos SET carboidrato = '0,01' WHERE carboidrato = 0.01;
UPDATE alimentos SET fibra = '0,01' WHERE fibra = 0.01;
UPDATE alimentos SET sodio = '0,01' WHERE sodio = 0.01;
UPDATE alimentos SET lipideo = '0,01' WHERE lipideo = 0.01;

-
SELECT * FROM ALIMENTOS WHERE sodio is NULL;

ALTER TABLE ALIMENTOS
ALTER COLUMN caloria DROP NOT NULL;

INSERT INTO alimentos_temp (id_alimento, descricao, categoria, caloria, proteina, lipideo, carboidrato, fibra)
SELECT id_alimento, descricao, categoria, caloria, proteina, lipideo, carboidrato, fibra
FROM alimentos;

DROP TABLE alimentos_temp

DROP TABLE alimentos;

ALTER TABLE alimentos_temp RENAME TO alimentos;

DELETE FROM ALIMENTOS;