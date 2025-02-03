SELECT DISTINCT stay_id 
FROM (
    SELECT ce.icustay_id AS stay_id, 
           ce.charttime AS recorded_time, 
           di.label AS vital_name, 
           ce.value AS vital_reading 
    FROM CHARTEVENTS ce 
    JOIN D_ITEMS di ON ce.itemid = di.itemid 
    WHERE di.label = "Heart Rate"
);