import { useState, useEffect } from "react";
import { userInfoService } from "../services/user.services";
import { allPublicationsService } from "../services/publications.services";
import { Link, useNavigate } from "react-router-dom";
import EditProfile from "../components/EditProfile";

export default function Profile() {

  //STATES
  const [profile, setProfile] = useState(null);
  const [publication, setPublication] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const getData = async () => {
    try {
      const activeUserProfile = await userInfoService();
      const allPublication = await allPublicationsService();
      setProfile(activeUserProfile.data);
      setPublication(allPublication.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return !isLoading ? (
    <div>
      {profile ? (
        <div key={profile._id}>
          <img src={profile.profileImg} alt="Profile-Image" width="200px" />
          <h3>{profile.username}</h3>
          <p>
            {profile.firstName} {profile.lastName}
          </p>
          <span>Birth date: {profile.birthDate}</span>
          <p>
            E-mail: {profile.email} - <span>Phone: {profile.phoneNum}</span>
          </p>
          <div>
            <h4>Your friends:</h4>
            {profile.friends.map((friend) => (
              <Link to={`/user/${friend._id}`} key={friend._id}>{friend.username}</Link>
            ))}
          </div>
          <br />
          {publication.length > 0 ? (
            <div>
              <h4>Publications:</h4>
              {publication.map((publication) => (
                <div key={publication._id}>
                  <h4>
                    {publication.owner.username} -{" "}
                    <span>{publication.createdAt}</span>
                  </h4>
                  <p>{publication.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <h4>There's not publications</h4>
          )}
        </div>
      ) : (
        <p>We didn't found the profile</p>
      )}
      <EditProfile/>
    </div>
  ) : (
    <h3>Loading...</h3>
  );
}
