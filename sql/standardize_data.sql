SELECT * FROM filtered_parameters;

--Standardize Data
CREATE TABLE standardized_data AS(
SELECT ce.icustay_id,ce.itemid,ce.charttime,ce.storetime,ce.parameter_,ce.age,
CASE 
    WHEN conversion_unit = 'celsius' OR (conversion_unit = 'n' AND ce.parameter_ = 'Temperature')
         AND CAST(REGEXP_REPLACE(ce.value, '[^0-9.]', '', 'g') AS FLOAT) > 79 
    THEN (CAST(REGEXP_REPLACE(ce.value, '[^0-9.]', '', 'g') AS FLOAT) - 32) * 5.0 / 9.0

    WHEN conversion_unit = 'percent' 
         AND CAST(REGEXP_REPLACE(ce.value, '[^0-9.]', '', 'g') AS FLOAT) <= 1 
    THEN CAST(REGEXP_REPLACE(ce.value, '[^0-9.]', '', 'g') AS FLOAT) * 100.0

    ELSE CAST(REGEXP_REPLACE(ce.value, '[^0-9.]', '', 'g') AS FLOAT) 
END AS std_value
FROM filtered_parameters AS ce WHERE ce.conversion_unit != 'celsius');