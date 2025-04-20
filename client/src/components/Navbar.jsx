import React, { useEffect, useMemo, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar } from "../redux/slices/authSlice";
import UserAvatar from "./UserAvatar";
import NotificationPanel from "./NotificationPanel";
import { BsChatDots } from "react-icons/bs";
import { MdOutlineChat } from "react-icons/md";
import { useSearchTaskQuery } from "../redux/slices/api/taskApiSlice";
import { useDebounce } from "../hooks/debounce";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setIsHidden, setQuery, query }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between items-center bg-white px-4 py-3 2xl:py-4 sticky z-10 top-0">
      <div className="flex gap-4">
        <button
          onClick={() => dispatch(setOpenSidebar(true))}
          className="text-2xl text-gray-500 block md:hidden"
        >
          ☰
        </button>

        <div className="w-44 sm:w-64 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-full bg-[#f3f4f6]">
          <MdOutlineSearch className="text-gray-500 text-xl" />

          <input
            type="text"
            placeholder="Search...."
            className="flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800 "
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <NotificationPanel />

        <UserAvatar />
        <MdOutlineChat
          className="h-6 w-auto"
          onClick={() => setIsHidden((prev) => !prev)}
        />
      </div>
    </div>
  );
};

export default Navbar;
