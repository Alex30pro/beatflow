const app = require("./src/app");
const mongoose = require("mongoose");

mongoose
//`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_ADDRESS}/${process.env.DB_NAME}`
    .connect("mongodb+srv://alexandryopg87:kUPpFyf3YGEoFBQy@cluster0.7lszy.mongodb.net/")
    .then(() => console.log("Conectado ao MongoDB"))
    .catch((erro) => console.error("Erro ao conectar ao MongoDB:", erro));

const port = 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
