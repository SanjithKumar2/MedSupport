import fastapi
from kafka import KafkaConsumer
import logging
import json
import threading
import uvicorn

# Configure Logger
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
console_handler = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
console_handler.setFormatter(formatter)
logger.addHandler(console_handler)

app = fastapi.FastAPI()

patient_data = []

# Kafka configuration
consumer = KafkaConsumer(
    'patient_vitals',
    bootstrap_servers = "localhost:9092",
    value_deserializer = lambda v: json.loads(v.decode('utf-8'))
)
def consume_data():
    for message in consumer:
        vitals = message.value
        patient_data.append(vitals)
        logger.info("Received message from producer")
        print(vitals)

# Start Kafka consumer in a separate thread
threading.Thread(target=consume_data, daemon=True).start()
@app.get('/get_vitals')
def get_vitals():
    return patient_data

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)