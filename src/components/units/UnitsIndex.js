import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getAllUnits } from '../../api/units'

import messages from '../shared/AutoDismissAlert/messages'

const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const UnitsIndex = (props) => {
    const [units, setUnits] = useState(null)
    const [error, setError] = useState(false)

    const { msgAlert } = props

    // console.log('Props in UnitsIndex', props)

    useEffect(() => {
        // console.log(props)
        getAllUnits()
            .then( res => setUnits(res.data.units))
            .catch(err => {
                msgAlert({
                    heading: 'Error: Nas beru uhn\'adarr?',
                    message: messages.getUnitsFailure,
                    variant: 'danger',
                })
                setError(true)
            })
    }, [])

    if (error) {
        return <p>Error: connection with API disabled.</p>
    }

    // if units haven't been loaded, show a loading message
    if (!units) {
        return <LoadingScreen />
    } else if (units.length === 0 ) {
        return <p>No units warped in, also, build additional pylons.</p>
    }

    const unitCards = units.map(unit => (
        <Card 
            style={{width: '30%', margin: 5}}
            key={unit.id}
        >
                <Card.Header>
                    {unit.isAlive}
                </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <Link to={`/units/${unit.id}`}>Vew {unit.Name}</Link>
                        </Card.Text>
                    </Card.Body>
        </Card>
    ))

    return (
        <div style={cardContainerStyle}>
            {unitCards}
        </div>
    )
}

export default UnitsIndex