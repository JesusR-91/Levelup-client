import { useState } from "react";
import { newValuationService } from "../services/valuation.services";

export default function CreateValuation(props) {
  const [owner, setOwner] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { children } = props;
  const filledStars = Math.round(children);
  const emptyStars = 5 - filledStars;

  const handleOwnerInput = ({ target }) => {
    setOwner(target.value);
  };
  const handleContentInput = ({ target }) => {
    setContent(target.value);
  };

  const handleSubmit = async () => {
    try {
      await newValuationService({ owner, content });
    } catch (error) {
      console.log(error);
    }
  };
  return !isLoading ? (
    <div>
      <form onSubmit={handleSubmit}>
      <div>
          {"★".repeat(filledStars)}
          {"☆".repeat(emptyStars)}
        </div>
        <div>

          <label>Name</label>
          <input
            type="text"
            name="owner"
            onChange={handleOwnerInput}
            value={owner}
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

        <button>Create!</button>
      </form>
    </div>
  ) : (
    <h3>Loading...</h3>
  );
}
