import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import "./Signature.scss";
import SignaturePad from "react-signature-canvas";
import "../ModalWarning/ModalWarning.scss";
import Popup from "reactjs-popup";
import ClassNames from "classnames";
import BaseButton from "../BaseButton";
import TextBox from "../TextBox";

const Signature = props => {
  const {
    onChange = () => {
    }
  } = props;
  const [imageURL, setImageURL] = useState(null); // create a state that will contain our image url
  
  const sigCanvas = useRef({});
  
  /* a function that uses the canvas ref to clear the canvas
  via a method given by react-signature-canvas */
  const clear = () => sigCanvas.current.clear();
  
  /* a function that uses the canvas ref to trim the canvas
  from white spaces via a method given by react-signature-canvas
  then saves it in our state */
  const save = (close) => {
    let temp = sigCanvas.current.getTrimmedCanvas().toDataURL();
    setImageURL(temp);
    onChange(temp);
    close();
  };
  return (
    <div className={"signature-wrapper"}>
      <Popup
        modal
        className={ClassNames("signature")}
        contentStyle={{
          'width': '400px',
          'maxWidth': '100%'
        }}
        trigger={
          <div className={"image-block"}>
            {imageURL ? (
              <img
                className={"img-signature"}
                src={imageURL}
                alt="my signature"
              />
            ) : null}
          </div>}
        closeOnDocumentClick={false}
      >
        {close => (
          <div>
            <SignaturePad
              ref={sigCanvas}
              canvasProps={{
                className: "signature-canvas"
              }}
            />
            {/* Button to trigger save canvas image */}
            <div className={"text-center"}>
              {props.acceptText &&
              <BaseButton className={"button-smalls-white mr-2"}
                          inline={true}
                          variant="orange"
                          content={props.acceptText}
                          onClick={() => save(close)}/>
              }
              {props.cancelText &&
              <BaseButton className={"button-smalls-white mr-2"}
                          inline={true}
                          variant="main"
                          content={props.cancelText}
                          onClick={() => close()}/>
              }
              
              <BaseButton className={"button-smalls-white"}
                          inline={true}
                          variant="main"
                          content={"Clear"}
                          onClick={() => clear()}/>
            </div>
          </div>
        )}
      </Popup>
      <TextBox placeholder={""}
               value={props.value}
               classNameInput={"d-none"}
               name={props.name}
               isTextarea={true}
               error={props.error}
               touched={props.touched}
               onBlur={props.onBlur}
      />
    </div>
  );
};

Signature.defaultProps = {
  acceptText: "Save",
  cancelText: "Cancel"
};

Signature.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  appendLabel: PropTypes.any,
  onClick: PropTypes.func,
  type: PropTypes.string,
  format: PropTypes.bool,// format number
  readOnly: PropTypes.bool,
  showError: PropTypes.bool,
  value: PropTypes.any,
  name: PropTypes.string,
  label: PropTypes.any,
  touched: PropTypes.oneOf([true, false, undefined]),
  error: PropTypes.string,
  classNameAppend: PropTypes.string,
  prependLabel: PropTypes.any,
  classNamePrepend: PropTypes.string,
  classNameInput: PropTypes.string,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  onBlur: PropTypes.func,
  onChange: PropTypes.func
};

export default Signature;
