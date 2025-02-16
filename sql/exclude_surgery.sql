-- SELECT column_name FROM information_schema.columns WHERE table_name = 'services';

-- SELECT se.subject_id, ic.hadm_id, curr_service, ic.icustay_id,
-- CASE WHEN curr_service like '%SURG' THEN 1
-- 	 WHEN curr_service like '%ORTH' THEN 1
-- 	 ELSE 0 END
-- AS service_name_exclude
-- FROM services se
-- LEFT JOIN icustays ic
-- on se.hadm_id = ic.hadm_id
-- AND se.transfertime < ic.intime + interval '12' hour;
CREATE TABLE selected_cohort_1 AS
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
), serv AS(
SELECT se.subject_id, ic.hadm_id, curr_service, ic.icustay_id,
CASE WHEN curr_service like '%SURG' THEN 1
	 WHEN curr_service = 'ORTH' THEN 1
	 ELSE 0 END
	 AS service_name_exclude
,RANK() OVER (PARTITION BY ic.hadm_id ORDER BY se.transfertime DESC) as rank
FROM icustays ic
LEFT JOIN services se
on se.hadm_id = ic.hadm_id
AND se.transfertime < ic.intime + interval '12' hour
)
SELECT co.subject_id, co.hadm_id, co.icustay_id, co.stay_duration, co.date_of_death, co.gender, co.age, co.icustay_id_order,
CASE WHEN co.age > 18 THEN 1 ELSE 0 END AS age_group
,s.curr_service, s.service_name_exclude
FROM co LEFT JOIN serv s ON co.icustay_id = s.icustay_id WHERE s.rank = 1;

