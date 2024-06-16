import React, { useState, useEffect } from "react";
import moment from "moment";
import AddReminder from "./AddReminder";
import { useDispatch, useSelector } from "react-redux";
import { createUserReminder } from "../store/features/reminder";
import { FaBell, FaPen } from "react-icons/fa";
import EditReminder from "./EditReminder";

function CalenderBox() {
  const dispatch = useDispatch();
  const weekDays = moment.weekdays();
  const weekDaysAbbr = moment.weekdaysShort();
  const [selectDate, setSelectedDate] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [showEditCard, setShowEditCard] = useState(false);
  const [, setTime] = useState(moment().format("LT"));
  const [input, setInputField] = useState({
    title: "",
    time: "",
    date: +selectDate,
    city: "",
    key: +selectDate,
  });

  const reminders = useSelector((state) => state?.reminder?.userReminders);

  let rows = [];
  let cells = [];
  let blanks = [];
  let daysInMonth = [];
  let daysObj = {};

  const pickDate = (item) => {
    setSelectedDate(item);
    setShowCard(true);
  };

  const viewItem = (item) => {
    setShowEditCard(true);
    setSelectedItem(item);
  };

  for (let d = 1; d <= moment().daysInMonth(); d++) {
    daysObj = { ...daysObj, day: d };
    daysInMonth.push(
      <td
        key={d}
        className="pb-[4rem] relative  cursor-pointer pr-[.5rem] text-right border-[grey] border-[.1px]"
      >
        <span onClick={() => pickDate(d)} key={d}>
          {d}
        </span>
        {reminders?.map((item, index) => (
          <div key={index} className="flex w-full ">
            {item?.date === d && (
              <FaBell
                className="text-[green] absolute bottom-2 left-2 text-[.7rem]"
                onClick={() => viewItem(item)}
              >
                View
              </FaBell>
            )}
          </div>
        ))}
        <FaPen
          onClick={() => pickDate(d)}
          className="text-[#0080fff4] float-right absolute bottom-2 right-2  text-[.5rem]"
        />
      </td>
    );
  }
  var totalSlots = [...blanks, ...daysInMonth];

  totalSlots.forEach((row, i) => {
    if (i % 7 !== 0) {
      cells.push(row);
    } else {
      rows.push(cells);
      cells = [];
      cells.push(row);
    }
    if (i === totalSlots.length - 1) {
      // when end loop we add remain date
      rows.push(cells);
    }
  });

  const handleChange = (e) => {
    setInputField({ ...input, [e.target.name]: e.target.value });
  };

  const createReminder = (e) => {
    e.preventDefault();
    dispatch(createUserReminder(input));
    setShowCard(false);
  };

  useEffect(() => {
    setInputField({ ...input, date: selectDate, key: selectDate });
    // eslint-disable-next-line
  }, [selectDate]);

  return (
    <div className="relative flex items-center h-[100vh]">
      <table className="mx-auto w-[95%] lg:w-[700px] ">
        <thead className="bg-[#1c5f8b] text-white ">
          <tr className="  invisible md:visible ">
            {weekDays?.map((item, index) => (
              <th key={index} className=" w-[70px] font-normal">
                {item}
              </th>
            ))}
          </tr>
          <tr className="visible py-[.4rem] md:invisible md:hidden">
            {weekDaysAbbr?.map((item, index) => (
              <th key={index} className="">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((item, index) => (
            <tr key={index} className=" ">
              {item}
            </tr>
          ))}
        </tbody>
      </table>
      {showCard && (
        <AddReminder
          submit={createReminder}
          date={selectDate}
          setShow={setShowCard}
          handleChange={handleChange}
          setTime={setTime}
        />
      )}

      {showEditCard && (
        <EditReminder
          reminderDetails={selectedItem}
          setShowEditCard={setShowEditCard}
        />
      )}
    </div>
  );
}

export default CalenderBox;
