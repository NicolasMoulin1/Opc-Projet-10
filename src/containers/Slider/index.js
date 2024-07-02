import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  // Ajoute une vérification de nullité avec l'opérateur `??`
  // Si `data` ou `focus` est undefined, `byDataDesc` sera un tableau vide
  // Trie les données par date décroissante avec une vérification de nullité
  const byDateDesc =
    data?.focus.sort((evtA, evtB) =>
      new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
    ) ?? [];

  // Effectue le changement automatique toutes les 5 secondes
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    // Nettoie l'intervalle lorsque le composant est démonté
    return () => clearInterval(intervalId);
  }, [byDateDesc.length]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // La clé du conteneur principal; Cela garantit un clé unique pour caque `div`
        // en utilisant soit l'ID de évènements, soit l'index si l'ID n'est pas disponible
        <div key={event.id ? `card-${event.id}` : `card-${idx}`}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  // Utilise des clé uniques basées sur l'index
                  key={`pagination-${radioIdx}`}
                  type="radio"
                  name="radio-button"
                  checked={radioIdx === index}
                  // L'attribut readOnly signifie que l'utilisateur ne peut changer l'état de l'input
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
