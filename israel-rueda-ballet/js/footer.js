document.addEventListener('DOMContentLoaded', function () {
    const footer = document.querySelector('footer.footer');
    if (!footer) return;

    footer.outerHTML = `
    <footer class="footer">
        <div class="container">
            <div class="footer__grid">
                <div class="footer__brand">
                    <a href="index.html" class="header__logo">
                        <img src="imgs/logo_trsp.png" alt="Israel Rueda Ballet Logo" style="height: 50px;">
                    </a>
                    <p>Escuela de danza en el corazón de Gràcia, Barcelona. Formación artística, técnica y humana para todas las edades.</p>
                    <div class="footer__social">
                        <a href="https://www.instagram.com/israelruedaballet" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="2" y="2" width="20" height="20" rx="5"/>
                                <circle cx="12" cy="12" r="4"/>
                                <circle cx="18" cy="6" r="1"/>
                            </svg>
                        </a>
                        <a href="https://www.facebook.com/people/Israel-Rueda-Ballet-Barcelona/100063703594113/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                            </svg>
                        </a>
                    </div>
                </div>

                <div class="footer__column">
                    <h4>Navegación</h4>
                    <ul>
                        <li><a href="index.html">Inicio</a></li>
                        <li><a href="clases.html">Clases</a></li>
                        <li><a href="clases.html#horarios">Horarios</a></li>
                        <li><a href="clases.html#precios">Tarifas</a></li>
                        <li><a href="alquiler.html">Alquiler de Salas</a></li>
                        <li><a href="contacto.html">Contacto</a></li>
                    </ul>
                </div>

                <div class="footer__column">
                    <h4>Clases</h4>
                    <ul>
                        <li><a href="clases.html#infantil">Ballet infantil</a></li>
                        <li><a href="clases.html#adultos">Ballet jóvenes y adultos</a></li>
                        <li><a href="clases.html#contemporanea">Danza contemporánea</a></li>
                        <li><a href="clases.html#pilates">Pilates</a></li>
                    </ul>
                </div>

                <div class="footer__column">
                    <h4><a href="contacto.html">Contacto</a></h4>
                    <ul>
                        <li>Carrer del Torrent d'En Vidalet, 14</li>
                        <li>Gràcia, Barcelona</li>
                        <li><a href="tel:+34633473565">633 47 35 65</a></li>
                        <li><a href="https://wa.me/34633473565" target="_blank" rel="noopener">WhatsApp</a></li>
                    </ul>
                </div>
            </div>

            <div class="footer__bottom">
                <p>© 2024 Israel Rueda Ballet. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>`;
});
