# Traveller

> Mikas Pupeikis 2023

Development of Mobile Application for Travel Route Planning

View Project [Repository](https://git.mif.vu.lt/mipu7431/traveler)
View Project [Report](https://www.overleaf.com/read/hppnxrpdywbv)

The following are steps to start the project's development servers.

## Launching Backend

- Activate a virtual environment `source traveller-env/bin/activate`
- Switch to server directory `cd server`
- Install needed dependencies `pip3 install -r requirements.txt`
- Create a superuser `python3 manage.py createsuperuser`
- Run Django server `python3 manage.py runserver`

## Launching Frontend

- Switch to client directory `cd client`
- Install dependencies `yarn && yarn build`
- Start a development server which is accessible on local network`yarn dev --host`
