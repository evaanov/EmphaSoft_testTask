import React from "react";
import './Header.css'
import { Link } from "react-router-dom";


const Header = () => { 
    return (
        <header>
            <div className="buttons">
                <Link to='/Creation'>
                    <button className="btn">Создание</button>
                </Link>
            </div>
            <div className="buttons">
                <Link to="/Edit">
                    <button className="btn">Редактирование</button>
                </Link>
            </div>
            <div className="buttons">
                <Link to='/List'>
                    <button className="btn">Список</button>
                </Link>
            </div>
        </header>
    )
}


export default Header