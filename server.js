const express = require('express')
const app = express()

const cors = require('cors')

const adminRoutes = require('./routes/adminRoutes')
const staffRoutes = require('./routes/staffRoutes')
const userRoutes = require('./routes/userRoutes')
const medicineRoutes = require('./routes/medicineRoutes')
const mediCartRoutes = require('./routes/mediCartRoutes')
const orderRoutes = require('./routes/orderRoutes')
const addressRoute = require('./routes/addressRoutes')
const env = require('dotenv').config()

const Database = require("./database/db.config")

// const host = "0.0.0.0"
const port = process.env.PORT || 3000

const fs = require('fs')
const path = require('path')

const uploadPath = path.join(__dirname, 'uploads/mediPic')

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true })
}

app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.use("/api/staff",staffRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/user", userRoutes)
app.use("/api/medicine", medicineRoutes)
app.use('/api/cart', mediCartRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/address', addressRoute)

app.get("/",(req,res)=>{
    res.send("<h1>Welcome to the Server</h1>")
})
// app.listen(3000,'localhost',()=>{
//     console.log(`Your servere started at http://localhost:3000`)
// })
app.listen(port,()=>{
    console.log(`Your servere started.`)
})