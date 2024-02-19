import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import './home.css'; // Keep your CSS for additional styling

function Home() {
  return (
    <Container className="home-container">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <section className="motto-section mb-4">
            <h2>Our Motto</h2>
            <p>"Empowering Your Financial Independence."</p>
          </section>

          <section className="goals-section mb-4">
            <h2>Our Goals</h2>
            <p>To provide intuitive, accessible financial tools that help individuals understand and manage their investments, retirement, and taxes.</p>
          </section>

          <section className="tools-section mb-4">
            <h2>Our Tools</h2>
            <ListGroup>
              <ListGroup.Item><Link to="/basic_investment_calc">Basic Investment Calculator</Link></ListGroup.Item>
              <ListGroup.Item>Chained Basic Investment Calculator (Coming Soon)</ListGroup.Item>
              <ListGroup.Item>Retirement Calculator (Coming Soon)</ListGroup.Item>
              <ListGroup.Item>Expenses Calculator (Coming Soon)</ListGroup.Item>
              <ListGroup.Item>Monte Carlo Simulation (Coming Soon)</ListGroup.Item>
              <ListGroup.Item>401k, Roth, and Tax Tools (Coming Soon)</ListGroup.Item>
            </ListGroup>
          </section>

          <section className="expansion-plans-section">
            <h2>Our Plans to Expand</h2>
            <p>We are constantly working to expand our suite of tools to include comprehensive calculators and educational resources for a wide range of financial planning needs, including advanced investment strategies, retirement planning, and tax optimization.</p>
          </section>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
