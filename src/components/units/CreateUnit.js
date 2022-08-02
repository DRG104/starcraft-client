import { useState } from 'react'
import { createUnit } from '../../api/units'
import { useNavigate } from 'react-router-dom'
import { createUnitSuccess, createUnitFailure } from '../shared/AutoDismissAlert/messages'
import UnitForm from '../shared/UnitForm'

const CreateUnit = (props) => {
    console.log('these are the props in Create Unit\n', props)
    const { user, msgAlert } = props

    const navigate = useNavigate()

    const [unit, setUnit] = useState({
        Name: '',
        Cost: '',
        Tier: '',
        Produced: '',
        Targets: '',
        Alive: true,
        Status: '',
    })

    console.log('this is the unit in createUnit', unit)

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

        createUnit(user, unit)
            // .then(res => console.log('this is the response from the API call', res))
            // .then(res => console.log('this is the id of the new unit', res.data.unit.id))
            .then(res => { navigate(`/units/${res.data.unit.id}`)})
            .then(() => {
                msgAlert({
                    heading: 'Teleport successful.',
                    message: createUnitSuccess,
                    variant: 'success'
                })
            })
            .catch(() =>
                msgAlert({
                    heading: 'Warning: Not enough supply!',
                    message: createUnitFailure,
                    variant: 'danger'
                })
            )
    }

    return (
        <UnitForm 
            unit={unit} 
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            heading="Warp in a unit!" 
        />
    )
}

export default CreateUnit