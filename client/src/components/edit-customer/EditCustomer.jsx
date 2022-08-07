import React, { useState } from 'react';

import './EditCustomer.css';

export const EditCustomer = ({ customer }) => {
    const [username, setUsername] = useState(customer.username);

    const updateUsername = async (e) => {
        e.preventDefault();
        try {
            const body = { username };
            const response = await fetch(
                `http://localhost:8001/users/${customer.id}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                }
            );

            window.location = '/';
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <>
            <button
                type='button'
                className='btn btn-warning'
                data-toggle='modal'
                data-target={`#${customer.id}`}>
                Edit
            </button>

            <div
                className='modal'
                id={`${customer.id}`}
                onClick={() => setUsername(customer.username)}>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h4 className='modal-title'>Edit Customer</h4>
                            <button
                                type='button'
                                className='close'
                                data-dismiss='modal'
                                onClick={() => setUsername(customer.username)}>
                                &times;
                            </button>
                        </div>

                        <div className='modal-body'>
                            <input
                                type='text'
                                className='form-control'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className='modal-footer'>
                            <button
                                type='button'
                                className='btn btn-warning'
                                data-dismiss='modal'
                                onClick={(e) => updateUsername(e)}>
                                Edit
                            </button>
                            <button
                                type='button'
                                className='btn btn-danger'
                                data-dismiss='modal'
                                onClick={() => setUsername(customer.username)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
