install.local:
	cd app && npm install

run.local:
	export DISABLE_API=false && export CSS_THEME=white && export MONGODB_HOST=mecy && cd app && node index.js
