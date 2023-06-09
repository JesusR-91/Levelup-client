//IMPORTS
import { useContext, useEffect, useState } from "react";
import CreateGroupForm from "../../components/group/CreateGroupForm";
import { Link, useNavigate } from "react-router-dom";
import { groupListService, ownGroupListService } from "../../services/group.services";
import { Card, CardGroup, Col } from "react-bootstrap";
import { PuffLoader } from "react-spinners";
import { ThemeContext } from "../../context/theme.context";

export default function GroupList() {
  //STATES
  const [ownGroups, setOwnGroups] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //OTHER VAR
  const {cardTheme} = useContext(ThemeContext);
  const navigate = useNavigate();

  //FUNCTIONS
  const getData = async () => {
    try {
      const ownResponse = await ownGroupListService();
      const groupResponse = await groupListService();
      setOwnGroups(ownResponse.data);
      setGroups(groupResponse.data);
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
      <div style={{padding:"3vh 3vh 3vh 3vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
      <CreateGroupForm getData={getData}/>
      </div>

      <CardGroup style={{gap:"25vw"}}>
        <Col md={4} style={{ maxHeight: "200vh"}}>
          <div style={{display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center"}}>
            <h3>Your groups</h3>
            {ownGroups.map((group, index) => (
              <Card className={cardTheme}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "row",
                  justifyContent: "center",
                  padding: "3vw",
                  margin: "3vw",
                  minWidth:"35vw",
                  maxWidth:"35vw"
                }}
                key={index}
              >
                <div>
                  <h3>
                    <Link to={`/group/${group._id}/details`}>{group.name}</Link>
                  </h3>
                    <h4>Users:</h4>
                  <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"center", alignItems:"center"}}>
                    {group.participants.map((user) => (
                      <Link
                        to={`/user/${user._id}`}
                        key={user._id}
                        style={{ textDecoration: "none" }}
                      >
                        {user.username}
                      </Link>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Col>
        <Col md={4} style={{ maxHeight: "65vh" }}>
          <div style={{display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center"}}>
            <h3>Other groups</h3>
            {groups.map((group, index) => (
              <Card className={cardTheme}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "row",
                  justifyContent: "center",
                  padding: "3vw",
                  margin: "3vw",
                  minWidth:"35vw",
                  maxWidth:"35vw"
                }}
                key={index}
              >
                <div>
                  <h3>
                    <Link to={`/group/${group._id}/details`}>{group.name}</Link>
                  </h3>
                  <div>
                    <h4>Users:</h4>
                    {group.participants.map((user) => (
                      <Link
                        to={`/user/${user._id}`}
                        key={user._id}
                        style={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"center", alignItems:"center", textDecoration:"none"}}
                      >
                        {user.username}
                      </Link>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Col>
      </CardGroup>
    </div>
  ) : (
    <div className="spinners">
      <PuffLoader color="white" size={120} />
    </div>
  );
}