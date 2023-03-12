import {CustomAction} from '../index';
import {ImageModel} from '../../models/image.model';
import {ImageActions} from './images.actions';

export interface InitialState {
	images: ImageModel[],
	selected: ImageModel | undefined
}

export const INITIAL_STATE: InitialState = {
	images: [],
	selected: undefined
};

const updateImages = (images: ImageModel[], image: ImageModel, type: 'DELETE' | 'FAVORITE' | 'UNFAVORITE'): ImageModel[] => {
	if (type === 'DELETE') {
		return images.filter((value: ImageModel) => value.id !== image.id);
	}
	return images.map((value: ImageModel) => value.id === image.id ? {
		...value,
		favorited: type === 'FAVORITE'
	} : value);
	
};
const imagesReducer = (state = INITIAL_STATE, {type, payload}: CustomAction) => {
	switch (type) {
		case ImageActions.SET_IMAGES:
			return {...state, images: payload};
		case ImageActions.DELETE_IMAGE:
			return {...state, images: updateImages(state.images, payload, 'DELETE')};
		case ImageActions.FAVORITE_IMAGE:
			return {...state, images: updateImages(state.images, payload, 'FAVORITE')};
		case ImageActions.UNFAVORITE_IMAGE:
			return {...state, images: updateImages(state.images, payload, 'UNFAVORITE')};
		case ImageActions.SELECT_IMAGE:
			return {...state, selected: payload};
		case ImageActions.DESELECT_IMAGE:
			return {...state, selected: undefined};
		default:
			return state;
	}
};


export default imagesReducer;
