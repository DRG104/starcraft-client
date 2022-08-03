import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { Container, Card, Button } from 'react-bootstrap'
import LoadingScreen from '../shared/LoadingScreen'
import { getOneUnit, updateUnit, removeUnit } from '../../api/units'
import messages from '../shared/AutoDismissAlert/messages'
import EditUnitModal from './EditUnitModal'
import NewStatModal from '../stats/NewStatModal'
import ShowStat from '../stats/ShowStat'

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowUnit = (props) => {
    const [unit, setUnit] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [statModalShow, setStatModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)


    const { id } = useParams()
    const navigate = useNavigate()

    const { user, msgAlert } = props
    console.log('user in props', user)
    console.log('unit in ShowUnit~~~', unit)
    
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
    }, [updated])

    const removeTheUnit = () => {
        removeUnit(user, unit.id)
            .then(() => {
                msgAlert({
                    heading: 'Destruction Complete',
                    messages: messages.removeUnitSuccess,
                    variant: 'success'
                })
            })
            .then(() => {navigate('/')})
            .catch(err => {
                msgAlert({
                    heading: 'There is a problem',
                    messages: messages.removeUnitFailure,
                    variant: 'danger'
                })
            })
    }
    let statCards
    if (unit) {
        if (unit.stats.length > 0) {
            statCards = unit.stats.map(stat => (
                <ShowStat 
                    key={stat._id}
                    stat={stat}
                    unit={unit}
                    user={user}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        }
    }

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
                        <Button 
                            onClick={() => setStatModalShow(true)}
                            className="m-2"
                            variant="info"
                        >
                            Give {unit.Name} some stats!
                        </Button>
                        {
                            unit.owner && user && unit.owner._id === user._id
                            ?
                            <>
                                <Button
                                    onClick={() => setEditModalShow(true)}
                                    className="m-2"
                                    variant="warning"
                                >
                                    Edit Unit
                                </Button>
                                <Button
                                    onClick={() => removeTheUnit()}
                                    className="m-2"
                                    variant="danger"
                                >
                                    Destroy {unit.Name}
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                    {/* card footer and buttons go here */}
                </Card>
            </Container>
            <Container style={cardContainerLayout}>
                {statCards}
            </Container>
            <EditUnitModal 
                user={user}
                unit={unit}
                show={editModalShow}
                updateUnit={updateUnit}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)}
            />
            <NewStatModal 
                user={user}
                unit={unit}
                show={statModalShow}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setStatModalShow(false)} 
            />
        </>
    )
}

export default ShowUnit