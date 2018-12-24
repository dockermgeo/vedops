DOCKER_REGISTRY=mecy:5000/dockermgeo
DOCKER_IMAGE=vops



docker.build:
	docker build -t $(DOCKER_REGISTRY)/$(DOCKER_IMAGE) .

docker.push:
	docker push $(DOCKER_REGISTRY)/$(DOCKER_IMAGE)

install.local:
	cd app && npm install

run.local:
	export MONGODB_HOST=mecy && cd app && node index.js
