import React from 'react';
import useForm from 'react-hook-form';

import axiosWithAuth from '../auth/axiosWithAuth';

const AddNewColor = () => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data, e) => {
        const newColor = {
            code: {
                hex: data.hex
            },
            color: data.color
        };

        axiosWithAuth()
            .post('./colors', newColor)
            .then((res) => {
                console.log(
                    'src/components/AddNewColor.js: AddNewColor: axiosWithAuth: .then: RES:', 
                    res
                )
            })
            .catch((err) => {
                console.log(
                    'src/components/AddNewColor.js: AddNewColor: axiosWithAuth: .catch: ERROR: ',
                    err
                )
            });
    };

    return (
        <div>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <legend>Add New Color</legend>
                <label for='color'>Color Name: </label>
                <input type='text' name='color' id='color' ref={ register } />
                <br/>

                <label for='hex'>Hex Code: </label>
                <input type='text' name='hex' id='hex' ref={ register } />
                <br/>

                <input type='submit' value='add' />
            </form>
        </div>
    );
};

export default AddNewColor;