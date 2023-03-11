export interface ImageModel {
	id: string,
	url: string,
	filename: string,
	uploadedBy: string,
	createdAt: string,
	updatedAt: string,
	sizeInBytes: number,
	favorited: boolean
	dimensions: DimensionsModel,
	resolution: DimensionsModel,
	sharedWith: SharedModel[],
	description?: string,
}


export interface DimensionsModel {
	height: number,
	width: number
}

export interface SharedModel {
	id: string,
	name: string,
	avatar: string
}
