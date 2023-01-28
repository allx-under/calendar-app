import PropTypes from "prop-types";

import styled from "styled-components";
import icon from "../../imgs/calendar-icon.svg";

const DatePickerBtn = ({ onClickToggle }) => {
  return (
    <StyledBtn onClick={onClickToggle}>
      <img src={icon} width="25px" alt="calendar-icon" />
    </StyledBtn>
  );
};

DatePickerBtn.propTypes = {
  onClickToggle: PropTypes.func,
};
export default DatePickerBtn;

const StyledBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  transition: transform 250ms linear;
  &:hover {
    transform: scale(1.1);
  }
`;
