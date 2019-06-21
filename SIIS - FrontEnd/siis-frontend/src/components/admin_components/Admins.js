import React, { Component } from 'react';
import { withAlert } from 'react-alert';
import axios from 'axios';
import AdminViewDelete from './AdminViewDelete';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';

class Admins extends Component {

    state = {
        firstName: null,
        lastName: null,
        email: null,
        nic: null,
        mobileNumber: null,
        password1: null,
        password2: null
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.password1 !== this.state.password2) {
            this.props.alert.error('Passwords Do Not Match');
        }
        else {

            const admin = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                nic: this.state.nic,
                mobileNumber: this.state.mobileNumber,
                password: this.state.password1
            }

            const user = {
                email: this.state.email,
                password: this.state.password1,
                userType: 'Admin'
            }

            axios.post('http://localhost:3000/api/admin/', admin).then(res => {
                this.props.alert.success('Registration Successful');
                this.props.history.push('/HomeAdmin');

                axios.post('http://localhost:3000/api/auth/user/', user).then(res => {
                    this.props.alert.success('Registration Successful');
                    this.props.history.push('/HomeAdmin');
                }).catch(err => {
                    this.props.alert.error(err.response.data);
                });

            }).catch(err => {
                this.props.alert.error(err.response.data);
            });


        }


    }


    render() {

        return (
            <div className="">

                <h3>Register Admins</h3>

                <form className="" onSubmit={this.handleSubmit}>

                    <div className="">
                        <label className="" htmlFor="firstName">Admin First Name</label>
                        <input type="text" id="firstName" className="" placeholder="Enter first name" name="firstName" onChange={this.handleChange} />
                    </div>

                    <div className="">
                        <label className="" htmlFor="lastName">Admin Last Name</label>
                        <input type="text" id="lastName" className="" placeholder="Enter last name" name="lastName" onChange={this.handleChange} />
                    </div>

                    <div className="">
                        <label className="" htmlFor="email">Email</label>
                        <input type="email" id="email" className="" placeholder="Enter email address" name="email" onChange={this.handleChange} />
                    </div>

                    <div className="">
                        <label className="" htmlFor="nic">NIC (Optional)</label>
                        <input type="text" id="nic" className="" placeholder="Enter NIC" name="nic" onChange={this.handleChange} />
                    </div>

                    <div className="">
                        <label className="" htmlFor="mobileNumber">Mobile Number</label>
                        <input type="text" id="mobileNumber" className="" placeholder="Enter mobile number" name="mobileNumber" onChange={this.handleChange} />
                    </div>

                    <div className="">
                        <label className="" htmlFor="password1">Password</label>
                        <input type="password" id="password1" className="" placeholder="Enter password" name="password1" onChange={this.handleChange} />
                    </div>

                    <div className="">
                        <label className="" htmlFor="password2">Re-Enter Password</label>
                        <input type="password" id="password2" className="" placeholder="Re-enter password" name="password2" onChange={this.handleChange} />
                    </div>

                    <div className="">
                        <Button color="info" size="sm" >Register</Button>
                    </div>
                </form>

                <h3>Remove Admins</h3>

                <AdminViewDelete />

            </div>

        )
    }
}

export default withAlert()(Admins);