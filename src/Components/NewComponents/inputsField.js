import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ImageContext } from '../Contex/ChatContext';
export const FromInput = ({ keywords, setKeywords,handleSearch }) => {
    const { userImages } = useContext(ImageContext);

    const [suggestions, setSuggestions] = useState([]);
    const [suggestionStore, setSuggestionStore] = useState([]);
    // console.log(suggestions, "suggestions")
    // Fetch suggestions from userImages when the component mounts or userImages change
    useEffect(() => {
        if (userImages && userImages.length > 0) {
            const suggestionList = userImages.map((image) => image?.keywords); // Assuming 'title' is the property you want to use for suggestions
            setSuggestionStore(suggestionList);
        }
    }, [userImages]);
    

    const handleInputChange = (e) => {
        const value = e.target.value;
        setKeywords(value);
        if (value.length >=1) {
          // Filter suggestions based on the input value
          const filteredSuggestions = suggestionStore?.filter((suggestion) =>
            suggestion.toLowerCase().includes(value.toLowerCase())
          );
      
          // Set filtered suggestions to display if available
          if (filteredSuggestions && filteredSuggestions.length > 0) {
            setSuggestions(filteredSuggestions);
          } else {
            setSuggestions(["not found"]);
          }
        } else {
          // If the input length is less than 3 characters or it's empty, clear the suggestions
          setSuggestions([]);
        }
      };
      



    return (
        <div>
            <form className='text-white'>
                <input type="text" placeholder="include" value={keywords} onChange={handleInputChange} className='p-2 rounded-sm text-black outline-inherit' />
                <button type="submit" className='p-2 rounded-sm bg-gray-500 ' onClick={handleSearch}  >Search</button>
            </form>

            {/* Display suggestions with scrollbar */}
            {suggestions.length>0 && <ul className='suggestions-list p-2 cursor-pointer w-[260px] rounded'>
                {suggestions.map((suggest, index) => (
                    <li key={index} onClick={() => setKeywords(suggest)} className='my-3 shadow-[1px_1px_5px] p-[5px] rounded-[5px]'>
                        {suggest.slice(0, 20)}...
                    </li>
                ))}
            </ul>}
           
        </div>
    );
};

