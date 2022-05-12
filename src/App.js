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
  const [foodListEmpty, setFoodListEmpty] = useState(false)
  const [showButton, setShowButton] = useState(false);

  const addNewFood = (newFood) => {
    const updatedFood = [...foodList, newFood]

    setFoodList(updatedFood)

    if (updatedFood.length === 0) {
      setFoodListEmpty(true)
    } else {
      setFoodListEmpty(false)
    }
  }


  const searchForFood = (string) => {
    let searchList

    if (string === "") {
      setFoodList(foods)
      //searchList = foodList
    } else {
      searchList = foodList.filter(food => food.name.toLowerCase().includes(string.toLowerCase()))
      setFoodList(searchList)
    }
    //setFoodList(searchList)
  }

  const deleteFood = (food) => {
    const newArr = foodList.filter(e => e.name != food)
    setFoodList(newArr)

    if (newArr.length === 0) {
      setFoodListEmpty(true)
    } else {
      setFoodListEmpty(false)
    }

  }

  const toggleShowButton = () => {
    setShowButton(!showButton);
  }

  //console.log(foodList.length, foodListEmpty)

  return (
    <div className="App">

      {showButton && <AddFoodForm addFood={addNewFood} />}
      <button onClick={toggleShowButton}>{showButton ? 'Hide' : 'Add food'}</button>

      <Search searchBar={searchForFood} />

      <Divider>Food List</Divider>
      {foodListEmpty && <div><strong>Oops! There is no more content to show.</strong></div>}

      <Row>
        {foodList.map((food, i) => {
          return <FoodBox key={i} food={food} delete={deleteFood} />
        })}
      </Row>

    </div>
  );
}

export default App;
