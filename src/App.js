import "./App.css";
import React, { useRef, useState } from "react";

function App() {
  const [days, setDays] = useState();
  const startInputRef = useRef();
  const endInputRef = useRef();
  const caluclateDifference = (startDate, endDate) => {
    const [startYear, startMonth, startDay] = startDate.split("-").map(Number);
    const [endYear, endMonth, endDay] = endDate.split("-").map(Number);

    let totalCount = 0;

    if (startYear === endYear) {
      for (let month = startMonth; month < endMonth; month++) {
        totalCount += getDaysInMonth(month, startYear);
      }
      totalCount -= startDay;
      totalCount += endDay;
    } else {
      //get days for the start year
      for (let month = startMonth; month <= 12; month++) {
        totalCount += getDaysInMonth(month, startYear);
      }
      console.log(totalCount);
      // remove the startdaycount from totalCount
      totalCount -= startDay;
      console.log(totalCount);

      //get all days for full years in between
      for (let year = startYear + 1; year < endYear; year++) {
        totalCount += isLeapYear(year) ? 366 : 365;
      }
      //get final year days count

      for (let month = 1; month < endMonth; month++) {
        totalCount += getDaysInMonth(month, endYear);
      }
      totalCount += endDay;
    }

    setDays(totalCount);
  };

  const getDaysInMonth = (month, year) => {
    switch (month) {
      case 2:
        return isLeapYear(year) ? 29 : 28;
      case 4:
      case 6:
      case 8:
      case 10:
        return 30;
      default:
        return 31;
    }
  };

  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const handleButtonClick = () => {
    const selectedStartDate = startInputRef.current.value;
    const selectedEndDate = endInputRef.current.value;

    if (selectedStartDate && selectedEndDate) {
      if (selectedStartDate > selectedEndDate) {
        alert("Start Date should be less than End Date");
      }
      caluclateDifference(selectedStartDate, selectedEndDate);
    } else {
      alert("Selection of Start Date and End Date is mandatory");
    }
  };
  return (
    <div>
      <div className="App">
        <div>
          <span className="dateText">Start Date</span>
          <input className="inputDate" type="date" ref={startInputRef}></input>
        </div>
        <div>
          <span className="dateText">End Date</span>
          <input className="inputDate" type="date" ref={endInputRef}></input>
        </div>
        <div>
          <button className="calcButton" onClick={handleButtonClick}>
            Caluclate
          </button>
        </div>
      </div>
      {days && (
        <h2 className="resultBox">
          Difference between two dates is {days} days
        </h2>
      )}
    </div>
  );
}

export default App;
