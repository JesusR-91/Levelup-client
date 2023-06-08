//IMPORTS
import { useState, useEffect } from "react";
import {addFriendService, deleteFriendService, friendInfoService, userInfoService} from "../services/user.services";
import { allPublicationsService } from "../services/publications.services";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardGroup } from "react-bootstrap";
import logo from "../assets/img-removebg-preview.png";

export default function UserInfo() {
  //STATE
  const [activeUser, setActiveUser] = useState();
  const [profile, setProfile] = useState(null);
  const [publications, setPublications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const navigate = useNavigate();
  const { userId } = useParams();

  //FUNCTIONS
  const getData = async () => {
    try {
      const userProfile = await friendInfoService(userId);
      const allUserPublications = await allPublicationsService();
      const currentUser = await userInfoService();
      setActiveUser(currentUser.data);
      setProfile(userProfile.data);
      setPublications(allUserPublications.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const addUser = async (userId) => {
    setIsLoading(true);
    await addFriendService(userId);
    setReload(!reload);
    setIsLoading(false);
  };

  const deleteFriend = async (userId) => {
    setIsLoading(true);
    await deleteFriendService(userId);
    setReload(!reload);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, [reload]);


  return !isLoading ? (
    <div>
      {profile ? (
        <div key={profile._id}>

        <div style={{padding:"3vh 3vh 0 3vh", display:"flex", justifyContent:"flex-end"}}>
            {!activeUser.friends.map((e) => e._id).includes(profile._id) && (<Button onClick={() => {addUser(profile._id);}}>Add friend</Button>)}
            {activeUser.friends.map((e) => e._id).includes(profile._id) && (<Button onClick={() => {deleteFriend(profile._id)}}>Delete friend</Button>)}
        </div>

          <div style={{ padding: "5vh" }}>

            <div className="profile-distribution">
              <Card style={{maxHeight:"25vh" }}>
                <div className="profile">
                  
                  <img src={profile.profileImg ? profile.profileImg : logo} alt="Profile-Image" width="125vw"/>
                  
                  <div className="profile-info">
                    <h3>{profile.username}</h3>

                    <p>{profile.firstName} {profile.lastName}</p>

                    <span>Birth date: {profile.birthDate}</span>
                    <p>E-mail: {profile.email}</p>
                    <p>Phone: {profile.phoneNum}</p>

                  </div>
                </div>
              </Card>
              <div>
                <h4>Publications:</h4>
                {publications.length > 0 ? (
                  <div>
                    <CardGroup className="publication-distribution">
                      {publications.map((publication) => (
                        <Card className="publication-card" key={publication._id}>
                          <h5>{publication.owner.username} -{" "}<span>{publication.createdAt}</span></h5>
                          <p>{publication.content}</p>
                        </Card>
                      ))}
                    </CardGroup>
                      </div>
                    ) : (
                      <h4>There's not publications</h4>
                    )}
                  </div>
              </div>
            </div>
            <br />
          <div className="friends-card-distribution">
            <h4>Friends of {profile.username}</h4>
            <Card className="friends-card">
              {profile.friends.length >0 ? profile.friends.map(friend => (<Link to={`/user/${friend._id}`} key={friend._id}>{friend.username}</Link>)): <p>You have no friends</p>}
            </Card>
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
