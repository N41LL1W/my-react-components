// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ListPage from "./pages/ListPage";
import ListCreatePage from "./pages/ListCreatePage";
import ListManagePage from "./pages/ListManagePage";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/list/create" element={<ListCreatePage />} />
          <Route path="/list/manage" element={<ListManagePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
