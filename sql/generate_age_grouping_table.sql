WITH co AS
(
SELECT ic.subject_id, ic.hadm_id, ic.icustay_id,
ic.outtime-ic.intime AS stay_duration,
EXTRACT('epoch' FROM ic.intime-pa.dob)/ 60.0 / 60.0 / 24.0 / 365.242 as age,
pa.dod as date_of_death,
pa.gender,
RANK() OVER (PARTITION BY ic.subject_id ORDER BY ic.intime) AS icustay_id_order
FROM icustays as ic
INNER JOIN patients as pa
ON ic.subject_id = pa.subject_id
)
SELECT co.subject_id, co.hadm_id, co.icustay_id, co.stay_duration, co.date_of_death, co.gender, co.age, co.icustay_id_order,
CASE WHEN co.age > 18 THEN 1 ELSE 0 END AS age_group
FROM co;