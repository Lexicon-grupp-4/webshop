import { useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppSelector } from '../../redux/hooks';
import { selectCategories } from '../../redux/categories.slice';
import { ProductDto } from '../../redux/DomainClasses';
import { postWithToken } from '../../helpers/fetching';
import { selectActiveProduct } from '../../redux/products.slice';

type Inputs = {
    name: string;
    price: number;
    category: any;
    description: string;
    quantity: number;
};

export default function ProductForm() {
    const categories = useAppSelector(selectCategories);
    const activeProduct = useAppSelector(selectActiveProduct);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, touchedFields, isDirty, isValid },
    } = useForm<Inputs>({ mode: 'onChange', defaultValues: activeProduct });
    useEffect(() => {
        reset(activeProduct);
    }, [reset, activeProduct]);
    const onSubmit: SubmitHandler<Inputs> = (input) => {
        const product: ProductDto = {
            name: input.name,
            price: input.price,
            categoryId: parseInt(input.category),
            description: input.description,
            quantity: input.quantity
        };
        postWithToken(`/api/products`, product)
            .then(response => {
                if (!response.ok) {
                    throw Error('posting product');
                }
                return response.json() as Promise<ProductDto>;
            })
            .then((resp: ProductDto) => {
                reset();
            })
            .catch(() => {
            });
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
                <Form.Label>
                    Product Namn 
                </Form.Label>
                <Form.Control
                    isInvalid={!!errors.name}
                    isValid={touchedFields.name && !errors.name}
                    {...register('name', { required: true, maxLength: 50 })}
                />
                {errors.name && <span>Produkt namn krävs</span>}
                <Form.Text className="text-muted">
                    Produktnamn inklusvive Brand name
                </Form.Text>
            </Form.Group>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="price">
                    <Form.Label>Pris</Form.Label>
                    <Form.Control
                        type="number"
                        isInvalid={!!errors.price}
                        {...register("price", { required: true, valueAsNumber: true, minLength: 1 })}
                        placeholder="pris i kronor"
                    />
                </Form.Group>
                <Form.Group as={Col} controlId="quantity">
                    <Form.Label>Antal</Form.Label>
                    <Form.Control
                        type="number"
                        isInvalid={!!errors.quantity}
                        {...register("quantity", { required: true, valueAsNumber: true, minLength: 1 })}
                    />
                </Form.Group>
            </Row>
            <Form.Group className="mb-3">
                <Form.Label>Kort Beskrivning</Form.Label>
                <Form.Control placeholder="kort besskrivning" />
                <Form.Text className="text-muted">
                    En rad.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Längre Beskrivning</Form.Label>
                <Form.Control
                    as="textarea"
                    isInvalid={!!errors.description}
                    rows={3}
                    {...register("description", { required: true, minLength: 2 })}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Kategori</Form.Label>
                    <Form.Select
                        {...register("category")}
                    >
                    {categories.map(c => {
                        return (
                            <option key={c.id} value={c.id}> 
                                {c.hierarchicalName} 
                            </option>
                    )})}
                    </Form.Select>
            </Form.Group>
            <Button disabled={!isDirty || !isValid} variant="primary" type="submit">
                Skapa
            </Button>
            {'\u00A0'}
            <Button onClick={() => reset()} variant="primary">
                Rensa
            </Button>
        </Form>
    )
}