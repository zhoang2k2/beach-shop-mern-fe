import "./App.css";
import UserFooter from "./components/user/footer/Footer";
import UserNavbar from "./components/user/navbar/Navbar";
import UserRoutes from "./routes/UserRoutes";
import "./styles/_main.scss";

function App() {
  return (
    <div className="App">
      <UserNavbar />
      <UserRoutes />
      <UserFooter />
    </div>
  );
}

export default App;
