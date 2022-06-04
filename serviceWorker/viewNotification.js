this.addEventListener('push',(event)=>{
    console.log('Event when receive push message ==>',event)

const data = event.data.json()
this.registration.showNotification(data.title,{
    body: data.body,
    icon: data.icon,
    badge:data.icon
})


})