"use client";

import { useState, useEffect } from "react";

async function fetchMealIdeas(ingredient) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  const data = await response.json();
  console.log(data.meals);
  return data.meals;   
}

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);
  const [expandedMealId, setExpandedMealId] = useState(null); 

  async function loadMealIdeas() {
    if (ingredient) {
      const data = await fetchMealIdeas(ingredient);
      setMeals(data);
    } else {
      setMeals([]); 
    }
  }

  useEffect(() => {
    loadMealIdeas();
  }, [ingredient]);

  const handleMealClick = (idMeal) => {
    setExpandedMealId((prevId) => (prevId === idMeal ? null : idMeal));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-yellow-100">Meal Ideas</h2>
      
      <ul>
        {meals && meals.length > 0 ? 
        
        ( 
          meals.map((meal) => (
            <li 
              key={meal.idMeal} 
              onClick={() => handleMealClick(meal.idMeal)}
              className={expandedMealId === meal.idMeal ? 'py-4 font-bold bg-slate-900 w-40' : ''}
            >
              <p>{meal.strMeal}</p>
              {expandedMealId === meal.idMeal && meal.strMealThumb && (              
                <img src={meal.strMealThumb} alt={meal.strMeal} />
              )}
              
            </li>
          ))
        ) : (
          <li>No meal ideas available for this ingredient.</li>
        )}
      </ul>
    </div>
  );
}
