import React, { useContext, useEffect, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useNavigate } from "react-router-dom";
import gql from 'graphql-tag'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';
import classes from './Register.module.css';

const Register = () => {

    const ctx = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (ctx.user) navigate('/')
    }, [ctx.user, navigate])

    const [errors, setError] = useState({})

    const initialState = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const { onChange, onSubmit, values } = useForm(registerUser, initialState)


    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, { data: { register: userData } }) {
            ctx.login(userData)
            navigate('/')
        },
        onError(err) {
            setError(err.graphQLErrors[0].extensions.errors);
        },
        variables: values
    })

    function registerUser() {
        addUser()
    }

    const loadIcon = <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
    return (
        <div>
            <h1 className='text-center m-5'>Register Page</h1>
            <Form onSubmit={onSubmit}>
                <Row>
                    <Col>
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
                                isInvalid={!!errors.username}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group
                            className="mb-3"
                            controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                name="email"
                                type="email"
                                placeholder="Enter email"
                                value={values.email}
                                onChange={onChange}
                                isInvalid={!!errors.email}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
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
                                isInvalid={!!errors.password || !!errors.confirmPassword}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group
                            className="mb-3"
                            controlId="confirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                name="confirmPassword"
                                autoComplete='confirm-password'
                                type="password"
                                placeholder="Confirm Password"
                                value={values.confirmPassword}
                                onChange={onChange}
                                isInvalid={!!errors.confirmPassword}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Button type="submit" variant="outline-dark">
                    {loading ? loadIcon : "Register"}</Button>

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

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;


export default Register