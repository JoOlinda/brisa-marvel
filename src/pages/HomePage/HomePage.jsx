import { Outlet, Link } from "react-router-dom";
import { ComicList } from "../../components";
import { Logo, HeaderHome, MainHome } from "./HomePage.style";

function HomePage(props) {
    return (
        <>
            <HeaderHome>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">
                                <Logo src="./logo.svg" />
                            </Link>
                        </li>
                    </ul>
                </nav>
            </HeaderHome>
            <MainHome>
                <ComicList />
            </MainHome>
            <Outlet />
        </>
    )
}

export default HomePage