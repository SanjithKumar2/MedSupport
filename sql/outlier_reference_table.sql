
CREATE TABLE vital_signs (
    row_id SERIAL PRIMARY KEY,
    level2 TEXT,
    level1 TEXT,
    outlier_low FLOAT,
    valid_low FLOAT,
    impute FLOAT,
    valid_high FLOAT,
    outlier_high FLOAT
);


INSERT INTO vital_signs (level2, level1, outlier_low, valid_low, impute, valid_high, outlier_high) VALUES
('Diastolic blood pressure', NULL, 0.0, 0.0, 59.0, 375.0, 375.0),
('Systolic blood pressure', NULL, 0.0, 0.0, 118.0, 375.0, 375.0),
('Respiratory rate', NULL, 0.0, 0.0, 19.0, 300.0, 330.0),
('Oxygen saturation', NULL, 0.0, 0.0, 98.0, 100.0, 150.0),
('Glascow coma scale total', NULL, 3.0, 3.0, 11.0, 15.0, 15.0),
('Temperature', NULL, 14.2, 26.0, 37.0, 45.0, 47.0),
('Heart Rate', NULL, -0.0,0.0,0.0,300.0,10000.0);
