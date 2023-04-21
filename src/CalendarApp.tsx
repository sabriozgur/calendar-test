import React, {SetStateAction, useState} from "react";
import "./styles.css";
import moment from "moment";
import clsx from "clsx";

interface CalendarDayProps {
  date: moment.Moment;
  activeDate: moment.Moment | undefined;
  setActive: (date: moment.Moment) => void;
}

interface CalendarProps {
  inputDate: moment.Moment;
}

function CalendarDay({ date, activeDate, setActive }: CalendarDayProps) {
  const dayName = moment(date).format("dddd");
  const dayOfMonth = moment(date).date();
  const className = clsx({
    "calendar-day": true,
    "active-day": moment(activeDate).isSame(date),
    today: moment(date).isSame(moment().startOf("day"))
  });

  return (
      <CalendarDayDumb
          className={className}
          date={date}
          dayName={dayName}
          dayOfMonth={dayOfMonth}
          setActive={setActive}
      />
  );
}

function CalendarDayDumb({ className, date, dayName, dayOfMonth, setActive }: any) {
  return (
      <div className={className} onClick={() => setActive(date)}>
        <p>{dayName}</p>
        <p>{dayOfMonth}</p>
      </div>
  );
}

function Calendar({ inputDate }: CalendarProps) {
  const [date, setDate] = useState(inputDate);
  // TODO fix here cant define null because of lots of typescript errors
  const [activeDate, setActiveDate] = useState(moment("1970-01-01 16:00Z"));

  function goToNextWeek() {
    setDate(moment(date).add(7, "days"));
  }

  function goToPreviousWeek() {
    setDate(moment(date).add(-7, "days"));
  }

  function setActive(date: moment.Moment) {
    // TODO fix this type warning useState undefined??
    setActiveDate(date);
  }

  const monday = moment(date).startOf("week");
  const DAYS_IN_WEEK = 7;
  const days = [];
  for (let i = 0; i < DAYS_IN_WEEK; i++) {
    let day_of_component = moment(monday).add(i, "days");
    days.push(
      <CalendarDay
        key={day_of_component.format("DDMMYY")}
        date={day_of_component}
        setActive={setActive}
        activeDate={activeDate}
      />
    );
  }
  return (
      <CalendarDumb
          date={date}
          days={days}
          goToNextWeek={goToNextWeek}
          goToPreviousWeek={goToPreviousWeek}
      />
  );
}

function CalendarDumb({ date, days, goToNextWeek, goToPreviousWeek }: any) {
  return (
      <div className="calendar">
        <div className="calendar-top-bar">
        <button className="button button-align" onClick={goToPreviousWeek}>
            Prev
        </button>
            <h1 className="button-align">{moment(date).format("MMMM")}</h1>
        <button className="button button-align" onClick={goToNextWeek}>
          Next
        </button>
        </div>
        <div className="calendar-bottom-bar">
            {days}
        </div>

      </div>
  );
}

export default function CalendarApp() {
  moment.locale("tr");
  let date = moment();
  return (
    <div>
      <Calendar inputDate={date} />
    </div>
  );
}
