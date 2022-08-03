import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import UnitForm from '../shared/UnitForm'
import { updateUnitSuccess, updateUnitFailure } from '../shared/AutoDismissAlert/messages'

const EditUnitModal = (props) => {
    const { user, show, handleClose, updateUnit, msgAlert, triggerRefresh } = props

    const [unit, setUnit] = useState(props.unit)

    const handleChange = (e) => {
        setUnit(prevUnit => {
            let updatedValue = e.target.value
            const updatedName = e.target.name

            if (e.target.type === 'Number') {
                updatedValue = parseInt(e.target.value)
            }

            if (updatedName === 'Alive' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'Alive' && !e.target.checked) {
                updatedValue = false
            }

            const updatedUnit = {
                [updatedName]: updatedValue
            }
            return {
                ...prevUnit,
                ...updatedUnit
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        updateUnit(user, unit) 
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Upgrade complete!',
                    message: updateUnitSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => 
                msgAlert({
                    heading: 'Warning!',
                    message: updateUnitFailure,
                    variant: 'danger'
                })
            )
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <UnitForm 
                    unit={unit}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Update Unit"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditUnitModal