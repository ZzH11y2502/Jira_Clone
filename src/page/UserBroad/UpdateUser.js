import React from "react";
import { Button, Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateUserAction } from "../../redux/manageUserSlice/manageUserSlice";
export default function UpdateUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const location = useLocation();

  // user information
  const queryParams = new URLSearchParams(location.search);
  const userQueryString = queryParams.get("user");
  console.log("🚀 ~ UpdateUser ~ userQueryString:", userQueryString);
  const user = userQueryString
    ? JSON.parse(decodeURIComponent(userQueryString))
    : null;
  const onFinish = (values) => {
    console.log("Success:", values);
    let formData = { ...values };
    console.log("🚀 ~ onFinish ~ formData:", formData);

    // Dispatch
    const result = dispatch(updateUserAction(formData));
    console.log("Result", result);
    messageApi.open({
      type: "success",
      content: "Update information successful!",
    });
    navigate("/users-management");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex justify-center">
      <div style={{ maxWidth: "640px", height: "100vh" }}>
        {/* Header */}
        <div style={{ margin: "auto" }}>
          <p className="font-sans text-center head__title">User Information</p>
        </div>
        {/* Contents */}
        {contextHolder}
        <Form
          name="basic"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 800,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* User name */}
          <Form.Item
            label="User name"
            name="name"
            initialValue={user.name}
            rules={[
              {
                required: true,
                message: "Please input your Alias!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          {/* User ID*/}
          <Form.Item
            label="User ID"
            name="id"
            initialValue={user.userId}
            rules={[
              {
                required: true,
                message: "Please input your Project!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            initialValue={user.email}
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          {/* Phone Number */}
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            initialValue={user.phoneNumber}
            rules={[
              {
                required: true,
                message: "Please input your Alias!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          {/* Password */}
          <Form.Item
            label="Password"
            name="passWord"
            initialValue={user.passWord}
            style={{}}
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              type="primary"
              style={{ backgroundColor: "#38598b" }}
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
