import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ShopContextProvider from "./Context/ShopContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <ShopContextProvider>
    <Provider store={store} >
 <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
   
    
  </ShopContextProvider>,
);
