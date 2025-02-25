SELECT * FROM standardized_data;

CREATE TABLE outlier_handled AS(
SELECT sd.icustay_id, sd.itemid, sd.charttime, sd.storetime, sd.parameter_, sd.age, sd.std_value,
CASE
WHEN sd.parameter_ != 'Heart Rate' THEN
	CASE
		WHEN sd.std_value < o.outlier_low or sd.std_value > o.outlier_high THEN NULL
		WHEN sd.std_value < o.valid_low THEN valid_low
		WHEN sd.std_value > o.valid_high THEN valid_high
		ELSE sd.std_value
	END
ELSE sd.std_value 
END AS outlier_handled_value
FROM standardized_data sd LEFT JOIN vital_signs o ON  sd.parameter_ = o.level2);

WITH outlier_handled AS(
SELECT sd.icustay_id, sd.itemid, sd.charttime, sd.storetime, sd.parameter_, sd.age, sd.std_value,
CASE
WHEN sd.parameter_ != 'Heart Rate' THEN
	CASE
		WHEN sd.std_value < o.outlier_low or sd.std_value > o.outlier_high THEN NULL
		WHEN sd.std_value < o.valid_low THEN valid_low
		WHEN sd.std_value > o.valid_high THEN valid_high
		ELSE sd.std_value
	END
ELSE sd.std_value 
END AS outlier_handled_value
FROM standardized_data sd LEFT JOIN vital_signs o ON  sd.parameter_ = o.level2),
diff AS (SELECT *,
CASE
WHEN oh.std_value != oh.outlier_handled_value THEN 1
ELSE 0
END AS is_different
FROM outlier_handled oh)
SELECT * FROM diff WHERE is_different = 1;
