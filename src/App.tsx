// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ListComponentPage from './pages/ListComponentPage';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/list-component">Lista</Link>
          </li>
          {/* Adicione links para outros componentes aqui */}
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list-component" element={<ListComponentPage />} />
        {/* Adicione rotas para outros componentes aqui */}
      </Routes>
    </Router>
  );
}

export default App;