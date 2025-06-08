import { useState, useEffect } from "react";
import type { AdSectionType } from "../types";
import { getAd } from "../api/triviaApi";
import { useTriviaSession } from "../../../context/TriviaSessionContext";
import LoadingScreen from "../../../components/LoadingScreen";
import "../components/NameInput.css"; 

const AdSection = () => {
  const [ad, setAd] = useState<AdSectionType | null>(null);
  const [timer, setTimer] = useState<number | null>(null);
  const [adCompleted, setAdCompleted] = useState(false);
  const { dispatch } = useTriviaSession();

  useEffect(() => {
    const loadAd = async () => {
      try {
        const response = await getAd(1);
        setAd(response);
        if (response.duration) {
          setTimer(response.duration);
        }
      } catch (error) {
        console.error("Error fetching ad:", error);
      }
    };

    loadAd();
  }, []);

  useEffect(() => {
    if (adCompleted) {
      dispatch({ type: "START_AD_QUIZ" });
    }
  }, [adCompleted]);

  useEffect(() => {
    if (timer === null) return;

    if (timer <= 0) {
      setAdCompleted(true);
      setAd(null);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  if (!ad) {
    return <LoadingScreen message="Loading ad..." />;
  }

  return (
    <div className="name-input-bg relative min-h-screen flex items-center justify-center p-4">
      <div className="glitter-overlay pointer-events-none z-0">
        <div className="star" style={{ top: "10%", left: "15%" }} />
        <div className="star" style={{ top: "30%", left: "75%" }} />
        <div className="star" style={{ top: "60%", left: "40%" }} />
        <div className="star" style={{ top: "80%", left: "80%" }} />
      </div>

      <div className="relative w-full max-w-4xl bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-xl p-8 text-black z-10">
        <div className="absolute top-4 right-4 text-sm text-gray-500">
          Ad ends in: {timer}s
        </div>

        <h2 className="text-2xl font-bold mb-4 text-blue-800">{ad.title}</h2>

        {ad.image_url && (
          <img
            src={ad.image_url}
            alt={ad.title || "Advertisement"}
            onError={() => console.error("Failed to load ad image.")}
            className="w-full max-h-[400px] object-contain rounded-lg mb-6"
          />
        )}

        <p className="text-gray-800 text-lg leading-relaxed">{ad.content}</p>
      </div>
    </div>
  );
};

export default AdSection;
