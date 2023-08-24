import { Carousel, Container, Image } from "react-bootstrap";
import profile from "../assets/Profile.png";
import { useEffect, useState } from "react";
import { Services } from "../components/Sevices";
import { BannerHome } from "../components/Banner";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBalance,
  fetchBanner,
  fetchProfile,
  fetchServices,
} from "../features/ProfileSlice";

export const HomePage = () => {
  const [showBalance, setShowBalance] = useState(false);

  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.profile);
  const services = profiles.merges.services;
  const banner = profiles.merges.banner;
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    dispatch(fetchBalance());
    dispatch(fetchProfile());
    dispatch(fetchServices());
    dispatch(fetchBanner());
  }, [dispatch]);
  const ToggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };
  return (
    <>
      <Container className="">
        <div className="row ms-3">
          <div className="col-md-5">
            <Image
              src={
                profiles?.data?.profile_image ===
                "https://minio.nutech-integrasi.app/take-home-test/null"
                  ? profile
                  : profiles?.data?.profile_image
              }
              style={{ objectFit: "cover", margin: "10px", padding: "10px" }}
            />
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
                  onClick={ToggleBalanceVisibility}
                >
                  {showBalance ? "sembunyikan saldo" : "lihat saldo"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="d-flex">
            {services?.map((banner, i) => (
              <Services key={i} banner={banner} />
            ))}
          </div>
        </div>
        <p style={{ fontWeight: "600", marginTop: "40px" }}>
          Temukan promo menarik
        </p>
        <div className="">
          <div className="">
            <Carousel activeIndex={index} onSelect={handleSelect} style={{display:"flex"}}>
              <Carousel.Item>
                {banner?.map((bannerImg, i) => (
                  <BannerHome key={i} data={bannerImg}/>
                ))}
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </Container>
    </>
  );
};
