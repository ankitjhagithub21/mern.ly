
import { useState } from 'react';
import HeroSection from '../components/HeroSection'

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);


  const handleShorten = async (url) => {
    setIsLoading(true);
    try {
      // Call your backend API here
      // const res = await fetch("/api/shorten", { method: "POST", body: JSON.stringify({ url }) });
      // const data = await res.json();
      // console.log("Short URL:", data.shortUrl);
      console.log("Shortening:", url);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='container mx-auto relative'>
      <HeroSection  onShorten={handleShorten} isLoading={isLoading}/>
    </div>
  )
}

export default HomePage