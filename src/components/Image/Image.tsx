import React from 'react';
import './Image.css';
import {ImageModel} from '../../models/image.model';
import {useDispatch, useSelector} from 'react-redux';
import {InitialState} from '../../store/images/images.reducer';
import {deselectImage, favoriteImage, selectImage, unfavoriteImage} from '../../store/images/images.actions';

export interface ImageProps {
	image: ImageModel,
	details?: boolean,
	favorited?: boolean
}


const Image = ({image, details, favorited}: ImageProps) => {
	
	const dispatch = useDispatch();
	const selectedImage = useSelector((state: InitialState) => state.selected);
	
	const pickImage = () => {
		if (!details) {
			if (selectedImage?.id === image.id) {
				dispatch(deselectImage());
			} else {
				dispatch(selectImage(image));
			}
		}
	};
	
	const sizeInMB = () => (image.sizeInBytes / (1024 * 1_000)).toFixed(1);
	
	return (
	  <div className={'image-container'}>
		  <img
			src={image.url} alt={image.filename}
			className={`${details ? 'details-image': 'image'} ${selectedImage?.id === image.id && !details ? 'selected' : ''}`}
			onClick={pickImage}
		  />
		  <div className='bar'>
			  <h5 className={`file-name ${details ? 'large' : ''}`}>{image.filename}</h5>
			  {
				details &&
				  <button className={'icon-button'} onClick={() => dispatch(favorited ? unfavoriteImage(image): favoriteImage(image))}>
					<span className='material-icons material-icons-round' style={{color: favorited ? 'var(--red)':'var(--gray)'}}>
						{favorited ? 'favorite' :'favorite_border'}
					</span>
				  </button>
			  }
		  </div>
		  <p className='size'>{sizeInMB()} MB</p>
	  </div>
	);
};

export default Image;
