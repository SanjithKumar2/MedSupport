DO $$ 
DECLARE 
    labels TEXT;
    sql_query TEXT;
BEGIN
    -- Generate the list of distinct feature names as column names
    SELECT STRING_AGG(DISTINCT format('AVG(CASE WHEN feature_name = ''%s'' THEN avg END) AS %I', feature_name, feature_name), ', ')
    INTO labels
    FROM aggregated_table;

    -- Construct the final query
    sql_query := format(
        'CREATE TABLE final_pivot_f AS 
        SELECT icustay_id, icu_intime, hour_from_intime, %s 
        FROM aggregated_table
        GROUP BY icustay_id, icu_intime, hour_from_intime
        ORDER BY icustay_id ASC, hour_from_intime ASC;',
        labels
    );

    -- Execute the dynamically generated SQL
    EXECUTE sql_query;
END $$;
