import React from "react";
import FormLogin from "./FormLogin";
import { Button } from "antd";

let Loginpage = () => {
  return (
    <div className="grid grid-cols-4">
      <div
        className="relative"
        style={{
          backgroundImage: `url(https://picsum.photos/seed/picsum/200/300)`,
          height: window.innerHeight,
          backgroundSize: "cover",
        }}
      >
        <img
          className="absolute"
          style={{ top: 15, left: 15, zindex: 1, height: 80, width: 80 }}
          src="https://cdn.icon-icons.com/icons2/2845/PNG/512/jira_logo_icon_181275.png"
          alt=""
        />
      </div>
      <div className="col-span-3 " style={{ marginTop: 20 }}>
        <div className="flex justify-end" style={{}}>
          <Button type="text">Don’t have an account?</Button>
          <Button className="border border-black border-solid">
            Get started
          </Button>
        </div>
        <FormLogin />
      </div>
    </div>
  );
};

export default Loginpage;
