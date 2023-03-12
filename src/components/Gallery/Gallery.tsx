import React from 'react';
import './Gallery.css';
import {ImageModel} from '../../models/image.model';
import Image from '../Image/Image';
import {v4} from 'uuid';
import {useSelector} from 'react-redux';
import {InitialState} from '../../store/images/images.reducer';

export interface GalleryProps {
	favoritesOnly: boolean
}

const Gallery = ({favoritesOnly = false}: GalleryProps) => {
	
	const images = useSelector((state: InitialState) => state.images);
	
	const getImages = () => favoritesOnly ? images.filter((image: ImageModel) => image.favorited) : images.sort((image1: ImageModel, image2: ImageModel) => new Date(image1.createdAt) > new Date(image2.createdAt) ? -1: 1);
	
	return (
	  <>
		  <section className='gallery'>
			  <ul className='images'>
				  {
					  getImages().map((image: any) => <Image image={image} key={v4()}/>)
				  }
			  </ul>
		  </section>
	  </>
	);
};

export default Gallery;
