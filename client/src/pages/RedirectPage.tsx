import { useEffect } from "react";
import { useParams } from "react-router-dom";

const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/url`;

const RedirectPage = () => {
  const { shortId } = useParams();
  useEffect(() => {
    const fetchUrl = async () => {
      const res = await fetch(`${baseUrl}/${shortId}`);
      const data = await res.json();
      if (data.success) {
        
        window.location.href = data.data.longUrl;
      } else {
        console.log("Short URL not found");
      }
    };
    fetchUrl();
  }, [shortId]);


  return <div>Redirecting...</div>;
};

export default RedirectPage;
