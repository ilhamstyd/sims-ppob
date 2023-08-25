import { Container, Form, Image, InputGroup, Col, Button } from "react-bootstrap";
import profile_photos from "../assets/Profile.png";
import { useEffect, useState } from "react";
import Listrik from "../assets/Listrik.png"
import { useDispatch, useSelector } from "react-redux";
import { TransactioAsync, fetchBalance, fetchProfile, fetchServices } from "../features/ProfileSlice";
import { useParams } from "react-router-dom";
import { Rupiah } from "../components/FormatIdr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollar, faDollarSign, faMoneyCheckDollar, faSackDollar } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

export const Profile = () => {

    const [showBalance, setShowBalance] = useState(false);

  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.profile);
  const { id } = useParams();
  const services = useSelector((state) => state.profile.merges.services);
  const selectedService = services[id];
    const toggleBalanceVisibility = () => {
      setShowBalance(!showBalance);
    };

    const handleTransaction = (e) => {
      e.preventDefault();
      const formData = {
        service_code: selectedService?.service_code,
      };
      dispatch(TransactioAsync(formData));
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Berhasil Bayar ${selectedService?.service_name}`,
        showConfirmButton: false,
        timer: 1500,
      });
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
                   {Rupiah(profiles?.balance)}
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
            <p className="fw-bold"><Image src={selectedService?.service_icon} />{selectedService?.service_name}</p>
          </div>
          <Form>
          <Form.Group
            as={Col} md={12}
            className="mb-3"
            controlId="formGroupEmail">
            <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend"><FontAwesomeIcon icon={faMoneyCheckDollar}/></InputGroup.Text>
            <Form.Control type="number"
            aria-describedby="inputGroupPrepend"
            placeholder={Rupiah(selectedService?.service_tariff)}
            disabled/>
            </InputGroup>
            </Form.Group>
            <Button className="w-100" variant="danger" onClick={handleTransaction}>Bayar</Button>
          </Form>
        </div>
      </Container>
    </>
  );
};
