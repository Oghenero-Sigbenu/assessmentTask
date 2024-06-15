import React, { useState, useEffect } from "react";
import { hours } from "../utils/utils";
import { FiXCircle, FiCalendar, FiClock } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { editUserReminder } from "../store/features/reminder";

function EditReminder({ setShowEditCard, reminderDetails }) {
  const [month] = useState(moment().format("MMMM"));
  const [year] = useState(moment().format("YYYY"));
  const dispatch = useDispatch();
  const { userReminders, loading } = useSelector((state) => state.reminder);

  const [input, setInputField] = useState({
    title: "",
    city: "",
    date: "",
    time: "",
    key: "",
  });

  useEffect(() => {
    if (reminderDetails) {
      setInputField({
        title: reminderDetails?.title,
        date: reminderDetails?.date,
        key: reminderDetails?.key,
        city: reminderDetails?.city,
        time: reminderDetails?.time,
      });
    }
  }, [reminderDetails]);

  const handleChange = (e) => {
    setInputField({ ...input, [e.target.name]: e.target.value });
  };

  const editReminder = (e) => {
    e.preventDefault();
    let payload = {
      title: input.title,
      date: input.date,
      time: input.time,
      key: input.key,
      city: input.city,
    };

    let index = userReminders?.map((e) => e.key).indexOf(input?.key);
    console.log(index, userReminders);
    userReminders[index] = payload;
    dispatch(editUserReminder(userReminders));
    setShowEditCard(false);
  };
  return (
    <form className="absolute px-[1rem] pt-[.4rem] pb-[1rem] shadow-lg  md:left-[40%] bg-white">
      <FiXCircle
        className="float-right text-[red]"
        onClick={() => setShowEditCard(false)}
      />
      <h4 className="text-[#282727]">Add Reminder</h4>
      <div className="">
        <input
          className="p-[.5rem] border-b-[.1px] mt-[1rem] outline-none"
          placeholder="Add title"
          name="title"
          type="text"
          value={input?.title}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="flex p-[.5rem] border-b-[.1px] mt-[1rem] items-center">
        <h5>
          <FiCalendar className="flex  mr-[.5rem]" />
        </h5>
        <input
          className=" bg-white outline-none"
          placeholder="Add title"
          name="date"
          type="text"
          disabled
          value={input?.date + " " + month + " " + year}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="flex p-[.5rem] border-b-[.1px] mt-[1rem] items-center">
        <FiClock className="mr-[.5rem]" />

        <select
          required
          className="outline-none"
          name="time"
          onChange={(e) => handleChange(e)}
        >
          <option defaultValue={"Time"}>{input?.time}</option>
          {hours.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="items-center  mt-[1rem] flex p-[.5rem] border-b-[.1px]">
        <HiOutlineLocationMarker className="mr-[.5rem] " />
        <input
          name="city"
          placeholder="City"
          required
          className="outline-none "
          value={input?.city}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="btn">
        <button
          className="px-[2rem] py-[.5rem]  bg-[#1c5f8b] text-white mt-[2rem] rounded-[10px] float-right"
          onClick={(e) => editReminder(e)}
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </div>
    </form>
  );
}

export default EditReminder;
