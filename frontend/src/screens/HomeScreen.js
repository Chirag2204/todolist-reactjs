import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import '../style.css'
import { createTask, deleteTask, listTasks, updateTask } from '../actions/taskActions';

export const HomeScreen = ({ history }) => {
    const [task, setTask] = useState('')

    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const taskList = useSelector(state => state.taskList)
    const { loading, error, tasks } = taskList

    const taskCreate = useSelector(state => state.taskCreate)
    const { loading: loadingCreate, error: errorCreate, task: taskCreated } = taskCreate

    const taskUpdate = useSelector(state => state.taskUpdate)
    const { loading: loadingUpdate, error: errorUpdate, task: taskUpdated } = taskUpdate

    const taskDelete = useSelector(state => state.taskDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = taskDelete

    useEffect(() => {
        console.log("hello from useEffect");
        if (userInfo && userInfo.name) {
            dispatch(listTasks())

        } else {
            console.log("go to login");
            history.push('/login')
        }
    }, [dispatch, userInfo, taskCreated, taskUpdated, successDelete, history])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createTask(task))
        setTask('')
    }
    const editHandler = (id) => {
        const taskTobe = prompt("Enter Task To be Updated")
        dispatch(updateTask({ id, taskTobe }))
        setTask('')
    }
    const deleteHandler = (id) => {

        dispatch(deleteTask(id))
        setTask('')
    }

    return (

        <div className='todolist' >
            <h3>{userInfo?.name}'s TodoList</h3>
            <div className='todolist-content'>
                {loading || loadingCreate || loadingDelete || loadingUpdate ? <Loader /> : error || errorCreate || errorUpdate || errorDelete ? <Message variant='danger'>{error}</Message> : (
                    tasks.map((x) => (
                        <Row>
                            <Col xs={1}>⚫</Col>
                            <Col xs={6}>
                                <p> {x.task}</p>
                            </Col>
                            <Col xs={1}>
                                <Button variant='light' className='btn-sm' onClick={() => editHandler(x._id)}><i className='fas fa-edit'></i></Button>
                            </Col>
                            <Col xs={1}>
                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(x._id)}><i className='fas fa-trash'></i></Button>
                            </Col>
                        </Row>
                    )
                    )
                )}

            </div>
            <Form onSubmit={submitHandler} className='py-3 addtask-form'>
                <Form.Group controlId='AddTask' className='py-3'>
                    <Form.Label><strong>Add Task</strong></Form.Label>
                    <Form.Control type='text' placeholder='Enter Task Here' value={task} onChange={(e) => { setTask(e.target.value) }}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' onClick={submitHandler}>Add Task</Button>
            </Form>
        </div >

    )
}
