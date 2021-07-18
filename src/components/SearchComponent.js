import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Col,
  Input,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardText,
  InputGroup,
  ListGroup,
  Progress,
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Table,
  InputGroupAddon,
} from "reactstrap";
import { getPlanetsRequest } from "../redux/Apis";

const Search = () => {
  const [planets, setPlanets] = useState([]);
  const [totalPopulation, setTotalPopulation] = useState(0);
  const [planetDetails, setPlanetsDetails] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    searchPlaces("", true);
  }, []);

  const searchPlaces = useCallback(async (search, defaultCall) => {
    const searchKeyword = search.trim();
    if (searchKeyword || defaultCall) {
      const res = await getPlanetsRequest(searchKeyword);
      if (res) {
        setPlanets(res);
        let localTotalPopulation = 0;
        if (res.length) {
          for (let i = 0; i < res.length; i++) {
            const element = res[i];
            if (element.population && element.population !== "unknown") {
              localTotalPopulation += parseFloat(element.population);
            }
          }
        }

        setTotalPopulation(localTotalPopulation);
      }
    } else {
      setPlanets([]);
      setTotalPopulation(0);
    }
  });

  const toggle = useCallback(() => {
    setShowModal(!showModal);
  });

  const renderPlanets = useCallback((planets) => {
    const usablePlanets = planets.filter(
      (planet) => planet.name !== "unknown" && planet.population !== "unknown"
    );
    usablePlanets.sort(
      (a, b) => parseFloat(b.population) - parseFloat(a.population)
    );
    return usablePlanets.map((planet, index) => {
      const persentage = ((planet.population * 100) / totalPopulation).toFixed(
        3
      );
      return (
        <Card key={planet.name} className="mt-2">
          <CardBody>
            <CardTitle style={{ marginBottom: 4, fontSize: 24 }}>
              <b>{planet.name}</b>
            </CardTitle>
            <CardText style={{ marginBottom: 2 }}>
              <b>{planet.name}</b> is made of mostly <b>{planet.terrain}</b> and
              has gravity of{" "}
              <b>
                {planet.gravity && planet.gravity !== "N/A"
                  ? planet.gravity
                  : "1 standard"}
              </b>
              .
            </CardText>
            <CardText style={{ marginBottom: 2 }}>
              It has population of <b>{planet.population}</b> which is{" "}
              <b>{persentage}%</b> of total population from current list.
            </CardText>
            <Progress value={Math.ceil(persentage)} style={{ marginTop: 4 }} />
            <button
              className="btn btn-info mt-2"
              onClick={() => {
                setShowModal(true);
                setPlanetsDetails(planet);
              }}
            >
              View Details
            </button>
          </CardBody>
        </Card>
      );
    });
  });

  return (
    <Container>
      <Row>
        <Col></Col>
      </Row>
      <Row>
        <Col xs="0" sm="1"></Col>
        <Col xs="12" sm="10" md="10">
          <InputGroup>
            <Input
              type="text"
              name="searchKeyword"
              placeholder={"Search For Planets"}
              onChange={useCallback((e) => searchPlaces(e.target.value), [])}
            />
            <InputGroupAddon addonType="append">
              <Button color="secondary">Search</Button>
            </InputGroupAddon>
          </InputGroup>
        </Col>
        <Col sm="4"></Col>
      </Row>
      <br />
      <Row>
        <Col xs="0" sm="1" md="1"></Col>
        <Col xs="12" sm="10" md="10">
          <ListGroup>{renderPlanets(planets)}</ListGroup>
        </Col>
        <Col xs="0" sm="1" md="1"></Col>
        {planetDetails ? (
          <Modal isOpen={showModal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Planet Detail</ModalHeader>
            <ModalBody>
              <Table>
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td>{planetDetails.name}</td>
                  </tr>
                  <tr>
                    <th>Surface Water (in %)</th>
                    <td>{planetDetails.surface_water}</td>
                  </tr>
                  <tr>
                    <th>Gravity</th>
                    <td>{planetDetails.gravity}</td>
                  </tr>
                  <tr>
                    <th>Orbital Period</th>
                    <td>{planetDetails.orbital_period}</td>
                  </tr>
                  <tr>
                    <th>Diameter</th>
                    <td>{planetDetails.diameter}</td>
                  </tr>
                  <tr>
                    <th>Population</th>
                    <td>{planetDetails.population}</td>
                  </tr>
                </tbody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggle}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
        ) : null}
      </Row>
    </Container>
  );
};

export default Search;
