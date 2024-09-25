const Playlist = require("../models/Playlist");

async function criarPlaylists(req, res) {
  const { nome } = req.body;
    try {
        const novaPlaylist = new Playlist({ nome });
        const playlistSalva = await novaPlaylist.save();
        res.status(201)
           .json({ mensagem: "Playlist criada com sucesso", musica: playlistSalva });
    } catch (erro) {
        res.status(500)
           .json({ mensagem: "Erro ao criar playlist", erro: erro.mensagem });  
    } 
}

async function atualizarPlaylist(req, res) {
    const { id } = req.params;
    const { nome } = req.body;
    try {
      const playlistAtualizada = await Playlist.findByIdAndUpdate(
        id,
        { nome },
        { new: true, runValidators: true }
      );
      if (playlistAtualizada) {
        res.status(200).json({
          mensagem: "Playlist atualizada com sucesso",
          playlist: playlistAtualizada,
        });
      } else {
        res.status(404).json({ mensagem: "Playlist não encontrada" });
      }
    } catch (erro) {
      res.status(500).json({
        mensagem: "Erro ao atualizar playlist",
        erro: erro.mensagem,
      });
    }
  }

async function obterPlaylist(req, res) {
    try {
      const playlists = await Playlist.find();
      res.status(200).json(playlists);
    } catch (erro) {
      res.status(500).json({
        mensagem: "Erro ao listar playlists",
        erro: erro.mensagem,
      });
    }
  }

  async function deletarPlaylist(req, res) {
    const { id } = req.params;
    try {
      const playlistDeletada = await Playlist.findByIdAndDelete(id);
      if (playlistDeletada) {
        res.status(200).json({
          mensagem: "Playlist deletada com sucesso",
          playlist: playlistDeletada,
        });
      } else {
        res.status(404).json({ mensagem: "Playlist não encontrada" });
      }
    } catch (erro) {
      res.status(500).json({
        mensagem: "Erro ao deletar playlist",
        erro: erro.messagem,
      });
    }
  }


module.exports = {
  criarPlaylists,
  atualizarPlaylist,
  obterPlaylist,
  deletarPlaylist
};