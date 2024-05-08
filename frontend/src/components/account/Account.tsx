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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { userType, ...userData } = formData;
  
    try {
      let endpoint;
      if (userType === "buying") {
        endpoint = "http://localhost:3001/api/buyerUsers/createBuyerUser";
      } else if (userType === "selling") {
        endpoint = "http://localhost:3001/api/sellerUsers/createSellerUser";
      } else {
        throw new Error(`Invalid userType: ${userType}`);
      }
  
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        console.log(`${userType} user account created successfully.`);
      } else {
        console.error(`Failed to create ${userType} user account.`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
