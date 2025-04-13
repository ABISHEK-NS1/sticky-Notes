import "./App.css";
import { fakeData as notes } from "./assets/fakeData.js";
import AddNote from "./components/AddNote.jsx";

function App() {
  return (
    <div id="app">
      <AddNote />
    </div>
  );
}

export default App;
