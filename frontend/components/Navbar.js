// components/Navbar.js
import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav style={{ backgroundColor: '#E28413', color: '#0000' }}>
            <div className="nav-container">
                <h1  style={{ style:'bold', color: '#000000', font: 'GardensC', borderRadius:'10%'}}  >Namun Calzado </h1>
                <button onClick={() => setMenuOpen(!menuOpen)}>Menú</button>
                {menuOpen && (
                    <ul>
                        <li><Link href="/">Inicio</Link></li>
                        <li><Link href="/productos">Productos</Link></li>
                        <li><Link href="/nosotros">Nosotros</Link></li>
                        <li><Link href="/contacto">Contacto</Link></li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
