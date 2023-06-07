
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'getMediaElements') {

		const sendGetMediaElements = async event => {
			const mediaElements = getMediaElements(event.target);

			const dataMediaElements = mediaElements.map(element => ({
				tagName: element.tagName.toLowerCase(),
				alt: element.alt,
				src: element.src,
				srcset: element.srcset
			}));

			sendResponse(await formateDataMediaElements(dataMediaElements));
			
			document.removeEventListener('click', sendGetMediaElements);
		}

		document.addEventListener('click', sendGetMediaElements);

		// sendResponse Async
		return true;
	}
});