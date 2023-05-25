# Tarea2SD
Tarea sistemas distribuidos sobre Kafka y RabbitMQ

# Situación
La situación en la que nos pusimos para desarrollar el trabajo se trata de un sistema de seguimiento de pedidos en tiempo real, donde cada vez que haya un cambio como por ejemplo que el pedido se está cocinando o está en camino, los Consumers puedan recibir la información instantáneamente.

Video Tarea 2 Sistemas Distribuidos
https://drive.google.com/drive/folders/1JTLXfmlwHgBZAQwwRl_OnyAs1YfxsTce?usp=sharing



# Tarea 2 - Sistemas Distribuidos
Integrantes: Jonas Oviedo - Maximiliano Bustos
- Lenguaje: NodeJS (JavaScript) v18..

Se debe estar en la carpeta principal
```
cd Tarea2SD
```
  docker compose up
  ```
  Luego se debe ejecutar los codigos de los productores y consumidores en sus respectivas carpetas
  ```
  docker ps
  ```
  Dentro de la carpeta Kafka
  ```
  # RabbitMQ
  ```
  npm install
    Dentro de la carpeta ejecutamos los comandos
    ```
    node consumersRabbit.js
    ```
    python3 producerRabbit.py
  ```
  luego dentro de la carpeta de kafka
  ```
  # Kafka
  
  npm install
  ```
  node consumerKafka.cjs
    ```
  node producerKafka.js
    ```
    Y listo, ahora se enviarán los mensajes :)
