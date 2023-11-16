import React from 'react';

export const FromInput = () => {
    // Component logic here
    return (
        <div>
            <from className='text-white'>
                <input type="radio" name='sorting' />Excludes {''}
                <input type="radio" name='sorting' />Includes

                <input type="text" placeholder="include" />
            </from>
        </div>
    );
};

