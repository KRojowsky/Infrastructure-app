import React from "react";
import "./MainSectionFourth.scss";
import society1 from '../../../assets/images/Home/main-section-4/society1.png';
import society2 from '../../../assets/images/Home/main-section-4/society2.png';

const MainSectionFourth: React.FC = () => {
    return (
        <section className="system-purpose">
            <h2 className="system-purpose-title">Przeznaczenie systemu zgłaszania problemów infrastruktury regionalnej</h2>

            <div className="system-purpose-wrapper">
                <div className="system-purpose-block">
                    <div className="image">
                        <img src={society1} alt="Dla władz terytorialnych"/>
                    </div>
                    <p className="block-label">Dla władz terytorialnych</p>
                </div>

                <div className="system-purpose-block">
                    <div className="image">
                        <img src={society2} alt="Dla władz terytorialnych"/>
                    </div>
                    <p className="block-label">Dla społeczności</p>
                </div>
            </div>
        </section>
    );
};

export default MainSectionFourth;