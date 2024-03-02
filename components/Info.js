import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import axios from 'axios';


const Info = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        dob: null,
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        mobile: '',
        dob: '',
    });

    const router = useRouter();
    console.log(formData, "form")

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDateChange = (date) => {
        setFormData((prevData) => ({
            ...prevData,
            dob: date,
        }));
    };

    const handlePhoneChange = (value) => {
        setFormData((prevData) => ({
            ...prevData,
            mobile: value,
        }));
    };

    const validateName = (name) => {
        return name.trim() ? null : 'Name is required';
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim()) ? null : 'Please enter a valid email';
    };

    const validateMobile = (mobile) => {
        return mobile.trim() ? null : 'Mobile number is required';
    };

    const validateDateOfBirth = (dob) => {
        return dob ? null : 'Date of birth is required';
    };

    const handleNextClick = async() => {
        const newErrors = {
            name: validateName(formData.name),
            email: validateEmail(formData.email),
            mobile: validateMobile(formData.mobile),
            dob: validateDateOfBirth(formData.dob),
        };

        const isValid = Object.values(newErrors).every((error) => !error);

        if (isValid) {
            try {
                const response = await axios.post('https://us-central1-flutter-training-93ad2.cloudfunctions.net/TestingAPI/api/create', {
                    name: formData.name,
                    email: formData.email,
                    mobile: formData.mobile,
                    dob: formData.dob,
                });

                if (response.status === 200) {
                    const existingData = JSON.parse(localStorage.getItem('formData')) || [];
                    const updatedFormData = [...existingData, formData];
                    localStorage.setItem('formData', JSON.stringify(updatedFormData));
                    router.push('/image-upload');
                    console.log('Form submitted successfully:', formData);
                } else {
                    console.error('Failed to submit form:', response.data);
                }
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="max-w-md mx-auto my-8 p-6 bg-gray-100 border rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-4">Give your basic information</h1>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
                <span className="text-red-500 text-sm">{errors.name}</span>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
                <span className="text-red-500 text-sm">{errors.email}</span>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Mobile No</label>
                <PhoneInput
                    country={'in'}
                    value={formData.mobile}
                    onChange={handlePhoneChange}
                    inputStyle={{
                        width: '100%',
                        height: '20%',
                        padding: '0.875rem',
                        paddingLeft: "3rem",
                        border: '1px solid #a0aec0',
                        borderRadius: '0.375rem',
                        outline: 'none',
                    }}
                />
                <span className="text-red-500 text-sm">{errors.mobile}</span>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Date of Birth</label>
                <DatePicker
                    selected={formData.dob}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Enter Date Of Birth"
                    className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
                <span className="text-red-500 text-sm">{errors.dob}</span>
            </div>
            <div className="mb-4 flex justify-end items-center" >
                <button onClick={handleNextClick} className="px-2 py-2 bg-yellow-600 border rounded-md text-sm">Next</button>
            </div>
        </div>
    );
};

export default Info;



