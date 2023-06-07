import { useState } from "react";
import { sendMessageContentScript } from "../utils/functions";


function ButtonGetMedia() {

	const [ dataMediaElements, setDataMediaElements ] = useState([]);

	const getDataMediaElements = async () => {
		const responseDataMediaElements = await sendMessageContentScript({action: 'getMediaElements'});
		return responseDataMediaElements;
	};

	

	const captureMediaElements = async () => {
		const newDataMediaElements = await getDataMediaElements();
		setDataMediaElements( dataMediaElements => [...dataMediaElements, ...newDataMediaElements]);
	};

	return (
			<>
				<ul>
					{dataMediaElements.map( (mediaElement, index) => {
						return (
							<>
								<img key={index} src={mediaElement.src}></img>
								<a href={mediaElement.objectURL} download="image">Descargar</a>
							</>
						)
					})}
				</ul>
				<button className="get-media" onClick={ () => captureMediaElements() }>Capturar media</button>
			</>
			
	)
}

export default ButtonGetMedia;