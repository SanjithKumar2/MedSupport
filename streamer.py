import logging
import faker
from kafka import KafkaProducer
import json
import random
import time
import uuid

# Create a logger
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
console_handler.setFormatter(formatter)
logger.addHandler(console_handler)

# Create a Faker instance

fake = faker.Faker()
logger.info("created Faker instance")
# Define Kafka producer configuration

producer = KafkaProducer(bootstrap_servers = 'localhost:9092',
                         value_serializer = lambda v: json.dumps(v).encode('utf-8'))
logger.info("created KafkaProducer instance")
# Generator function

def generate_vitals(patient_id):

    return {
        "patient_id": patient_id,
        "ecg": random.uniform(0.5, 2.0),  # Simulate ECG waveform
        "temperature": round(random.uniform(36.5, 37.5), 1),  # Celsius
        "blood_pressure": {
            "systolic": random.randint(110, 130),
            "diastolic": random.randint(70, 80)
        },
        "heart_rate": random.randint(60, 100),  # bpm
        "respiratory_rate": random.randint(12, 20),  # breaths/min
        "oxygen_saturation": random.randint(95, 100)  # SpO2
    }

#streamer

def stream_vitals():

    topic = "patient_vitals"

    while True:
        patient_id = str(uuid.uuid4())
        vitals = generate_vitals(patient_id)
        logger.info(f"Generated vitals for patient {patient_id}")
        producer.send(topic,value= vitals)
        logger.info(f"Sent vitals to Kafka topic {topic}")
        time.sleep(5)


if __name__ == "__main__":
    stream_vitals()