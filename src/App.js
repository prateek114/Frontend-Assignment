import { catData as data } from './data';
import { useEffect, useState } from 'react'

function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [catData, setCatData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/get');
        const jsonData = await response.json();
        if(jsonData.data){
          setCatData(JSON.parse(jsonData.data));
        }
      } catch (error) {
        console.log('Error:', error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log("catData",catData)

  const handleBtnClick= async()=>{
    try {
      setIsLoading(true);
      const response = await fetch('/api/save',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({catData
        }),
      });
      const jsonData = await response.json();

      console.log("JSON",jsonData);
    } catch (error) {
      console.log('Error:', error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData('index', index.toString());
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, targetIndex) => {
    const sourceIndex = Number(event.dataTransfer.getData('index'));
    const updatedImages = [...catData];
    const [draggedImage] = updatedImages.splice(sourceIndex, 1);
    updatedImages.splice(targetIndex, 0, draggedImage);
    setCatData(updatedImages);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  }

  
  const handleImageClose = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleImageClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
    style={{
      position:'relative',
    }}>
      <button onClick={handleBtnClick}>
        {isLoading ? 'Loading...' : 'Save'}
      </button>
      <div className="grid-container">
        {/* {catData.map((data,i)=>{
            return(
              <div key={i} className="card">
                <h3>{data.title}</h3>
                <img src={data.logo} alt="loading"/>
              </div>
            )
          })} */}
          {catData.map((data, index) => (
        <div
          key={index}
          style={{
            cursor:'pointer',
          }}
          draggable
          onDragStart={(event) => handleDragStart(event, index)}
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, index)}
          onClick={()=>handleImageClick(data.logo)}
        >
          <img src={data.logo} alt={`Image ${index + 1}`} />
        </div>
      ))}
      </div>
      
      {selectedImage && (
        <div className="overlay" onClick={handleImageClose}>
          <div className="modal">
            <span className="close" onClick={handleImageClose}>
              &times;
            </span>
            <img src={selectedImage} alt="Selected Image" />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;