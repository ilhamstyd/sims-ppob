import React, { useEffect, useState } from 'react'
import { Container, Form, Image, InputGroup, Col, Button } from 'react-bootstrap'
import profile_photos from "../assets/Profile.png"
import { useDispatch, useSelector } from 'react-redux';
import { TopUpMoney, fetchBalance, fetchProfile } from '../features/ProfileSlice';
import { useNavigate } from 'react-router-dom';
import { Rupiah } from '../components/FormatIdr';
import Swal from 'sweetalert2';


const TopUp = () => {
    const [showBalance, setShowBalance] = useState(false);

    const toggleBalanceVisibility = () => {
      setShowBalance(!showBalance);
    };
    const dispatch = useDispatch();
  const profiles = useSelector((state) => state.profile);
  useEffect(() => {
    dispatch(fetchBalance());
    dispatch(fetchProfile());
  }, [dispatch]);

  const [saldo, setSaldo] = useState("");
 
  const handleTopUp = async(e) => {
    e.preventDefault();
    try {
      if (saldo < 10000 || saldo > 1000000) {
        Swal.fire({
          position:'center',
          icon: 'error',
          title: 'Gagal Top Up',
          text: 'minimal top up RP 10.000 dan maksimal RP 1.000.000',
          confirmButtonColor:'red',
        });
        return; // Stop further execution
      }
      const formData = {
        top_up_amount: saldo,
      };
       await dispatch(TopUpMoney(formData));
      setSaldo("");
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Berhasil Top Up Sejumlah ${Rupiah(saldo)}`,
        showConfirmButton: false,
        timer: 2000,
      });
      } catch (error){
      Swal.fire({
        position:'center',
        icon: 'error',
        title: 'Gagal Top Up',
        text: 'minimal top up RP 10.000 dan maksimal RP 1.000.000',
        confirmButtonColor:'red',
      });
    }
  }

  return (
    <div>
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
            <p style={{fontWeight:"500"}}>Silahkan Masukan</p>
            <p className="fw-bold fs-3">Nominal Top Up</p>
          </div>
          <Form>
          <Form.Group
            as={Col} md={5}
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
            <Button className="col-md-5" variant="danger" onClick={handleTopUp}>Bayar</Button>
          </Form>
        </div>
      </Container>
    </div>
  )
}

export default TopUp
