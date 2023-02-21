import { useEffect } from 'react';

const useScript = (url, rel) => {
  useEffect(() => {

    const script = document.createElement('link');
    script.href = url;
    script.rel = rel;

    document.body.appendChild(script);

    return () => document.body.removeChild(script);

  }, [url, rel]);

};

export default useScript;
