import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Profile } from "../pages/Profile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchServices } from "../features/ProfileSlice";

export const Services = () => {
  
  const banner = useSelector((state) => state.profile.merges.services);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

    const navigate = useNavigate()
  return (
    <div className="mt-4 text-center d-flex">
      {banner?.map((banners, i) => (
      <div>
      <Image src={banners.service_icon} className="ms-2 me-2" key={i}/>
      <p style={{ fontSize: "15px", cursor:"pointer"}} onClick={() => navigate(`/profile-buy/${i}`)}>{banners.service_name}</p>
      <div className="d-none">
      <Profile service={banners.service_icon}/>
      </div>
      </div>
      ))}
    </div>
  );
};
