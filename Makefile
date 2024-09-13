build:
	docker build -t grishabot .

run:
	docker run -d -p 3000:3000 --name grishabot --rm grishabot
