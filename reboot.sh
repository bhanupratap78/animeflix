#!/bin/bash

sudo docker stop webserver
sudo docker rm webserver
sudo docker run -exec -it -p 80:80 -p 5000:5000 -p 3000:3000 --name webserver animeflix.azurecr.io/animeflix:v0.0.1