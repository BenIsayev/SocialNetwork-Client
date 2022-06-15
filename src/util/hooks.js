import { useState } from 'react'

export const useForm = (callback, initialState = {}) => {

    const [values, setValues] = useState(initialState)

    const onChange = (e) => {
        setValues(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        callback()
    }

    return {
        onChange,
        onSubmit,
        values
    }
}
