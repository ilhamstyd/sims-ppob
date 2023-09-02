import { useEffect } from "react";
import { Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanner } from "../features/ProfileSlice";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';

export const BannerHome = () => {
  const dispatch = useDispatch();
  const banner = useSelector((state) => state.profile.banner);

  console.log("lagi ngerapihin :", banner);

  useEffect(() => {
    dispatch(fetchBanner());
  }, [dispatch]);
  return (
    <div>
      {banner ? (
        <Carousel
        additionalTransfrom={0}
        arrows={false}
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container-padding-bottom"
        dotListClass=""
        draggable
        focusOnSelect
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 4,
            partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 30,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
            items: 2,
            partialVisibilityGutter: 30,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {banner?.map((data, index) => (
          <Image src={data?.banner_image} key={index} style={{cursor:"pointer"}}/>
        ))}
      </Carousel>
      ):(
        <div>Loading .....</div>
      )}
      
    </div>
  );
};
