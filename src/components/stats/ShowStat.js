import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import EditStatModal from './EditStatModal'
import { deleteStat } from '../../api/stats'

const ShowStat = (props) => {
    // destructure some props
    const { stat, unit, user, msgAlert, triggerRefresh } = props

    // here's where we'll put a hook to open the edit toy modal when we get there
    const [editModalShow, setEditModalShow] = useState(false)

    // this will set a color depending on the toy's condition
    // const setBgCondition = (cond) => {
    //     if (cond === 'new') {
    //         return({width: '18rem', backgroundColor:'#b5ead7'})
    //     } else if (cond === 'used') {
    //         return({width: '18rem', backgroundColor:'#ffdac1'})
    //     } else {
    //         return({width: '18rem', backgroundColor:'#ff9aa2'})
    //     }
    // }

    // calls this to destroy a stat
    const destroyStat = () => {
        deleteStat(user, unit._id, stat._id)
            .then(() => 
                msgAlert({
                    heading: 'Deletion Complete',
                    message: 'Stats removed.',
                    variant: 'success'
                }))
            .then(() => triggerRefresh())
            .catch(() => 
                msgAlert({
                    heading: 'Warning',
                    message: 'Something went wrong!',
                    variant: 'danger'
                }))
    }

    return (
        <>
            <Card className="m-2">
                <Card.Header>Unit Stats</Card.Header>
                <Card.Body>
                    {/* <small>Unit's HP is:{stat.HP}</small> */}
                    <small>Unit's Shields are:{stat.Shields}</small>
                    <small>Unit deals {stat.Damage} damage.</small>
                    <small>Unit's abilities: {stat.Ability}</small>
                    <small>Unit's current rank is {stat.Rank}</small>
                </Card.Body>
                <Card.Footer>
                    {
                        user && user._id === unit.owner._id
                        ?
                        <>
                            <Button 
                                variant="warning"
                                onClick={() => setEditModalShow(true)}
                            >
                                Edit these stats
                            </Button>
                            <Button 
                                onClick={() => destroyStat()} 
                                variant="danger"
                            >
                                Delete these stats
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
            <EditStatModal 
                user={user}
                unit={unit}
                stat={stat}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

export default ShowStat