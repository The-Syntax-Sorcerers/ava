CLIENT_DIR = ./client
CONFIG_NAME = package.json
#  FLASK := FLASK_APP=$(FLASK_APP) env/bin/flask

debug:
	npm run watch --prefix ${CLIENT_DIR}  &
	flask --app server run --debug

prod:
	npm run clean --prefix ${CLIENT_DIR}
	npm install --prefix ${CLIENT_DIR} ${CONFIG_NAME} 
	npm run build --prefix ${CLIENT_DIR}

setup:
	npm run clean --prefix ${CLIENT_DIR}
	npm install --prefix ${CLIENT_DIR} ${CONFIG_NAME} 

clean:
	npm run clean --prefix ${CLIENT_DIR}

.PHONY: run
run:
	npm run clean --prefix ${CLIENT_DIR}
	npm install --prefix ${CLIENT_DIR} ${CONFIG_NAME} 
	npm run build --prefix ${CLIENT_DIR}
	flask --app server run


server:
	flask --app server run --debug
