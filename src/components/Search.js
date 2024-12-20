import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";

const Search = (props) => {
  const setGifs = props.setGifs;
  const [searchTerm, setSearchTerm] = useState("");

  const GIPHY_URL = "https://api.giphy.com/v1/gifs";
  const API_KEY = "iEsIci56LYyA5KKoELIG52iPoBw28Out";

  const searchGifs = () => {
    if (!searchTerm) {
      alert("Please enter a search term");
      return;
    }

    axios
      .get(`${GIPHY_URL}/search?api_key=${API_KEY}&q=${searchTerm}`)
      .then((response) => {
        setGifs(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = () => {
    searchGifs();
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      searchGifs();
    }
  };

  return (
    <div className="my-4">
      <input
        onKeyUp={handleKeyUp}
        type="text"
        value={searchTerm}
        onChange={handleChange}
      />
      <Button className="ms-2" variant="primary" onClick={handleClick}>
        Search
      </Button>
    </div>
  );
};

export default Search;
