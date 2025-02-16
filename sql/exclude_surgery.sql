-- SELECT column_name FROM information_schema.columns WHERE table_name = 'services';

SELECT subject_id, hadm_id, curr_service,
CASE WHEN curr_service like '%SURG' THEN 1
	 WHEN curr_service like '%ORTH' THEN 1
	 ELSE 0 END
AS service_name_exclude
FROM services;