import React, { useEffect, useState } from "react";
import { Container, Form, InputGroup, Col, Button } from "react-bootstrap";
import { useDispatch} from "react-redux";
import { TopUpMoney } from "../features/ProfileSlice";
import { Rupiah } from "../components/FormatIdr";
import Swal from "sweetalert2";
import { Navigationbar } from "../components/Navbar";
import ComponentProfile from "../components/ComponentProfile";

const TopUp = () => {
  const dispatch = useDispatch();
  const [saldo, setSaldo] = useState("");
  const [isFormEmpty, setIsFormEmpty] = useState(true);
  useEffect(() => {
    setIsFormEmpty(saldo === "");
  }, [saldo]);

  const handleSaldoChange = (value) => {
    setSaldo(value);
    setIsFormEmpty(value === "");
  };

  const handleTopUp = (e) => {
    e.preventDefault();
    try {
      if (saldo < 10000 || saldo > 1000000) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Gagal Top Up",
          text: "minimal top up RP 10.000 dan maksimal RP 1.000.000",
          confirmButtonColor: "red",
        });
        return; // Stop further execution
      }
      const formData = {
        top_up_amount: saldo,
      };
      dispatch(TopUpMoney(formData));
      setSaldo("");
      setIsFormEmpty(false)
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Berhasil Top Up Sejumlah ${Rupiah(saldo)}`,
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navigationbar />
      <Container>
        <div className="mt-4">
        <ComponentProfile />
        </div>
        <div className="row ms-3 mt-5">
          <div className="mt-4">
            <p style={{ fontWeight: "500" }}>Silahkan Masukan</p>
            <p className="fw-bold fs-3">Nominal Top Up</p>
          </div>
          <Form>
            <Form.Group
              as={Col}
              md={5}
              className="mb-3"
              controlId="formGroupEmail"
            >
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">RP</InputGroup.Text>
                <Form.Control
                  type="number"
                  aria-describedby="inputGroupPrepend"
                  placeholder="masukan nominal"
                  value={saldo}
                  onChange={(e) => handleSaldoChange(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Button className="col-md-5"
             variant={isFormEmpty ? "secondary" : "danger"}
             disabled={isFormEmpty}
             onClick={handleTopUp}
             >
              Bayar
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default TopUp;
