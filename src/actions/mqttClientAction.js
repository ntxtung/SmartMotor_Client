import { updateMotorbike } from "./motorbikeAction";

export const mqttConnectionInit = () => {
  return {
    type: 'INIT_CONNECTION',
  };
};

export const mqttConnectionSubscribe = topic => {
  return {
    type: 'DO_SUBSCRIBE',
    payload: topic,
  };
};

export const mqttConnectionUnsubscribe = topic => {
  return {
    type: 'DO_UNSUBSCRIBE',
    payload: topic,
  };
};

export const mqttConnectionState = (status = null) => {
  if (status == true) {
    return {
      type: 'MQTT_CONNECTION',
      payload: {
        code: 1
      }
    }
  } else {
    return {
      type: 'MQTT_CONNECTION',
      payload: {
        code: 0
      }
    }
  }
}

export const mqttOnMessage = (topic, message) => {
  if (topic.match(new RegExp('smartmotor/.*/tracking'))) {
    return updateMotorbike(message)
  } 
};

export const mqttPublishMessage = (topic, message) => {
  return {
    type: 'PUBLISH_MESSAGE',
    payload :{
      topic, message
    }
  }
}
