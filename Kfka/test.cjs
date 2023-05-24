const Kafka = require('node-rdkafka');
let min = 1;
let max = 100;
const timeInterval = 5000;

function generateRandomText(lenght) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let text = '';
  
    for (let i = 0; i < lenght; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      text += caracteres.charAt(indice);
    }
  
    return text;
  }

let producer = new Kafka.Producer({
    'metadata.broker.list': 'localhost:29092',
    'dr_cb': true
  });




    // Connect to the broker manually
    producer.connect();
    
    // Wait for the ready event before proceeding
    
    producer.on('ready', function() {
      try { 
        console.log("mensaje enviado");

      } catch (err) {
        console.error('A problem occurred when sending our message');
        console.error(err);
      }
    });

    function sendKafkaMessage() {
        let message = {
            timestamp: Date.now(),
            value: {
                data: generateRandomText( Math.floor(Math.random() * (max - min + 1)) + min),
            }
        }
        producer.produce(
            // Topic to send the message to
            'topic',
            // optionally we can manually specify a partition for the message
            // this defaults to -1 - which will use librdkafka's default partitioner (consistent random for keyed messages, random for unkeyed messages)
            null,
            // Message to send. Must be a buffer
            //Buffer.from('Awesome message'),
            //Buffer.from("{'timestamp': "+Date.now()+", 'value': {'data': " + generateRandomText( Math.floor(Math.random() * (max - min + 1)) + min) + "}}"),
            Buffer.from(JSON.stringify(message)),

            // for keyed messages, we also specify the key - note that this field is optional
            'Stormwind',
            // you can send a timestamp here. If your broker version supports it,
            // it will get added. Otherwise, we default to 0
            Date.now(),
            // you can send an opaque token here, which gets passed along
            // to your delivery reports
          );
    }
    setInterval(sendKafkaMessage, timeInterval);