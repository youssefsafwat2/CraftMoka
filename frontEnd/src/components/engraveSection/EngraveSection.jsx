import { useEffect, useRef, useState } from "react";
import "./EngraveSection.css";

function EngraveSection() {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section className="engrave-section" ref={sectionRef}>
      <div className="engrave-wrapper">
        <div className="engrave-text animate">
          <h5 className="engrave-title">To Engrave</h5>
          <div className="engrave-description">
            <p>
              An important date, the initials or names of your children, a
              precious memory, or simply a symbol dear to your heart…{" "}
              <b>It’s up to you to write your story</b>! The jewelry is directly
              engraved in our <b>Brussels workshop..</b>
            </p>
          </div>

          <div className="engrave-link">
            <svg
              className="arrow-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 11.269 15.995"
            >
              <path
                d="M11.269,8H16L8,0,0,8H4.726L8,11.269Z"
                transform="translate(11.269) rotate(90)"
              />
            </svg>
            <a href="https://arozjewelry.com/en/module/custom_page/engrave">
              Personalize my jewelry
            </a>
          </div>
        </div>

        <div className="engrave-images">
          <div className="image-large  animate-large">
            <img
              src="https://arozjewelry.com/themes/Arozjewelry_2/assets/img/home/gravure_image_1.jpeg"
              srcSet="https://arozjewelry.com/themes/Arozjewelry_2/assets/img/home/gravure_image_1@2x.jpeg 2x"
              alt="Engraving process"
            />
          </div>
          <div className={`image-oval ${isInView ? "animate-oval" : ""}`}>
            <img
              src="https://arozjewelry.com/themes/Arozjewelry_2/assets/img/home/gravure_image_2.jpeg"
              srcSet="https://arozjewelry.com/themes/Arozjewelry_2/assets/img/home/gravure_image_2@2x.jpeg 2x"
              alt="Engraved jewelry"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default EngraveSection;
