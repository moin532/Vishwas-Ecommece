import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";

const Slidebar = ({ setActiveTab }) => {
  const [hour, setHour] = useState("");
  const [minn, setMin] = useState("");
  const [secc, setSec] = useState("");
  const [ampm, setAmPm] = useState("");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    // Update time every second
    const interval = setInterval(() => {
      const d = new Date();
      let hours = d.getHours();
      const minutes = d.getMinutes();
      const seconds = d.getSeconds();

      // Determine AM/PM and format hours for 12-hour clock
      const amPm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // Convert 0 to 12 for 12 AM

      setHour(hours);
      setMin(minutes);
      setSec(seconds);
      setAmPm(amPm);

      // Set greeting based on the hour
      if (hours < 12) {
        setGreeting("Good Morning");
      } else if (hours < 18) {
        setGreeting("Good Afternoon");
      } else {
        setGreeting("Good Evening");
      }
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    "My Profile",
    "Delivery Address",
    "My Orders",
    "My Credits",
    "How To Earn",
    "How To Spend",
    "My Wishlist",
    "Recently Viewed",
    "Refer Friend",
    "Change Password",
    "Log Out",
  ];

  return (
    <div className="w-full lg:w-1/4 p-4 border-slate-300 border-r h-full md:h-auto bg-white">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl">
          MM
        </div>
        <div>
          <div className="text-xl font-semibold">Mm Moin</div>
          <div className="text-sm text-gray-500">
            {hour.toString().padStart(2, "0")}:
            {minn.toString().padStart(2, "0")}:
            {secc.toString().padStart(2, "0")} {ampm}
          </div>
        </div>
      </div>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li
            key={item}
            className="text-gray-700 hover:bg-slate-300 p-2 rounded cursor-pointer"
            onClick={() => setActiveTab(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Slidebar;
