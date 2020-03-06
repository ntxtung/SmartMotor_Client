export const mqttConnectionInit = () => {
    console.log("Redux MQTT Init")
    return {
      type: 'INIT_CONNECTION'
    }
  }

export const mqttConnectionUnsubscribe = () => {
    console.log("Redux MQTT Unsubscribe")
    return {
      type: 'DO_UNSUBSCRIBE'
    }
}
  
export const mqttConnectionState = (err = null) => {
    console.log("Redux connection action")
    return {
        type: 'MQTT_CONNECTION',
        payload: err
    }
}