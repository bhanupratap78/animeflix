FROM ubuntu:18.04

RUN apt update
RUN apt install nodejs -y
RUN apt install npm -y

WORKDIR frontend/
WORKDIR backend/
WORKDIR /

COPY frontend frontend/
COPY backend backend/

WORKDIR backend/
RUN apt install python3-pip -y
RUN pip3 install -r requirements.txt

RUN apt install tmux -y
RUN apt install curl -y
RUN apt install vim -y

WORKDIR /
COPY run.sh /
RUN chmod +x run.sh
ENTRYPOINT ["/bin/bash", "./run.sh"]