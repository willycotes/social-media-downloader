
export const getCurrentTabID = async () => {
	const tabs = await chrome.tabs.query({ active: true, currentWindow: true });

	// Current tag id
	return tabs[0].id;
}

export const injectContentScript = async (files) => {
	const currentTabID = await getCurrentTabID();

	chrome.scripting.executeScript({ target: { tabId: currentTabID },files: files })
		.then( (result) => console.log('Script injected', result) );
}

export const sendMessageContentScript = async (message) => {
	console.log('executing');
	const tabID = await getCurrentTabID();
	const response = await chrome.tabs.sendMessage(tabID, message);
	return response;
}

	// const imageUrl = media.src;
	// const fileName = 'imagen.jpg'; // Cambia el nombre de archivo según tus necesidades
		
	// fetch(imageUrl)
	// 	.then(response => response.blob())
	// 		.then(blob => {
	// 			const link = document.createElement('a');
	// 			link.href = URL.createObjectURL(blob);
	// 			link.download = fileName;
		
	// 			link.click();
		
	// 			URL.revokeObjectURL(link.href);
	// 		});
