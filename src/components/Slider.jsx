import React from "react";
import Icon from "./Icon";

const SLIDER_DIRECTION = { RIGHT: 1, LEFT: -1, STOP: 0 };

const Slider = ({ children }) => {
  const slider = React.useRef(null);

  const moveSlider = (ref, direction) => {
    const { scrollWidth, scrollLeft, clientWidth } = ref;
    const maxScroll = scrollLeft + clientWidth;
    if (maxScroll >= scrollWidth) setSliderDirection(SLIDER_DIRECTION.LEFT);
    if (scrollLeft <= 0) setSliderDirection(SLIDER_DIRECTION.RIGHT);
    const elWidth = slider.current.firstChild?.clientWidth;
    slider.current.scrollLeft += elWidth * direction;
  };

  /* TODO: Buttons for arrows instead div */
  const getArrowsHtml = () => (
    <div className="slider__arrows">
      <div
        className={scrollPosition === 0 ? `hide` : ""}
        onClick={() => moveSlider(slider.current, SLIDER_DIRECTION.LEFT)}
      >
        <Icon name="chevron-left-outline" />
      </div>
      <div
        className={scrollPosition === maxScroll ? `hide` : ""}
        onClick={() => moveSlider(slider.current, SLIDER_DIRECTION.RIGHT)}
      >
        <Icon name="chevron-right-outline" />
      </div>
    </div>
  );

  const [maxScroll, setMaxScroll] = React.useState(0);
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [sliderDirection, setSliderDirection] = React.useState(SLIDER_DIRECTION.RIGHT);

  // const [clearInterval, startInverval] = useInterval(
  //   () => moveSlider(carsList.current, sliderDirection),
  //   2000,
  //   sliderDirection
  // );

  React.useEffect(() => {
    if (!slider?.current?.clientWidth) return;
    const { scrollWidth, clientWidth } = slider.current;
    setMaxScroll(scrollWidth - clientWidth);
  }, [slider?.current?.clientWidth]);

  return (
    <div className="slider">
      <ul
        ref={slider}
        // onMouseEnter={() => clearInterval()}
        // onMouseLeave={() => startInverval()}
        onScroll={(e) => setScrollPosition(e.target.scrollLeft)}
      >
        {children}
      </ul>
      {getArrowsHtml()}
    </div>
  );
};

export default Slider;
