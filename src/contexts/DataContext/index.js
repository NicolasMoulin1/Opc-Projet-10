import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const getData = useCallback(async () => {
    try {
      setData(await api.loadData());
    } catch (err) {
      setError(err);
    }
  }, []);
  useEffect(() => {
    if (data) return;
    getData();
  });

  const last = data && data.events ? (() => {
    let lastEvent = null; // Initialisation de la variable qui contiendra l'événement le plus récent
    data.events.forEach(event => {
        if (!lastEvent || new Date(event.date) > new Date(lastEvent.date)) {
            lastEvent = event; // Mise à jour de lastEvent si l'événement actuel est plus récent
        }
    });
    return lastEvent; // Retourne l'événement le plus récent après avoir parcouru tous les événements
})() : null;
  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        last
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);

export default DataContext;
