const express = require("express");
const app = express();
const musicaRouter = require("./routes/musicasRouter");
const playlistRouter = require("./routes/playlistRouter");

app.use(express.json());
app.use("/musica", musicaRouter);
app.use("/playlist", playlistRouter);

module.exports = app;
