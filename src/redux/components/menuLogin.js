import React from 'react';
import axios from 'axios';
import {
    connect
} from 'react-redux';
import {
    loginSubmit
} from '../actions'
import '../../style/menu.css';
import '../../style/login.css';
import { Form, Icon, Input, Button, Modal} from 'antd';
const FormItem = Form.Item; 
class Menu extends React.Component{
    constructor(props){
        super(props);
        this.state={
            ModalText: 'Content of the modal',
            visible: false,
            confirmLoading: false,
            userName:'admin',
            userPwd: '123456',
            updateUserInfo: ''
        }
    }
    LoginFetch(){
        let { userName, userPwd } = this.state;
        axios.post('/users/login',{
                userName:userName,
                userPwd:userPwd
        }).then((data) => {
            console.log(data);
            this.setState({
                updateUserInfo: data.data.result.userName
            })
        }).catch((error) => {
            console.log(error)
        })
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
              visible: false,
              confirmLoading: false,
            });
        }, 2000);
    }
    loginSubmit = (e) => {
        const { onTodoClick } = this.props;
        let { updateUserInfo } = this.state; 
        this.LoginFetch();
        e.preventDefault();     
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            this.setState({
                userName: values.userName,
                userPwd: values.userPwd
            })
            console.log(this.state.userName);
            onTodoClick(updateUserInfo);
          }
        });
    }
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
          visible: false,
        });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const { visible, confirmLoading } = this.state;
        return(
            <div className="menuWrapper">
                <div className="logo">
                    logo
                </div>
                <div>
                <Button className="login" type="primary" onClick={(e)=>this.showModal(e)}>
                    登陆
                </Button>
                <Modal
                title="登录" 
                visible={visible} 
                onOk={this.handleOk}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel}>
                    <Form onSubmit={this.loginSubmit} className="login-form">
                        <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                        </FormItem>
                        <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                        </FormItem>
                        <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })}                        
                        <Button type="primary" htmlType="submit" className="login-form-button" onclick={(e) => this.loginSubmit(e)}>
                            Log in
                        </Button>
                        </FormItem>
                    </Form>
                </Modal>
                </div>
            </div>
        ) 
    }
}
Menu = Form.create()(Menu);
const mapDispatchToProps = dispatch => {
    return {
        onTodoClick: userName => {
            dispatch(loginSubmit(userName))
        }
    }
}  
export default connect(
    undefined,
    mapDispatchToProps
)(Menu);
