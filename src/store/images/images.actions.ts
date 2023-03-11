import {ImageModel} from '../../models/image.model';

// Possible Actions
export enum ImageActions {
	SET_IMAGES= 'SET_IMAGES',
	DELETE_IMAGE = 'DELETE_IMAGE',
	SELECT_IMAGE = 'SELECT_IMAGE',
	DESELECT_IMAGE = 'DESELECT_IMAGE',
	FAVORITE_IMAGE = 'FAVORITE_IMAGE',
	UNFAVORITE_IMAGE = 'UNFAVORITE_IMAGE',
}

// Actions
export const setImages = (payload: ImageModel[]) => ({type: ImageActions.SET_IMAGES, payload});
export const favoriteImage = (payload: ImageModel) => ({type: ImageActions.FAVORITE_IMAGE, payload});
export const unfavoriteImage = (payload: ImageModel) => ({type: ImageActions.UNFAVORITE_IMAGE, payload});
export const deleteImage = (payload: ImageModel) => ({type: ImageActions.DELETE_IMAGE, payload});
export const selectImage = (payload: ImageModel) => ({type: ImageActions.SELECT_IMAGE, payload});
export const deselectImage = () => ({type: ImageActions.SELECT_IMAGE});
