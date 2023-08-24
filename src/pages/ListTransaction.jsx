import React, { useEffect, useState } from 'react'
import { Container, Image } from 'react-bootstrap';
import profile_photos from "../assets/Profile.png";
import { useDispatch, useSelector } from 'react-redux';
import { fetchBalance, fetchProfile, listTransactionAsync } from '../features/ProfileSlice';

const ListTransaction = () => {

    const [showBalance, setShowBalance] = useState(false);
    const toggleBalanceVisibility = () => {
      setShowBalance(!showBalance);
    };
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.profile);
  useEffect(() => {
    dispatch(fetchBalance());
    dispatch(fetchProfile());
    dispatch(listTransactionAsync());
    }, [dispatch])
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
        </div>
          <div className="row mt-4">
            <p style={{fontWeight:"600"}}>Semua Transaksi</p>
        {profiles?.merges?.transaction?.map((data, i) => (
            <div className='card shadow pt-2 ps-3 mb-3' key={i}>
                <div className='d-flex'>
                <p className='fs-4 fw-semibold col-md-6 text-dark text-start'>{data.total_amount}</p>
                <p className='col-md-6 text-end'>{data.description}</p>
                </div>
                <p className='text-secondary'>{data.invoice_number}</p>
            </div>
        ))}
            <div className='my-5 text-center fw-bold text-danger'>Show more</div>
          </div>
      </Container>
    </div>
  )
}

export default ListTransaction
