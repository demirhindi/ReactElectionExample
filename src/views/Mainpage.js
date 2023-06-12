import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { cities } from '../data/il';
import voteResultsData from "../exampleData.json";
import Maps from '../components/Maps';
import Charts from '../components/Charts';
import vote2018 from '../examplaData2018.json';
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

const Mainpage = () => {
  const position = [39.505, 35.09];
  const [selectedCity, setSelectedCity] = useState(null);

  const customIcon = L.icon({
    iconUrl: './icon.png',
    iconSize: [30, 30],
  });

  const handleCityClick = (e) => {
    setSelectedCity(e.target.feature.properties.NAME);
  };

  const closePopup = () => {
    setSelectedCity(null);
  };



  const getVoteResults = (city) => {
    const result = voteResultsData.results[city];

    if (result) {
      const { voters, validVotes, candidates } = result;

      const updatedResults = candidates.map((candidate) => {
        const color = colors[candidate.candidate] || '#000000'; // Varsayılan renk: siyah
        const validVotesPercentage = validVotes ? ((candidate.votes / validVotes) * 100).toFixed(2) + "%" : "";
        const validRate = validVotes ? ((validVotes / voters) * 100).toFixed(2) + "%" : "";

        return {
          ...candidate,
          voters,
          validVotes,
          participationStatus: "Katıldı",
          color: color,
          validVotesPercentage: validVotesPercentage,
          validRate: validRate,


        };
      });

      return updatedResults;
    }

    return [];
  };


  const calculateTotalVotes = () => {
    let totalVoters = 0;
    let totalValidVotes = 0;
    let candidateVotes = {};

    Object.values(voteResultsData.results).forEach((cityResult) => {
      totalVoters += cityResult.voters;
      totalValidVotes += cityResult.validVotes;

      cityResult.candidates.forEach((candidate) => {
        if (candidateVotes.hasOwnProperty(candidate.candidate)) {
          candidateVotes[candidate.candidate] += candidate.votes;
        } else {
          candidateVotes[candidate.candidate] = candidate.votes;
        }
      });
    });

    const totalValidRate = ((totalValidVotes / totalVoters) * 100).toFixed(2) + "%";

    const candidatePercentages = {};
    Object.keys(candidateVotes).forEach((candidate) => {
      const percentage = ((candidateVotes[candidate] / totalValidVotes) * 100).toFixed(2) + "%";
      candidatePercentages[candidate] = percentage;
    });

    return {
      totalVoters,
      totalValidVotes,
      totalValidRate,
      candidateVotes,
      candidatePercentages,
    };
  };


  const getMaxVotesColor = (city) => {
    const voteResults = getVoteResults(city);
    let maxVotes = 0;
    let maxVotesColor = '#000000'; // Varsayılan renk: siyah

    voteResults.forEach((result) => {
      if (result.votes > maxVotes) {
        maxVotes = result.votes;
        maxVotesColor = result.color;
      }
    });

    return maxVotesColor;
  };

  const mapStyle = (feature) => {
    const city = feature.properties.NAME;
    const maxVotesColor = getMaxVotesColor(city);

    return {
      fillColor: maxVotesColor,
      color: '#ffffff',
      weight: 2,
      fillOpacity: 0.6,

    };
  };

  const chartData = {
    labels: getVoteResults(selectedCity).map((result) => result.candidate),
    datasets: [
      {
        label: 'Oy Sayısı',
        data: getVoteResults(selectedCity).map((result) => result.votes),
        backgroundColor: getVoteResults(selectedCity).map((result) => result.color),
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };



  const chartOptions = {
    scales: {
      y: {

        beginAtZero: true,
      },
    },
  };

  const generateTotalChartData = () => {
    const { candidateVotes, candidatePercentages } = calculateTotalVotes();

    const chartData = {
      labels: Object.keys(candidateVotes),
      datasets: [
        {
          label: 'Oy Sayısı',
          data: Object.values(candidateVotes),
          backgroundColor: Object.keys(candidateVotes).map((candidate) => colors[candidate] || '#000000'),
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };

    const chartOptions = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    return { chartData, chartOptions };
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className=" text-black py-4 ">Seçim Sonuçları Örnek Proje</h1>

      <div className="w-full aspect-w-3">
        <Maps
          position={position}
          customIcon={customIcon}
          mapStyle={mapStyle}
          handleCityClick={handleCityClick}
          selectedCity={selectedCity}
        />
      </div>

      <div className="w-full mt-8 justify-center flex">
        <Charts
          selectedCity={selectedCity}
          getVoteResults={getVoteResults}
          chartData={chartData}
          chartOptions={chartOptions}
          calculateTotalVotes={calculateTotalVotes}
          generateTotalChartData={generateTotalChartData}
        />
      </div>

      {selectedCity && (
        <button
          onClick={closePopup}
          className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-lg"
        >
          Kapat
        </button>
      )}
    </div>



  )
}

export default Mainpage