import { Carousel, Container} from "react-bootstrap";
import { useEffect, useState } from "react";
import { Services } from "../components/Sevices";
import { BannerHome } from "../components/Banner";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanner } from "../features/ProfileSlice";
import { Navigationbar } from "../components/Navbar";
import ComponentProfile from "../components/ComponentProfile";

export const HomePage = () => {

  const dispatch = useDispatch();
  const banner = useSelector((state) => state.profile.merges.banner);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    dispatch(fetchBanner());
  }, [dispatch]);
  return (
    <>
      <Navigationbar />
      <Container className="">
        <ComponentProfile/>
        <div className="d-flex">
          <Services />
        </div>
        <p style={{ fontWeight: "600", marginTop: "40px" }}>
          Temukan promo menarik
        </p>
        <div className="">
          <div className="">
            <Carousel
              activeIndex={index}
              onSelect={handleSelect}
              style={{ display: "flex" }}
            >
              <Carousel.Item>
                {banner?.map((bannerImg, i) => (
                  <BannerHome key={i} data={bannerImg} />
                ))}
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </Container>
    </>
  );
};
