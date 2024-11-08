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

async function fetchInstructions(idMeal) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
  );
  const data = await response.json();
  console.log(data.meals);
  return data.meals[0]?.strInstructions; 
}

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);
  const [expandedMealId, setExpandedMealId] = useState(null);
  const [instructions, setInstructions] = useState(""); 

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

  const handleMealClick = async (idMeal) => {
    setExpandedMealId((prevId) => (prevId === idMeal ? null : idMeal));   
    
    if (expandedMealId !== idMeal) {
      const instructions = await fetchInstructions(idMeal);
      setInstructions(instructions);
    } else {
      setInstructions(""); 
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-yellow-100">Meal Ideas</h2>
      
      <ul>
        {meals && meals.length > 0 ? (
          meals.map((meal) => (
            <li 
              key={meal.idMeal} 
              onClick={() => handleMealClick(meal.idMeal)}
              className={expandedMealId === meal.idMeal ? 'py-4 font-bold bg-slate-900 w-96' : ''}
            >
              <p>{meal.strMeal}</p>
              {expandedMealId === meal.idMeal && meal.strMealThumb && (              
                <img className="object-cover w-100" src={meal.strMealThumb} alt={meal.strMeal} />
              )}
              {expandedMealId === meal.idMeal && instructions && (
                <div className="p-4 text-xs">
                  <p>{instructions}</p>
                </div>
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
