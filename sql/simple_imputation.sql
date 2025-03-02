DROP TABLE IF EXISTS vital_imputed;
CREATE TABLE vital_imputed AS
WITH first_reading AS (
    -- Fill first missing reading with normal vital values
    SELECT 
        icustay_id,
        icu_intime,
        hour_from_intime,
        COALESCE(NULLIF("diastolic-blood-pressure", 0), 75) AS "diastolic-blood-pressure",
        COALESCE(NULLIF("heart-rate", 0), 70) AS "heart-rate",
        COALESCE(NULLIF("oxygen-saturation", 0), 98) AS "oxygen-saturation",
        COALESCE(NULLIF("temperature", 0), 37) AS "temperature",
        COALESCE(NULLIF("systolic-blood-pressure", 0), 125) AS "systolic-blood-pressure",
        COALESCE(NULLIF("respiratory-rate", 0), 12) AS "respiratory-rate"
    FROM final_pivot_f a
    WHERE a.hour_from_intime = (
        SELECT MIN(b.hour_from_intime) 
        FROM final_pivot_f b
        WHERE a.icustay_id = b.icustay_id
    )
    UNION ALL
    -- Other records without changes
    SELECT 
        icustay_id,
        icu_intime,
        hour_from_intime,
        "diastolic-blood-pressure",
        "heart-rate",
        "oxygen-saturation",
        "temperature",
        "systolic-blood-pressure",
        "respiratory-rate"
    FROM final_pivot_f
),
last_reading AS (
    -- Impute missing values based on the last available reading
    SELECT 
        icustay_id,
        icu_intime,
        hour_from_intime,
        COALESCE("diastolic-blood-pressure",
            FIRST_VALUE("diastolic-blood-pressure") OVER (
                PARTITION BY icustay_id ORDER BY hour_from_intime ASC 
                ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
            )
        ) AS "diastolic-blood-pressure",
        COALESCE("heart-rate",
            FIRST_VALUE("heart-rate") OVER (
                PARTITION BY icustay_id ORDER BY hour_from_intime ASC 
                ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
            )
        ) AS "heart-rate",
        COALESCE("oxygen-saturation",
            FIRST_VALUE("oxygen-saturation") OVER (
                PARTITION BY icustay_id ORDER BY hour_from_intime ASC 
                ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
            )
        ) AS "oxygen-saturation",
        COALESCE("temperature",
            FIRST_VALUE("temperature") OVER (
                PARTITION BY icustay_id ORDER BY hour_from_intime ASC 
                ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
            )
        ) AS "temperature",
        COALESCE("systolic-blood-pressure",
            FIRST_VALUE("systolic-blood-pressure") OVER (
                PARTITION BY icustay_id ORDER BY hour_from_intime ASC 
                ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
            )
        ) AS "systolic-blood-pressure",
        COALESCE("respiratory-rate",
            FIRST_VALUE("respiratory-rate") OVER (
                PARTITION BY icustay_id ORDER BY hour_from_intime ASC 
                ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
            )
        ) AS "respiratory-rate"
    FROM first_reading
)
SELECT 
    icustay_id,
    icu_intime,
    hour_from_intime,
    COALESCE("diastolic-blood-pressure",
        AVG("diastolic-blood-pressure") OVER (PARTITION BY icustay_id)
    ) AS "diastolic-blood-pressure",
    COALESCE("heart-rate",
        AVG("heart-rate") OVER (PARTITION BY icustay_id)
    ) AS "heart-rate",
    COALESCE("oxygen-saturation",
        AVG("oxygen-saturation") OVER (PARTITION BY icustay_id)
    ) AS "oxygen-saturation",
    COALESCE("temperature",
        AVG("temperature") OVER (PARTITION BY icustay_id)
    ) AS "temperature",
    COALESCE("systolic-blood-pressure",
        AVG("systolic-blood-pressure") OVER (PARTITION BY icustay_id)
    ) AS "systolic-blood-pressure",
    COALESCE("respiratory-rate",
        AVG("respiratory-rate") OVER (PARTITION BY icustay_id)
    ) AS "respiratory-rate"
FROM last_reading;
SELECT * FROM vital_imputed;