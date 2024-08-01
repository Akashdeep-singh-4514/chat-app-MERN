const express = require("express")
const path = require("path")

const authRoutes = require("./routes/auth.routes.js")
const messageRoutes = require("./routes/message.routes.js")
const userRoutes = require("./routes/user.routes.js")

const { server, app } = require("./socket/socket.js")
// require("../FrontEnd/ChatApp/dist/index.html")

// these three lines are to fetch environment variable form .env 
// package dotenv shoul be installed
const dotenv = require("dotenv")
dotenv.config()
const PORT = process.env.PORT || 5000
// console.log(process.env.PORT);
const connectToMongoDB = require("./db/connectMongoDB.js")




// get request at port
app.get("/", (req, res) => {
    res.send("hello world")
})
app.use(express.json())// to parse incoming requests with req.body
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)

// Serve static files from the 'dist' directory
// require("../FrontEnd/ChatApp/dist/index.html")
app.use(express.static(path.resolve("../FrontEnd/ChatApp/dist")));

// Define your API routes here
// Example: app.get('/api', (req, res) => { res.send('API route'); });

// Fallback route to serve the index.html file
app.get('*', (req, res) => {
    return res.sendFile("../frontend/chatapp/dist/index.html");
});
// listening at port at the last
server.listen(PORT, () => {
    connectToMongoDB();
    console.log("server at", PORT);
})
