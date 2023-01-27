import React, { useState } from "react";
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
    <div className={className} onClick={() => setActive(date)}>
      <p>{dayName}</p>
      <p>{dayOfMonth}</p>
    </div>
  );
}

function Calendar({ inputDate }: CalendarProps) {
  const [date, setDate] = useState(inputDate);
  const [activeDate, setActiveDate] = useState(undefined);

  function goToNextWeek() {
    setDate(moment(date).add(7, "days"));
  }

  function goToPreviousWeek() {
    setDate(moment(date).add(-7, "days"));
  }

  function setActive(date: moment.Moment | undefined) {
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
    <div className="calendar">
      <h1>{moment(date).format("MMMM")}</h1>
      <tbody>{days}</tbody>
      <button className="button next" onClick={goToNextWeek}>
        Next
      </button>
      <button className="button prev" onClick={goToPreviousWeek}>
        Prev
      </button>
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
