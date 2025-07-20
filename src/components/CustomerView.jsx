import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useCart } from '../context/CartContext';
import ProductCard from './ProductCard';

export default function CustomerView() {
  const [produtos, setProdutos] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProdutos() {
      const querySnapshot = await getDocs(collection(db, "menu"));
      setProdutos(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    fetchProdutos();
  }, []);

  return (
    <div>
      <h2>Cardápio</h2>
      {produtos.map(produto => (
        <ProductCard key={produto.id} produto={produto} onAddToCart={addToCart} />
      ))}
    </div>
  );
}