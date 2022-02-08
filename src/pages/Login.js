import React, {Component} from "react"
import { Form, Button, Input } from 'antd';
import { Link } from "react-router-dom";
import { authenticate } from "../store/actions/authActions";
import { connect } from "react-redux";
import { Alert } from "antd"


class Login extends Component {
    onFinish = values => {
        this.props.auth("http://35.170.82.230:5000/api/auth/login", values);
        this.props.history.push("/");
    }
    
    render(){
        return(
            <div className="auth_page">
                <div className="auth_container">
                {this.props.error ? <Alert message={this.props.error} type="warning" showIcon closable />: null}
                    <Form
                    onFinish={this.onFinish}
                    style={{marginTop:"12px"}}
                    >
                        <Form.Item
                            label="email"
                            name="email"
                            rules={[{type: 'email', required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password, minimum 6 characters!', min: 6 }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                            Login
                            </Button>
                        </Form.Item>
                    </Form>
                    <p>Dont have an account <Link to="/signup">Sign Up</Link></p>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        auth : (url, data) => dispatch(authenticate(url, data))
    }
}
const mapStateToProps = state => {
    return {
        error: state.auth.error
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login) ;