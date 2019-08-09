#!/usr/bin/env bash

# Dev scripts
if [[ $1 == 'dev' ]]
then
    if [[ $2 == 'restart' ]]
    then
        echo "You are restarting $1 environment."
        cd config/local/docker
        docker-compose stop
        docker-compose up
    elif [[ $2 == 'down' ]]
    then
        echo "You are stopping and removing $1 environment."
        cd config/local/docker
        docker-compose down
    else
        echo "You are running $1 environment."
        cd config/local/docker
        echo "Building $1 docker."
        docker-compose up --build
    fi

# Staging scripts
elif [[ $1 == 'test' ]]
then
    echo "You are running $1 environment."

# Prod scripts
elif [[ $1 == 'prod' ]]
then
    echo "You are running $1 environment."

else
    echo "Please choose 'dev', 'test' or 'prod', in order to get your environment running or built."
fi

