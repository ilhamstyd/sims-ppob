import { Container, Form, Image, InputGroup, Col, Button } from "react-bootstrap";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { TransactioAsync, fetchServices } from "../features/ProfileSlice";
import { useParams } from "react-router-dom";
import { Rupiah } from "../components/FormatIdr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyCheckDollar} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { Navigationbar } from "../components/Navbar";
import ComponentProfile from "../components/ComponentProfile";

export const Profile = () => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const services = useSelector((state) => state.profile.merges.services);
  const selectedService = services[id];

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
    dispatch(fetchServices());
    }, [dispatch])
  return (
    <>
    <Navigationbar/>
      <Container>
        <div className="mt-4">
          <ComponentProfile/>
          </div>
        <div className="row ms-3 mt-4">
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
