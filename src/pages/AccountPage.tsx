import Header from "../components/Header";
import Profile from "../components/Profile";
import {Outlet} from "react-router-dom";

export default function AccountPage() {

    return <>
        <Header/>
        <Profile/>
        <Outlet/>
    </>
}