import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function Secure() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<any>({});
  const [buyerEmailExists, setBuyerEmailExists] = useState<boolean>(false);
  const [sellerEmailExists, setSellerEmailExists] = useState<boolean>(false);

  const getUserDetails = async (accessToken: any) => {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
    );
    const data = await response.json();
    setUserDetails(data);
  };

  const checkIfBuyerUserAlreadyExist = async (email: string) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/buyerUsers/checkBuyerUserByEmail?email=${encodeURIComponent(
          email
        )}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("buyeruser data =>", data);

        setBuyerEmailExists(data.emailExists);
      } else {
        throw new Error("Failed to fetch buyer user data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const checkIfSellerUserAlreadyExist = async (email: string) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/sellerUsers/checkSellerUserByEmail?email=${encodeURIComponent(
          email
        )}`
      );

      if (response.ok) {
        const data = await response.json();
        console.log("selleruser data =>", data);
        const emailExists = data.emailExists;
        setSellerEmailExists(emailExists);
      } else {
        throw new Error("Failed to fetch seller user data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (!accessToken) {
      navigate("/");
    }
    getUserDetails(accessToken);
  }, []);

  useEffect(() => {
    if (userDetails.email) {
      checkIfBuyerUserAlreadyExist(userDetails.email);
      checkIfSellerUserAlreadyExist(userDetails.email);
    }
  }, [userDetails.email]); 

  console.log("state buyer =>", buyerEmailExists);
  console.log("state seller=>", sellerEmailExists);
  console.log("userDetails.email=>", userDetails.email);

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

            {buyerEmailExists && (
              <Link to="/BuyerDashboard">
                <button>Go shopping</button>
              </Link>
            )}

            {sellerEmailExists && (
              <Link to="/SellerDashboard">
                <button>Make some cash selling your products</button>
              </Link>
            )}
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
