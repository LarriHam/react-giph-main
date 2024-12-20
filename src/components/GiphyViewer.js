import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Dropdown } from "react-bootstrap";
import Search from "./Search";
import ViewTrending from "./ViewTrending";
import Random from "./Random";

const GIPHY_URL = "https://api.giphy.com/v1/gifs";
const API_KEY = "iEsIci56LYyA5KKoELIG52iPoBw28Out";

const GifCard = (props) => {
  return (
    <Card style={{ maxHeight: "20rem" }}>
      <Card.Img
        variant="top"
        src={props.image}
        className="object-fit-cover h-75 pt-2"
      />
      <Card.Body>
        <Card.Title>
          <a href={props.url}>{props.title}</a>
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

const LimitDropDown = (props) => {
  const setLimit = props.setLimit;

  const handleSelect = (eventKey) => {
    setLimit(Number(eventKey));
  };

  // This eventKey attribute is specific to the Dropdown.Item component
  // Not just normal HTML attributes
  // If it were normal HTML, instead of onSelect, we could use the onChange event
  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="success">Result Limit</Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey={20} href="#/action-1">
          15
        </Dropdown.Item>
        <Dropdown.Item eventKey={40} href="#/action-2">
          20
        </Dropdown.Item>
        <Dropdown.Item eventKey={60} href="#/action-3">
          25
        </Dropdown.Item>
        <Dropdown.Item eventKey={80} href="#/action-4">
          30
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
const GiphyViewer = () => {
  const [gifs, setGifs] = useState([]);
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    axios
      .get(`${GIPHY_URL}/trending?api_key=${API_KEY}&limit=${limit}`)
      .then((response) => {
        setGifs(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [limit]);

  return (
    <>
      <Row className="align-items-center" md={4}>
        <Search setGifs={setGifs} />
        <ViewTrending setGifs={setGifs} />
        <Random setGifs={setGifs} />
        <LimitDropDown setLimit={setLimit} />
      </Row>
      <Row xs={1} md={2} lg={3} className="g-4">
        {gifs.map((gif) => (
          <GifCard
            key={gif.id}
            image={gif.images.fixed_width.url}
            title={gif.title}
            url={gif.url}
          />
        ))}
      </Row>
    </>
  );
};

export default GiphyViewer;
