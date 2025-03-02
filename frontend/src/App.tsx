import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Providers from "./lib/providers";
import NavBar from "./components/custom/NavBar";
import Home from "./pages/Home";
import NotFound from "./pages/Not-Found";

function App() {
  return (
    <Providers>
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
