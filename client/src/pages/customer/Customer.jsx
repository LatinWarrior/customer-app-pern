import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaSave } from 'react-icons/fa';

export const Customer = () => {
    const currentLocation = useLocation();

    const { id, username } = currentLocation.state;

    const initialCustomer = {
        id: id,
        username: username,
    };

    const [customer, setCustomer] = useState(initialCustomer);

    const handleChange = (event, id) => {
        const value = event.target.value;
        const propertyName = event.target.name;
        console.log(`username value: ${value}`);
        console.log(`propertyName value: ${propertyName}`);
        try {
            // updateUsername(event, value);
            console.log(`username before: ${customer.username}`);
            setCustomer({ ...customer, [propertyName]: value });
            console.log(`username after: ${customer.username}`);
        } catch (error) {
            console.log(error.message);
        }
    };

    const updateUsername = async (e, id) => {
        e.preventDefault();
        try {
            const body = { username };
            const response = await fetch(`http://localhost:8001/users/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            console.log(response);

            // window.location = '/';
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div className='container'>
            <form>
                <ul class='flex-outer'>
                    <li className='flex-inner'>
                        <label
                            className=''
                            placeholder='Please enter your new Username'
                            value='Please enter your New Username'
                            htmlFor='username'>
                            Username
                        </label>
                        <input
                            key={customer.id}
                            type='text'
                            name='username'
                            id={customer.id}
                            value={customer.username}
                            onChange={(event) =>
                                handleChange(event, customer.id)
                            }
                            placeholder='Your new username'
                            className=''
                        />
                    </li>
                    <li>
                        <button
                            type='submit'
                            onClick={(event) =>
                                updateUsername(event, customer.id)
                            }
                            className='btn btn-primary btn-lg'>
                            <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                                <FaSave
                                    className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                                    aria-hidden='true'
                                />
                            </span>
                            Save
                        </button>
                    </li>
                </ul>
            </form>
        </div>
    );
};
