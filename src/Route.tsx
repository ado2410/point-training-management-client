import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import Admin from './containers/system/Layout/Layout';
import Login from './containers/system/Login/Login';

const Layout = {
    ADMIN: <Admin />,
    IMPORTER: <Admin />,
    STUDENT: <Admin />,
    LOGIN: <Login />
 }

const Route = () => {
    const [layout, setLayout] = useState(Layout.LOGIN);
    const auth = useSelector<StoreState, AuthState>(state => state.auth);

    useEffect(() => {
        if (auth.isLoggedIn) setLayout(Layout.ADMIN);
        else setLayout(Layout.LOGIN);
    }, [auth]);
    
    return layout;
}

export default Route;