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
  const [month, setMonth] = useState(
    JSON.parse(localStorage.getItem("month")) || date.getMonth()
  );
  const [year, setYear] = useState(
    JSON.parse(localStorage.getItem("year")) || date.getFullYear()
  );
  const [startDay, setStartDay] = useState(
    JSON.parse(localStorage.getItem("startDay")) || getStartDayOfMonth(date)
  );

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showNewEventForm, setShowNewEventForm] = useState(false);
  const [openFormToUpdate, setOpenFormToUpdate] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState({});

  const [events, setEvents] = useState(
    JSON.parse(localStorage.getItem("events")) || []
  );

  const onClickToggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const onClickShowForm = () => {
    setShowNewEventForm(true);
  };

  const onClickCloseModal = () => {
    setShowNewEventForm(false);
  };

  const onEventClickToUpdate = (info) => {
    setOpenFormToUpdate(true);
    setShowNewEventForm(true);
    setDataToUpdate({ ...info });
  };

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
    localStorage.setItem("month", JSON.stringify(month));
    localStorage.setItem("year", JSON.stringify(year));
    localStorage.setItem("startDay", JSON.stringify(startDay));
  }, [year, month, events, startDay]);

  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setStartDay(getStartDayOfMonth(date));
  }, [date]);

  useEffect(() => {
    const monthStorage = JSON.parse(localStorage.getItem("month"));
    const yearStorage = JSON.parse(localStorage.getItem("year"));
    const startDayStorage = JSON.parse(localStorage.getItem("startDay"));

    if (monthStorage) {
      setMonth(monthStorage);
      setStartDay(startDayStorage);
    }
    if (yearStorage) {
      setYear(yearStorage);
    }
  }, []);

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
          openToUpdate={openFormToUpdate}
          closeModal={onClickCloseModal}
          setEvents={setEvents}
          setOpenToUpdate={setOpenFormToUpdate}
          updatedData={dataToUpdate}
          setDataToUpdate={setDataToUpdate}
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
            const correctMonth = month + 1;
            const dateToRender = `${year}-${
              correctMonth < 10 ? "0" + correctMonth : correctMonth
            }-${dayNum < 10 ? "0" + dayNum : dayNum}`;
            const eventToRender = events.find((e) => e.date === dateToRender);
            return (
              <DaysListItem
                key={index}
                isToday={
                  dayNum === now.getDate() &&
                  month === now.getMonth() &&
                  year === now.getFullYear()
                }
                content={dayNum > 0 ? dayNum : ""}
                event={eventToRender}
                onClick={() => onEventClickToUpdate(eventToRender)}
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
