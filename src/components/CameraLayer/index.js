import React, { useState } from "react";
import "./CameraLayer.scss";
import imageCamera from "../../images/camera_layer.png";
import CameraScanner from "../../utils/cameraScanner";
import * as PropTypes from "prop-types";

const CameraLayer = props => {
  const { onChangeCode } = props;
  const [scanner] = useState(new CameraScanner());
  return (
    <div className={"camera-layer-wrapper text-center"}>
      <img
        className={"img-fluid mx-auto camera-image"}
        src={imageCamera}
        alt={"camera-layer"}
        onClick={() => {
          try {
            scanner.scan(onChangeCode);
          } catch (e) {
            alert(e);
          }
          // let barCode = scanner.getBarcode();
          // console.log("barCode--------------", barCode);
          // onChangeCode(barCode);
        }}
      />
    </div>
  );
};

CameraLayer.defaultProps = {
  onChangeCode: () => {
  }
};

CameraLayer.propTypes = {
  onChangeCode: PropTypes.func
};

export default CameraLayer;
