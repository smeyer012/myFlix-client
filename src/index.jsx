import { createRoot } from 'react-dom/client';
import { MainView } from "./components/main-view/main-view";
import { store } from "./redux/store";
import { Provider } from "react-redux";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./index.scss";

// Main component 
const MyFlixApplication = () => {
    return (
        <Provider store={store}>
            <MainView />
        </Provider>
    );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);