import axios from "axios";

let swUrl = `${process.env.PUBLIC_URL}/receiveMessageSW.js`


// Register service worker
export const registerWorker = async () => {
    const register = await navigator.serviceWorker.register(swUrl)
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: determineAppServerKey()
    })
    let url = 'api endpoint here'

    await axios.post(url, subscription).then((res) => {
        console.log('Response after api call', res)
    }).catch((err) => {
        console.log('Post Req error ==>>', err)
    })
}

// Unregister Service Worker
export const unregisterWorker = async () => {
    const register = await navigator.serviceWorker.ready
    register.unregister()
}


// Public vapid key

function determineAppServerKey(){
    var vapidPublicKey = 'vapidPublicKey here'
    return urlBase64ToUint8Array(vapidPublicKey)
}

// Encode vapid key

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}