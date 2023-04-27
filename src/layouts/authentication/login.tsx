import { useState } from "react";
import { Form, Input, Button } from "antd";
import "../../assets/scss/login.scss";
import Logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { loginDistribution } from "../../services/network";
import { authLoggedIn } from "../../store/auth/actions";
import errorHandler from "../../utilities/errorHandler";
import {
  MdOutlineMailOutline,
  MdLockOutline,
  MdArrowForward,
} from "react-icons/md";
const Login = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [loginForm] = Form.useForm();

  const onFinish = () => {
    loginForm.validateFields().then((values) => {
      setLoading(true);
      loginDistribution(values)
        .then((res) => {
          if (res.data?.success) {
            if (res.data.data.distribution_employee) {
              localStorage.setItem(
                "access_token",
                res.data.data.distribution_employee.token
              );
              dispatch(authLoggedIn(res.data.data.distribution_employee));
              navigate("/principals");
            } else if (res.data.data.user) {
              localStorage.setItem("access_token", res.data.data.user.token);
              dispatch(authLoggedIn(res.data.data.user));
              navigate("/principals");
            } else if (res.data.data.distribution) {
              localStorage.setItem(
                "access_token",
                res.data.data.distribution.token
              );
              dispatch(authLoggedIn(res.data.data.distribution));
              navigate("/principals");
            }
          }
        }, errorHandler)
        .catch((e) => {
          // TODO: SHOW SOME ERRORS
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  return (
    <div className="container__login">
      <div className="login__header">
        <img src={Logo} alt="VO DISTRIBUTIONS" />
      </div>
      <div className="frm">
        <div className="frm__details">
          <h3 className="vo__head">Please Login</h3>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            form={loginForm}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input
                prefix={
                  <MdOutlineMailOutline className="site-form-item-icon" />
                }
                placeholder="Enter Email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<MdLockOutline className="site-form-item-icon" />}
                placeholder="Enter Password"
              />
            </Form.Item>

            <div className="btns">
              <Button type="primary" htmlType="submit" loading={loading}>
                {loading ? loading : <MdArrowForward />}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
