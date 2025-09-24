// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import ListCreatePage from './pages/ListCreatePage';
import ListManagePage from './pages/ListManagePage';
function App() {
  return (
    <Router>
      <nav style={{ padding: '10px', backgroundColor: '#f0f0f0', borderBottom: '1px solid #ddd' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: '15px' }}>
          <li>
            <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>Home</Link>
          </li>
          <li>
            <Link to="/list" style={{ textDecoration: 'none', color: '#007bff' }}>Visualizar Listas</Link>
          </li>
          <li>
            <Link to="/list/create" style={{ textDecoration: 'none', color: '#007bff' }}>Criar Item da Lista</Link>
          </li>
          <li>
            <Link to="/list/manage" style={{ textDecoration: 'none', color: '#007bff' }}>Gerenciar Lista</Link>
          </li>
          {/* Adicione links para outros componentes e suas páginas aqui */}
        </ul>
      </nav>

      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/list/create" element={<ListCreatePage />} />
          <Route path="/list/manage" element={<ListManagePage />} />
          {/* Adicione rotas para outros componentes aqui */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;