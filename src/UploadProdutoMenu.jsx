import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "./firebase/config";

export default function UploadProdutoMenu() {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) {
      setMsg("Selecione uma imagem.");
      return;
    }
    setLoading(true);
    setMsg("");
    try {
      // 1. Upload da imagem
      const storageRef = ref(storage, `menu/${file.name}`);
      await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(storageRef);
      // 2. Salvar dados no Firestore
      await addDoc(collection(db, "menu"), {
        nome,
        preco,
        imagem: imageUrl,
        criadoEm: new Date()
      });
      setMsg("Produto cadastrado com sucesso!");
      setNome("");
      setPreco("");
      setFile(null);
    } catch (err) {
      setMsg("Erro ao cadastrar: " + err.message);
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Adicionar Produto ao Menu</h2>
      <input
        type="text"
        placeholder="Nome do produto"
        value={nome}
        onChange={e => setNome(e.target.value)}
        required
      /><br/>
      <input
        type="number"
        placeholder="Preço"
        value={preco}
        onChange={e => setPreco(e.target.value)}
        required
      /><br/>
      <input
        type="file"
        accept="image/*"
        onChange={e => setFile(e.target.files[0])}
        required
      /><br/>
      <button type="submit" disabled={loading}>
        {loading ? "Salvando..." : "Salvar Produto"}
      </button>
      <div style={{ marginTop: 10, color: msg.startsWith("Erro") ? "red" : "green" }}>{msg}</div>
    </form>
  );
} 