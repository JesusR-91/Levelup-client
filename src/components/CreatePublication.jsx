import { useContext, useState } from "react";
import { newPublicationService } from "../services/publications.services";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { ThemeContext } from "../context/theme.context";
import { PuffLoader } from "react-spinners";

export default function CreatePublication({ getData }) {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { buttonTheme } = useContext(ThemeContext);

  const navigate = useNavigate();

  const handleContentInput = ({ target }) => {
    setContent(target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await newPublicationService(content);
      getData();
      setContent("");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  return !isLoading ? (
    <div style={{ padding: "5vh" }}>
      <Form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "2vh" }}>
        <Form.Group>
          <Form.Control type="textarea" name="content" onChange={handleContentInput} value={content} placeholder="What are you thinking about?" style={{ width: "50vw", height: "6vh" }} />
        </Form.Group>
        <Button className={buttonTheme} type="submit">
          Create!
        </Button>
      </Form>
    </div>
  ) : (
    <div className="spinners">
      <PuffLoader color="white" size={120} />
    </div>
  );
}