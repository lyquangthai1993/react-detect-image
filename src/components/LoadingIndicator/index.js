import React from "react";
import Circle from "./Circle";
import Wrapper from "./Wrapper";
import PropTypes from "prop-types";

const overlayStyle = {
  "zIndex": "1080",
  "position": "fixed",
  "backgroundColor": "rgba(0, 0, 0, 0.5)",
  "width": "100vw",
  "height": "100vh",
  "top": 0,
  "left": 0,
  "right": 0,
  "bottom": 0
};

const titleStyle = {
  "zIndex": "1081",
  "position": "fixed",
  "width": "100%",
  "left": 0,
  "right": 0,
  "textAlign": "center",
  "fontSize": 40,
  "color": "white",
  "height": "100vh",
  "display": "table-cell",
  "verticalAlign": "middle"
};
const LoadingIndicator = (props) => {
  const { title = "" } = props;
  return <div className="background-overlay" style={overlayStyle}>
    {title && <div className={"title"} style={titleStyle}>{title}</div>}
    <Wrapper>
      <Circle/>
      <Circle rotate={30} delay={-1.1}/>
      <Circle rotate={60} delay={-1}/>
      <Circle rotate={90} delay={-0.9}/>
      <Circle rotate={120} delay={-0.8}/>
      <Circle rotate={150} delay={-0.7}/>
      <Circle rotate={180} delay={-0.6}/>
      <Circle rotate={210} delay={-0.5}/>
      <Circle rotate={240} delay={-0.4}/>
      <Circle rotate={270} delay={-0.3}/>
      <Circle rotate={300} delay={-0.2}/>
      <Circle rotate={330} delay={-0.1}/>
    </Wrapper>
  </div>;
};
LoadingIndicator.propTypes = {
  title: PropTypes.string
};
export default LoadingIndicator;
