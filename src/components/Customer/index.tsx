import { FormEvent, RefObject, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addCustomer, editCustomer } from '../../reducers/customers';
import { Customer as CustomerType } from '../../types/customer';

export enum States {
    View = 0,
    Edit = 1,
    Add = 2,
}

interface Props {
    state: States;
}

interface FormProps extends Props {
    nameRef?: RefObject<HTMLInputElement>;
    currencyRef?: RefObject<HTMLInputElement>;
    addressRef?: RefObject<HTMLTextAreaElement>;
    emailRef?: RefObject<HTMLInputElement>;
    websiteRef?: RefObject<HTMLInputElement>;
}

const isViewing = (state: States) => state === States.View;
const isEditing = (state: States) => state === States.Edit;
const isAdding = (state: States) => state === States.Add;

const CustomerForm = ({
    state,
    nameRef,
    currencyRef,
    addressRef,
    emailRef,
    websiteRef,
}: FormProps) => {
    return (
        <>
            <div className='input'>
                <label htmlFor='customer-name'>Name</label>
                <input
                    id='customer-name'
                    type='text'
                    readOnly={!(isAdding(state) || isEditing(state))}
                    required
                    ref={nameRef}
                />
            </div>
            <div className='input'>
                <label htmlFor='customer-currency'>Currency</label>
                <input
                    id='customer-currency'
                    type='text'
                    readOnly={!(isAdding(state) || isEditing(state))}
                    required
                    ref={currencyRef}
                />
            </div>
            <div className='input'>
                <label htmlFor='customer-address'>Address</label>
                <textarea
                    id='customer-address'
                    readOnly={!(isAdding(state) || isEditing(state))}
                    required
                    ref={addressRef}
                />
            </div>
            <div className='input'>
                <label htmlFor='customer-email'>Email</label>
                <input
                    id='customer-email'
                    type='email'
                    readOnly={!(isAdding(state) || isEditing(state))}
                    ref={emailRef}
                />
            </div>
            <div className='input'>
                <label htmlFor='customer-website'>Website</label>
                <input
                    id='customer-website'
                    type='text'
                    readOnly={!(isAdding(state) || isEditing(state))}
                    ref={websiteRef}
                />
            </div>
        </>
    );
};

const Customer = ({ state }: Props) => {
    const dispatch = useDispatch();
    const nameRef = useRef<HTMLInputElement>(null);
    const currencyRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLTextAreaElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const websiteRef = useRef<HTMLInputElement>(null);
    const isValid = (): boolean => {
        if (
            !nameRef.current ||
            !currencyRef.current ||
            !addressRef.current ||
            !emailRef.current ||
            !websiteRef.current
        )
            return false;
        if (
            !nameRef.current.value ||
            !currencyRef.current.value ||
            !addressRef.current.value
        )
            return false;
        return true;
    };
    const _addCustomer = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isValid()) return;
        const newCustomer: CustomerType = {
            id: '',
            name: nameRef.current!.value,
            address: addressRef.current!.value,
            currency: currencyRef.current!.value,
        };
        if (emailRef.current!.value)
            newCustomer.email = emailRef.current!.value;
        if (websiteRef.current!.value)
            newCustomer.website = websiteRef.current!.value;
        console.log(newCustomer);

        dispatch(addCustomer(newCustomer));
    };
    const _editCustomer = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isValid()) return;
        const newCustomer: CustomerType = {
            id: '', // TODO: get this from somewhere
            name: nameRef.current!.value,
            address: addressRef.current!.value,
            currency: currencyRef.current!.value,
        };
        if (emailRef.current!.value)
            newCustomer.email = emailRef.current!.value;
        if (websiteRef.current!.value)
            newCustomer.website = websiteRef.current!.value;
        dispatch(editCustomer(newCustomer));
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
                    <CustomerForm
                        {...{
                            state,
                            nameRef,
                            currencyRef,
                            addressRef,
                            emailRef,
                            websiteRef,
                        }}
                    />
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
