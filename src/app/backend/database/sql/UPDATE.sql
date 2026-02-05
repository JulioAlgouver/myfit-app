UPDATE alimentos SET caloria = null WHERE caloria = 'NA';
UPDATE alimentos SET proteina = null WHERE proteina = 'NA';
UPDATE alimentos SET carboidrato = null WHERE carboidrato = 'NA';
UPDATE alimentos SET fibra = null WHERE fibra = 'NA';
UPDATE alimentos SET sodio = null WHERE sodio = 'NA';
UPDATE alimentos SET lipideo = null WHERE lipideo = 'NA';

-
SELECT * FROM ALIMENTOS WHERE fibra is null;

ALTER TABLE ALIMENTOS
ALTER COLUMN caloria DROP NOT NULL;

INSERT INTO alimentos_temp (id_alimento, descricao, categoria, caloria, proteina, lipideo, carboidrato, fibra)
SELECT id_alimento, descricao, categoria, caloria, proteina, lipideo, carboidrato, fibra
FROM alimentos;

DROP TABLE alimentos_temp

DROP TABLE alimentos;

ALTER TABLE alimentos_temp RENAME TO alimentos;