import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthenticationProvider } from "./components/AuthenticationProvider/AuthenticationProvider";
import { routes } from "./routes";

function App() {
  return (
    <AuthenticationProvider>
      <BrowserRouter>
        <div id="App">
          <Routes>
            {routes.map((route) => {
              return <Route path={route.path} element={route.element} />;
            })}
          </Routes>
        </div>
      </BrowserRouter>
    </AuthenticationProvider>
  );
}

export default App;
