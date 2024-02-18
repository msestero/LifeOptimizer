// import React, { useState } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';

// function InvestmentForm() {
//   const [initialInvestment, setInitialInvestment] = useState('');
//   const [monthly, setMonthly] = useState('');
//   const [yearly, setYearly] = useState('');
//   const [growth, setGrowth] = useState('');
//   const [yearsOfGrowth, setYearsOfGrowth] = useState('');
//   const [chartData, setChartData] = useState({});

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await axios.get('http://localhost:8000/basic_investment/', {
//         params: {
//           initial_investment: initialInvestment,
//           monthly,
//           yearly,
//           growth,
//           years_of_growth: yearsOfGrowth,
//         }
//       });
//       const monthlyResults = response.data.monthly_results;
//       setChartData({
//         labels: monthlyResults.map((_, index) => `Month ${index + 1}`),
//         datasets: [
//           {
//             label: 'Investment Value Over Time',
//             data: monthlyResults,
//             fill: false,
//             backgroundColor: 'rgb(75, 192, 192)',
//             borderColor: 'rgba(75, 192, 192, 0.2)',
//           },
//         ],
//       });
//     } catch (error) {
//       console.error('There was an error fetching the investment data:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Investment Calculator</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>
//             Initial Investment:
//             <input
//               type="number"
//               value={initialInvestment}
//               onChange={(e) => setInitialInvestment(e.target.value)}
//               placeholder="Initial Investment"
//               required
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             Monthly Investment:
//             <input
//               type="number"
//               value={monthly}
//               onChange={(e) => setMonthly(e.target.value)}
//               placeholder="Monthly Investment"
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             Yearly Investment:
//             <input
//               type="number"
//               value={yearly}
//               onChange={(e) => setYearly(e.target.value)}
//               placeholder="Yearly Investment"
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             Growth Rate (%):
//             <input
//               type="number"
//               value={growth}
//               onChange={(e) => setGrowth(e.target.value)}
//               placeholder="Growth Rate"
//               step="0.01"
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             Years of Growth:
//             <input
//               type="number"
//               value={yearsOfGrowth}
//               onChange={(e) => setYearsOfGrowth(e.target.value)}
//               placeholder="Years of Growth"
//               required
//             />
//           </label>
//         </div>
//         <button type="submit">Calculate</button>
//       </form>

//       {chartData.labels && (
//         <div>
//           <h3>Investment Growth Over Time</h3>
//           <Line data={chartData} options={{ responsive: true }} />
//         </div>
//       )}
//     </div>
//   );
// }

// export default InvestmentForm;
