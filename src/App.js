import { Calender } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="">
      <ToastContainer
        theme="colored"
        position="top-right"
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        pauseOnVisibilityChange
        closeOnClick
        pauseOnHover
      />
      <Calender />
    </div>
  );
}

export default App;
