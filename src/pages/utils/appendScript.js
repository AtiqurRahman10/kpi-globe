export const appendScript = (scriptToAppend) => {
	const script = document.createElement("script");
	script.src = scriptToAppend;
	script.async = true;
	document.body.appendChild(script);
};

export const appendScriptHead = (scriptToAppend) => {
	const script = document.createElement("script");
	script.src = scriptToAppend;
	script.async = true;
	document.head.appendChild(script);
};
