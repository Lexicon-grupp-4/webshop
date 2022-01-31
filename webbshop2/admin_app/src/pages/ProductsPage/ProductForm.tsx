import { Button, Form } from 'react-bootstrap';
import { useAppSelector } from '../../redux/hooks';
import { selectCategories } from '../../redux/categories.slice';

export default function ProductForm() {
    const categories = useAppSelector(selectCategories);
    // function handleSubmit() {

    // }
    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>
                    Product Namn
                </Form.Label>
                <Form.Control placeholder="Produktnamn" />
                <Form.Text className="text-muted">
                    Produktnamn inklusvive Brand name
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Pris</Form.Label>
                <Form.Control placeholder="pris i kronor" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Kort Beskrivning</Form.Label>
                <Form.Control placeholder="kort besskrivning" />
                <Form.Text className="text-muted">
                    En rad.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Längre Beskrivning</Form.Label>
                <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Kategori</Form.Label>
                    <Form.Select> 
                    {categories.map(c => {
                        return (
                            <option key={c.id}> 
                                {c.hierarchicalName} 
                            </option>
                    )})}
                    </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
                Skapa
            </Button>
        </Form>
    )
}