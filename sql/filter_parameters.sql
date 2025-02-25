SELECT DISTINCT icustay_id FROM selected_cohort_1 WHERE age>300.0;

SELECT * FROM selected_items;

SELECT * FROM chartevents limit 1000;

SELECT c.icustay_id, c.itemid, c.charttime, c.storetime, c.value, s.level_1 AS parameter_ FROM chartevents c 
RIGHT JOIN selected_items s
ON c.itemid = s.item_code;

WITH temp_charts AS(
SELECT c.icustay_id, c.itemid, c.charttime, c.storetime, c.value, s.level_1 AS parameter_ FROM chartevents c 
RIGHT JOIN selected_items s
ON c.itemid = s.item_code)
, disti_icu_three_hund AS(
SELECT DISTINCT icustay_id FROM selected_cohort_1 WHERE age>300.0
), selected_info AS(
SELECT tc.icustay_id, tc.itemid, tc.charttime, tc.storetime, tc.value, tc.parameter_, sc.icustay_id AS s_id FROM temp_charts tc RIGHT JOIN
selected_cohort_1 sc on tc.icustay_id = sc.icustay_id)
SELECT DISTINCT di.icustay_id FROM disti_icu_three_hund di LEFT JOIN selected_info si ON di.icustay_id = si.icustay_id;
;


