import React, { useState } from "react";
import logo from "../assets/logo1.png";
import { FaLayerGroup } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { GoSearch } from "react-icons/go";
import { MdLogin, MdLogout } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsPhone } from "react-icons/bs";
import Friends from "./Friends";

const Navbar = () => {
  const [showFriends, setShowFriends] = useState(false);
  const [julie,setJulie] = useState(true);

  const toggleFriends = () => {
    setShowFriends(!showFriends);
  };

  const changePerson = () => {
    setJulie(!julie)
  }

  return (
    <div className="">
      {showFriends && <Friends setShowFriends={setShowFriends} />}
      <div className="bg-[#0071dc] px-3 py-2 lg:px-8 text-white flex justify-between items-center">
        {/* Left */}
        <div className="flex items-center gap-x-3 shrink-0">
          <div className="hover:bg-[#06529a] p-2 rounded-full">
            <img src={logo} alt="" className="h-12" />
          </div>

          <div className="md:flex items-center gap-2 hidden hover:bg-[#06529a] p-3 rounded-full">
            <FaLayerGroup className="text-[17px]" />
            <p className="text-[16px] font-semibold">Sections</p>
          </div>
          <div
            className="md:flex hidden items-center gap-2 hover:bg-[#06529a] p-3 rounded-full cursor-pointer"
            onClick={toggleFriends}
          >
            <HiUserGroup className="text-[20px]" />
            <p className="text-[16px] font-semibold">Friends</p>
          </div>
        </div>
        {/* Middle */}
        <div className="hidden relative lg:flex items-center flex-1 mx-6 ">
          <input
            type="search"
            className="rounded-full py-1.5 outline-0 flex-1"
          />
          <div className="absolute bg-[#ffc220] p-1.5 rounded-full left-1.5">
            <GoSearch className="text-black " />
          </div>
        </div>
        {/* Right */}
        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-2 hover:bg-[#06529a] p-3 rounded-full">
            <MdLogin className="text-[17px] rotate-90" />
            <p className="text-[16px] font-semibold">Register</p>
          </div>
          <div onClick={changePerson} className="flex items-center gap-2 hover:bg-[#06529a] p-3 rounded-full whitespace-nowrap">
            {/* <MdLogout className="text-[20px] -rotate-90" />
            <p className="text-[16px] font-semibold">Sign in</p> */}
            {julie?(
              <div className="flex items-center gap-2">
                <div>Julie</div>
                <img width={40} className="rounded-lg" src="https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944"/>
            </div>):(
              <div className="flex items-center gap-2">
                <div>Mom</div>
            <   img width={40} className="rounded-lg" src="https://sarahclaysocial.com/wp-content/uploads/2020/10/sarah-clay-3.jpg"/>
              </div>)
            }
          </div>
          <div className="hover:bg-[#06529a] p-3 rounded-full">
            <AiOutlineShoppingCart className="w-7 h-7" />
          </div>
        </div>
      </div>
      {/* Categories */}
      <div className="bg-[#0071dc] mt-[1px] text-white px-3 py-2 lg:px-8 flex items-center gap-6">
        <div className="flex items-center gap-1 hover:underline">
          <BsPhone />
          <p className="text-[15px] font-bold">Place an order on the App</p>
        </div>
        <div className="flex items-center gap-1 hover:underline">
          <BiWorld />
          <p className="text-[15px] hover:underline">TX Address 87358</p>
        </div>
        <p className="hidden md:flex hover:underline">Deals on Phones</p>
        <p className="hidden md:flex font-bold hover:underline">
          $499 OFF on Laptops
        </p>
      </div>
    </div>
  );
};

export default Navbar;
