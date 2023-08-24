import { Container, Image, Nav, Navbar } from "react-bootstrap";
import logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

export const Navigationbar = () => {
  return (
    <>
      <Navbar variant="light">
        <Container className="align-items-center">
          <Link to={"/home"} style={{ textDecorationLine: "none" }}>
            <Navbar.Brand className="align-items-center">
                <Image src={logo} /><span className="ms-2">SIMS PPOB</span>
            </Navbar.Brand>
          </Link>
          <Nav>
          <Nav.Link><Link to={"/top-up"} style={{ color:"black", textDecorationLine: "none" }}>TOP UP</Link></Nav.Link>
            <Nav.Link><Link to={"/list-transaction"} style={{ color:"black", textDecorationLine:"none"}}>TRANSACTION</Link></Nav.Link>
            <Nav.Link> <Link to={"/myprofile"} style={{ color:"black", textDecorationLine:"none"}}>AKUN</Link></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
