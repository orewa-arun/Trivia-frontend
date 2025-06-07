import { useState, useEffect } from "react";
import type { AdSectionType } from "../types"; // Assuming you have a type defined for AdSection
import { getAd } from "../api/triviaApi";
import { useTriviaSession } from "../../../context/TriviaSessionContext";

// Usage of adCompleted is redundant here, but we keep it for future endeavor of improving the ad section
const AdSection = () => {
  const [ad, setAd] = useState<AdSectionType | null>(null);
  const [timer, setTimer] = useState<number | null>(null);
  const [adCompleted, setAdCompleted] = useState(false);
  const { dispatch } = useTriviaSession(); // Assuming you have a context to manage quiz phases

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
      setAd(null); // Remove or hide ad when time is up
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  if (!ad) {
    return (
      <div className="p-8 text-center text-gray-500">The ad has ended.</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-6 relative border border-gray-200">
      <div className="absolute top-4 right-4 text-sm text-gray-500">
        Ad ends in: {timer}s
      </div>
      <h2 className="text-2xl font-bold mb-4 text-blue-800">{ad.title}</h2>

      {ad.image_url && (
        <img
          src={ad.image_url}
          alt={ad.title || "Advertisement"}
          onError={() => console.error("Failed to load ad image.")}
          className="w-full max-h-[400px] object-contain rounded-lg mb-4"
        />
      )}

      <p className="text-gray-700 mb-2">{ad.content}</p>
    </div>
  );
};

export default AdSection;
