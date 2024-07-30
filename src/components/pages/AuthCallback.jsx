import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Ensure this is a named import
import { useDispatch } from "react-redux";
import { authenticate } from "../../api/login_api"; // Adjust this import path based on your structure

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location including search params
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAuthToken = async () => {
      try {
        // Extract parameters from the URL
        const searchParams = new URLSearchParams(location.search);
        const authCode = searchParams.get("code");
        const stateParam = searchParams.get("state");
        const accessToken = searchParams.get("access_token");
        const refreshToken = searchParams.get("refresh_token");
        const tokenExpiryTime = searchParams.get("expires_in");

        console.log("URL Params:", window.location.search);
        console.log("Auth code:", authCode);
        console.log("State param:", stateParam);
        console.log("Extracted Access Token:", accessToken);
        console.log("Extracted Refresh Token:", refreshToken);
        console.log("Extracted Token Expiry Time:", tokenExpiryTime);

        // Store tokens if they exist
        if (accessToken) {
          localStorage.setItem("access_token", accessToken);
          if (refreshToken) {
            localStorage.setItem("refresh_token", refreshToken);
          }
          if (tokenExpiryTime) {
            const expiryTime = Date.now() + parseInt(tokenExpiryTime) * 1000;
            localStorage.setItem("token_expiry_time", expiryTime);
          }
          console.log("Tokens stored successfully");
          navigate("/"); // Navigate to the home page after authentication
        } else if (authCode) {
          // Dispatch authenticate action if auth code exists
          await dispatch(authenticate(authCode));
          navigate("/"); // Navigate to the home page after authentication
        } else {
          throw new Error("No valid authentication parameters found");
        }
      } catch (error) {
        console.error("Authentication failed:", error);
        navigate("/account"); // Navigate to the account page on failure
      }
    };

    fetchAuthToken();
  }, [dispatch, location, navigate]);

  return <div>Authenticating...</div>;
};

export default AuthCallback;

// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // Ensure this is a named import
// import { useDispatch } from "react-redux";
// import { authenticate } from "../../api/login_api"; // Adjust this import path based on your structure

// const AuthCallback = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchAuthToken = async () => {
//       try {
//         await dispatch(authenticate());
//         navigate("/"); // Navigate to the home page after authentication
//       } catch (error) {
//         console.error("Authentication failed:", error);
//         navigate("/account"); // Navigate to the account page on failure
//       }
//     };

//     fetchAuthToken();
//   }, [dispatch, navigate]);

//   return <div>Authenticating...</div>;
// };

// export default AuthCallback;
