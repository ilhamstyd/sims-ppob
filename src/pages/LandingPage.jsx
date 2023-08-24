import { ImageLandingPage } from "../components/ImageLandingPage";
import { FormRegister } from "../components/Form";
import { Col, Container, Row } from "react-bootstrap";

export const LandingPage = () => {
  return (
    <>
    <Container className="">
      <Row className="justify-content-center">
        <Col md={6}><FormRegister /></Col>
        <Col md={6}><ImageLandingPage/></Col>
    </Row>
    </Container>
    </>
  );
};
