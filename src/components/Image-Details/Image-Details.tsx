import React, {useState} from 'react';
import './ImageDetails.css';
import {useDispatch, useSelector} from 'react-redux';
import {InitialState} from '../../store/images/images.reducer';
import {ImageModel} from '../../models/image.model';
import Image from '../Image/Image';
import {deleteImage, deselectImage} from '../../store/images/images.actions';
import Notification from '../Notification/Notification';

const ImageDetails = () => {
	
	const [message, setMessage] = useState('');
	const [show, setShow] = useState(false);
	const [currentTimeout, setCurrentTimeout] = useState(setTimeout(() => {},0));
	
	const dispatch = useDispatch();
	const selectedImage = useSelector((state: InitialState) => state.selected);
	const images = useSelector((state: InitialState) => state.images);
	
	const isImageFavorited = () => images.find((image: ImageModel) => image.id === selectedImage?.id)?.favorited || false;
	
	const getDate = (data: string) => new Date(data).toDateString();
	
	const deleteCurrentImage = () => {
		if (selectedImage) {
			dispatch(deleteImage(selectedImage));
			dispatch(deselectImage());
			
			showNotification(`${selectedImage.filename} has been deleted!`)
		}
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
	  <section className={'image-details'}>
		  <div className='action-bar'>
			  <button className='btn outline normal' onClick={() => dispatch(deselectImage())}>
				  Close
				  <span className='material-icons material-icons-round'>
					  close
				  </span>
			  </button>
		  </div>
		  {
			selectedImage &&
			  <>
				<Image image={selectedImage} details={true} favorited={isImageFavorited()}/>
				<br/>
				<div className='details'>
				  <div className='row'>
					<div className='title'>Information</div>
				  </div>
				  <div className='row'>
					<div className='label'>Uploaded by</div>
					<div>{selectedImage.uploadedBy}</div>
				  </div>
				  <div className='row'>
					<div className='label'>Created</div>
					<div>{getDate(selectedImage.createdAt)}</div>
				  </div>
				  <div className='row'>
					<div className='label'>Last Modified</div>
					<div>{getDate(selectedImage.updatedAt)}</div>
				  </div>
				  <div className='row'>
					<div className='label'>Dimensions</div>
					<div>{selectedImage.dimensions.width} x {selectedImage.dimensions.height}</div>
				  </div>
				  <div className='row'>
					<div className='label'>Resolution</div>
					<div>{selectedImage.resolution.width} x {selectedImage.resolution.height}</div>
				  </div>
				</div>
				<br/>
				<br/>
				  {
					selectedImage.description &&
					  <>
						<div className='title'>Description</div>
						<br/>
						<p>
							{selectedImage.description}
						</p>
						<br/>
					  </>
				  }
				<button className='btn outline danger block' type={'button'} onClick={deleteCurrentImage}>
				  Delete
				</button>
			  </>
		  }
		  {
			!selectedImage &&
			  <div className={'none-selected'}>
				<h2>
				  No Image Selected!
				  <span className='material-icons material-icons-round'>
					sentiment_dissatisfied
				  </span>
				</h2>
				<br/>
				<p>
				  Start by selecting an image from the left...
				</p>
			  </div>
		  }
		  <Notification message={message} show={show}/>
	  </section>
	);
};

export default ImageDetails;
