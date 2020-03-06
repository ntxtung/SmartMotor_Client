import { MQTT_BROKER_HOST, MQTT_TOPIC_TRACKING_D01, MQTT_TOPIC_ALARM_D01 } from '../constants'
import { mqttConnectionState } from '../actions'
import mqtt from 'mqtt/dist/mqtt'

const initialState = null

const createClient = () => {
    const client = mqtt.connect(MQTT_BROKER_HOST);
   
    client.on('connect', function (connack) {
      mqttConnectionState(true)
   
      client.subscribe(MQTT_TOPIC_TRACKING_D01, (err) => {
        if (err) {
            alert(err)
        }
        console.log(`Subscribed to: `, MQTT_TOPIC_TRACKING_D01)
      });
    });

    client.on('message', (topic, message) => {
        let data = JSON.parse(message)
        console.log("Redux MQTT message:", data)
    })

    client.on('close', () => {
        mqttConnectionState(false)
    })
   
    return client;
}

const mqttClientReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT_CONNECTION': {
            return {
                ...state,
                client: createClient()
            }
        }
        case 'MQTT_CONNECTION': {
            console.log("Redux on Connection")
            return {
                ...state,
                err: action.payload
            }
        }
        case 'DO_SUBSCRIBE': {
            // --- NEED IMPLEMENTED ---
        }
        case 'DO_UNSUBSCRIBE': {
            // --- NEED IMPLEMENTED ---
        }
        // Default
        default: {
            return state;
        }
    }
};
// Exports
export default mqttClientReducer;