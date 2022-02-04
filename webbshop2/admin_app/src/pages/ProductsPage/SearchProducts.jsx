import { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { useAppDispatch } from '../../redux/hooks';
import { setActiveProduct } from '../../redux/products.slice';

export default function SearchProducts() {
    const dispatch = useAppDispatch();
    const [, setValue] = useState('');
    const [product, setProduct] = useState(null);

    const handleInputChange = value => {
        setValue(value);
    };

    function handleChange(productDto) {
        dispatch(setActiveProduct(productDto));
        setProduct(productDto);
    }

    async function loadOptions(inputValue) {
        const res = await fetch(`/api/products?search=${inputValue}`);
        return await res.json();
    };

    return(
        <AsyncSelect
            cacheOptions
            defaultOptions
            value={product}
            getOptionLabel={e => e.name}
            getOptionValue={e => e.id}
            loadOptions={loadOptions}
            onInputChange={handleInputChange}
            onChange={handleChange}
        />
    )
}
