import PropTypes from "prop-types";
import styled from "styled-components";

import addIcon from "../../imgs/add-icon.png";

const AddEventButton = ({ onClick }) => {
  return (
    <StyledBtn onClick={onClick}>
      <img src={addIcon} width="25px" alt="add-event" />
    </StyledBtn>
  );
};

AddEventButton.propTypes = {
  onClick: PropTypes.func,
};
export default AddEventButton;

const StyledBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  transition: transform 200ms linear, background-color 250ms linear;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    transform: rotate(90deg) scale(1.2);
  }
`;
