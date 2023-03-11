import React from 'react';
import './TabBar.css';


interface TabBarProps {
	setFavouritesOnly: (value: (((prevState: boolean) => boolean) | boolean)) => void,
	favouritesOnly: boolean
}

const TabBar = ({setFavouritesOnly, favouritesOnly}: TabBarProps) => {
	
	return (
	  <div className={'tab-bar'}>
		  <button
			className={`tab-button ${!favouritesOnly ? 'active' : ''}`} onClick={() => setFavouritesOnly(false)}
		  >Recently Added
		  </button>
		  <button
			className={`tab-button ${favouritesOnly ? 'active' : ''}`} onClick={() => setFavouritesOnly(true)}
		  >Favorited
		  </button>
	  </div>
	);
};

export default TabBar;
