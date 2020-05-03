import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClassNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import FileBase64 from "react-file-base64";
import BaseButton from "../BaseButton";
import "./ImageUploadMulitple.scss";

const ImageUploadMultiple = props => {
  const { onDone, onRemove, className, value } = props;
  return (
    <div className={ClassNames("image-upload-mulitple-wrapper", className)}>
      <div className={"file-base"}>
        <BaseButton
          className={"text-link-white btn-upload d-inline-block"}
          variant={"orange"}
          inline={true}
          content={"Upload image"}
        />
        <FileBase64
          multiple={true}
          onDone={onDone}/>
      </div>
      <div className={"image-section d-flex"}>
        {value.map((image, index) => {
          return (
            <div key={index} className={"image-section__item"}>
              <FontAwesomeIcon icon={"times"} className={"icon"} onClick={() => onRemove(index)}/>
              <img className={"img-thumbnail"} alt={"image-item"} src={image}/>
            </div>
          );
        })}
      </div>
    </div>
  );
};

ImageUploadMultiple.defaultProps = {
  value: []
};

ImageUploadMultiple.propTypes = {
  className: PropTypes.string,
  value: PropTypes.array,
  onDone: PropTypes.func.isRequired,
  onRemove: PropTypes.func
};

export default ImageUploadMultiple;
