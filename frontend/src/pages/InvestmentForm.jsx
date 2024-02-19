// InvestmentForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Container, Form, Row, Col } from 'react-bootstrap';
import './InvestmentForm.css'; // Import the CSS file here

function InvestmentForm() {
  const [initialInvestment, setInitialInvestment] = useState('10000');
  const [monthly, setMonthly] = useState('1000');
  const [yearly, setYearly] = useState('0');
  const [growth, setGrowth] = useState('8');
  const [yearsOfGrowth, setYearsOfGrowth] = useState('30');
  const [chartData, setChartData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchChartData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/basic_investment/', {
        params: {
          initial_investment: initialInvestment,
          monthly,
          yearly,
          growth,
          years_of_growth: yearsOfGrowth,
        }
      });
      const monthlyResults = response.data.monthly_results;
      const labels = monthlyResults.map((_, index) => {
        const date = new Date();
        date.setMonth(date.getMonth() + index);
        return `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      });
      setChartData({
        labels,
        datasets: [
          {
            label: 'Investment Value Over Time',
            data: monthlyResults,
            fill: true,
            backgroundColor: 'rgba(98, 210, 162, 0.5)',
            borderColor: 'rgba(49, 105, 81, 1)',
          },
        ],
      });
    } catch (error) {
      console.error('There was an error fetching the investment data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [initialInvestment, monthly, yearly, growth, yearsOfGrowth]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#000',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#000',
        },
      },
      y: {
        ticks: {
          color: '#000',
          callback: function(value) {
            return '$' + value;
          },
        },
      },
    },
  };

  return (
    <Container fluid className="mainContainer">
      <Row>
        <h2 className="titleStyle">Basic Investment Calculator</h2>
      </Row>
      <div className="chartAreaStyle">
        {chartData.labels && (
          <div className="chartContainerStyle">
            <Line data={chartData} options={options} />
          </div>
        )}
      </div>
      <div className="formAreaStyle">
      <Form>
          <Row>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Initial Investment:</Form.Label>
              <Form.Control
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
                placeholder="Initial Investment"
                required
              />
            </Form.Group>

            <Form.Group as={Col} className="mb-3">
              <Form.Label>Monthly Investment:</Form.Label>
              <Form.Control
                type="number"
                value={monthly}
                onChange={(e) => setMonthly(e.target.value)}
                placeholder="Monthly Investment"
              />
            </Form.Group>

            <Form.Group as={Col} className="mb-3">
              <Form.Label>Yearly Investment:</Form.Label>
              <Form.Control
                type="number"
                value={yearly}
                onChange={(e) => setYearly(e.target.value)}
                placeholder="Yearly Investment"
              />
            </Form.Group>

            <Form.Group as={Col} className="mb-3">
              <Form.Label>Growth Rate (%):</Form.Label>
              <Form.Control
                type="number"
                value={growth}
                onChange={(e) => setGrowth(e.target.value)}
                placeholder="Growth Rate"
              />
            </Form.Group>

            <Form.Group as={Col} className="mb-3">
              <Form.Label>Years of Growth:</Form.Label>
              <Form.Control
                type="number"
                value={yearsOfGrowth}
                onChange={(e) => setYearsOfGrowth(e.target.value)}
                placeholder="Years of Growth"
                required
              />
            </Form.Group>
          </Row>
        </Form>
      </div>
    </Container>
  );
}

export default InvestmentForm;
