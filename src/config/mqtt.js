import mqtt from 'mqtt';
const host = 'ws://broker.hivemq.com:8000/mqtt'
const options = {
    keepalive: 60,
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    will: {
        topic: 'WillMsg',
        payload: 'Connection Closed abnormally..!',
        qos: 0,
        retain: false
    },
}
const client = mqtt.connect(host, options)
export default client