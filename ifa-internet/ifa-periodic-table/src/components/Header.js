import html from 'htm/react';

export function Header() {
  return html`
    <header className="header">
      <div className="header__inner">
        <div className="header__logo">IfA</div>
        <div className="header__title">
          <h1>Ifa Periodic Table</h1>
          <p>IfaPT · ToEPT · Standard Model of Every Knowledge · CENProject</p>
        </div>
        <div className="header__stats">
          <div className="stat">
            <span className="stat__number">256</span>
            <span className="stat__label">Ifatoms</span>
          </div>
          <div className="stat">
            <span className="stat__number">16</span>
            <span className="stat__label">Odu Meji</span>
          </div>
          <div className="stat">
            <span className="stat__number">8</span>
            <span className="stat__label">Categories</span>
          </div>
        </div>
      </div>
    </header>
  `;
}
