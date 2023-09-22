CLIENT_DIR = ./client
CONFIG_NAME = package.json
#  FLASK := FLASK_APP=$(FLASK_APP) env/bin/flask

debug: run-client run-server 

run-server:
	flask --app server run --debug

run-client:
	npm run watch --prefix ${CLIENT_DIR} &

frontend:
	npm run dev --prefix ${CLIENT_DIR}

setup:
	npm install --prefix ${CLIENT_DIR} ${CONFIG_NAME} --force

clean:
	npm run clean --prefix ${CLIENT_DIR}

dist:
	npm run clean --prefix ${CLIENT_DIR}
	npm install --prefix ${CLIENT_DIR} ${CONFIG_NAME} 
	npm run build --prefix ${CLIENT_DIR}

.PHONY: run
run:
	npm run clean --prefix ${CLIENT_DIR}
	npm install --prefix ${CLIENT_DIR} ${CONFIG_NAME}  --force
	npm run build --prefix ${CLIENT_DIR}
	flask --app server run


server:
	flask --app server run --debug
