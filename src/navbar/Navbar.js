import React from "react";
import logo from "./images/navbar_logo.png";
import "./Navbar.css";
import { useState, useEffect } from "react";
import Aos from "aos";
import { Popover, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({
      duration: 1500,
    });
  }, []);
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const hide = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="navbar">
        <div className="combine_block">
          <img
            src={logo}
            className="navbar_logo"
            onClick={() => navigate("/homepage")}
          />{" "}
          Flavor <span className="verse">Verse</span>
        </div>
        <div className="nav-items">
          <div className="items" onClick={() => navigate("/homepage")}>
            HOME
          </div>
          <div className="items" onClick={() => navigate("/recipe")}>
            EXPLORE
          </div>
          <div className="items" onClick={() => navigate("/favorite")}>
            FAVORITES
          </div>
          <div className="items1">
            <Popover
              content={<a onClick={hide}>Close</a>}
              title={
                <>
                  <div onClick={() => navigate("/login")} className="logout">
                    LogOut
                  </div>
                </>
              }
              trigger="click"
              placement="bottom"
              open={open}
              onOpenChange={handleOpenChange}
            >
              <Avatar size={40} icon={<UserOutlined />} className="icon" />
            </Popover>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
