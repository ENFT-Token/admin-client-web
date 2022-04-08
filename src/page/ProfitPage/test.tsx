import React from 'react'
import { Line } from '@ant-design/plots';

export default function ProfitPage() {
  const data = [
    { Month: '1', value: 3 },
    { Month: '2', value: 4 },
    { Month: '3', value: 3.5 },
    { Month: '4', value: 5 },
    { Month: '5', value: 4.9 },
    { Month: '6', value: 6 },
    { Month: '7', value: 7 },
    { Month: '8', value: 9 },
    { Month: '9', value: 10 },
    { Month: '10', value: 20 },
    { Month: '11', value: 25 },
    { Month: '12', value: 15 },
    { Month: '13', value: 23 },
    { Month: '14', value: 13 },
    { Month: '15', value: 5 },
    { Month: '16', value: 10 },
    { Month: '17', value: 12 },
    { Month: '18', value: 16 },
    { Month: '19', value: 10 },
    { Month: '20', value: 20 },
    { Month: '21', value: 23 },
    { Month: '22', value: 24 },
    { Month: '23', value: 26 },
    { Month: '24', value: 28 },
    { Month: '25', value: 31 },
    { Month: '26', value: 40 },
    { Month: '27', value: 50 },
    { Month: '28', value: 60 },
    { Month: '29', value: 70 },
    { Month: '30', value: 75 },
    { Month: '31', value: 80 },
  ];

  const config = {
    data,
    width: 700,
    height: 300,
    autoFit: false,
    xField: 'Month',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
  };

  let chart:any;

  // Export Image
  const downloadImage = () => {
    chart?.downloadImage();
  };

  // Get chart base64 string
  const toDataURL = () => {
    console.log(chart?.toDataURL());
  };

  return (
    <div>
      <button type="button" onClick={downloadImage} style={{ marginRight: 24 }}>
        Export Image
      </button>
      <button type="button" onClick={toDataURL}>
        Get base64
      </button>
      <Line {...config} onReady={(chartInstance:any) => (chart = chartInstance)} />
    </div>
  );
}





