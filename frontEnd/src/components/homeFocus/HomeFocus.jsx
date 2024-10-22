import { useEffect } from "react";
import "./HomeFocus.css";
import { Link } from "react-router-dom";

function HomeFocus() {
  useEffect(() => {
    const contentItems = document.querySelectorAll(".content");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else {
            entry.target.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.1 }
    );

    contentItems.forEach((item) => {
      observer.observe(item);
    });

    return () => {
      contentItems.forEach((item) => {
        observer.unobserve(item);
      });
    };
  }, []);

  return (
    <section className="home-focus">
      <div className="focus-item">
        <div
          className="image"
          style={{
            backgroundImage: 'url("https://arozjewelry.com/img/c/64.jpg")',
          }}
        ></div>
        <div className="content">
          <h3 className="title">LAST CALL</h3>
          <Link to="/eshop" className="link">
            <span>Discover</span>
          </Link>
        </div>
      </div>

      <div className="focus-item">
        <div
          className="image"
          style={{
            backgroundImage: 'url("https://arozjewelry.com/img/c/62.jpg")',
          }}
        ></div>
        <div className="content">
          <h3 className="title">New in</h3>
          <Link to="/eshop" className="link">
            <span>Discover</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomeFocus;
