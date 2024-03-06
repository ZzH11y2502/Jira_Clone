import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserAction,
  getUserAction,
} from "../../redux/manageUserSlice/manageUserSlice";
import { Button, Table } from "antd";

import { useNavigate } from "react-router-dom";

function UserBroad() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUserAction());
  }, [dispatch]);
  const userList = useSelector((state) => state.getUserAction.userList);
  console.log("🚀 ~ UserBroad ~ userList:", userList);

  const handleDeleteUser = (userId) => {
    dispatch(deleteUserAction(userId));
    console.log("Removed");
    dispatch(getUserAction());
  };

  const handleUpdate = (user) => {
    console.log(user, "User changed");
    const userQueryString = encodeURIComponent(JSON.stringify(user));

    navigate(`./update-user?user=${userQueryString}`);
  };

  const columns = [
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      key: "action",
      render: (_, user) => (
        <>
          <Button
            className="w-24 bg-green-500 hover:bg-green-300"
            onClick={() => handleUpdate(user)}
          >
            <p className="text-black">Update</p>
          </Button>
          <br />
          <Button
            className="w-24 bg-red-500 hover:bg-red-300"
            onClick={() => handleDeleteUser(user.userId)}
            danger
          >
            <p className="text-black">Delete</p>
          </Button>
        </>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={userList}
      hei
      // scroll={{ y: window?.innerHeight }}
      pagination={{ pageSize: 5 }}
    />
  );
}

export default UserBroad;
