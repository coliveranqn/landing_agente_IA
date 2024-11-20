// components/Footer.js
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <h2>Namun Calzado</h2>
                <p>Tu raíz viva - Estilo y comodidad para tus pasos</p>
                <ul className="footer-links">
                    <li><Link href="/">Inicio</Link></li>
                    <li><Link href="/productos">Productos</Link></li>
                    <li><Link href="/nosotros">Nosotros</Link></li>
                    <li><Link href="/contacto">Contacto</Link></li>
                </ul>
                <p>© 2024 Namun Calzado. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
