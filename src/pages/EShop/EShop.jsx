import Footer from "../../components/footer/Footer";
import InfoSection from "../../components/InfoSection/InfoSection";
import Navbar from "../../components/navbar/Navbar";
import ProductList from "../../components/productList/ProductList";

import React, { useState } from "react";
import { Container, Row, Col, Dropdown } from "react-bootstrap";

function Eshop() {
  // تحديد فلاتر التصفية
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedType, setSelectedType] = useState("");

  return (
    <div
      style={{
        backgroundColor: "#f9f4ef",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Container>
        {/* مسار الصفحة */}
        <Row>
          <Col>
            <p style={{ fontStyle: "italic", fontSize: "18px" }}>
              Home → Eshop
            </p>
          </Col>
        </Row>

        {/* العنوان الرئيسي */}
        <Row className="text-center my-5">
          <Col>
            <h5 style={{ letterSpacing: "1px" }}>EXPLORE</h5>
            <h1
              style={{
                fontSize: "72px",
                fontWeight: "bold",
                letterSpacing: "2px",
              }}
            >
              ESHOP
            </h1>
          </Col>
        </Row>

        {/* الفلاتر */}
        <Row className="text-center">
          <Col>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                Price
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSelectedPrice("Low to High")}>
                  Low to High
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedPrice("High to Low")}>
                  High to Low
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          <Col>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                Colors
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSelectedColor("Red")}>
                  Red
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedColor("Blue")}>
                  Blue
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedColor("Green")}>
                  Green
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          <Col>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                Material
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSelectedMaterial("Gold")}>
                  Gold
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedMaterial("Silver")}>
                  Silver
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedMaterial("Plastic")}>
                  Plastic
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          <Col>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                Type
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSelectedType("Necklace")}>
                  Necklace
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedType("Ring")}>
                  Ring
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedType("Bracelet")}>
                  Bracelet
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Eshop;
