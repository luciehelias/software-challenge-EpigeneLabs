import axios from "axios";
import { useEffect, useState } from "react";
import GenesetCard from "./Components/GenesetCard";

type Gene = {
  id: number;
  name: string;
};

type Geneset = {
  id: number;
  title: string;
  genes: Gene[];
};

type GenesetList = Geneset[];

const App = () => {
  const [genesets, setGenesets] = useState<GenesetList>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenesets = async () => {
      try {
        const response = await axios.get("/genesets");
        setGenesets(response.data);
      } catch (error) {
        console.error("Error fetching genesets:", error);
      }
    };
    setLoading(false);
    fetchGenesets();
  }, []);

  if (loading) {
    0;
    return (
      <div>
        <p className="text-center text-lg text-gray-500">
          Chargement des données...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-6xl font-bold text-center mb-10 text-indigo-700">
        Genesets List
      </h1>
      <div>
        {genesets.length > 0 ? (
          <ul className="grid grid-cols-1 lg:grid-cols-3 gap-10 ">
            {genesets.map((geneset, index) => (
              <GenesetCard geneset={geneset} key={index} />
            ))}
          </ul>
        ) : (
          <p className="text-center text-lg text-blue-400">
            No geneset are found
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
