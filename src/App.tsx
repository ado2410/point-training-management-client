import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from "./store/store";
import Route from "./Route";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Route />
            </BrowserRouter>
        </Provider>
    );
}

export default App;
