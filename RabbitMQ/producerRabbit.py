import pika
import json
import threading
import time
import random
import string

topicos = ['topic1','topic2','topic3','topic4','topic5']

def generateRandomText(length):
    characters = string.ascii_letters + string.digits
    text = ''

    for _ in range(length):
        index = random.randint(0, len(characters) - 1)
        text += characters[index]

    return text

def producer(producer_id):
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()

    # Seleccionar un tópico aleatorio
    topic = random.choice(topicos)

    # Generar el mensaje
    text = generateRandomText(random.randint(1, 100))
    message = {
        'device': producer_id,
        'timestamp': time.time(),
        'value': text
    }
    msg = json.dumps(message)

    # Publicar el mensaje en el tópico correspondiente
    channel.basic_publish(exchange='', routing_key=topic, body=msg)
    print(f'Device {producer_id} sending to topic {topic}: {msg}')

    connection.close()

num_producers = 5  # Número de productores a crear

while True:
    # Crear e iniciar los hilos de los productores
    threads = []
    for i in range(num_producers):
        thread = threading.Thread(target=producer, args=(i + 1,))
        thread.start()
        threads.append(thread)

    # Esperar a que todos los hilos finalicen
    for thread in threads:
        thread.join()

    # Esperar 5 segundos antes de volver a enviar los mensajes
    time.sleep(5)
