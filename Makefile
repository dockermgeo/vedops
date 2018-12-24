install.local:
	cd app && npm install

run.local:
	export MONGODB_HOST=mecy && cd app && node index.js
