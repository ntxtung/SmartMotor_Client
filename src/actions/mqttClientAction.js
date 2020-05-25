export const mqttConnectionInit = () => {
  console.log('Redux MQTT Init');
  return {
    type: 'INIT_CONNECTION',
  };
};

export const mqttConnectionSubscribe = topic => {
  console.log('Redux MQTT Subscribe ', topic);
  return {
    type: 'DO_SUBSCRIBE',
    payload: topic,
  };
};

export const mqttConnectionUnsubscribe = topic => {
  console.log('Redux MQTT Unsubscribe ', topic);
  return {
    type: 'DO_UNSUBSCRIBE',
    payload: topic,
  };
};

export const mqttConnectionState = (status = null) => {
  console.log('Redux connection action');
  return {
    type: 'MQTT_CONNECTION',
    payload: status,
  };
};

export const mqttOnMessage = (topic, message) => {
  console.log(`Redux MQTT message from ${topic} data`);
  console.log(message)
  return {
    type: 'ON_MESSAGE',
    payload: {
      topic: topic,
      message: message
    },
  };
};
