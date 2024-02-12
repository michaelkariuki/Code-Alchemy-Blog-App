import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import "../styles/components/SidePanelSlider.scss";
import { Image } from "react-bootstrap";
// import config from "../config";

type SliderProps = {
  image: string;
  tagTitle: string;
};

export type SidePanelSliderProps = {
  items: SliderProps[]
  sidePanel?: boolean
}

const SidePanelSlider: React.FC<SidePanelSliderProps> = ({items, sidePanel}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderData, setSliderData] = useState([...items]);

  const numberOfSlides: number  = sliderData.length
  const sliderContentRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);


  // Corrected the initialization of refs
  const lastSliderImgWrapperRef = useRef<HTMLDivElement | null>(null);


  const handleClick = () => {
    setCurrentSlide((prev) => (prev + 1) % numberOfSlides);
  };

  const renderSliderCards = (data: SliderProps[]) => {
    // const duplicatedSlides = [...data, ...data];
    let recycledSlides: SliderProps[] = data;

    if(isVisible){
      recycledSlides = data.slice(currentSlide).concat(data.slice(0, currentSlide));
      // setSliderData(recycledSlides);
    }

    if (Array.isArray(data)){
      return recycledSlides.map((item, idx) => { 
        return (
          <div
            key={idx}
            ref={(ref) => (idx === recycledSlides.length - 1 ? (lastSliderImgWrapperRef.current = ref) : null)}
            className="slider-img-wrapper"
            style={{ transform: `translateX(${currentSlide * 100}%)` }}
          >
             <Image src={item.image} rounded />
            <p> {item.tagTitle} </p>
          </div>
        );
      });
    }else{
      return (
        <div>No data</div>
      )
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const lastSlideVisible = entries[0].isIntersecting;
        console.log("Last Slide Visible:", lastSlideVisible, entries[0]);

        if (lastSlideVisible) {
          // The last slide is visible within the slider-content, handle accordingly
          // (e.g., trigger action, recycle items, etc.)
          // setIsVisible(true);
          // renderSliderCards(items);
            setSliderData([...sliderData, ...sliderData])
        }
      },
      {
        root: null, // specify slider-content as the root
        rootMargin: "0px",
        threshold: 1.0, // fully visible
      }
    );

    // Start observing the last slider-img-wrapper element
    if (lastSliderImgWrapperRef.current) {
      observer.observe(lastSliderImgWrapperRef.current);
    }
   
    return () => {
      // Cleanup the observer when component unmounts
      observer.disconnect();
    };
  }, [currentSlide, numberOfSlides]); // Re-run effect when the currentSlide or numberOfSlides changes
  return (
    <div className="slider-wrapper col d-flex mw-50"  >
      <div className="slider-content col d-flex flex-row-reverse" ref={sliderContentRef} style={sidePanel ? { maxWidth: "240px" } : {}}>
        {renderSliderCards(sliderData)}
      </div>
      <div
        className="next-icon ms-2 rounded col-2 d-flex align-items-center justify-content-center"
        onClick={handleClick}
      >
        <IoIosArrowForward className="icon"/>
      </div>
    </div>
  );
};

export default SidePanelSlider;
