import { Image } from "react-bootstrap";

export const BannerHome = ({ data }) => {
  return (
    <>
      <Image src={data?.banner_image}/>
    </>
  );
};
