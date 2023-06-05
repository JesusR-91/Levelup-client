import { useState } from "react";
import { newValuationService } from "../services/valuation.services";
import { useParams } from "react-router-dom";

export default function CreateValuation() {

  //STATES
  const [content, setContent] = useState("");
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const {gameId} = useParams();
  console.log(gameId)



  const handleContentInput = ({ target }) => {
    setContent(target.value);
  };
  const handleValueInput = ({ target }) => {
    setValue(target.value);
  };
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await newValuationService(gameId, content, value);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return !isLoading ? (
    <div>
    <h3>New valuation:</h3>
     <form onSubmit={handleSubmit}>
      
        <div>
          <label>Note</label>
          <input
            type="number"
            name="value"
            onChange={handleValueInput}
            value={value}
            min="0" max="5"
          />
        </div>
        <br />
        <div>
          <label>Description</label>
          <input
            type="textarea"
            name="content"
            onChange={handleContentInput}
            value={content}
          />
        </div>
        <br />
        <button>Create!</button>
      </form>
    </div>
  ) : (
    <h3>Loading...</h3>
  );
}
