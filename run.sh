#!/bin/bash

cd /backend
tmux new -s backend -d
tmux send-keys "python3 main.py" C-m

cd /frontend
tmux new -s webend -d
tmux send-keys "PORT=80 npm run start" C-m

while :
do
    sleep 1
done
exec "/bin/bash";