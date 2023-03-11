import {configureStore} from '@reduxjs/toolkit';
import imagesReducer from './images/images.reducer';
import {ImageActions} from './images/images.actions';

export const store = configureStore({devTools: true, reducer: imagesReducer});

export interface CustomAction {
	type: ImageActions,
	payload?: any
}
