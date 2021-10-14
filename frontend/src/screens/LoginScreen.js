import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            history.push('/')
        }

    }, [userInfo, history])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password));
        //Dispatch Login
    }
    return (
        <FormContainer>
            <h1 >Login</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler} className='py-3'>
                <Form.Group controlId='email' className='py-3'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter Email Address' value={email} onChange={(e) => { setEmail(e.target.value) }}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password' className='py-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => { setPassword(e.target.value) }}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' onClick={submitHandler}>Login</Button>
            </Form>
            <p>New User? <Link to='/register'>Register</Link></p>
        </FormContainer>
    )
}

export default LoginScreen
