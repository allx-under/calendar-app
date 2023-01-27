import icon from "../../imgs/calendar-icon.svg";
import styled from "styled-components";

const DatePickerBtn = ({ onClickToggle }) => {
  return (
    <StyledBtn onClick={onClickToggle}>
      <img src={icon} width="25px" alt="calendar-icon" srcset="" />
    </StyledBtn>
  );
};

export default DatePickerBtn;

const StyledBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  &:hover {
    fill: gray;
  }
`;
