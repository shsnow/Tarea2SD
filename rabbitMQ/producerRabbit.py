import pika
import json
import threading
import time
import random
import string

def generateRandomText(length):
    characters = string.ascii_letters + string.digits
    text = ''

    for _ in range(length):
        index = random.randint(0, len(characters) - 1)
        text += characters[index]

    return text

def producer(producer_id, message_count):
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()

    queue = 'hello'
    # Longitud del mensaje
    text = generateRandomText(random.randint(1, 100))
    message = {
        'device': producer_id,
        'message_count': message_count,
        'timestamp': time.time(),
        'value': text,
    }
    msg = json.dumps(message)

    channel.queue_declare(queue=queue, durable=False)
    channel.basic_publish(exchange='', routing_key=queue, body=msg)
    print(f'Device {producer_id} sent Message {message_count}:', msg)
    connection.close()

# Número de productores
num_producers = 5

# Número de mensajes por productor
messages_per_producer = 20

# Contador de mensajes
message_count = 1

while True:
    # Crear e iniciar los hilos de los productores
    threads = []
    for i in range(num_producers):
        thread = threading.Thread(target=producer, args=(i + 1, message_count))
        thread.start()
        threads.append(thread)

        message_count += 1

    # Esperar a que todos los hilos finalicen
    for thread in threads:
        thread.join()

    # Esperar 5 segundos antes de volver a enviar los mensajes
    
    #time.sleep(1)
    #if message_count > num_producers * messages_per_producer:
    #    break
