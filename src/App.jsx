import React, { useState, useEffect } from 'react';
import './App.css'; // Import custom styles

const App = () => {
  const [quote, setQuote] = useState('');
  const [savedQuotes, setSavedQuotes] = useState([]);

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes');
      const data = await response.json();
      setQuote(data[0]);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  const saveQuote = () => {
    if (!savedQuotes.includes(quote)) {
      setSavedQuotes([...savedQuotes, quote]);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center mb-4">
        <button 
          onClick={fetchQuote} 
          className="bg-blue-500 text-white p-2 rounded">
          Get New Quote
        </button>
      </div>
      <div className="card bg-white p-6 shadow-lg rounded-lg">
        <p className="text-xl italic">"{quote}"</p>
        <button 
          onClick={saveQuote} 
          className="mt-4 bg-black text-white p-2 rounded">
          Save to List
        </button>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-2">Saved Quotes:</h2>
        <ul>
          {savedQuotes.map((quote, index) => (
            <li key={index} className="mb-2 card bg-gray-100 p-4 rounded">
              <p>"{quote}"</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
