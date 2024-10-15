import { useEffect } from "react";
import "./HomeFocus.css";

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
          <span>Discover</span>
        </div>
        <a href="https://arozjewelry.com/en/64-last-call" className="link"></a>
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
          <span>Discover</span>
        </div>
        <a href="https://arozjewelry.com/en/62-new-in" className="link"></a>
      </div>
    </section>
  );
}

export default HomeFocus;
