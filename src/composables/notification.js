import { readonly, ref } from "vue"

const notficationData = ref({})

const setNotificationByType = (message, color)=>{
    const key = Math.floor(Math.random() * 1E6).toString(10)

    notficationData.value[key] = {
        message: message,
        color: color
    }

    setTimeout(()=>{
        removeNotificationByKey(key)
    }, 5000)

}

export const setError = (errorMsg) => {
    setNotificationByType(errorMsg, 'black')
}

export const setSuccess = (successMsg) => {
    setNotificationByType(successMsg, 'darkcyan')
}

export const removeNotificationByKey = (key)=>{
    delete notficationData.value[key]
}

export const getNotifications = readonly(notficationData)
