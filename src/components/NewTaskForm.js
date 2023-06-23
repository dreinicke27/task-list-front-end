import React, { useState } from 'react';
import PropTypes from 'prop-types';


const INITITIAL_FORM_DATA = {
    'title': '',
    'description': '',
    'completed_at': null
};

const NewTaskForm = (props) => {

    const [formData, setFormData] = useState(INITITIAL_FORM_DATA);

    const handleChange = (event) => {
        const newFormData = { ...formData, [event.target.name]: event.target.value };
        setFormData(newFormData);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.addTask(formData);
        setFormData(INITITIAL_FORM_DATA);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="Title">Title</label>
            <input
            required
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
        />
        <label htmlFor="Description">Description</label>
        <input
            required
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
        />
        <input type="submit" value="submit"/>
    </form>
    );

};

NewTaskForm.propTypes = {
    addTask: PropTypes.func,
};

export default NewTaskForm;