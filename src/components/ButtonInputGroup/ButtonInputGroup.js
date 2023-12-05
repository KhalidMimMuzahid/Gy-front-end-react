import React, { useState } from "react";

const ButtonInputGroup = ({ selectedValue, setcurVal }) => {
  const [selectedOption, setSelectedOption] = useState(10); // State to track the selected option
  console.log(selectedOption);
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setcurVal(e.target.value);
  };

  return (
    <div className='button-input-group'>
      {selectedValue?.map((eachvalue, i) => (
        <label className='button-label' key={i}>
          <input
            type='radio'
            value={eachvalue}
            checked={selectedOption === eachvalue}
            onChange={handleOptionChange}
          />
          {eachvalue}
        </label>
      ))}
    </div>
  );
};

export default ButtonInputGroup;
