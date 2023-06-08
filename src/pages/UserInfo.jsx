//IMPORTS
import { useState, useEffect } from "react";
import {
  addFriendService,
  deleteFriendService,
  friendInfoService,
  userInfoService,
} from "../services/user.services";
import { allPublicationsService } from "../services/publications.services";
import { useNavigate, useParams } from "react-router-dom";
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

  activeUser && console.log(activeUser.friends);

  return !isLoading ? (
    <div>
      {profile ? (
        <div key={profile._id}>
          <div style={{ padding: "5vh" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "space-between",
                gap: "2vw",
              }}
            >
              <Card style={{ backgroundCOlor: "lightgrey" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "5vw",
                  }}
                >
                  <img
                    src={profile.profileImg ? profile.profileImg : logo}
                    alt="Profile-Image"
                    width="125vw"
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      minWidth: "20vw",
                      paddingLeft: "2vw",
                    }}
                  >
                    <h3>{profile.username}</h3>
                    {!activeUser.friends
                      .map((e) => e._id)
                      .includes(profile._id) && (
                      <button
                        onClick={() => {
                          addUser(profile._id);
                        }}
                      >
                        Add friend
                      </button>
                    )}

                    <p>
                      {profile.firstName} {profile.lastName}
                    </p>
                    <span>Birth date: {profile.birthDate}</span>
                    <p>E-mail: {profile.email}</p>
                    <p>Phone: {profile.phoneNum}</p>
                    {activeUser.friends
                      .map((e) => e._id)
                      .includes(profile._id) && (
                      <Button
                        onClick={() => {
                          deleteFriend(profile._id);
                        }}
                      >
                        Delete friend
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </div>
            <br />
            {publications.length > 0 ? (
              <div>
                <h4>Publications:</h4>
                <CardGroup
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "5vh",
                    padding: "2vh",
                    flexDirection: "column",
                  }}
                >
                  {publications.map((publication) => (
                    <Card
                      key={publication._id}
                      style={{
                        backgroundColor: "lightgrey",
                        padding: "2vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <h5>
                        {publication.owner.username} -{" "}
                        <span>{publication.createdAt}</span>
                      </h5>
                      <p>{publication.content}</p>
                    </Card>
                  ))}
                </CardGroup>
              </div>
            ) : (
              <h4>There's not publications</h4>
            )}
          </div>
          <div
            style={{
              padding: "8vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h4>Friends of {profile.username}</h4>
            <Card
              style={{
                backgroundColor: "lightgrey",
                padding: "2vh",
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "center",
                maxWidth: "40vw",
              }}
            >
              {profile.friends.map((friend) => (
                <p key={friend.id}>{friend.username}</p>
              ))}
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
