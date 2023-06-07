import { useState, useEffect } from "react";
import { userInfoService } from "../services/user.services";
import { allPublicationsService } from "../services/publications.services";
import { Link, useNavigate } from "react-router-dom";
import EditProfile from "../components/EditProfile";
import { Button, Card, CardGroup  } from "react-bootstrap";

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
          <div style={{padding:"5vh"}}>
            <Card style={{backgroundColor:"lightgrey", margin:"0 15vw"}}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10vw"}}>
                <img src={profile.profileImg} alt="Profile-Image" width="200px" />
                <div style={{display:"flex", flexDirection:"column", justifyContent:"flex-start", alignItems:"center"}}>
                  <h3>{profile.username}</h3>
                  <p>
                    {profile.firstName} {profile.lastName}
                  </p>
                  <span>Birth date: {profile.birthDate}</span>
                  <p>
                    E-mail: {profile.email} - <span>Phone: {profile.phoneNum}</span>
                  </p>
                <EditProfile/>
                </div>  
              </div>
            </Card>
            <div style={{padding:"2vh"}}>
              <h4>Your friends:</h4>
              {profile.friends.map((friend) => (
                <Link to={`/user/${friend._id}`} key={friend._id}>{friend.username}</Link>
              ))}
            </div>
          </div>

          <br />
          
          <div>
            <h4>Publications:</h4>
            {publication.length > 0 ? (
            <CardGroup style={{display:"flex", flexWrap:"wrap", gap:"5vh", padding:"2vh"}}>
                {publication.map((publication) => (
                  <Card key={publication._id} style={{backgroundColor:"lightgrey", padding:"2vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <h5>
                      {publication.owner.username} -{" "}
                      <span>{publication.createdAt}</span>
                    </h5>
                    <p>{publication.content}</p>
                  </Card>
                ))}
            </CardGroup>
            ) : (<h4>There's not publications</h4>)}
          </div>

        </div>) : (<p>We didn't found the profile</p>)}
        
  </div>
  ) : (
    <h3>Loading...</h3>
  );
}
