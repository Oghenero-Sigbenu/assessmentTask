import React, { useState } from "react";
import { hours } from "../utils/utils";
import { FiXCircle, FiCalendar, FiClock } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useSelector } from "react-redux";
import moment from "moment";
import { TiWeatherCloudy } from "react-icons/ti";

function AddReminder({ submit, date, inputData, setShow, handleChange }) {
  const [month] = useState(moment().format("MMMM"));
  const [year] = useState(moment().format("YYYY"));
  const { loading } = useSelector((state) => state.reminder);

  return (
    <form className="absolute px-[1rem] pt-[.4rem] pb-[1rem] shadow-lg  md:left-[40%] bg-white">
      <FiXCircle className="float-right text-[red]" onClick={() => setShow()} />
      <h4 className="text-[#282727]">Add Reminder</h4>
      <div className="">
        <input
          className="p-[.5rem] border-b-[.1px] mt-[1rem] outline-none"
          placeholder="Add title"
          name="title"
          type="text"
          maxLength="30"
          value={inputData?.title}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="flex p-[.5rem] border-b-[.1px] mt-[1rem] items-center">
        <h5>
          <FiCalendar className="text-[#0059ff] flex  mr-[.5rem]" />
        </h5>
        <input
          className=" bg-white outline-none"
          placeholder="Add title"
          name="date"
          type="text"
          disabled
          value={date + " " + month + " " + year}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="flex p-[.5rem] border-b-[.1px] mt-[1rem] items-center">
        <FiClock className="text-[#0059ff] mr-[.5rem]" />

        <select
          required
          className="outline-none"
          name="time"
          onChange={(e) => handleChange(e)}
        >
          <option defaultValue={"Time"}>Time</option>
          {hours.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="items-center  mt-[1rem] flex p-[.5rem] border-b-[.1px]">
        <HiOutlineLocationMarker className="text-[#0059ff] mr-[.5rem] " />

        <input
          name="city"
          placeholder="City"
          required
          value={inputData?.city}
          className="outline-none "
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="items-center  mt-[1rem] flex p-[.5rem] border-b-[.1px]">
        <TiWeatherCloudy className="text-[#0059ff] mr-[.5rem] " />

        <input
          name="city"
          placeholder="Weather"
          required
          value={inputData?.weather}
          className="outline-none "
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="btn">
        <button
          className="px-[2rem] py-[.5rem]  bg-[#1c5f8b] text-white mt-[2rem] rounded-[10px] float-right"
          onClick={(e) => submit(e)}
        >
          {loading ? "Loading..." : "Save"}
        </button>
      </div>
    </form>
  );
}

export default AddReminder;
