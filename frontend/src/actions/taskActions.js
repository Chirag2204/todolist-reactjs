import axios from 'axios'
import { TASK_CREATE_FAIL, TASK_CREATE_REQUEST, TASK_CREATE_SUCCESS, TASK_DELETE_FAIL, TASK_DELETE_REQUEST, TASK_DELETE_SUCCESS, TASK_LIST_FAIL, TASK_LIST_REQUEST, TASK_LIST_SUCCESS, TASK_UPDATE_FAIL, TASK_UPDATE_REQUEST, TASK_UPDATE_SUCCESS } from '../constants/taskConstants';

export const listTasks = () => async (dispatch, getState) => {
    try {
        dispatch({ type: TASK_LIST_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/task`, config);

        dispatch({
            type: TASK_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: TASK_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const deleteTask = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: TASK_DELETE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/task/${id}`, config);

        dispatch({
            type: TASK_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: TASK_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const createTask = (task) => async (dispatch, getState) => {
    try {
        dispatch({ type: TASK_CREATE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/task`, { task }, config);

        dispatch({
            type: TASK_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: TASK_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateTask = ({ id, taskTobe }) => async (dispatch, getState) => {
    try {
        dispatch({ type: TASK_UPDATE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/task/${id}`, { id, taskTobe }, config);

        dispatch({
            type: TASK_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: TASK_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
