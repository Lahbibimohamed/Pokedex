import "./App.css";
import { Routes, Route } from "react-router-dom";
import PokemonList from "./components/PokemonList";
import PokemonDetails from "./components/PokemonDetails";
import Header from "./components/Header";

function App() {
  return (
    <>
      {/* Header displayed globally */}
      <Header />
      {/* Routes for different pages */}
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
      </Routes>
    </>
  );
}

export default App;
