import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import StatForm from '../shared/StatForm'
import { updateStat } from '../../api/stats'
// import { updatePetSuccess, updatePetFailure } from '../shared/AutoDismissAlert/messages'

const EditStatModal = (props) => {
    const { user, unit, show, handleClose, msgAlert, triggerRefresh } = props

    const [stat, setStat] = useState(props.stat)

    const handleChange = (e) => {
        setStat(prevStat => {
            let value = e.target.value
            const name = e.target.name

            // console.log('this is the input type', e.target.type)
            // console.log('this is the input name', e.target.name)

            // if (e.target.type === 'number') {
            //     // this is looking at the intput type, and changing it from default, which is a string into an actual number
            //     updatedValue = parseInt(e.target.value)
            // }

            const updatedStat = {
                [name]: value
            }
            return {
                ...prevStat,
                ...updatedStat
            }
        })
    }

    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()

        // using pet._id will likely cause less errors
        // just pet.id might cause errors
        updateStat(user, unit._id, stat)
            // if we're successful, we want the modal to close
            // .then(res => console.log('this is the response from API call', res))
            // .then(res => console.log('this is the id of the new pet', res.data.pet.id))
            .then(() => handleClose())
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Success!',
                    message: 'Stat changes complete',
                    variant: 'success'
                })
            })
            // this makes it so that info appears to change in real time for user
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Warning!',
                    message: 'Stat changes did not go through!',
                    variant: 'danger'
                })
            )
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <StatForm 
                    stat={stat}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Update these Stats!"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditStatModal