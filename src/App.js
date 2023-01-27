import { useState, useEffect } from "react";
import styled from "styled-components";

import AddEventButton from "./components/AddEventButton.jsx/AddEventButton";
import DateFilter from "./components/DateFilter/DateFilter";
import DatePicker from "./components/DatePicker/DatePicker";
import DaysList from "./components/DaysList/DaysList";
import DaysListItem from "./components/DaysListItem/DaysListItem";
import months from "./helpers/months";
import daysInWeek from "./helpers/daysInWeek";
import DatePickerBtn from "./components/DatePickerBtn/DatePickerBtn";
import EventForm from "./components/EventForm/EventForm";

function App() {
  const daysNumberByMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const daysNumberLeap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const now = new Date();

  const [date, setDate] = useState(now);
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [startDay, setStartDay] = useState(getStartDayOfMonth(date));

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showNewEventForm, setShowNewEventForm] = useState(false);

  const onClickToggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const onClickShowForm = () => {
    setShowNewEventForm(true);
  };

  const onClickCloseModal = () => {
    setShowNewEventForm(false);
  };

  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setStartDay(getStartDayOfMonth(date));
  }, [date]);

  function getStartDayOfMonth(date) {
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return startDate === 0 ? 7 : startDate;
  }
  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  const daysNumber = isLeapYear(date.getFullYear())
    ? daysNumberLeap
    : daysNumberByMonth;

  return (
    <Container>
      <HeaderStyled>
        <AddEventButton onClick={onClickShowForm} />
        <EventForm
          isOpenModal={showNewEventForm}
          closeModal={onClickCloseModal}
        />
        <WrapperFilter>
          <DateFilter
            month={months[month]}
            year={year}
            prevMonth={() => setDate(new Date(year, month - 1, day))}
            nextMonth={() => setDate(new Date(year, month + 1, day))}
          />
          <DatePickerBtn onClickToggle={onClickToggleDatePicker} />
          {showDatePicker && (
            <DatePicker
              setDate={(selectedYear, selectedMonth) => {
                setDate(new Date(selectedYear, selectedMonth));
                onClickToggleDatePicker();
              }}
            />
          )}
        </WrapperFilter>
      </HeaderStyled>

      <DaysList>
        {daysInWeek.map((item, index) => (
          <DaysListItem key={index} content={item} />
        ))}{" "}
        {Array(daysNumber[month] + (startDay - 1))
          .fill(null)
          .map((_, index) => {
            const dayNum = index - (startDay - 2);
            return (
              <DaysListItem
                key={index}
                isToday={
                  dayNum === now.getDate() &&
                  month === now.getMonth() &&
                  year === now.getFullYear()
                }
                content={dayNum > 0 ? dayNum : ""}
              />
            );
          })}
      </DaysList>
    </Container>
  );
}

export default App;

const WrapperFilter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Container = styled.div`
  margin: 0 15px;
`;

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
`;
