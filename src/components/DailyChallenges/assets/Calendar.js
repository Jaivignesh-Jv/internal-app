// Calendar.js

import { Grid, Typography, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";

import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import "./Calendar.css";

const Calendar = ({ selectedDate,setSelectedDate }) => {
  const [dateSelected, setDateSelected] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  useEffect(() => {
    if(selectedDate === ""){
      setSelectedDate(currentDate.toISOString().split("T")[0]);
    }
  }, []); 
  const onPressDate = (day) => {
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    selectedDate.setDate(selectedDate.getDate() + 1);
    setSelectedDate(selectedDate.toISOString().split("T")[0]);
  };


  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendarData = () => {
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const totalDays = daysInMonth(
      currentDate.getMonth(),
      currentDate.getFullYear()
    );

    // Define the start and end dates for highlighting
    // const startDate = new Date(2024, 0, 2);
    // const endDate = new Date(2024, 0, 10);

    let calendarData = [];

    // Fill the days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      calendarData.push({
        day: "",
        isCurrentMonth: false,
        isHighlighted: false,
      });
    }

    // Fill the days of the current month
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i
      );
        console.log(date.toISOString().split('T')[0] - 1);
      const dateMinusOne = new Date(date);
      dateMinusOne.setDate(dateMinusOne.getDate() + 1);
      const isHighlighted = dateMinusOne.toISOString().split('T')[0] === selectedDate;
      calendarData.push({
        day: i,
        isCurrentMonth: true,
        isHighlighted,
        // isFirstInHighlightedRange: isHighlighted && date.getTime() === startDate.getTime(),
        // isLastInHighlightedRange: isHighlighted && date.getTime() === endDate.getTime(),
        // isStartOfWeek: i === 1 || (i > 1 && date.getDay() === 0),
        // isEndOfWeek: i === totalDays || (i < totalDays && date.getDay() === 6),
      });
    }

    return calendarData;
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  return (
    <Grid container style={{ width: "100%", height: "100%" }}>
      <Grid
        container
        item
        xs={12}
        direction="column"
        style={{ height: "100%" }}
      >
        {/* Header */}
        <Grid
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            className="Month"
            style={{ marginLeft: "0.5em" , fontSize:"1em" , color:"#808080", fontWeight:600}}
          >{`${new Intl.DateTimeFormat("en-US", { month: "long" }).format(
            currentDate
          )} ${currentDate.getFullYear()}`}</Typography>
          <Grid style={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton size="small" onClick={handlePrevMonth}>
              {" "}
              <MdNavigateBefore />{" "}
            </IconButton>
            <IconButton size="small" onClick={handleNextMonth}>
              {" "}
              <MdNavigateNext />{" "}
            </IconButton>
          </Grid>
        </Grid>

        {/* Body */}
        <Grid
          container
          item
          xs={12}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            marginTop: "0.2em",
          }}
        >
          {/* Weekdays and Dates Container */}
          <Grid container item xs={12} style={{ flex: 1, display: "flex" }}>
            {/* Weekdays */}
            <Grid className="Week" container item xs={12}>
              {[..."SMTWTFS"].map((day, index) => (
                <Grid
                  key={index}
                  item
                  xs={1.7}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop:"0.8em",
                    paddingBottom:"0.4em",
                  }}
                >
                  <Typography className="WeekFont">{day}</Typography>
                </Grid>
              ))}
            </Grid>
            {/* Dates */}
            {generateCalendarData().map((data, index) => (
              <Grid
                className={`${data.isHighlighted ? "gridHighlighted" : ""} ${
                  data.isFirstInHighlightedRange ? "firstGridHighlighted" : ""
                } ${
                  data.isLastInHighlightedRange ? "lastGridHighlighted" : ""
                }`}
                key={index}
                item
                xs={1.7}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderTopLeftRadius:
                    data.isStartOfWeek || data.isFirstInHighlightedRange
                      ? "50%"
                      : "0",
                  borderTopRightRadius:
                    data.isEndOfWeek || data.isLastInHighlightedRange
                      ? "50%"
                      : "0",
                  borderBottomRightRadius:
                    data.isEndOfWeek || data.isLastInHighlightedRange
                      ? "50%"
                      : "0",
                  borderBottomLeftRadius:
                    data.isStartOfWeek || data.isFirstInHighlightedRange
                      ? "50%"
                      : "0",
                  cursor: "pointer",
                  
                }}
                onClick={() => onPressDate(data.day)}
              >
                <Typography
                  className={`DateFont ${
                    data.isCurrentMonth ? "" : "inactive"
                  } ${data.isHighlighted ? "highlighted" : ""} ${
                    data.isFirstInHighlightedRange ? "first-highlighted" : ""
                  } ${data.isLastInHighlightedRange ? "last-highlighted" : ""}`}
                  style={{
                    color: "#808080" ,
                    padding: "0.2em",
                    fontWeight: data.isHighlighted ? "bold":"normal" ,               
                  }}
                >
                  {data.day}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Calendar;
