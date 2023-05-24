import pika

topicos = ['topic1', 'topic2', 'topic3', 'topic4', 'topic5', 'topic6', 'topic7', 'topic8', 'topic9', 'topic10']

def callback(ch, method, properties, body):
    print(f'Received message: {body.decode()}')

def consumer():
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()

    # Crear una cola temporal exclusiva y obtener su nombre
    result = channel.queue_declare(queue='', exclusive=True)
    queue_name = result.method.queue

    # Crear una binding entre la cola y los tópicos de interés
    for topic in topicos:
        channel.queue_bind(exchange='topic_exchange', queue=queue_name, routing_key=topic)

    # Establecer la función de callback para recibir mensajes
    channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=True)

    print('Waiting for messages...')
    channel.start_consuming()

consumer()
