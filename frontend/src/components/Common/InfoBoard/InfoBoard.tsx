import React from 'react';
import './InfoBoard.scss';

interface InfoMessage {
  id: number;
  image: string;
  title: string;
  message: string;
}

const infoMessages: InfoMessage[] = [
  {
    id: 1,
    image: 'https://placehold.co/48x48?text=UM',
    title: 'Urząd Miasta',
    message: 'W dniach 15–18 lipca ul. Główna będzie zamknięta z powodu remontu.',
  },
  {
    id: 2,
    image: 'https://placehold.co/48x48?text=SM',
    title: 'Straż Miejska',
    message: 'Prosimy o nieparkowanie na chodniku przy ul. Nowej 5. Trwają kontrole.',
  },
  {
    id: 3,
    image: 'https://placehold.co/48x48?text=GOPS',
    title: 'GOPS – Pomoc Społeczna',
    message: 'Od 20 lipca można składać wnioski o dofinansowanie wyprawki szkolnej.',
  },
];

const InfoBoard: React.FC = () => {
  return (
    <div className="info-board">
      {infoMessages.map((msg) => (
        <div key={msg.id} className="info-board-card">
          <div className="info-board-header">
            <img src={msg.image} alt={msg.title} className="info-board-image" />
            <h4 className="info-board-title">{msg.title}</h4>
          </div>
          <p className="info-board-message">{msg.message}</p>
        </div>
      ))}
    </div>
  );
};

export default InfoBoard;
