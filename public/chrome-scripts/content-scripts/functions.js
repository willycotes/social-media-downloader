const isMediaElement = element => {
	const tagName = element.tagName.toLowerCase();

		return (tagName === 'img' || tagName === 'video');
};

const getElementsForType = (element, tagName) => {
	const elementChildren = element.querySelectorAll(tagName);
	const parentElementChildren = element.parentElement.querySelectorAll(tagName);
	const parentElementChildrenLevel2 = element.parentElement.parentElement.querySelectorAll(tagName);
	const parentElementChildrenLevel3 = element.parentElement.parentElement.parentElement.querySelectorAll(tagName);

	if (elementChildren.length > 0) {
		return elementChildren;
	}

	if (parentElementChildren.length > 0) {
		return parentElementChildren;
	}

	if (parentElementChildrenLevel2.length > 0) {
		return parentElementChildrenLevel2;
	}

	if (parentElementChildrenLevel3.length > 0) {
		return parentElementChildrenLevel3;
	}
		
	return null;
};
	
const getMediaElements = element => {
	const images = getElementsForType(element, 'img');
	const videos = getElementsForType(element, 'video');

	if (isMediaElement(element)) {
		return [element];
	} 

	if (images !== null) {
		return Array.from(images);
	}

	if (videos !== null) {
		return Array.from(videos);
	}

		return null
};

const formateDataMediaElements = async (dataMediaElements) => {
	// obteniendo el objeto url  de los datos para poder descargar
	const response = await fetch(dataMediaElements.src);
	const blob = await response.blob();
	const objectURL = URL.createObjectURL(blob);
	dataMediaElements.objectURL = objectURL;
	// retornando la data con la url actualizada lista para descargar sin problemas
	return dataMediaElements
};