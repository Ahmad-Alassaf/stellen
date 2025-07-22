import {useState,useEffect} from 'react'

const useScreenSize = () => {
    const [screen, setScreen] = useState("lg")
    const [size,setSize]=useState(0)

  useEffect(() => {
    const checkSize = () => {
      const width = window.innerWidth;
      setSize(width)
     
      if (width < 640) {
        setScreen("sm");
      } else if (width < 1024) {
        setScreen("md");
      } else {
        setScreen("lg");
      }
    };

    checkSize(); // run on load
    window.addEventListener("resize", checkSize);

    return () => window.removeEventListener("resize", checkSize);
  }, [size]);

  return screen
 
}

export default useScreenSize
