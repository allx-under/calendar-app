import styled from "styled-components";
import backIcon from "../../imgs/prev-icon.png";
import nextIcon from "../../imgs/next-icon.png";

const DateFilter = ({ year, month, prevMonth, nextMonth }) => {
  return (
    <Container>
      <StyledBtn onClick={prevMonth}>
        <img src={backIcon} width="20px" height="20px" alt="" srcset="" />
      </StyledBtn>
      <StyledContent>
        {month} {year}
      </StyledContent>
      <StyledBtn onClick={nextMonth}>
        <img src={nextIcon} width="20px" height="20px" alt="" srcset="" />
      </StyledBtn>
    </Container>
  );
};

export default DateFilter;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledContent = styled.p`
  width: 125px;
  text-align: center;
`;

const StyledBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 250ms linear, background-color 250ms linear;
  &:hover {
    transform: scale(1.1);
    background-color: #d9d9d9;
  }
`;
