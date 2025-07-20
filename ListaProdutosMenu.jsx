import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export default function ListaProdutosMenu() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProdutos() {
      const querySnapshot = await getDocs(collection(db, "menu"));
      setProdutos(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }
    fetchProdutos();
  }, []);

  if (loading) return <div>Carregando produtos...</div>;

  return (
    <div>
      <h2>Produtos do Menu</h2>
      {produtos.length === 0 && <p>Nenhum produto cadastrado.</p>}
      {produtos.map(produto => (
        <div key={produto.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <h3>{produto.nome}</h3>
          <p>Preço: {produto.preco}</p>
          {produto.imagem && <img src={produto.imagem} alt={produto.nome} width={120} />}
        </div>
      ))}
    </div>
  );
} 