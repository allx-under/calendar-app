import PropTypes from "prop-types";

import styled from "styled-components";

const DaysListItem = ({ content, isToday, event, onClick }) => {
  return (
    <StyledItem isToday={isToday}>
      <StyledDate>{content}</StyledDate>
      {event && (
        <StyledEvent onClick={onClick}>
          {" "}
          <span> {event.title}</span> <span> {event.time}</span>
        </StyledEvent>
      )}
      {isToday && (
        <StyledText>
          Enjoy today 😀. It's one of the "good old days" you will miss in the
          future!
        </StyledText>
      )}
    </StyledItem>
  );
};

DaysListItem.propTypes = {
  content: PropTypes.any,
  isToday: PropTypes.bool,
  event: PropTypes.shape({
    title: PropTypes.string,
    escription: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    createdAt: PropTypes.number,
    updatedAt: PropTypes.number,
  }),
  onClick: PropTypes.func,
};

export default DaysListItem;

const StyledItem = styled.li`
  width: 14.2%;
  height: 100px;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  border-right: 0.5px solid black;
  border-bottom: 0.5px solid black;
  position: relative;

  ${({ isToday }) =>
    isToday &&
    `
      box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
      border-radius: 5px;
    `};
`;

const StyledEvent = styled.div`
  width: 100px;
  height: 50px;
  position: absolute;
  font-size: 14px;
  top: 5px;
  right: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
  background-color: #f0f0f0;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  transition: box-shadow 200ms linear, transform 200ms linear;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
    transform: scale(1.1);
  }
`;

const StyledDate = styled.span`
  font-size: 20px;
`;

const StyledText = styled.span`
  font-size: 10px;
  text-align: end;
  width: 130px;
`;
