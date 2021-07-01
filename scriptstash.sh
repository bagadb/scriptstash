#!/bin/bash

if [ "$1" = "list" ]; then
    wget -q -O - "https://scriptstash.herokuapp.com/$1"
else
    wget -q -O - "https://scriptstash.herokuapp.com/s/$1" | bash -s $2 $3 $4 $5
fi