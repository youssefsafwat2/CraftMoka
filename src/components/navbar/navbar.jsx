import style from "./navbar_style.module.css";

export default function Navbar() {
  return (
    <>
      <div className={style.nav}>
        <div className="logo">
          <h1>CraftMoka</h1>
        </div>
        <div className={style.tabs}>
          <ul>
            <li>Eshop</li>
            <li>customization</li>
            <li>inspiration</li>
            <li>About us</li>
            <li>The shop</li>
            <li>Blog</li>
          </ul>
        </div>
      </div>
    </>
  );
}
