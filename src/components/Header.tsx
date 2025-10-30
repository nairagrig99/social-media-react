import {Link} from "react-router-dom";
import FacebookLogo from "../UI/FacebookLogo";
import Search from "./Search";
import FeedLogo from "../UI/FeedLogo";

export default function Header() {
    return <>
        <header className="flex justify-between bg-[#FFF] px-4 py-2.5">
            <Link to="/">
                <FacebookLogo/>
            </Link>
            <Search/>
            <Link to="/feed">
                <FeedLogo/>
            </Link>
        </header>
    </>
}