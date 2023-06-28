import React, { useState, useEffect } from 'react';

const InfiniteScrollList = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadMoreItems = () => {
    setIsLoading(true);

    // Simulate an API call to fetch more items
    setTimeout(() => {
      const newItems = Array.from({ length: 10 }, (_, index) => `Item ${index + 1}`);
      setItems(prevItems => [...prevItems, ...newItems]);
      setIsLoading(false);
      setPage(prevPage => prevPage + 1);
    }, 1000);
  };

  useEffect(() => {
    loadMoreItems();
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight &&
      !isLoading
    ) {
      loadMoreItems();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <h1>Infinite Scrolling List</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
        {isLoading && <li>Loading...</li>}
      </ul>
      {isLoading && <p>Loading more items...</p>}
      {!isLoading && page === 1 && items.length === 0 && <p>No items to display.</p>}
    </div>
  );
};

export default InfiniteScrollList;
