import apiUrl from '../apiConfig'
import axios from 'axios'

export const getAllUnits = () => {
    return axios(`${apiUrl}/units`)
}

export const getOneUnit = (id) => {
    return axios(`${apiUrl}/units/${id}`)
}