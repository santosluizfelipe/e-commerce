import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function Secure() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<any>({});
  const [buyerEmailExists, setBuyerEmailExists] = useState<boolean>(false)
  const [sellerEmailExists, setSellerEmailExists] = useState<boolean>(false)

  const getUserDetails = async (accessToken: any) => {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
    );
    const data = await response.json();
    setUserDetails(data);
  };

  const checkIfBuyerUserAlreadyExist = async (email: string) => {
    try{
    const response = await fetch(
      `http://localhost:3001/api/BuyerUsers/getBuyerUsersEmail?email=${encodeURIComponent(
        email
      )}`
    );
    if (response.ok) {
      const data = await response.json();

      const emailExists = data.length > 0;
      setBuyerEmailExists(emailExists);
    } else {
      throw new Error('Failed to fetch buyer user data');
    }
  } catch (error) {
    console.error('Error:', error);
  }
  };

  const checkIfSellerUserAlreadyExist = async (email: string) => {
    try{
    const response = await fetch(
      `http://localhost:3001/api/SellerUsers/getBuyerUsersEmail?email=${encodeURIComponent(
        email
      )}`
    );
    if (response.ok) {
      const data = await response.json();

      const emailExists = data.length > 0;
      setSellerEmailExists(emailExists);
    } else {
      throw new Error('Failed to fetch seller user data');
    }
  } catch (error) {
    console.error('Error:', error);
  }
  };

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    checkIfBuyerUserAlreadyExist(userDetails.email);
    checkIfSellerUserAlreadyExist(userDetails.email);

    if (!accessToken) {
      navigate("/");
    }

    if(buyerEmailExists){
      navigate("/BuyerDashboard");
    }

    if(sellerEmailExists){
      navigate("/SellerDashboard");
    }

    getUserDetails(accessToken);
  }, [navigate]);

  return (
    <>
      {userDetails ? (
        <div className="user-profile">
          <div className="card">
            <img
              src={userDetails.picture}
              alt={`${userDetails.given_name}'s profile`}
              className="profile-pic"
            />
            <p>Welcome</p>
            <h1 className="name">{userDetails.name}</h1>
            <p className="email">{userDetails.email}</p>
            <p className="locale">{`Location: ${userDetails.locale}`}</p>
            <Link to="/account">
              <button>Set up your account</button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
    </>
  );
}
