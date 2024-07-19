import React, { useState } from 'react';

const DropdownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const options = [
        'Marketing Analyst',
        'Financial Reporter',
        'Tech Blog Writer',
    ];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '2rem' }}>
            <button 
                onClick={toggleDropdown} 
                style={{ 
                    padding: '10px 20px', 
                    cursor: 'pointer', 
                    fontSize: '1vh', 
                    fontWeight: 'bold', 
                    fontFamily: 'sans-serif',
                    letterSpacing: '0.01rem', 
                    color: 'black', 
                    border: '1px solid #ccc', 
                    backgroundColor: '#f0f0f0' 
                }}
            >
                What's your role in the organization?
            </button>
            {isOpen && (
                <ul style={{ 
                    listStyleType: 'none', 
                    padding: 0, 
                    margin: 0, 
                    position: 'absolute', 
                    backgroundColor: '#fff', 
                    border: '1px solid #ccc', 
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
                    zIndex: 1, 
                    width: '100%' 
                }}>
                    {options.map((option, index) => (
                        <li 
                            key={index} 
                            style={{ 
                                cursor: 'pointer', 
                                padding: '10px 20px', 
                                borderBottom: '1px solid #eee',
                                fontSize: '0.9vh', 
                                color: 'black', 
                                opacity: 0.8 
                            }} 
                            onClick={() => alert(`Selected: ${option}`)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DropdownMenu;
