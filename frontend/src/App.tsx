import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Providers from "./lib/providers";
import NavBar from "./components/custom/NavBar";
import Home from "./pages/Home";
import NotFound from "./pages/Not-Found";
import Questinaire from "./pages/Questinaire";
import Plans from "./pages/Plans";
import Plan from "./pages/Plan";
import PlanQuestions from "./pages/PlanQuestions";
import Question from "./pages/Question";
import AllQuestions from "./pages/AllQuestions";

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

          <Route path="/questions" element={<AllQuestions />} />

          <Route path="/questionare" element={<Questinaire />} />
          <Route path="/question/:idx" element={<Question />} />
          <Route path="/plan/:slug" element={<Plan />} />
          <Route path="/plan/:slug/questions" element={<PlanQuestions />} />
          <Route path="/plans" element={<Plans />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
