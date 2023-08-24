import { Container, Image } from "react-bootstrap"
import IlustrationLogin from "../assets/Illustrasi-Login.png"

export const ImageLandingPage = () => {
    return(
        <>
        <Container  style={{objectFit:"cover"}}>
        <Image src={IlustrationLogin} alt="ilustration" style={{width:"600px", maxHeight:"760px"}}/>
        </Container>
        </>
    )
}