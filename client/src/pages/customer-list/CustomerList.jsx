import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

import { EditCustomer } from './../../components/edit-customer/EditCustomer';

import './CustomerList.css';

export const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Define the function to use to execute the side effect (i.e., fetch the data)
        async function fetchCustomers() {
            const response = await fetch('http://localhost:8001/users');
            const fetchedCustomers = await response.json(response);
            // console.log(fetchedCustomers);
            setCustomers(fetchedCustomers);
        }
        // Invoke the function
        fetchCustomers();
    }, []);

    const deleteCustomer = async (e, id) => {
        e.preventDefault();
        console.log(`Delete customer ${id}`);
        try {
            const deleteCustomer = await fetch(
                `http://localhost:8001/users/${id}`,
                {
                    method: 'DELETE',
                }
            );
            console.log(deleteCustomer);
            setCustomers(customers.filter((customer) => customer.id !== id));
        } catch (err) {
            console.error(err.message);
        }
    };

    const editCustomer = (e, id, username) => {
        // This is probably unnecessary because the navigate component handles it.
        e.preventDefault();
        const url = `/customers/${id}`;
        console.log(`Navigate to customer id: ${id} at URL: ${url}`);
        navigate(url, {
            state: { id, username },
        });
    };

    return (
        <div>
            <div className='overflow-x-auto'>
                <table id='customers'>
                    <thead>
                        <tr>
                            <th className='col-id'>Id</th>
                            <th className='col-name'>Name</th>
                            <th className='col-actions'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers &&
                            customers.map((customer) => {
                                return (
                                    <tr key={customer.id}>
                                        <td className='col-id'>
                                            {customer.id}
                                        </td>
                                        <td className='col-name'>
                                            {customer.username}
                                        </td>
                                        <td className='col-actions'>
                                            <div className='align-actions'>
                                                <button
                                                    className='btn btn-primary btn-lng'
                                                    onClick={(e) =>
                                                        editCustomer(
                                                            e,
                                                            customer.id,
                                                            customer.username
                                                        )
                                                    }>
                                                    <FaEdit className='icon-margin' />
                                                    Edit
                                                </button>
                                                {/* <EditCustomer
                                                    customer={customer}
                                                /> */}
                                                <button
                                                    onClick={(e) =>
                                                        deleteCustomer(
                                                            e,
                                                            customer.id
                                                        )
                                                    }
                                                    className='btn btn-danger btn-lng'>
                                                    <FaTrashAlt className='icon-margin' />
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        ;
                    </tbody>
                </table>
            </div>
        </div>
    );
};
