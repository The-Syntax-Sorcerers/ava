
#  FLASK := FLASK_APP=$(FLASK_APP) env/bin/flask
debug-server:
	flask --app server run --debug

debug-client:
	npm run dev --prefix client

.PHONY: run
prod:
	npm run clean --prefix client
	npm install --prefix client
	npm run build --prefix client
	flask --app server run

.PHONY: run-production
run-production:
	flask --app server run --debug
