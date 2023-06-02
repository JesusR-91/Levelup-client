import { useState, useEffect } from "react";
import { userInfoService } from "../services/user.services";
import { allPublicationsService } from "../services/publications.services";
import { useNavigate, useParams } from "react-router-dom";

export default function UserInfo() {
  const [profile, setProfile] = useState(null);
  const [publications, setPublications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { userId } = useParams();
  const getData = async () => {
    try {
      const userProfile = await userInfo(userId);
      const allUserPublications = await allPublications();
      setProfile(userProfile.data);
      setPublications(allUserPublications.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };
  console.log(profile);

  useEffect(() => {
    getData();
  }, [userId]);

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
            <h4>Friends of {profile.username}</h4>
            {profile.friends.map((friend) => (
              <p key={friend.id}>{friend.username}</p>
            ))}
          </div>
          <br />
          {publications.length > 0 ? (
            <div>
              <h4>Publications:</h4>
              {publications.map((publication) => (
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
    </div>
  ) : (
    <h3>Loading...</h3>
  );
}
