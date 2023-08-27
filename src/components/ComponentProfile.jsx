import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { Rupiah } from "./FormatIdr";
import { useDispatch, useSelector } from "react-redux";
import { fetchBalance, fetchProfile } from "../features/ProfileSlice";
import profile from "../assets/Profile.png";

const ComponentProfile = () => {

  const [showBalance, setShowBalance] = useState(false);
  const ToggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
    dispatch(fetchBalance());
  };

  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.profile.merges);
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch])

  return (
    <div className="row ms-3">
      <div className="col-md-5">
        <Image src={
            profiles?.data?.profile_image ===
            "https://minio.nutech-integrasi.app/take-home-test/null" ? 
            ( profile
            ):(
            profiles?.data?.profile_image) } style={{ objectFit: "cover", margin: "10px", padding: "10px" }} />
        <div>
          <p style={{ margin: 0, padding: 0 }}>Selamat Datang</p>
          <h5>
            {profiles?.data?.first_name} {profiles?.data?.last_name}
          </h5>
        </div>
      </div>
      <div className="col-md-7">
        <div
          style={{
            backgroundImage: `url(${require("../assets/Background.png")})`,
            backgroundSize: "100%",
            flexDirection: "column",
            padding: "10px",
            margin: "0px",
          }}
        >
          <div className="text-light">
            <p>saldo anda</p>
            {showBalance ? (
              <h3>{Rupiah(profiles.balance)}</h3>
            ) : (
              <h3>
                RP.<span>•••••••</span>
              </h3>
            )}
            <p
              style={{ cursor: "pointer", marginTop: "17px" }}
              onClick={ToggleBalanceVisibility}
            >
              {showBalance ? "sembunyikan saldo" : "lihat saldo"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentProfile;
