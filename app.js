import express from "express";
import mongoose from "mongoose";
import DbString from "./src/connectionString.js";

const app = express();
app.use(express.json());
const port = 3000;
const connectionString = DbString();

// Definir o modelo Anime
const Anime = mongoose.model("Anime", {
  title: String,
  description: String,
  image_url: String,
  category: [String],
});

// Listar todos os animes
app.get("/listar_animes", async (req, res) => {
  try {
    const animes = await Anime.find();
    return res.json({
      animes,
      mensagem: "Sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao listar animes",
      error: error.message,
    });
  }
});

// Rota para cadastrar um anime
app.post("/cadastro_anime", async (req, res) => {
  try {
    const anime = new Anime({
      title: req.body.title,
      description: req.body.description,
      image_url: req.body.image_url,
      category: req.body.category,
    });

    await anime.save();

    return res.json({
      anime,
      mensagem: "Cadastrado com sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao cadastrar anime",
      error: error.message,
    });
  }
});

// Rota para atualizar um anime
app.put("/atualizar_anime/:id", async (req, res) => {
  try {
    const anime = await Anime.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        category: req.body.category,
      },
      {
        new: true,
      }
    );

    if (!anime) {
      return res.status(404).json({
        mensagem: "Anime não encontrado",
      });
    }

    return res.json({
      anime,
      mensagem: "Anime atualizado com sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao atualizar anime",
      error: error.message,
    });
  }
});

// Rota para deletar um anime
app.delete("/deletar_anime/:id", async (req, res) => {
  try {
    const anime = await Anime.findOneAndDelete({ _id: req.params.id });

    if (!anime) {
      return res.status(404).json({
        mensagem: "Anime não encontrado",
      });
    }

    return res.json({
      anime,
      mensagem: "Anime deletado com sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao deletar anime",
      error: error.message,
    });
  }
});

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
      console.log("App Running 🫰🚀🚀🚀...");
    });
  })
  .catch((error) => {
    console.error("Error connecting to database", error);
  });
