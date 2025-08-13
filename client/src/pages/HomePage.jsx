
import { useState } from 'react';
import HeroSection from '../components/HeroSection'
import FeaturesSection from '../components/FeaturesSection';
import toast from "react-hot-toast"
const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [shortUrl, setShortUrl] = useState('')
  const handleShorten = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/url/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({ longUrl: url })
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message)
        console.log(data.data)
        setShortUrl(data.data.shortUrl)

      } else {
        toast.error(data.message)
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className='container mx-auto'>
      <HeroSection onShorten={handleShorten} isLoading={isLoading} defaultUrl={shortUrl || 'mern.ly/xyz123'} />
      <FeaturesSection />
    </main>
  )
}

export default HomePage