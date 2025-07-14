import React from 'react';
import './MainSectionSecond.scss';
import road from '../../../assets/images/home/main-section-2/road.png';


const points = [
    {
        title: "Dodawanie zgłoszeń",
        description: "Użytkownicy mogą zgłaszać problemy infrastrukturalne, określając ich kategorię, lokalizację oraz szczegóły dotyczące awarii."
    },
    {
        title: "Obsługa i zarządzanie zgłoszeniami",
        description: "Odpowiednie jednostki administracyjne otrzymują zgłoszenia, analizują je i przypisują do realizacji."
    },
    {
        title: "Priorytetyzacja problemów",
        description: "Mieszkańcy mogą wspierać zgłoszenia poprzez ich ocenianie, co pozwala na efektywniejsze ustalanie priorytetów interwencji."
    },
    {
        title: "Wizualizacja na mapie",
        description: "Zgłoszenia są prezentowane na interaktywnej mapie, co ułatwia identyfikację problemów w danym regionie."
    }
]

const MainSectionSecond: React.FC = () => {
    return (
        <section className='how-it-works'>
            <h2 className="how-it-works-title">Jak działa system zgłaszania problemów infrastrukturalnych?</h2>

            <div className="how-it-works-content">
                <ul className='how-it-works-points'>
                    {points.map((point, index) => (
                        <li key={index} className="how-it-works-point">
                            <span className="point-number">{index + 1}</span>
                            <div className="point-texts">
                                <h3>{point.title}</h3>
                                <p>{point.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="how-it-works-image">
                    <img src={road} alt="Jak działa system" />
                </div>
            </div>
        </section>
    );
};

export default MainSectionSecond;