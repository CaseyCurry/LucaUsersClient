import React from "react";

const PasswordStrengthMeter = ({strength}) => {
  const backgroundColor = getBackgroundColor(strength);
  const width = (strength + 1) * 20;
  const style = {
    "width": `${width}%`,
    "minHeight": "inherit",
    backgroundColor
  };
  return <div className="meter">
    {width > 0
      ? <div style={style}/>
      : <span>Strength Meter</span>}
  </div>;
};

PasswordStrengthMeter.propTypes = {
  strength: React.PropTypes.number.isRequired
};

const getBackgroundColor = (level) => {
  switch (level) {
    case 0:
      return "red";
    case 1:
      return "orange";
    case 2:
      return "yellow";
    case 3:
      return "#00ff00";
    case 4:
      return "green";
  }
};

export default PasswordStrengthMeter;
