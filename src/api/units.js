import apiUrl from '../apiConfig'
import axios from 'axios'


// READ INDEX
export const getAllUnits = () => {
    return axios(`${apiUrl}/units`)
}


// READ SHOW
export const getOneUnit = (id) => {
    return axios(`${apiUrl}/units/${id}`)
}

// CREATE
export const createUnit = (user, newUnit) => {
    console.log('this is unit in createUnit', newUnit)
    return axios({
        url: apiUrl + '/units',
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
        data: { unit: newUnit }
    })
}

// UPDATE
export const updateUnit = (user, updatedUnit) => {
    return axios ({
        url: `${apiUrl}/units/${updatedUnit.id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
        data: { unit: updatedUnit }
    })
}

// DELETE
export const removeUnit = (user, unitId) => {
    return axios ({
        url: `${apiUrl}/units/${unitId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`,
        }
    })
}