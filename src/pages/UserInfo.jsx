//IMPORTS
import { useState, useEffect, useContext } from "react";
import {addFriendService, deleteFriendService, friendInfoService, userInfoService} from "../services/user.services";
import { friendsPublicationService } from "../services/publications.services";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardGroup } from "react-bootstrap";
import { ThemeContext } from "../context/theme.context";
import { PuffLoader } from "react-spinners";

//IMGS
import logo from "../assets/img-removebg-preview.png";
import addFriendLogoDark from "../assets/icons8-add-friend-light-64.png";
import addFriendLogoLight from "../assets/icons8-add-friend-dark-64.png";
import deleteFriendLogoDark from "../assets/icons8-unfriend-dark-48.png";
import deleteFriendLogoLight from "../assets/icons8-unfriend-light-48.png";



export default function UserInfo() {
  //STATE
  const [activeUser, setActiveUser] = useState();
  const [profile, setProfile] = useState(null);
  const [publications, setPublications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const {isDarkMode, buttonTheme, cardTheme} = useContext (ThemeContext);
  const navigate = useNavigate();
  const { userId } = useParams();

  //FUNCTIONS
  const getData = async () => {
    try {
      const userProfile = await friendInfoService(userId);
      const allUserPublications = await friendsPublicationService();
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
        <div style={{display:"flex", justifyContent:"flex-start", padding:"2vh"}}>
            {!activeUser.friends.map((e) => e._id).includes(profile._id) ? 
            (<Button onClick={() => {addUser(profile._id);}} style={{backgroundColor:"transparent", borderColor:"transparent"}}> <img src={isDarkMode ? addFriendLogoDark : addFriendLogoLight} alt="add-friend" style={{width:"50px"}}/> </Button>) : 
            (<Button style={{backgroundColor:"transparent", borderColor:"transparent"}} onClick={() => {deleteFriend(profile._id)}}><img src={isDarkMode ? deleteFriendLogoDark : deleteFriendLogoLight} alt="add-friend" style={{width:"50px"}}/></Button>)}
        </div>

          <div style={{ padding: "5vh" }}>

            <div className="profile-distribution">
              <Card>
                <div className={`${cardTheme} profile`}>
                  
                  <img src={profile.profileImg ? profile.profileImg : logo} alt="Profile-Image" width="125vw"/>
                  
                  <div className="profile-info">
                    <h3>{profile.username}</h3>

                    <p>Name:</p><p>{profile.firstName} {profile.lastName}</p>

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
                        <Card className={`${cardTheme} publication-card`} key={publication._id}>
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
            <Card className={`${cardTheme} friends-card`}>
              {profile.friends.length >0 ? profile.friends.map(friend => (<Link to={`/user/${friend._id}`} key={friend._id}>{friend.username}</Link>)): <p>You have no friends</p>}
            </Card>
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
