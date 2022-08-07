import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

import './CustomerList.css';

export const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Define the function to use to execute the side effect (i.e., fetch the data)
        async function fetchCustomers() {
            const response = await fetch('http://localhost:8001/users');
            const fetchedCustomers = await response.json(response);
            console.log(fetchedCustomers);
            setCustomers(fetchedCustomers);
        }
        // Invoke the function
        fetchCustomers();
    }, []);

    const deleteCustomer = (e, id) => {
        e.preventDefault();
        console.log(`Delete customer ${id}`);
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
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers &&
                            customers.map((customer) => {
                                return (
                                    <tr key={customer.id}>
                                        <td>{customer.id}</td>
                                        <td>{customer.username}</td>
                                        <td>
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
                                        </td>
                                        <td>
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
