import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import years from "../../helpers/years";
import months from "../../helpers/months";

const DatePicker = ({ setDate }) => {
  const [isYearChoosed, setIsYearChoosed] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);

  const onClickChooseYear = (year) => {
    setSelectedYear(Number(year));
    setIsYearChoosed(true);
  };

  const onClickChooseMonth = (month) => {
    setIsYearChoosed(false);
    const monthNum = months.indexOf(month);
    setDate(selectedYear, monthNum);
  };

  return (
    <Container>
      {!isYearChoosed
        ? years.map((year) => (
            <StyledBtn key={year} onClick={() => onClickChooseYear(year)}>
              {year}
            </StyledBtn>
          ))
        : months.map((month) => (
            <StyledBtn key={month} onClick={() => onClickChooseMonth(month)}>
              {month}
            </StyledBtn>
          ))}
    </Container>
  );
};

DatePicker.propTypes = {
  setDate: PropTypes.func,
};

export default DatePicker;

const Container = styled.div`
  position: absolute;
  top: 40px;
  right: 10px;
  padding: 5px 5px;
  width: 300px;
  height: 300px
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border-radius: 5px;
  border: 1px solid #a1a1a1;
  background: rgb(117,117,117);
background: linear-gradient(107deg, rgba(117,117,117,0.8239889705882353) 37%, rgba(103,103,103,1) 82%);
z-index:2;
`;

const StyledBtn = styled.button`
  color: white;
  margin: 0;
  width: 25%;
  background: transparent;
  border: none;
  padding: 5px 5px;
  transition: all 250ms linear;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    background: #f9f9f9;
    color: rgba(103, 103, 103, 1);
  }
`;
