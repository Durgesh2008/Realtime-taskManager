import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Header/Navbar";
import CoverPage from "./components/Home/CoverPage";
import WrapperContainer from "./components/Wrapper/WrapperContainer";
import { lazy, Suspense } from "react";
import Loading from "./components/uiUtils/Loading";


const Tasks = lazy(() => import("./components/Tasks/Tasks"));

const App = () => {
  return (
    <WrapperContainer>
      <Navbar />
      <Routes>
        <Route path="/" element={<CoverPage />} />
        <Route
          path="/tasks"
          element={
            <Suspense fallback={<Loading />}>
              <Tasks />
            </Suspense>
          }
        />
      </Routes>
    </WrapperContainer>
  );
};

export default App;
