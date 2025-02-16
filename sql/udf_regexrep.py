import sqlite3
import re

# Define the REGEXP_REPLACE function
def regexp_replace(text, pattern, replacement):
    # Use re.sub to replace occurrences of the pattern with the replacement string
    return re.sub(pattern, replacement, text)

# Connect to SQLite database (replace 'your_database.db' with your actual database path)
conn = sqlite3.connect('C://Users//ASUS//Desktop//Final Year Proj//Unified System for Medical Emergency Prediction//mimiciii.db')

# Register the function as a UDF
conn.create_function('REGEXP_REPLACE', 3, regexp_replace)

# Example query that uses the custom REGEXP_REPLACE
cursor = conn.cursor()

# Create a sample table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS sample_data (
        id INTEGER PRIMARY KEY,
        value TEXT
    )
''')

# Insert sample data
cursor.execute("INSERT INTO sample_data (value) VALUES ('abc123xyz')")
conn.commit()

# Use the REGEXP_REPLACE function in SQL
cursor.execute("SELECT REGEXP_REPLACE(value, '[^0-9]', '') FROM sample_data")

# Fetch and print the result
result = cursor.fetchall()
print(result)  # Should output [('123',)]

conn.close()
