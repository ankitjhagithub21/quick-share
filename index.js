const express = require('express');
const router = require('./routes/router');
const { getNetworkIpAddress } = require('./services/network');
const { initIO } = require('./services/socket');

const app = express();
const port = 3000;

const ipAddress = getNetworkIpAddress()


//middlewares
app.use("/",express.static("./public"))
app.use("/uploads",express.static("./uploads"))

//routes

app.use("/api/v1",router)

const server = app.listen(port,()=>{
    if(!ipAddress){
        console.log("Server stopped.")
        process.exit(0)
    }
    console.log(`Server is running on port ${port}`)
    console.log(`Server connection address for file sharing is  http://${ipAddress}:${port}`)
})

initIO(server)