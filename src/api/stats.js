import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
export const createStat = (user, unitId, newStat) => {
    console.log('the user in createStat', user)
    console.log('the newStat in createStat', newStat)
	return axios({
		url: `${apiUrl}/stats/${unitId}`,
		method: 'POST',

        // add this if you want this subdoc to require a logged in user
		// headers: {
		// 	Authorization: `Token token=${user.token}`,
		// },
		data: { stat: newStat },
	})
}

// UPDATE stat
export const updateStat = (user, unitId, updatedStat) => {
    console.log('this is updatedStat', updatedStat)
	return axios({
		url: `${apiUrl}/stats/${unitId}/${updatedStat._id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { stat: updatedStat },
	})
}

// DELETE stat
export const deleteStat = (user, unitId, statId) => {
	return axios({
		url: `${apiUrl}/stats/${unitId}/${statId}`,
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	})
}