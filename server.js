const express = require("express");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 8090;

const ADMIN = "admin";
// user state
const UserState = {
  users: [],
  setUsers: function (newUserArray) {
    this.users = newUserArray;
  },
};

const app = express();

const expressServer = app.listen(PORT, () =>
  console.log(`Server is running on port : ${PORT}`)
);

const io = new Server(expressServer, {
  cors:
    process.env.NODE_ENV === "production"
      ? false
      : ["http://localhost:3000", "http://localhost"],
});

io.on("connect", (socket) => {
  console.log(`User ${socket.id} is connected`);

  socket.on("enterRoom", ({ name, room }) => {
    socket;
    const existingUser = getUser(socket.id);

    const prevRoom = existingUser[0]?.room;

    if (prevRoom) {
      socket.leave(prevRoom);
      io.to(prevRoom).emit(
        "message",
        buildMessage(ADMIN, `${name} has left from the chat`)
      );
    }

    // activate the user and push user data to user state
    const user = activateUser(socket.id, name, room);

    if (prevRoom) {
      io.to(prevRoom).emit("userLists", {
        users: getUserInRoom(user.room),
      });
    }

    // join the room
    socket.join("Global");

    // to user
    socket.emit(
      "message",
      buildMessage(ADMIN, `You joined the ${user.room} chat room`)
    );

    socket.broadcast
      .to("Global")
      .emit(
        "message",
        buildMessage(ADMIN, `${user.name} has joined the chat room`)
      );

    io.to("Global").emit("userLists", {
      users: getUserInRoom(user.room),
    });
  });

  socket.on("disconnect", () => {
    const user = getUser(socket.id);
    console.log("disconnect user", user);
    leaveTheChat(socket.id);
    if (user) {
      io.to("Global").emit(
        "message",
        buildMessage(ADMIN, `${user[0]?.room} has left the room`)
      );

      io.to("Global").emit("userLists", {
        users: getUserInRoom(user[0]?.room),
      });
    }
  });

  socket.on("message", ({ name, text }) => {
    const user = getUser(socket.id);
    if (user) {
      const room = user[0]?.room;
      io.to(room).emit("message", buildMessage(name, text));
    }
  });

  socket.on("activity", (name) => {
    const user = getUser(socket.id);
    if (user) {
      const room = user[0]?.room;
      socket.broadcast.to(room).emit("activity", name);
    }
  });
});

// helper functions

// build message payload
function buildMessage(name, message) {
  return {
    name,
    message,
    time: Intl.DateTimeFormat("default", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date()),
  };
}

// set all active user lists
function activateUser(id, name, room) {
  const newUser = { id, name, room };

  UserState.setUsers([
    ...UserState.users.filter((user) => user.id !== id),
    newUser,
  ]);

  return newUser;
}

// remove user from array when they leave
function leaveTheChat(id) {
  UserState.setUsers(UserState.users.filter((user) => user.id !== id));
}

function getUser(id) {
  return UserState.users.filter((user) => user.id === id);
}

function getUserInRoom(room) {
  const userArray = UserState.users.filter((user) => user.room === room);
  return Array.from(
    new Set(
      userArray.reduce((acc, curr) => {
        acc.push(curr.name);
        return acc;
      }, [])
    )
  );
}
