SELECT DISTINCT icustay_id FROM selected_cohort_1 WHERE age>300.0;

SELECT * FROM selected_items;

SELECT * FROM chartevents limit 1000;

SELECT c.icustay_id, c.itemid, c.charttime, c.storetime, c.value, s.level_0 AS parameter_ , s.conversion_unit FROM chartevents c 
RIGHT JOIN selected_items s
ON c.itemid = s.item_code;

CREATE TABLE filtered_parameters AS(
WITH temp_charts AS(
SELECT c.icustay_id, c.itemid, c.charttime, c.storetime, c.value, s.level_0 AS parameter_ , s.conversion_unit FROM chartevents c 
RIGHT JOIN selected_items s
ON c.itemid = s.item_code)
SELECT tc.icustay_id, tc.itemid, tc.charttime, tc.storetime, tc.value, tc.parameter_, sc.age, tc.conversion_unit FROM temp_charts tc RIGHT JOIN
selected_cohort_1 sc on tc.icustay_id = sc.icustay_id);



