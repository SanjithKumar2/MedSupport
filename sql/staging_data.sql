CREATE OR REPLACE TABLE mimic_iii_vital_std AS
SELECT
ce.icustay_id as stay_id,
ce.charttime as recorded_time,
fl.level_0 as vital_name,
ce.value as vital_reading,
CASE
WHEN conversation_unit = 'celsius' AND CAST(REGEXP_REPLACE(ce.value, '[^0-9.]','') AS FLOAT