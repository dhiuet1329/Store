// import React from 'react'
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

// const spanStyle = {
//   padding: "20px",
//   backgroundColor: "#efefef",
//   color: "#000000",
// };
const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "600px",
};
const slideImages = [
  {
    url: "https://theme.hstatic.net/200000378371/1001142643/14/slideShow_f1_2.png?v=561",
  },
  {
    url: "https://theme.hstatic.net/200000378371/1001142643/14/slideShow_f1_3.png?v=561",
  },
  {
    url: "https://theme.hstatic.net/200000378371/1001142643/14/slideShow_f1_4.png?v=561",
  },
  {
    url: "https://theme.hstatic.net/200000378371/1001142643/14/slideShow_f1_5.png?v=561",
  },
];
const Slider = () => {
  return (
    <div className="slide-container">
      <Slide>
        {slideImages.map((slideImages, index) => (
          <div key={index}>
            <div
              style={{
                ...divStyle,
                backgroundImage: `url(${slideImages.url})`,
              }}
            ></div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Slider;
