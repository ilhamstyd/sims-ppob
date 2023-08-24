import { Container, Form, Image, InputGroup, Col, Button } from "react-bootstrap";
import profile_photos from "../assets/Profile.png";
import { useEffect, useState } from "react";
import Listrik from "../assets/Listrik.png"
import { useDispatch, useSelector } from "react-redux";
import { TransactioAsync, fetchBalance, fetchProfile, fetchServices } from "../features/ProfileSlice";

export const Profile = () => {

    const [showBalance, setShowBalance] = useState(false);

    const dispatch = useDispatch();
  const profiles = useSelector((state) => state.profile);
    const toggleBalanceVisibility = () => {
      setShowBalance(!showBalance);
    };

    const serviceCode = "PLN";

    const [saldo, setSaldo] = useState("");
    const handleTransaction = (e) => {
      e.preventDefault();
      console.log("Submitting form...");
      const formData = {
        service_code: serviceCode,
      };
      dispatch(TransactioAsync(formData));
      setSaldo("");
    };

    useEffect(() => {
    dispatch(fetchBalance());
    dispatch(fetchProfile());
    dispatch(fetchServices());
    }, [dispatch])
  return (
    <>
      <Container>
        <div className="row ms-3 mt-4">
          <div className="col-md-5">
            <Image
              src={
                profiles?.data?.profile_image ===
                "https://minio.nutech-integrasi.app/take-home-test/null"
                  ? profile_photos
                  : profiles?.data?.profile_image
              }
              style={{ objectFit: "cover", margin: "10px", padding: "10px" }}
            />
            <div>
              <p style={{ margin: 0, padding: 0 }}>Selamat Datang</p>
              <h5>{profiles?.data?.first_name} {profiles?.data?.last_name}</h5>
            </div>
          </div>
          <div className="col-md-7">
            <div
              style={{
                backgroundImage: `url(${require("../assets/Background.png")})`,
                backgroundSize: "100%",
                flexDirection: "column",
                padding: "10px",
                margin: "0px"}}>
              <div className="text-light">
                <p>saldo anda</p>
                {showBalance ? (
                  <h3>
                    RP.<span>{profiles?.balance}</span>
                  </h3>
                ) : (
                  <h3>
                    RP.<span>•••••••</span>
                  </h3>
                )}
                <p
                  style={{ cursor: "pointer", marginTop: "17px" }}
                  onClick={toggleBalanceVisibility}>
                  {showBalance ? "sembunyikan saldo" : "lihat saldo"}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p style={{fontWeight:"500"}}>Pembayaran</p>
            <p className="fw-bold"><Image src={Listrik} />Listrik Prabayar</p>
          </div>
          <Form>
          <Form.Group
            as={Col} md={12}
            className="mb-3"
            controlId="formGroupEmail">
            <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">RP</InputGroup.Text>
            <Form.Control type="number"
            aria-describedby="inputGroupPrepend"
            placeholder="masukan nominal"
            value={saldo}
            onChange={(e) => setSaldo(e.target.value)}
            required/>
            </InputGroup>
            </Form.Group>
            <Button className="w-100" variant="danger" onClick={handleTransaction}>Bayar</Button>
          </Form>
        </div>
      </Container>
    </>
  );
};
