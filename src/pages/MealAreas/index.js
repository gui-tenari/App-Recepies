import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RecipeCard from '../../components/RecipeCard';

import { getMealAreas } from '../../services/recipesAPI';
import {
  setMealsByArea,
  setFilteredMeals,
  fetchMealsThunk,
} from '../../redux/actions/mealsActions';
import Loading from '../../components/Loading';

const MealAreas = () => {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');
  const { filteredMeals } = useSelector(({ meals }) => meals);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchAreas() {
      try {
        const areaList = await getMealAreas();
        setAreas(areaList);
        setSelectedArea(areaList[0].strArea);
      } catch (error) {
        global.alert('Não foram encontradas receitas');
      }
    }
    fetchAreas();
  }, []);

  useEffect(() => {
    if (selectedArea && selectedArea !== 'All') {
      dispatch(setMealsByArea(selectedArea));
    } else if (selectedArea === 'All') {
      dispatch(setFilteredMeals([], ''));
      dispatch(fetchMealsThunk());
    }
  }, [selectedArea, dispatch]);
  return (
    <div>
      <Header title="Explorar Origem" hasSearchBar />
      <select
        data-testid="explore-by-area-dropdown"
        value={ selectedArea }
        onChange={ ({ target }) => setSelectedArea(target.value) }
      >
        <option value="All" data-testid="All-option">
          All
        </option>
        {areas.map(({ strArea: area }) => (
          <option key={ area } value={ area } data-testid={ `${area}-option` }>
            {area}
          </option>
        ))}
      </select>
      {selectedArea ? (
        filteredMeals.map(({ idMeal, strMealThumb, strMeal }, index) => (
          <RecipeCard
            key={ idMeal }
            id={ idMeal }
            thumb={ strMealThumb }
            name={ strMeal }
            index={ index }
          />
        ))
      ) : (
        <Loading />
      )}
      <Footer />
    </div>
  );
};

export default MealAreas;
