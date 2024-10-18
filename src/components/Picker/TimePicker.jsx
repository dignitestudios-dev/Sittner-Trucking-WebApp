import React, { useState } from "react";
import { TimePicker } from "react-ios-time-picker";

export const ModernTimePicker = () => {
  const [value, setValue] = useState("10:00 AM");

  const onChange = (timeValue) => {
    setValue(timeValue);
  };

  return (
    <div className="relative mt-3 lg:mt-0">
      <TimePicker onChange={onChange} value={value} use12Hours />
      <img
        src="/clock.png"
        alt=""
        className="absolute bottom-[23%] ml-2 w-5"
        srcset=""
      />
    </div>
  );
};
