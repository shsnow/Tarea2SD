const Kafka = require('node-rdkafka');
const numProductores = 5; // Número de productores a crear
const min = 1;
const max = 100;
const timeInterval = 5000;
let count = 0;
const topicos = ['topic1', 'topic2', 'topic3', 'topic4', 'topic5', 'topic6', 'topic7', 'topic8', 'topic9', 'topic10'];
function generateRandomText(lenght) {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';

  for (let i = 0; i < lenght; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    text += caracteres.charAt(indice);
  }

  return text;
}

// Función para crear un productor
function crearProductor() {
  return new Kafka.Producer({
    'metadata.broker.list': 'localhost:29092',
    'dr_cb': true
  });
}

// Función para enviar un mensaje utilizando el productor
function enviarMensaje(producer,i) {
  count = count +1;
  let message = {
    device_ID: i,
    timestamp: Date.now(),
    value: {
      data: generateRandomText(Math.floor(Math.random() * (max - min + 1)) + min),
    },
    numeroMensaje:count

  };

  producer.produce(
    topicos[i], // Tópico al que enviar el mensaje
    null,
    Buffer.from(JSON.stringify(message)),
    'Stormwind',
    Date.now()
  );
}

// Crear y configurar los productores
const productores = [];
for (let i = 0; i < numProductores; i++) {
  const productor = crearProductor();
  productores.push(productor);

  // Conectar y enviar mensajes en cada productor
  productor.connect();
  productor.on('ready', function() {
    setInterval(() => enviarMensaje(productor,i), timeInterval, i);
  });

  productor.on('event.error', function(error) {
    console.error('Error en el productor:', error);
  });
}