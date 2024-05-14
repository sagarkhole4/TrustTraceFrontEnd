"use client"; // This is a client component 👈🏽

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DropDown from "./dropdown";
import axios from "axios";

interface FormData {
  firstName: string;
  lastName: string;
  contactNo: any;
  email: string;
  password: string;
  confirmPassword: string;
  product: string[];
}

const Registration: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    contactNo: "",
    email: "",
    password: "",
    confirmPassword: "",
    product: [],
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const router = useRouter();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Clear error message when user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const errors: Partial<FormData> = {};

    // Validation rules for each field
    if (!formData.firstName) {
      errors.firstName = "First name is required";
    }
    if (!formData.lastName) {
      errors.lastName = "Last name is required";
    }
    if (!formData.email) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }
    if (!formData.contactNo) {
      errors.contactNo = "Contact number is required";
    } else if (!/^\d{10}$/.test(formData.contactNo)) {
      errors.contactNo = "Contact number must be 10 digits";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors found
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      // Here you can perform any login logic, such as sending the formData to a server for authentication
      console.log("Form Data:", formData);
      // Reset form fields after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        contactNo: "",
        email: "",
        password: "",
        confirmPassword: "",
        product: [],
      });
      let data = JSON.stringify({
        name: formData.firstName,
        email: formData.email,
        mobile: formData.contactNo,
        address: "pune",
        password: formData.confirmPassword,
        isVerified: true,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://1b18-103-97-166-226.ngrok-free.app/auth/register",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response: any) => {
          console.log(JSON.stringify(response.data));
          router.push('/');
        })
        .catch((error: any) => {
          console.log(error);
        });
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center w-full flex-1 px-2 md:px-20 text-center">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row w-full md:w-2/3 max-w-4xl mt-10">
        <div className="w-full md:w-full p-5">
          <div className="text-left font-bold">
            <img
              src="Frame.png"
              alt="Frame"
              className="inline-block mr-2"
              height="150px"
              width="150px"
            />
          </div>
          <div className="py-10">
            <h2 className="text-3xl font-bold text-black mb-2">
              Sign up to Account
            </h2>
            <div className="border-2 w-10 border-black inline-block mb-2"></div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-12">
                <div className=" border-gray-900/10 pb-12">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      {/* <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                                                First name
                                            </label> */}
                      <div className="mt-2">
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          onChange={handleChange}
                          value={formData.firstName}
                          placeholder="First Name"
                          maxLength={15}
                          required
                          autoComplete="given-name"
                          className="block w-full rounded-lg p-2 border-0 py-1.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.firstName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      {/* <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                                                Last name
                                            </label> */}
                      <div className="mt-2">
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          value={formData.lastName}
                          maxLength={15}
                          required
                          placeholder="Last Name"
                          onChange={handleChange}
                          autoComplete="lastName"
                          className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      {/* <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                Email address
                                            </label> */}
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          placeholder="Email Address"
                          maxLength={25}
                          required
                          onChange={handleChange}
                          autoComplete="email"
                          className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      {/* <label htmlFor="contactNo" className="block text-sm font-medium leading-6 text-gray-900">
                                                Contact Number
                                            </label> */}
                      <div className="mt-2">
                        <input
                          id="contactNo"
                          name="contactNo"
                          type="number"
                          value={formData.contactNo}
                          placeholder="Contact Number"
                          maxLength={10}
                          required
                          onChange={handleChange}
                          autoComplete="contactNo"
                          className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.contactNo && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.contactNo}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      {/* <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                                Password
                                            </label> */}
                      <div className="mt-2">
                        <input
                          type="text"
                          name="password"
                          id="password"
                          onChange={handleChange}
                          value={formData.password}
                          placeholder="Password"
                          maxLength={15}
                          required
                          autoComplete="password"
                          className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.password && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.password}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      {/* <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                                                Confirm Password
                                            </label> */}
                      <div className="mt-2">
                        <input
                          type="text"
                          name="confirmPassword"
                          id="confirmPassword"
                          onChange={handleChange}
                          placeholder="Confirm Password"
                          value={formData.confirmPassword}
                          maxLength={15}
                          required
                          autoComplete="confirmPassword"
                          className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.confirmPassword && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.confirmPassword}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-5">
                    <DropDown />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="border-2 border-black text-back rounded-full px-8 md:px-12 py-2 inline-block font-semibold hover:bg-black hover:text-white mt-9"
                    >
                      SignUp
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Registration;
