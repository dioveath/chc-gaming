import { useEffect, useState } from 'react';


const useScript = (url) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {

    const script = document.createElement('script');
    script.src = url;
    script.async = true;

    const onloadHandler = (e) => {
      setIsLoaded(true);
    };

    document.body.appendChild(script);
    script.addEventListener('load', onloadHandler);

    return () => {
      document.body.removeChild(script);
      script.removeEventListener('load', onloadHandler);      
    }
  }, [url])

  return { isLoaded };
};

export default useScript;
