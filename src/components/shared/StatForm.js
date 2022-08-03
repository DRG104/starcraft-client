import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'

const StatForm = (props) => {
    const {stat, handleChange, handleSubmit, heading} = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="HP">HP</Form.Label>
                <Form.Control
                    placeholder="Current HP?"
                    name="HP"
                    id="HP"
                    value={ stat.HP }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="Shields">Shields</Form.Label>
                <Form.Control
                    placeholder="Current Shields?"
                    name="Shields"
                    id="Shields"
                    value={ stat.Shields }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="Shields">Damage</Form.Label>
                <Form.Control
                    placeholder="Damage this unit Deals?"
                    name="Damage"
                    id="Damage"
                    value={ stat.Damage }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="Shields">Abilities</Form.Label>
                <Form.Control
                    placeholder="Unit Abilities?"
                    name="Ability"
                    id="Ability"
                    value={ stat.Ability }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="Shields">Unit Rank</Form.Label>
                <Form.Select 
                    aria-label="stat Rank"
                    name="Rank"
                    defaultValue={stat.Rank}
                    onChange={handleChange}
                >
                    <option>Open this select menu</option>
                    <option value="Disciple">Disciple</option>
                    <option value="Mentor">Mentor</option>
                    <option value="Instructor">Instructor</option>
                    <option value="Master">Master</option>
                    <option value="Executor">Executor</option>
                </Form.Select>
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default StatForm