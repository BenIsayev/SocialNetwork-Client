import React, { useContext, useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useNavigate } from "react-router-dom";
import gql from 'graphql-tag'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

import { AuthContext } from '../context/auth';
import classes from './Register.module.css'
import { useForm } from '../util/hooks';

const Login = () => {

    const ctx = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (ctx.user) navigate('/')
    }, [ctx.user, navigate])


    const [errors, setError] = useState({})

    const initialState = {
        username: '',
        password: ''
    }

    const { onChange, onSubmit, values } = useForm(loginUser, initialState)


    const [login, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData } }) {
            ctx.login(userData)
            navigate('/')
        },
        onError(err) {
            setError(err.graphQLErrors[0].extensions.errors);
        },
        variables: values
    })

    function loginUser() {
        login()
    }

    const loadIcon = <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
    return (
        <div>
            <h1 className='text-center m-5'>Login Page</h1>
            <Form onSubmit={onSubmit}>
                <Form.Group
                    className="mb-3"
                    controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        name="username"
                        autoComplete='username'
                        type="text"
                        placeholder="Enter username"
                        value={values.username}
                        onChange={onChange}
                        isInvalid={errors.username}
                    />
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        name="password"
                        autoComplete='new-password'
                        type="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={onChange}
                        isInvalid={errors.password || errors.confirmPassword}
                    />
                </Form.Group>
                <Button type="submit" variant="outline-dark">
                    {loading ? loadIcon : "Login"}</Button>

            </Form>
            {
                Object.keys(errors).length > 0 && <div>
                    <ListGroup className={`mt-5 ${classes['error-list']}`}>
                        {Object.values(errors).map(value => {
                            return <ListGroup.Item key={value} variant="danger">{value}</ListGroup.Item>
                        })}
                    </ListGroup>
                </div>
            }
        </div >
    )
}

const LOGIN_USER = gql`
  mutation login(
    $username: String!
    $password: String!
  ) {
    login(
        username: $username password: $password
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;


export default Login