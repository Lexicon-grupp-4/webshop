import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts, Product } from '../store/Products';

const makeList = (products: Product[], handleClick: any) =>
  products.map((p) => {
    return (
      <tr key={p.id} onClick={() => handleClick(p.id)}>
        <td>{p.name}</td>
        <td>{p.price}</td>
        <td>{p.quantity}</td>
      </tr>
    );
  });

export default function ProductList() {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  function selectProduct(id: number) {
    dispatch({ type: 'SELECT_PRODUCT', id });
  }
  return (
    <table className={'table'}>
      <thead>
        <tr>
          <th scope="col">Namn</th>
          <th scope="col">Pris</th>
          <th scope="col">Quantity</th>
        </tr>
      </thead>
      <tbody>{products && makeList(products, selectProduct)}</tbody>
    </table>
  );
}
