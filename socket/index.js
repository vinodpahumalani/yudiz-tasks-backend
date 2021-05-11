const socket = require("socket.io")
const jwt = require("jsonwebtoken")
const activeUsers = new Set()
exports.createSocket = function (server) {
  // Socket setup
  io = socket(server, {
    cors: {
      origin: "*",
    },
  })

  io.on("connection", function (socket) {
    console.log("Made socket connection")

    // listen for new login
    socket.on("newUser", async function (data) {
      try {
        const decoded = jwt.decode(data, process.env.JWT_SECRET)

        if (decoded.id) {
          if (activeUsers.has(decoded.id)) {
            // logout user with different token
            io.sockets.emit("logoutBroadcast", { id: decoded.id, token: data })
          } else {
            socket.userId = decoded.id
            activeUsers.add(decoded.id)
          }
        }
      } catch (error) {
        console.log(error)
      }
    })

    socket.on("disconnect", () => {
      activeUsers.delete(socket.userId)
      io.emit("userDisconnected", socket.userId)
    })
  })
}
