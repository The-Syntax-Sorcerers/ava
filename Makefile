FLASK_APP = flaskr
#  FLASK := FLASK_APP=$(FLASK_APP) env/bin/flask

.PHONY: run
build:
	flask --app $(FLASK_APP) run

debug:
	flask --app $(FLASK_APP) run --debug

.PHONY: run-production
run-production:
	flask --app $(FLASK_APP) run --debug
