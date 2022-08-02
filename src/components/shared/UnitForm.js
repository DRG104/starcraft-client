import { 
    Form,
    Button,
    Container
} from 'react-bootstrap'

const UnitForm = (props) => {
    const { unit, handleChange, heading, handleSubmit } = props
    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="Name">Name</Form.Label>
                <Form.Control
                    placeholder="Which unit is this?"
                    name="Name"
                    id="Name"
                    value={unit.Name}
                    onChange={handleChange}
                />
                <Form.Label htmlFor="Cost">Cost</Form.Label>
                <Form.Control
                    placeholder="How much does this unit cost?"
                    name="Cost"
                    id="Cost"
                    value={unit.Cost}
                    onChange={handleChange}
                />
                <Form.Label htmlFor="Tier">Tier</Form.Label>
                <Form.Control
                    placeholder="What tier of unit is this?"
                    type="number"
                    name="Tier"
                    id="Tier"
                    value={unit.Tier}
                    onChange={handleChange}
                />
                <Form.Label htmlFor="Produced">Production</Form.Label>
                <Form.Control
                    placeholder="Which structure is this unit produced?"
                    name="Produced"
                    id="Produced"
                    value={unit.Produced}
                    onChange={handleChange}
                />
                <Form.Label htmlFor="Targets">Targets</Form.Label>
                <Form.Select
                    aria-label="Attack targets?"
                    name="Targets"
                    id="Targets"
                    value={unit.Targets}
                    onChange={handleChange}
                >
                    <option value="Ground">Ground</option>
                    <option value="Air">Air</option>
                    <option value="Ground / Air">Ground / Air</option>
                </Form.Select>
                <Form.Label htmlFor="Status">Status</Form.Label>
                <Form.Select
                    aria-label="Unit Status?"
                    name="Status"
                    id="Status"
                    defaultValue={unit.Status}
                    onChange={handleChange}
                >
                    {/* <option>Status Options</option> */}
                    <option value="Idle">Idle</option>
                    <option value="In-combat">In-combat</option>
                </Form.Select>
                <Form.Check
                    label="Is this unit alive?"
                    name="Alive"
                    defaultChecked={ unit.Alive }
                    onChange={handleChange}
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default UnitForm