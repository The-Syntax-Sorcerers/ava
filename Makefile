
#  FLASK := FLASK_APP=$(FLASK_APP) env/bin/flask
debug:
	npm run watch --prefix client &
	flask --app server run --debug

.PHONY: run
prod:
	npm run clean --prefix client
	npm install --prefix client
	npm run build --prefix client
	flask --app server run


server:
	flask --app server run --debug
