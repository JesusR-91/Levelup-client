import { useState, useEffect } from "react";
import { userInfoService } from "../services/user.services";
import { allPublicationsService } from "../services/publications.services";
import { Link, useNavigate } from "react-router-dom";
import EditProfile from "../components/EditProfile";
import { Card, CardGroup } from "react-bootstrap";
import logo from "../assets/img-removebg-preview.png";

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

          <div style={{ padding: "5vh" }}>

            <div className="profile-distribution">
              <Card style={{ backgroundColor: "lightgrey" }}>
                <div className="profile">

                  <img src={profile.profileImg ? profile.profileImg : logo} alt="Profile-Image" width="125vw"/>

                  <div className= "profile-info">
                    <h3>{profile.username}</h3>
                    <p> Name: {profile.firstName} {profile.lastName}</p>
                    <p>Birth date:{" "} {profile.birthDate !== "Invalid Date" && profile.birthDate.slice(4)} </p>
                    <p>E-mail: {profile.email}</p>
                    <p>Phone: {profile.phoneNum}</p>
                    <EditProfile />
                  </div>
                </div>
              </Card>
              <div>
                <h4>Publications:</h4>

                {publication.length > 0 ? (
                  <CardGroup className="publication-distribution">
                    {publication.map((publication) => (
                      <Card className="publication-card" key={publication._id} >
                        <h5>{publication.owner.username} -{" "} <span>{publication.createdAt}</span></h5>
                        <p>{publication.content}</p>
                      </Card>
                    ))}
                  </CardGroup>
                ) : (
                  <h4>There's not publications</h4>
                )}
              </div>
            </div>
            <div className="friends-card-distribution">
              <h4>Your friends:</h4>
              <Card className="friends-card" >
                {profile.friends.map((friend) => (<Link to={`/user/${friend._id}`} key={friend._id}> {friend.username}</Link>))}
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <p>We didn't found the profile</p>
      )}
    </div>
  ) : (
    <h3>Loading...</h3>
  );
}
