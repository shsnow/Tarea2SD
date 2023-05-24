const amqp = require('amqplib/callback_api');

const topicos = ['topic1', 'topic2', 'topic3', 'topic4', 'topic5', 'topic6', 'topic7', 'topic8', 'topic9', 'topic10'];

function receiveMessage(msg) {
  console.log(`Received message: ${msg.content.toString()}`);
}

function consumer() {
  amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      const exchange = 'topic_exchange';

      channel.assertExchange(exchange, 'topic', { durable: false });

      channel.assertQueue('', { exclusive: true }, function (error2, q) {
        if (error2) {
          throw error2;
        }

        // Hacer binding entre la cola y los tópicos de interés
        for (const topic of topicos) {
          channel.bindQueue(q.queue, exchange, topic);
        }

        console.log('Waiting for messages...');

        channel.consume(q.queue, receiveMessage, { noAck: true });
      });
    });
  });
}

consumer();
