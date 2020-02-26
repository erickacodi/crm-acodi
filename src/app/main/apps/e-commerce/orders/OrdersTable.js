import React, {useEffect, useState} from 'react';
import {Table, TableBody, TableCell, TablePagination, TableRow, Checkbox} from '@material-ui/core';
import {FuseScrollbars, FuseUtils} from '@fuse';
import {withRouter} from 'react-router-dom';
import _ from '@lodash';
import OrdersTableHead from './OrdersTableHead';
import * as Actions from '../store/actions';
import {useDispatch, useSelector} from 'react-redux';
function pro(data){
    console.log(data);
}

function OrdersTable(props)
{
    const dispatch = useDispatch();
    const orders = useSelector(({eCommerceApp}) => eCommerceApp.orders.data);
    const searchText = useSelector(({eCommerceApp}) => eCommerceApp.orders.searchText);
    const searchText2 = useSelector(({eCommerceApp}) => eCommerceApp.orders.searchText2);

    const [selected, setSelected] = useState([]);
    const [data, setData] = useState(orders);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState({
        direction: 'asc',
        id       : null
    });

    useEffect(() => {
        dispatch(Actions.getOrders());
    }, [dispatch]);

    useEffect(() => {
        setData(searchText.length === 0 ? orders : FuseUtils.filterArrayByString(orders, searchText))
    }, [orders, searchText]);

    useEffect(() => {
        setData(searchText2.length === 0 ? orders : FuseUtils.filterArrayByString(orders, searchText2))
    }, [orders, searchText2]);
    pro(data);

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [day, month, year].join('-');
    }

    function handleRequestSort(event, property)
    {
        const id = property;
        let direction = 'desc';

        if ( order.id === property && order.direction === 'desc' )
        {
            direction = 'asc';
        }

        setOrder({
            direction,
            id
        });
    }

    function handleSelectAllClick(event)
    {
        if ( event.target.checked )
        {
            setSelected(data.map(n => n.id_client));
            return;
        }
        setSelected([]);
    }

    function handleClick(item)
    {
        props.history.push('/apps/clients/' + item.id_client + '/' + item.handle);
    }

    function handleCheck(event, id)
    {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if ( selectedIndex === -1 )
        {
            newSelected = newSelected.concat(selected, id);
        }
        else if ( selectedIndex === 0 )
        {
            newSelected = newSelected.concat(selected.slice(1));
        }
        else if ( selectedIndex === selected.length - 1 )
        {
            newSelected = newSelected.concat(selected.slice(0, -1));
        }
        else if ( selectedIndex > 0 )
        {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    }

    function handleChangePage(event, page)
    {
        setPage(page);
    }

    function handleChangeRowsPerPage(event)
    {
        setRowsPerPage(event.target.value);
    }

    return (
        <div className="w-full flex flex-col">

            <FuseScrollbars className="flex-grow overflow-x-auto">

                <Table className="min-w-xl" aria-labelledby="tableTitle">

                    <OrdersTableHead
                        numSelected={selected.length}
                        order={order}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={data.length}
                    />

                    <TableBody>
                        {
                            _.orderBy(data, [
                                (o) => {
                                    switch ( order.id_client )
                                    {
                                        case 'id':
                                        {
                                            return parseInt(o.id, 10);
                                        }
                                        case 'customer':
                                        {
                                            return o.customer.firstName;
                                        }
                                        case 'payment':
                                        {
                                            return o.payment.method;
                                        }
                                        case 'status':
                                        {
                                            return o.status[0].name;
                                        }
                                        default:
                                        {
                                            return o[order.id];
                                        }
                                    }
                                }
                            ], [order.direction])
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    const isSelected = selected.indexOf(n.id) !== -1;
                                    return (
                                        <TableRow
                                            className="h-64 cursor-pointer"
                                            hover
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.id}
                                            selected={isSelected}
                                            onClick={event => handleClick(n)}
                                        >
                                            <TableCell className="w-48 pl-4 sm:pl-12" padding="checkbox">
                                                <Checkbox
                                                    checked={isSelected}
                                                    onClick={event => event.stopPropagation()}
                                                    onChange={event => handleCheck(event, n.id)}
                                                />
                                            </TableCell>

                                            <TableCell component="th" scope="row">
                                                {n.id_client}
                                            </TableCell>

                                            <TableCell component="th" scope="row">
                                                {n.name}
                                            </TableCell>

                                            <TableCell className="truncate" component="th" scope="row">
                                                {n.last_name}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                {n.email}
                                            </TableCell>

                                            <TableCell component="th" scope="row">
                                                {n.phone_number}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {n.cellphone}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {n.progress_name}
                                            </TableCell>

                                            <TableCell component="th" scope="row">
                                                {formatDate(n.created_at)}
                                            </TableCell>

                                        </TableRow>
                                    );
                                })}
                    </TableBody>
                </Table>
            </FuseScrollbars>

            <TablePagination
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page'
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page'
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
}

export default withRouter(OrdersTable);
