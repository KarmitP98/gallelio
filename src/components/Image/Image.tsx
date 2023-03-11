import React from 'react';
import './Image.css';
import {ImageModel} from '../../models/image.model';
import {useDispatch, useSelector} from 'react-redux';
import {INITIAL_STATE} from '../../store/images/images.reducer';
import {deselectImage, selectImage} from '../../store/images/images.actions';

export interface ImageProps {
	image: ImageModel;
}


const Image = ({image}: ImageProps) => {
	
	const dispatch = useDispatch();
	const selectedImage = useSelector((state: INITIAL_STATE) => state.selected);
	
	const pickImage = () => {
		if (selectedImage?.id === image.id) {
			dispatch(deselectImage());
		} else {
			dispatch(selectImage(image));
		}
	};
	
	const sizeInMB = () => (image.sizeInBytes / (1024 * 1_000)).toFixed(1);
	
	return (
	  <div className={'image-container'}>
		  <img
			src={image.url} alt={image.filename} className={`image ${selectedImage?.id === image.id ? 'selected' : ''}`}
			onClick={pickImage}
		  />
		  <h5 className='file-name'>{image.filename}</h5>
		  <p className='size'>{sizeInMB()} MB</p>
	  </div>
	);
};

export default Image;
