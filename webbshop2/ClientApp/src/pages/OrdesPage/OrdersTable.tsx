import React from 'react';
import { Table } from 'reactstrap';
import { Order } from '../../store/Orders';
import colors from '../../config/colors';

type OrdersTableProps = {
    orders: Order[],
    selecteOrderId: number,
    handleSelectOrderItem: (id: number) => any
}

export default function OrdersTable({ orders, handleSelectOrderItem, selecteOrderId } : OrdersTableProps) {
    const selStyle = {backgroundColor: colors.active_table_row};
    return (
        <>
            <Table hover>
                <thead >
                    <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Datum</th>
                    <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>{
                    orders.map((o: Order) => {
                        const isSelected = o.id === selecteOrderId;
                        return (
                        <tr key={o.id} onClick={() => handleSelectOrderItem(o.id!)} style={isSelected?selStyle:undefined} >
                            <td>{o.id}</td>
                            <td>{o.localTime}</td>
                            <td>{o.status}</td>
                        </tr>
                        );
                    })
                }
                </tbody>
            </Table>
        </>
    );
}
