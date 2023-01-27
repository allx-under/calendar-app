import styled from "styled-components";

const DaysListItem = ({ content, isToday }) => {
  return <StyledItem isToday={isToday}>{content}</StyledItem>;
};

export default DaysListItem;

const StyledItem = styled.li`
  width: 14.2%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  ${({ isToday }) =>
    isToday &&
    `
      background: #B4F8C8;
    `}
`;
