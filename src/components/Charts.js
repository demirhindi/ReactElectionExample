import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import colors from '../data/colors.json';




ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);




const Charts = ({
  selectedCity,
  getVoteResults,
  chartData,
  chartOptions,
  calculateTotalVotes,
  generateTotalChartData,
}) => {
  return (
    <div className='flex text-center flex-wrap'>
      {selectedCity && (
        <div className="popup-container mx-5 ">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3">Bilgi</th>
                  <th className="px-6 py-3">Değer</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-800">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Seçilen Şehir
                  </td>
                  <td className="px-6 py-4">{selectedCity}</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Seçmen Sayısı
                  </td>
                  <td className="px-6 py-4">{getVoteResults(selectedCity)?.[0]?.voters}</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Geçerli Oy Sayısı
                  </td>
                  <td className="px-6 py-4">{getVoteResults(selectedCity)?.[0]?.validVotes}</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Geçerli Oy Oranı
                  </td>
                  <td className="px-6 py-4">{getVoteResults(selectedCity)?.[0]?.validRate}</td>
                </tr>
              </tbody>
            </table>
            <h3>Oy Sonuçları:</h3>
            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope="col" className="px-6 py-3">Aday</th>
                  <th scope="col" className="px-6 py-3">Oy Sayısı</th>
                  <th scope="col" className="px-6 py-3">Oy Oranı</th>
                </tr>
              </thead>
              <tbody>
                {getVoteResults(selectedCity)?.map((result, index) => (
                  <tr key={index}>
                    <td>{result.candidate}</td>
                    <td>{result.votes}</td>
                    <td>{result.validVotesPercentage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="chart-container">
              <Bar data={chartData} options={chartOptions} />
            </div>



          </div>
        </div>
      )}

      <div className="popup-container">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Bilgi</th>
                <th className="px-6 py-3">Değer</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white dark:bg-gray-800">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Türkiye
                </td>
                <td className="px-6 py-4">{calculateTotalVotes().totalVoters}</td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Seçmen Sayısı
                </td>
                <td className="px-6 py-4">{calculateTotalVotes().totalVoters}</td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Geçerli Oy Sayısı
                </td>
                <td className="px-6 py-4">{calculateTotalVotes().totalValidVotes}</td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Geçerli Oy Oranı
                </td>
                <td className="px-6 py-4">{calculateTotalVotes().totalValidRate}</td>
              </tr>
            </tbody>
          </table>
          <h3>Oy Sonuçları:</h3>

          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope="col" className="px-6 py-3">Aday</th>
                <th scope="col" className="px-6 py-3">Oy Sayısı</th>
                <th scope="col" className="px-6 py-3">Oy Oranı</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(calculateTotalVotes().candidateVotes).map(([candidate, votes], index) => (
                <tr key={index}>
                  <td>{candidate}</td>
                  <td>{votes}</td>
                  <td>{calculateTotalVotes().candidatePercentages[candidate]}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="chart-container">
            <Bar data={generateTotalChartData().chartData} options={generateTotalChartData().chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;