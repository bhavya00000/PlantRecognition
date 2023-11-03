import { useState,useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Data from '../../assets/PlantData/plantjson.json';

const Plants = () => {
  const [leavesData, setLeavesData] = useState(Data);
    // not working
  //   const router = useRouter();
//   const { plantName } = router.asPath;

  // Find the plant data based on the name

  const [plantName, setPlantName] = useState('');

  useEffect(() => {
    // Get the current URL
    const currentURL = window.location.href;

    // Split the URL by '/' to get an array of segments
    const urlSegments = currentURL.split('/');

    // Find the index of 'Plants' in the array
    const plantsIndex = urlSegments.indexOf('Plants');

    // Extract the plant name (next segment after 'Plants')
    if (plantsIndex !== -1 && urlSegments[plantsIndex + 1]) {
      setPlantName(urlSegments[plantsIndex + 1]);
    }
  }, []);

  
  const plantInfo = leavesData.find(plant => plant.Name === plantName);

  console.log("test",);
  console.log(plantInfo);
  return (
    <>
      {plantInfo ? (
        <>
          <h1>{plantInfo.Name}</h1>
          <p>General Info : {plantInfo.GeneralInfo}</p> <br />
          <p>Medicinal Info : {plantInfo.MedicinalInfo}</p> <br />
          <p>Cultivation Info : {plantInfo.CultivationInfo}</p>
          <Link href="/">Back to Home</Link>
        </>
      ) : (
        <p>Plant not found</p>
      )}
    </>
  );
}

export default Plants;