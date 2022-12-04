import React from "react";
import { Form, Input, Button, Checkbox, Alert } from "antd";
import "./login.css";
import { useDispatch } from "react-redux";
import { loginRequest } from "../../redux/actions/userActions";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);

  const onFinish = (values) => {
    dispatch(loginRequest(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className="login-container">
        <Form
          className="login-form"
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
            label="Username or Email"
            name="usernameOrEmail"
            rules={[
              {
                required: true,
                message: "Please input your Username or Email!",
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
              login
            </Button>
          </Form.Item>

          <p>
            Don't have an account? <Link to="/signup">signup</Link>
          </p>
        </Form>
      </div>
    </>
  );
};

export default Login;
