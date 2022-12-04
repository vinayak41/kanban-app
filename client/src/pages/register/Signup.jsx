import React from "react";
import { Form, Input, Button, Checkbox, Alert } from "antd";
import "./signup.css";
import { useDispatch, useSelector } from "react-redux";
import { signupRequest } from "../../redux/actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Signup = () => {
  const dispatch = useDispatch();
  const { error, registred } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const onFinish = (values) => {
    dispatch(signupRequest(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    if (registred) navigate("/");
  }, [registred]);
  return (
    <div className="signup-container">
      <Form
        className="signup-form"
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
        {error ? (
          <Alert
            style={{ marginBottom: "1rem" }}
            message={error}
            type="error"
            showIcon
          />
        ) : null}
        <Form.Item
          label="Full name"
          name="fullname"
          rules={[
            {
              required: true,
              message: "Please input your Full name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
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
          label="Username"
          name="username"
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
          name="password"
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
          <Button type="primary" htmlType="submit">
            Sign up
          </Button>
        </Form.Item>

        <p>
          Have an account? <Link to="/login">Log in</Link>
        </p>
      </Form>
    </div>
  );
};

export default Signup;
