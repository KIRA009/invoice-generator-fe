import { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { addCustomer, editCustomer } from '../../reducers/customers';

export enum States {
    View = 0,
    Edit = 1,
    Add = 2,
}

interface Props {
    state: States;
}

const isViewing = (state: States) => state === States.View;
const isEditing = (state: States) => state === States.Edit;
const isAdding = (state: States) => state === States.Add;

const CustomerForm = ({ state }: Props) => {
    return (
        <>
            <div className='input'>
                <label htmlFor='customer-name'>Name</label>
                <input
                    id='customer-name'
                    type='text'
                    readOnly={!isAdding(state)}
                    required
                />
            </div>
            <div className='input'>
                <label htmlFor='customer-address'>Address</label>
                <textarea
                    id='customer-address'
                    readOnly={!isAdding(state)}
                    required
                />
            </div>
            <div className='input'>
                <label htmlFor='customer-email'>Email</label>
                <input
                    id='customer-email'
                    type='email'
                    readOnly={!isAdding(state)}
                />
            </div>
            <div className='input'>
                <label htmlFor='customer-website'>Website</label>
                <input
                    id='customer-website'
                    type='text'
                    readOnly={!isAdding(state)}
                />
            </div>
        </>
    );
};

const Customer = ({ state }: Props) => {
    const dispatch = useDispatch();
    const _addCustomer = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(addCustomer({
            id: '',
            name: 'Torchbox Ltd',
            address: `The Top Floor, Southill Barn, Southill Business Park,
            Cornbury Park
            Charlbury, Oxfordshire
            OX7 3EW
            United Kingdom`,
            currency: "GBP"
        }))
    }
    const _editCustomer = (e: FormEvent<HTMLFormElement>) => {
        dispatch(
            editCustomer({
                id: '',
                name: 'Torchbox',
                address: 'Address',
                currency: 'GBP',
            })
        );
    };
    return (
        <div>
            <h1>
                {isViewing(state)
                    ? `View customer details`
                    : isEditing(state)
                    ? `Edit customer details`
                    : `Add new customer`}
            </h1>
            {isViewing(state) ? (
                <CustomerForm state={state} />
            ) : (
                <form onSubmit={isAdding(state) ? _addCustomer : _editCustomer}>
                    <CustomerForm state={state} />
                    <div className='input'>
                        <input
                            type='submit'
                            value={isAdding(state) ? `Add` : `Save changes`}
                        />
                    </div>
                </form>
            )}
        </div>
    );
};

export { Customer };
