import React, { useState, useEffect } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import MealCard from '../../Component/MealCard/MealCard';
import InfiniteScroll from 'react-infinite-scroll-component';

const Meals = () => {
  const axiosPublic = useAxiosPublic();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [meals, setMeals] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMeals = async (reset = false) => {
    try {
      const res = await axiosPublic.get(
        `/meal?search=${search}&category=${category}&minPrice=${priceRange.min}&maxPrice=${priceRange.max}&page=${page}`
      );
      if (reset) {
        setMeals(res.data);
      } else {
        setMeals(prevMeals => [...prevMeals, ...res.data]);
      }
      if (res.data.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };

  useEffect(() => {
    fetchMeals(true);
    setPage(1);
    setHasMore(true);
  }, [search, category, priceRange, axiosPublic]);

  const handleSearch = e => {
    e.preventDefault();
    const searchText = e.target.search.value;
    setSearch(searchText);
  };

  const handleCategoryChange = e => {
    setCategory(e.target.value);
  };

  const handlePriceRangeChange = e => {
    const { name, value } = e.target;
    setPriceRange(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchMoreMeals = () => {
    setPage(prevPage => prevPage + 1);
    fetchMeals();
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSearch} className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search here..."
          name="search"
          className="input input-bordered w-full max-w-xs mr-2"
        />
        <button className="btn btn-warning" type="submit">
          Search
        </button>
      </form>
      <div className="flex mb-4 justify-center">
        <select
          onChange={handleCategoryChange}
          value={category}
          className="select select-bordered w-full max-w-xs mr-2"
        >
          <option value="">All Categories</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>
        <input
          type="number"
          placeholder="Min Price"
          name="min"
          value={priceRange.min}
          onChange={handlePriceRangeChange}
          className="input input-bordered w-full max-w-xs mr-2"
        />
        <input
          type="number"
          placeholder="Max Price"
          name="max"
          value={priceRange.max}
          onChange={handlePriceRangeChange}
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <InfiniteScroll
        dataLength={meals.length}
        next={fetchMoreMeals}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>No more meals</b>
          </p>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {meals.map(UpcomingSingle => (
            <MealCard key={UpcomingSingle.id} UpcomingSingle={UpcomingSingle} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Meals;
