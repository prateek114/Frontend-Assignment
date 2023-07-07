// import './App.css';
import { catData } from './data';
import React,{useState} from 'react'
import { useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

function Card({ id, title, content, image, index, moveCard }) {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: 'card',
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;
  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity }} className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-content">
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
    </div>
  );
}

function App() {
  // const [cards, setCards] = React.useState(catData);
  // const moveCard = (dragIndex, hoverIndex) => {
  //   const draggedCard = cards[dragIndex];
  //   const updatedCards = [...cards];
  //   updatedCards.splice(dragIndex, 1);
  //   updatedCards.splice(hoverIndex, 0, draggedCard);
  //   setCards(updatedCards);
  // };

  const handleBtnClick= async()=>{
    try {
      const response = await fetch('https://api.example.com/data');
      const jsonData = await response.json();

      console.log("JSON",jsonData)
    } catch (error) {
      console.log('Error:', error.message);
    }
  }

  return (
    <div>
      {/* <DndProvider backend={HTML5Backend}> */}
      <div className="grid-container">
        {catData.map((data,i)=>{
            return(
              <div key={i} className="card">
                <h3>{data.title}</h3>
                {/* <img onClick={<ImageModal src={data.logo} alt="Example Image"/>} src={data.logo} alt="loading"/> */}
                <img src={data.logo} alt="loading"/>
              </div>

            //   <Card
            //     key={data.id}
            //     id={data.id}
            //     title={data.title}
            //     content={data.content}
            //     image={data.logo}
            //     index={i}
            //     moveCard={moveCard}
            // />
            )
          })}
      </div>
        <button onClick={handleBtnClick}>Save</button>
      
      {/* </DndProvider> */}
      
    </div>
  );
}

export default App;
