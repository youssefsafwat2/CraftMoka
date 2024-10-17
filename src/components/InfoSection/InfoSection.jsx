import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Link, useNavigate } from "react-router-dom";
import "./InfoSection.css";

const ConditionalLink = ({ children, to, ...props }) => {
  try {
    useNavigate();
    return (
      <Link to={to} {...props}>
        {children}
      </Link>
    );
  } catch {
    return (
      <a href={to} {...props}>
        {children}
      </a>
    );
  }
};

const InfoSection = () => {
  return (
    //shop section
    <>
      <Container fluid className="py-4 shop-section">
        <Row className="align-items-center">
          <Col md={7} className="text-left">
            <h1 className="shop-title">THE SHOP</h1>
            <p className="shop-description">
              THE SHOWROOM WELCOMES YOU <br /> FROM
              <strong>WEDNESDAY TO SATURDAY</strong> <br />
              <strong>FROM 11AM TO 6PM</strong> AT 50 RUE DU <br /> TABELLION,
              IN IXELLES.
            </p>
          </Col>

          <Col md={5}>
            <Image
              src="https://arozjewelry.com/themes/Arozjewelry_2/assets/img/home/new/showroom.jpg"
              alt="Shop Image"
              className="img-fluid"
              style={{
                maxHeight: "800px",
                width: "551px",
                objectFit: "cover",
                borderRadius: "20px",
              }}
            />
          </Col>
        </Row>
      </Container>
      <hr className="section-divider" />
      {/*delivery,contact,....*/}
      <Container fluid className="py-4 info-section">
        <Row className="text-center">
          <Col md={3}>
            <i className="bi bi-truck fs-1"></i>
            <h3 className="mt-3">DELIVERY</h3>
            <p>Free delivery for orders over 200€. Worldwide delivery.</p>
          </Col>
          <Col md={3}>
            <i className="bi bi-chat-dots fs-1"></i>
            <h3 className="mt-3">CUSTOMER CARE</h3>
            <p>
              Contact us by email or by phone <br />
              CraftMokaJewelry@gmail.com <br />
              +32 472 137 907
            </p>
          </Col>
          <Col md={3}>
            <i className="bi bi-lock fs-1"></i>
            <h3 className="mt-3">PAIEMENT SÉCURISÉ</h3>
            <p>Debit card, credit card & PayPal</p>
          </Col>
          <Col md={3}>
            <i className="bi bi-stars fs-1"></i>
            <h3 className="mt-3">GUARANTEE</h3>
            <p>
              Give a second life to your CraftMoka jewelry. For more
              information,{" "}
              <ConditionalLink to="/guarantee" className="info-link">
                click here
              </ConditionalLink>
              .
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default InfoSection;
