import { Link } from "react-router-dom";
import "./Header.css"
import SearchForm from "./SearchForm";

function Header({ onToggleTheme, theme }) {
    return (
        <header className="header">
            <div className="site-title">
                <h1>🎉 Kudos Board</h1>
            </div>
            <div className="nav">
                <button className="navButton"><Link to="/">All Boards</Link></button>
            </div>
        <div className="header-right">
            <span>{theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}</span>
            <button onClick={onToggleTheme} className="theme-toggle">
            Toggle Theme
            </button>
        </div>
        </header>
    );
}

export default Header