const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose
    .connect("mongodb://localhost:27017/musica")
    .then(() => console.log("Conectado ao MongoDB"))
    .catch((erro) => console.error("Erro ao conectar ao MongoDB:", erro));

const esquemaMusica = new mongoose.Schema({
    nome: { type: String, required: true },
    ano: { type: Number, required: true },
    artista: { type: String, required: true },
    genero: { type: String, required: true },
    album: { type: String, required: true },
    duracao: { type: Number, required: true },
    idPlaylist: { type: String, required: true },
});

const Musica = mongoose.model("Música", esquemaMusica);

async function criarMusica(nome, ano, artista, genero, album, duracao, idPlaylist) {
    try {
        const novaMusica = new Musica({ nome, ano, artista, genero, album, duracao, idPlaylist});
        return await novaMusica.save();
    } catch (erro) {
        console.error("Erro ao criar música:", erro);
        throw erro;
    }
}

app.post("/musica", async (req, res) => {
    try {
        const { nome, ano, artista, genero, album, duracao, idPlaylist } = req.body;
        const novaMusica = await criarMusica(nome, ano, artista, genero, album, duracao, idPlaylist);
        res
            .status(201)
            .json({ mensagem: "Música criado com sucesso", musica: novaMusica });
    } catch (erro) {
        res
            .status(500)
            .json({ mensagem: "Erro ao criar música", erro: erro.mensagem });
    }
});

async function atualizarMusica(id, nome, ano, artista, genero, album, duracao, idPlaylist) {
    try {
        const musicaAtualizada = await Musica.findByIdAndUpdate(
            id,
            { nome, ano, artista, genero, album, duracao, idPlaylist },
            { new: true, runValidators: true }
        );
        return musicaAtualizada;
    } catch (erro) {
        console.error("Erro ao atualizar música:", erro);
        throw erro;
    }
}

app.put("/musica/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, ano, artista, genero, album, duracao, idPlaylist } = req.body;
        const musicaAtualizada = await atualizarMusica(
            id,
            nome,
            ano,
            artista,
            genero,
            album,
            duracao,
            idPlaylist
        );
        if (musicaAtualizada) {
            res
                .status(200)
                .json({
                    mensagem: "Música atualizada com sucesso",
                    musica: musicaAtualizada,
                });
        } else {
            res.status(404).json({ mensagem: "Música não encontrada" });
        }
    } catch (erro) {
        res
            .status(500)
            .json({ mensagem: "Erro ao atualizar música", erro: erro.mensagem });
    }
});

async function listarMusicas() {
    try {
        return await Musica.find();
    } catch (erro) {
        console.error("Erro ao obter musicas:", erro);
        throw erro;
    }
}

app.get("/musica", async (req, res) => {
    try {
        const musicas = await listarMusicas()
        res.status(200).json(musicas)
    } catch (error) {
        res.status(500)
            .json({ mensagem: "erro ao obter os livros", erro: error.message })
    }
})

async function deletarMusica(id) {
    try {
        const musicaDeletada = await Musica.findByIdAndDelete(id);
        return musicaDeletada
    } catch (erro) {
        console.log("Erro ao deletar a musica", erro)
    }
}

app.delete("/musica/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const musicaDeletada = await deletarMusica(id);
        if (musicaDeletada) {
            res.status(200)
                .json({ mensagem: "musica deletado com sucesso", musica: musicaDeletada });
        } else {
            res.status(404).json({ mensagem: "musica não encontrado" });
        }
    } catch (error) {
        res.status(500)
            .json({ mensagem: "Erro ao deletar a musica", erro: error.message });
    }
});

const esquemaPlaylist = new mongoose.Schema({
    nome: { type: String, require: true },
})

const Playlist = mongoose.model("Playlist", esquemaPlaylist)

async function criarPlaylists(nome) {
    try {
        const novaPlaylist = new Playlist({ nome });
        return await novaPlaylist.save();
    } catch (erro) {
        console.error("Erro ao criar playlist:", erro);
        throw erro;
    }
}

app.post("/playlist", async (req, res) => {
    try {
        const { nome } = req.body;
        const novaPlaylist = await criarPlaylists(nome);
        res.status(201)
            .json({ mensagem: "Playlist criado com sucesso", playlist: novaPlaylist });
    } catch (erro) {
        res.status(500)
            .json({ mensagem: "Erro ao criar playlist", erro: erro.mensagem });
    }
});

async function obterPlaylist() {
    try {
        return await Playlist.find();
    } catch (erro) {
        console.error("Erro ao obter playlist: ", erro);
        throw erro;
    }
}

app.get("/playlist", async (req, res) => {
    try {
        const playlist = await obterPlaylist();
        res.status(200).json(playlist);
    } catch (erro) {
        res.status(500)
            .json({ mensagem: "Erro ao obter playlist", erro: erro.message });
    }
});

async function atualizarPlaylist(id, nome, matricula, curso, ano) {
    try {
        const playlistAtualizado = await Playlist.findByIdAndUpdate(
            id,
            { nome, matricula, curso, ano },
            { new: true, runValidators: true }
        );
        return playlistAtualizado;
    } catch (erro) {
        console.error("Erro ao atualizar playlist:", erro);
        throw erro;
    }
}

app.put("/playlist/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, matricula, curso, ano } = req.body;
        const playlistAtualizado = await atualizarPlaylist(
            id,
            nome,
            matricula,
            curso,
            ano
        );
        if (playlistAtualizado) {
            res.status(200).json({
                mensagem: "Playlist atualizado com sucesso",
                playlist: playlistAtualizado,
            });
        } else {
            res.status(404).json({ mensagem: "Playlist não encontrado" });
        }
    } catch (erro) {
        res.status(500)
            .json({ mensagem: "Erro ao atualizar playlist", erro: erro.message });
    }
});

async function deletarPlaylist(id) {
    try {
        const playlistsDeletado = await Playlist.findByIdAndDelete(id);
        return playlistsDeletado;
    } catch (erro) {
        console.error("Erro ao deletar playlists:", erro);
        throw erro;
    }
}

app.delete("/playlist/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const playlistDeletado = await deletarPlaylist(id);
        if (playlistDeletado) {
            res.status(200)
               .json({ mensagem: "Playlist deletado com sucesso", playlist: playlistDeletado });
        } else {
            res.status(404).json({ mensagem: "Playlist não encontrado" });
        }
    } catch (erro) {
        res.status(500)
           .json({ mensagem: "Erro ao deletar playlist", erro: erro.mensagem });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});