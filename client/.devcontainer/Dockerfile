FROM node:16.20-alpine AS dev

RUN apk update
RUN apk add bash git sudo
RUN sudo npm i -g nx

RUN SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" \
    && echo $SNIPPET >> "/root/.bashrc" \
    && mkdir /commandhistory \
    && touch /commandhistory/.bash_history

FROM dev AS server

COPY . .

CMD ["yarn", "dev"]
