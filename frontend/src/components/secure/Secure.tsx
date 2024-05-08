import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function Secure() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<any>({});

  const getUserDetails = async (accessToken:any) => {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
    );
    const data = await response.json();
    setUserDetails(data);
  };

  useEffect(() => {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      navigate("/");
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