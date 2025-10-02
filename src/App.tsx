import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ListPage from "./pages/ListPage";
import ListCreatePage from "./pages/ListCreatePage";
import ListManagePage from "./pages/ListManagePage";

function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-100 border-b mb-6">
        <ul className="flex gap-6 list-none">
          <li>
            <Link to="/" className="text-blue-600 hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/list" className="text-blue-600 hover:underline">
              Visualizar Listas
            </Link>
          </li>
          <li>
            <Link to="/list/create" className="text-blue-600 hover:underline">
              Criar Item da Lista
            </Link>
          </li>
          <li>
            <Link to="/list/manage" className="text-blue-600 hover:underline">
              Gerenciar Lista
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/list/create" element={<ListCreatePage />} />
          <Route path="/list/manage" element={<ListManagePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
