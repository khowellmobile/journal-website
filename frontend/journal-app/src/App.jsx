import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
        </Router>
    );
}

export default App;
