FLASK_APP = flaskr
#  FLASK := FLASK_APP=$(FLASK_APP) env/bin/flask

.PHONY: run
build:
	FLASK_ENV=dev
	flask --app $(FLASK_APP) run

debug:
	FLASK_ENV=dev
	flask --app $(FLASK_APP) run --debug

.PHONY: run-production
run-production:
	FLASK_ENV=prod
	flask --app $(FLASK_APP) run --debug
