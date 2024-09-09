import Pusher from 'pusher-js/react-native';

export function testePusher() {
  const pusher = new Pusher('98cbbc816d1b5a0542c3', {
    cluster: 'sa1',
  });

  const channel = pusher.subscribe('my-channel');
  channel.bind('my-event', function(data) {
    console.log(`Event received: ${JSON.stringify(data)}`);
  });
}
