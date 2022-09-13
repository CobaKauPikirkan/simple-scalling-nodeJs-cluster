const express = require("express")
const cluster = require("cluster")
const app = express()
const os = require("os")
const PORT = process.env.PORT || 3000

const numCpu = os.cpus().length

app.get("/", (req,res)=>{
    for (let index = 0; index < 1e8; index++) {
        
        
    }
    res.send(`ok... ${process.pid}`)
    cluster.worker.kill()
})
if(cluster.isMaster){
    for (let index = 0; index < numCpu; index++) {
        cluster.fork()
        
    }
    cluster.on('exit', (worker,code, signal) =>{
        console.log(`worker ${worker.process.pid} died`)
        cluster.fork()
    })
}else{
    app.listen(PORT, ()=>{
        console.log(`server ${process.pid} on ${PORT}`)
    })
}
// app.listen(PORT, ()=>{
//     console.log(`listening on ${PORT}`)
// })