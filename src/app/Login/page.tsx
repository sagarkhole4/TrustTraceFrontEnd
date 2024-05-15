"use client"; // This is a client component 👈🏽

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaGoogle, FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import axios from "axios";
import * as dotenv from 'dotenv';
import { CommonConstants } from '@/common/constants';
// import { Frame } from "../../../public/Frame.png";

interface FormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const router = useRouter();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validateForm()) {
            console.log('formData', formData);
            try {
                let data = JSON.stringify({
                    email: formData.email,
                    password: formData.password
                  });

                  let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: `${CommonConstants.BASE_URL}/auth/login`,
                    headers: { 
                      'accept': '*/*', 
                      'Content-Type': 'application/json'
                    },
                    data : data
                  };
                  console.log(config.url);
                const response = await axios.request(config);
                console.log("Login success:", response);
                if(response.status === 201) {
                    localStorage.setItem('email', formData.email);
                    router.push('/Dashboard');
                }
                
            } catch (error) {
                console.error("Login failed:", error);
                // Handle login error
            }
        } else {
            console.log("Form validation failed");
        }
    };

    const validateForm = () => {
        const errors: Partial<FormData> = {};

        // Validation rules for each field
        if (!formData.email) {
            errors.email = "Email address is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email address is invalid";
        }
        if (!formData.password) {
            errors.password = "Password is required";
        } else if (formData.password.length < 6) {
            errors.password = "Wrong Password";
        }
        console.log(76767, errors);

        setErrors(errors);
        return Object.keys(errors).length === 0; // Return true if no errors found
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="flex flex-col items-center justify-center w-full flex-1 px-2 md:px-20 text-center">
                <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row w-full md:w-2/3 max-w-4xl">
                    <div className="w-full md:w-3/5 p-5">
                        <div className="text-left font-bold">
                            <img src="Frame.png" alt="Frame" className="inline-block mr-2" height="120px" width="120px"/>
                        </div>

                        <div className="py-10">
                            <h2 className="text-3xl font-bold text-blue-600/100 mb-2">
                                Sign in to Account
                            </h2>
                            <div className="border-2 w-10 border-black inline-block mb-2"></div>
                            <div className="flex justify-center my-2">
                                <a href="#" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                                    <FaFacebookF className="text-sm" />
                                </a>
                                <a href="#" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                                    <FaLinkedinIn className="text-sm" />
                                </a>
                                <a href="#" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                                    <FaGoogle className="text-sm" />
                                </a>
                            </div>
                            <p className="text-gray-500">or your email account</p>
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col items-center">
                                    <div className="bg-gray-100 w-full md:w-64 p-2 flex items-center mb-2">
                                        <FaRegEnvelope className="text-gray-400 m-2" />
                                        <input type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="bg-gray-100 outline-none text-sm flex-1" />
                                    </div>
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

                                    <div className="bg-gray-100 w-full md:w-64 p-2 flex items-center mb-2">
                                        <MdLockOutline className="text-gray-400 m-2" />
                                        <input type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="bg-gray-100 outline-none text-sm flex-1" />
                                    </div>
                                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

                                    <div className=" flex w-full md:w-64 mb-5">
                                        <label className="flex items-center text-xs mr-10">
                                            <input type="checkbox" name="remember" className="mr-1" />Remember Me
                                        </label>
                                        <a href="#" className="text-xs ml-10">Forget Password</a>
                                    </div>
                                    <button type="submit"
                                        className="border-2 border-black text-blue-500 rounded-full px-8 md:px-12 py-2 inline-block font-semibold hover:bg-black hover:text-white"
                                    >Sign In</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="w-full md:w-2/5 bg-blue-800 text-white rounded-tr-2xl rounded-br-2xl py-10 md:py-36 px-6 md:px-12">
                        <h2 className="text-3xl font-bold mb-2">Hello, Friend</h2>
                        <div className="border-2 w-10 border-white inline-block mb-2"></div>
                        <p className="mb-6 md:mb-10">Track every step of your goods' journey with precision and ease, ensuring seamless traceability across the country.</p>
                        <Link href="/Registration"
                            className="border-2 border-white rounded-full px-8 md:px-12 py-2 inline-block font-semibold hover:bg-white hover:text-black"
                        >Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;
