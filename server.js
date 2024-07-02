const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000
const http = require("http");
const cors = require("cors");
const userRoutes = require("./routes/userRoute");
const server = http.createServer(app);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/user",userRoutes);

app.get("/",(req,res)=>{
    res.send("<h1>Server is working!!</h1>")
});

server.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`);
});

