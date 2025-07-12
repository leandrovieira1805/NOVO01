import React, { useState } from 'react';

function App() {
  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'Hot Dog Clássico',
      price: 8.50,
      image: '/assets/HOT-DOG.png',
      category: 'lanches',
      description: 'Pão, salsicha, molho, queijo e salada',
      available: true
    },
    {
      id: '2',
      name: 'Coca-Cola',
      price: 4.00,
      image: '/assets/coca_lt-removebg-preview-ctcuxo_1.png',
      category: 'bebidas',
      available: true
    },
    {
      id: '3',
      name: 'Bolo de Chocolate',
      price: 6.00,
      image: '/assets/BOLO-CHOCOLATE.png',
      category: 'doces',
      available: true
    }
  ]);

  // Função robusta para formatar preços
  const formatPrice = (price: any): string => {
    if (price === null || price === undefined || isNaN(price)) {
      return '0.00';
    }
    const numPrice = typeof price === 'number' ? price : parseFloat(price);
    return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
  };

  return (
    <div style={{ 
      backgroundColor: '#1f2937', 
      color: 'white', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <header style={{ 
        backgroundColor: '#374151', 
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
            <h1 style={{ color: '#fbbf24', fontSize: '2rem', margin: 0 }}>🍔 Hotdog da Praça</h1>
            <p style={{ color: '#d1d5db', margin: '5px 0 0 0' }}>Delícias que conquistam seu paladar</p>
              </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{
              backgroundColor: '#fbbf24',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>
              🛒 Carrinho
              </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ 
        backgroundColor: '#fbbf24',
        color: '#1f2937',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '3rem', margin: '0 0 20px 0' }}>Bem-vindo ao Hotdog da Praça!</h2>
        <p style={{ fontSize: '1.2rem', margin: 0 }}>Os melhores sabores da cidade em um só lugar</p>
      </section>

      {/* Products Section */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <h2 style={{ color: '#fbbf24', fontSize: '2rem', textAlign: 'center', marginBottom: '40px' }}>
          🍽️ Nosso Cardápio
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          {products.map((product) => (
            <div key={product.id} style={{ 
              backgroundColor: '#374151', 
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <div style={{ 
                height: '200px', 
                backgroundColor: '#6b7280',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '4rem'
              }}>
                {product.category === 'lanches' ? '🌭' : 
                 product.category === 'bebidas' ? '🥤' : '🍰'}
              </div>
              <div style={{ padding: '20px' }}>
                <h3 style={{ color: '#fbbf24', margin: '0 0 10px 0' }}>{product.name}</h3>
                {product.description && (
                  <p style={{ color: '#d1d5db', margin: '0 0 15px 0' }}>
                    {product.description}
                  </p>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#fbbf24', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    R$ {formatPrice(product.price)}
                  </span>
                  <button style={{
                    backgroundColor: '#fbbf24',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}>
                    ➕ Adicionar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ 
          textAlign: 'center', 
          marginTop: '40px',
          padding: '20px',
          backgroundColor: '#374151',
          borderRadius: '10px'
        }}>
          <p style={{ color: '#d1d5db', fontSize: '1.1rem' }}>
            🚀 Site funcionando perfeitamente com React!
          </p>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '10px' }}>
            React + TypeScript + Vite
          </p>
          </div>
      </main>
    </div>
  );
}

export default App;