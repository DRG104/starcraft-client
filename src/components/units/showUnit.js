import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { Container, Card } from 'react-bootstrap'
import LoadingScreen from '../shared/LoadingScreen'
import { getOneUnit } from '../../api/units'
import messages from '../shared/AutoDismissAlert/messages'

const ShowUnit = (props) => {
    const [unit, setUnit] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()

    const { msgAlert } = props

    useEffect(() => {
        getOneUnit(id)
            .then(res => setUnit(res.data.unit))
            .catch(err => {
                msgAlert({
                    heading: 'Error: no units available!',
                    message: messages.getUnitsFailure,
                    variant: 'danger'
                })
                navigate('/')
            })
    }, [])

    if (!unit) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header>{unit.Name}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>Cost: {unit.Cost}</small></div>
                            <div><small>Tier: {unit.Tier}</small></div>
                            <div><small>Produced at: {unit.Produced}</small></div>
                            <div><small>Targets: {unit.Targets}</small></div>
                            <div><small>{unit.Alive ? 'Alive' : 'Dead'}</small></div>
                            <div><small>Status: {unit.Status}</small></div>
                            {/* ask how to display subdoc here */}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <>
                            <Button>
                                {/* edit and delete modals here */}
                            </Button>
                        </>
                    </Card.Footer>
                    {/* card footer and buttons go here */}
                </Card>
            </Container>
        </>
    )
}

export default ShowUnit