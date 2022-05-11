import logo from './logo.svg';
import './App.css';
import foods from './foods.json';
import { useState } from "react";
import { Row, Col, Divider } from 'antd';
import FoodBox from './components/FoodBox';
import AddFoodForm from './components/AddFoodForm';
import Search from './components/Search';
import ForwardDirectoryTree from 'antd/lib/tree/DirectoryTree';

function App() {

  const [foodList, setFoodList] = useState(foods)

  const addNewFood = (newFood) => {
    const updatedFood = [...foodList, newFood]

    setFoodList(updatedFood)
  }
  

  const searchForFood = (string) =>{
    
    if (string === ""){
      setFoodList(foods)

    } else{
      const searchList = foodList.filter(food=>food.name.toLowerCase().includes(string.toLowerCase()))
      setFoodList(searchList)
    }

  }

  const deleteFood = (food)=>{
    const newArr = foodList.filter(e=>e.name!=food)
    setFoodList(newArr)
  }

  return (
    <div className="App">
      <h1>Food List</h1>

      <Search  searchBar={searchForFood} />
      <AddFoodForm  addFood={addNewFood} />

      <Row>
      {foodList.map((food, i) => {
        return <FoodBox key={i} food={ food } delete={deleteFood} />
      })}
      </Row>



    </div>
  );
}

export default App;
