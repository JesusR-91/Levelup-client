import { useState, useEffect, useContext } from "react";
import { userInfoService } from "../services/user.services";
import { allPublicationsService } from "../services/publications.services";
import { Link, useNavigate } from "react-router-dom";
import EditProfile from "../components/EditProfile";
import { Card, CardGroup } from "react-bootstrap";
import logo from "../assets/img-removebg-preview.png";
import { ThemeContext } from "../context/theme.context";
import { PuffLoader } from "react-spinners";


export default function Profile() {
  //STATES
  const [profile, setProfile] = useState(null);
  const [publication, setPublication] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const {cardTheme} = useContext (ThemeContext);
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

            <div className="profile-distribution" >
              <Card className={cardTheme}>
                <div className="profile">

                  <img src={profile.profileImg ? profile.profileImg : logo} alt="Profile-Image" width="125vw"/>

                  <div className= "profile-info">
                    <h3>{profile.username}</h3>
                    <p> Name: {profile.firstName} {profile.lastName}</p>
                    <p>Birth date:{" "} {profile.birthDate !== "Invalid Date" && profile.birthDate.slice(4)} </p>
                    <p>E-mail: {profile.email}</p>
                    <p>Phone: {profile.phoneNum}</p>
                    <EditProfile getData={getData}/>
                  </div>
                </div>
              </Card>
              <div>
                <h4>Publications:</h4>

                {publication.length > 0 ? (
                  <CardGroup className="publication-distribution">
                    {publication.map((publication) => (
                      <Card className={`${cardTheme} publication-card`} style={{minWidth:"20vw", maxWidth:"30vw"}} key={publication._id} >
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

            <h4>Your friends:</h4>
            {profile.friends.length > 0? (
              <div className="friends-card-distribution">
                <Card className={`${cardTheme} friends-card`} >
                  {profile.friends.map((friend) => (<Link to={`/user/${friend._id}`} key={friend._id}> {friend.username}</Link>))}
                </Card>
              </div>
            ): <h3>You have no friends</h3>}
          </div>
        </div>
      ) : (
        <p>We didn't found the profile</p>
      )}
    </div>
  ) : (
    <div className="spinners">
      <PuffLoader color="white" size={120} />
    </div>
  );
}
