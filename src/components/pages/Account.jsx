import { useEffect, useState } from "react";
import { fetchUserProfile, refreshToken } from "../../api/spotifyapi";

export default function Account() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getUserInfo() {
      let token = localStorage.getItem("access_token");
      const refreshTokenValue = localStorage.getItem("refresh_token");

      try {
        let userProfile = await fetchUserProfile(token);
        if (!userProfile) {
          const tokenData = await refreshToken(refreshTokenValue);
          token = tokenData.access_token;
          localStorage.setItem("access_token", token);
          userProfile = await fetchUserProfile(token);
        }
        setUserInfo(userProfile);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    getUserInfo();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userInfo) {
    return <div>Failed to load user profile</div>;
  }

  return (
    <div className="accountContainer">
      <h1>Account Information</h1>
      <p>Name: {userInfo.display_name}</p>
      <p>Email: {userInfo.email}</p>
      <p>Followers: {userInfo.followers.total}</p>
    </div>
  );
}
