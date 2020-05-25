import {
    MQTT_BROKER_HOST,
    MQTT_TOPIC_TRACKING_D01,
    MQTT_TOPIC_ALARM_D01,
} from '../constants';
import {
    mqttConnectionState,
    mqttConnectionSubscribe,
    mqttOnMessage,
} from '../actions';
import mqtt from 'mqtt/dist/mqtt';

import {store} from '../store'

const initialState = null;

const createClient = () => {
    const client = mqtt.connect(MQTT_BROKER_HOST);

    client.on('connect', function(connack) {
        store.dispatch(mqttConnectionState(true));

        client.subscribe(MQTT_TOPIC_TRACKING_D01, err => {
            if (err) {
                alert(err);
            }
            store.dispatch(mqttConnectionSubscribe(MQTT_TOPIC_TRACKING_D01));
        });
    });

    client.on('message', (topic, message) => {
        let data = JSON.parse(message);
        store.dispatch(mqttOnMessage(topic, data));
    });

    client.on('close', () => {
        store.dispatch(mqttConnectionState(false));
    });

    return client;
};

const mqttClientReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT_CONNECTION': {
            return {
            ...state,
            client: createClient(),
            };
        }
        case 'MQTT_CONNECTION': {
            return {
            ...state,
            status: action.payload,
            };
        }
        case 'DO_SUBSCRIBE': {
            // --- NEED IMPLEMENTED ---
        }
        case 'DO_UNSUBSCRIBE': {
            // --- NEED IMPLEMENTED ---
        }
        case 'ON_MESSAGE': {
            console.log(action.payload);
            return {
            ...state,
            message: action.payload.message,
            };
        }
        // Default
        default: {
            return state;
        }
    }
};
// Exports
export default mqttClientReducer;
