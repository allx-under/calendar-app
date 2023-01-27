import styled from "styled-components";

const DaysList = ({ children }) => {
  return <StyledList>{children}</StyledList>;
};

export default DaysList;

const StyledList = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 0;
`;
