## ----------------------
## ------ DOCKER --------
## ----------------------
docker-build: ## Build the docker container
	docker build -f Dockerfile.dev -t node-client .

docker-up: ## Start the api locally
	@echo "=============starting api locally============="
	docker-compose up -d

docker-logs: ## tail the logs
	docker-compose logs -f

docker-down: ## shut down the docker server
	docker-compose down

docker-clean: ## shuts down the API and then clears out saved Docker images 
	@echo "=============cleaning up============="
	rm -f api
	docker system prune -f
	docker volume prune -f