SELECT
ce.icustay_id as stay_id,
ce.charttime as recorded_time,
di.label as vital_name,
ce.value as vital_value
FROM
CHARTEVENTS ce JOIN D_ITEMS di
ON ce.itemid = di.itemid
JOIN SELECTED_ITEMS si
ON di.itemid = si.item_code;