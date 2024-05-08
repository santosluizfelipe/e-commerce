import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { Modal, Input, Select, Button, Form } from "./Account.style";

const Account: React.FC = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<any>({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userType: "buying",
  });

  const getUserDetails = async (accessToken: any) => {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
    );
    const data = await response.json();
    setUserDetails(data);

    setFormData({
      ...formData,
      firstName: data.given_name,
      lastName: data.family_name,
      email: data.email,
    });
  };

  useEffect(() => {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      navigate("/");
    }

    getUserDetails(accessToken);
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      userType: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your logic here to create an account based on the userType
    console.log("Form submitted with data:", formData);
  };

  return (
    <Modal>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleInputChange}
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <Select value={formData.userType} onChange={handleSelectChange}>
          <option value="" disabled>
            Select an option
          </option>
          <option value="buying">Buying</option>
          <option value="selling">Selling</option>
        </Select>
        <Button type="submit">Create Account</Button>
      </Form>
    </Modal>
  );
};

export default Account;
