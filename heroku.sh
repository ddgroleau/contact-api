#!/bin/bash

heroku container:push web -a ddgroleau-api
heroku container:release web -a ddgroleau-api