import React from "react";
import "./MainSectionFourth.scss";

const MainSectionFourth: React.FC = () => {
    return (
        <section className="system-purpose">
            <h2 className="system-purpose-title">Przeznaczenie systemu zgłaszania problemów infrastruktury regionalnej</h2>

            <div className="system-purpose-wrapper">
                <div className="system-purpose-block">
                    <div className="image">
                        <img src="https://picsum.photos/400/500?random=1" alt="Dla władz terytorialnych"/>
                    </div>
                    <p className="block-label">Dla władz terytorialnych</p>
                </div>

                <div className="system-purpose-block">
                    <div className="image">
                        <img src="https://picsum.photos/400/500?random=2" alt="Dla władz terytorialnych"/>
                    </div>
                    <p className="block-label">Dla społeczności</p>
                </div>
            </div>
        </section>
    );
};

export default MainSectionFourth;