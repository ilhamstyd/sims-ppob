import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Services = ({ banner }) => {
    const navigate = useNavigate()
  return (
    <div className="mt-4 text-center">
      <Image src={banner?.service_icon} className="ms-2 me-2" style={{cursor:"pointer"}} onClick={() => navigate("/profile-buy")}/>
      <p style={{ fontSize: "15px" }}>{banner?.service_name}</p>
    </div>
  );
};
