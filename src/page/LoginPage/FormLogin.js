import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/userSlice/userSlice";
import { useNavigate } from "react-router-dom";

const FormLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Submit
  const onFinish = (values) => {
    const userInfo = values;
    const result = dispatch(userLogin(userInfo));
    result.then(() => {
      navigate("/home");
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ height: window.innerHeight }}
    >
      <h3 className="mb-12 text-5xl font-semibold text-blue-500">
        Jira Kanban
      </h3>
      <Form
        style={{ width: window.innerWidth / 2, maxWidth: 600 }}
        className="mr-12"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="passWord"
          rules={[
            {
              required: true,
              message: "Please input your password!",
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
          <Button className="bg-blue-500" type="primary" htmlType="submit">
            <p>Login</p>
          </Button>
        </Form.Item>
      </Form>
      <div style={{ height: 300 }}></div>
    </div>
  );
};

export default FormLogin;
