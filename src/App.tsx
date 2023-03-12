import React, {useEffect, useState} from 'react';
import './App.css';
import {FETCH_URL} from './constants/api';
import Gallery from './components/Gallery/Gallery';
import {ImageModel} from './models/image.model';
import TabBar from './components/TabBar/TabBar';
import {useDispatch, useSelector} from 'react-redux';
import {setImages} from './store/images/images.actions';
import ImageDetails from './components/Image-Details/Image-Details';
import {InitialState} from './store/images/images.reducer';
import Notification from './components/Notification/Notification';

const App = () => {
	
	const [favouritesOnly, setFavouritesOnly] = useState(false);
	
	const dispatch = useDispatch();
	const selectedImage: ImageModel | undefined = useSelector((state: InitialState) => state.selected);
	
	const [message, setMessage] = useState('');
	const [show, setShow] = useState(false);
	const [currentTimeout, setCurrentTimeout] = useState(setTimeout(() => {}, 0));
	
	useEffect(() => {
		fetchData();
	}, []);
	const fetchData = async () => {
		const json = await fetch(FETCH_URL, {method: 'GET'});
		const data: ImageModel[] = await json.json();
		// Set the images in the state
		dispatch(setImages(data.sort((image1: ImageModel, image2: ImageModel) => new Date(image1.createdAt) > new Date(image2.createdAt) ? -1 : 1)));
	};
	
	const showNotification = (message: string) => {
		if (currentTimeout) {
			clearTimeout(currentTimeout);
		}
		
		setTimeout(() => {
			setMessage(message);
			setShow(true);
			
			const timeOut = setTimeout(() => {
				setShow(false);
			}, 5_000);
			
			setCurrentTimeout(timeOut);
		}, 0);
		
	};
	
	return (
	  <div className={`app`}>
		  <section className='content-section'>
			  <h1>Galleria</h1>
			  <TabBar setFavouritesOnly={setFavouritesOnly} favouritesOnly={favouritesOnly}/>
			  <Gallery favoritesOnly={favouritesOnly}/>
		  </section>
		  <div className={`${selectedImage ? 'show' : ''} detail-section`}>
			  <ImageDetails showNotification={showNotification}/>
		  </div>
		  <Notification message={message} show={show}/>
	  </div>
	);
};

export default App;
