import OtpInput from "react-otp-input";
import { useState } from "react";

export default function OtpCom() {
    const [code, setCode] = useState("");

    const handleChange = (code) => setCode(code);

    const renderInput = (props) => (
        <input {...props} />
    );

    return (
        <div class="otp-component">
            <OtpInput
                value={code}
                onChange={handleChange}
                numInputs={6}
                separator={<span style={{ width: "8px" }}></span>}
                isInputNum={true}
                shouldAutoFocus={true}
                renderInput={renderInput}
                inputStyle={{
                    border: "1px solid #0A8A33",
                    borderRadius: "8px",
                    width: "54px",
                    height: "54px",
                    fontSize: "12px",
                    color: "#000",
                    fontWeight: "400",
                    caretColor: "blue"
                }}
                focusStyle={{
                    border: "1px solid #CFD3DB",
                    outline: "none"
                }}
            />

          
        </div>
    );
}
