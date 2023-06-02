import { useState, useEffect } from "react";
import { userInfo } from "../services/user.services";
import { allPublications } from "../services/publications.services";
import { useNavigate} from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [publication, setPublication] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  console.log(profile);

  const getData = async () => {
    try {
      const activeUserProfile = await userInfo();
      const allPublication = await allPublications();
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
        </div>
      ) : (
        <p>No se encontró perfil.</p>
      )}
    </div>
  ) : (
    <h3>Loading...</h3>
  );
}
