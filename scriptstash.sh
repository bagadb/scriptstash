#!/bin/bash

#wget -q -O - "https://scriptstash.herokuapp.com/s/$1" | bash -s [param1] [param2] ...

wget "http://localhost:5500/s/$1" 