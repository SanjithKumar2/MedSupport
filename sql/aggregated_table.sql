CREATE TABLE aggregated_table AS
(WITH diff_table AS (
    SELECT 
        o.icustay_id,
        DATE_TRUNC('hour', i.intime) AS icu_intime,
        o.charttime - DATE_TRUNC('hour', i.intime) AS diff_time,
        o.parameter_,
        o.outlier_handled_value AS value
    FROM outlier_handled o
    LEFT JOIN icustays i 
    ON o.icustay_id = i.icustay_id
),
computed_table AS (
    SELECT 
        d.icustay_id,
        d.icu_intime,
        EXTRACT(DAY FROM d.diff_time) * 24 + EXTRACT(HOUR FROM d.diff_time) + 
        CASE 
            WHEN EXTRACT(MINUTE FROM d.diff_time) >= 1 OR EXTRACT(SECOND FROM d.diff_time) >= 1 
            THEN 1 ELSE 0 
        END AS hour_from_intime,
        REPLACE(LOWER(d.parameter_), ' ', '-') AS feature_name,
		d.value
    FROM diff_table AS d
)
SELECT 
    c.icustay_id,
    c.icu_intime,
    c.hour_from_intime,
    c.feature_name,
	AVG(c.value)
FROM computed_table AS c
GROUP BY c.icustay_id, c.icu_intime, c.hour_from_intime, c.feature_name);
