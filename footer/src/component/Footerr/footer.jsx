
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import myStyle from './Footer.module.css'
export default function Footer() {
      return (
            <>

                  <div className={myStyle. backGroundImage} >
                        <br /><br /><p className={myStyle.w}>WANT SOME NEWS ?</p>
                        <br /><br />
                        <p className={myStyle.join}>Join the club</p>


                  </div>
                  <div className={myStyle.footer}>
                        <br />
                        <br />
                        <p className={myStyle.text}>
                              NOUNS SOMMES BASES A BRUXELLES ET LIVRONS PARTOUT DANS LE MONDE.
                        </p>
                        <br />
                        <br />
                        <div className={myStyle.texts}>
                              <Container>
                                    <Row>
                                          <Col >SITE MAP</Col>
                                          <Col ></Col>
                                          <Col>SOCIAL</Col>
                                          <Col xs={6}>INFORMATION</Col>
                                          <Col>LA BOUTIQUE</Col>
                                    </Row>
                                    <br />
                                    <Row>
                                          <Col >ESHOP</Col>
                                          <Col >CONSEILS</Col>
                                          <Col>INSTAGRAM</Col>
                                          <Col xs={6}>CGV</Col>
                                          <Col></Col>
                                    </Row>
                                    <Row>
                                          <Col >ABOUT</Col>
                                          <Col >D'ENTRETIEN</Col>
                                          <Col>FACBOOK</Col>
                                          <Col xs={6}>FAQ</Col>
                                          <Col>DU MERCREDI AU SAMEDI</Col>
                                    </Row>
                                    <Row>
                                          <Col >LA</Col>
                                          <Col >CONTACTEZ-NOUS</Col>
                                          <Col>TIKTOK</Col>
                                          <Col xs={6}>LIVRALSONS ET</Col>
                                          <Col>DE 11H À 18H</Col>
                                    </Row>
                                    <Row>
                                          <Col >ABOUTIQUE</Col>
                                          <Col ></Col>
                                          <Col>PINTEREST</Col>
                                          <Col xs={6}>RETOURS</Col>
                                          <Col></Col>
                                    </Row>
                                    <Row>
                                          <Col ></Col>
                                          <Col ></Col>
                                          <Col>SPOTIFY</Col>
                                          <Col xs={6}>POLITIQUE DE</Col>
                                          <Col>50 RUE DU TAEBLLION</Col>
                                    </Row>
                                    <Row>
                                          <Col ></Col>
                                          <Col ></Col>
                                          <Col>LINKEDIN</Col>
                                          <Col xs={6}>COOKIE</Col>
                                          <Col>1050 ILLES</Col>
                                    </Row>
                              </Container>
                        </div>
                        <br /><br /><p className={myStyle.t}>WEB SITE BY MCARNOLSD</p>
                  </div >


            </>
      );
}
