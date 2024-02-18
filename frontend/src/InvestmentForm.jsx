import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import './InvestmentForm.css'; // Ensure this path matches the location of your CSS file

function InvestmentForm() {
  const [initialInvestment, setInitialInvestment] = useState('10000');
  const [monthly, setMonthly] = useState('1000');
  const [yearly, setYearly] = useState('0');
  const [growth, setGrowth] = useState('0.08');
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
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return `${month} ${year}`;
      });

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Investment Value Over Time',
            data: monthlyResults,
            fill: false,
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgba(75, 192, 192, 0.2)',
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
    fetchChartData(); // Fetch chart data on component mount and when input values change
  }, [initialInvestment, monthly, yearly, growth, yearsOfGrowth]); // Dependency array


  const handleSubmit = async (event) => {
    event.preventDefault();
    fetchChartData();
  };

  return (
    <div className="main-container">
      <h2 className="title">Investment Calculator</h2>
      <div className="content-container">
        <form onSubmit={handleSubmit} className="form-container">
          <label>
            Initial Investment:
            <input
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
              placeholder="Initial Investment"
              required
              className="input-field"
            />
          </label>
          <label>
            Monthly Investment:
            <input
              type="number"
              value={monthly}
              onChange={(e) => setMonthly(e.target.value)}
              placeholder="Monthly Investment"
              className="input-field"
            />
          </label>
          <label>
            Yearly Investment:
            <input
              type="number"
              value={yearly}
              onChange={(e) => setYearly(e.target.value)}
              placeholder="Yearly Investment"
              className="input-field"
            />
          </label>
          <label>
            Growth Rate (%):
            <input
              type="number"
              value={growth}
              onChange={(e) => setGrowth(e.target.value)}
              placeholder="Growth Rate"
              step="0.01"
              className="input-field"
            />
          </label>
          <label>
            Years of Growth:
            <input
              type="number"
              value={yearsOfGrowth}
              onChange={(e) => setYearsOfGrowth(e.target.value)}
              placeholder="Years of Growth"
              required
              className="input-field"
            />
          </label>
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Calculating...' : 'Calculate'}
          </button>
        </form>

        {chartData.labels && (
          <div className="graph-container">
            <Line data={chartData} options={{ responsive: true }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default InvestmentForm;
