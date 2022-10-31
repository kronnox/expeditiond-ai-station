# expeditiond-ai-station

Setup Truck:
Auf dem Truck ist eine spezielle docker-compose die auf Docker-Repo auf GitHub zugreift.
Autostart => Chrome im Kiosk Mode

Update:
Lokal builden => push auf Docker-Repo => docker down => docker pull => docker up


Model:
https://drive.google.com/file/d/1-SQuEgz1UkAg3TkwKYf4GI5GvzO3fmQm/view


docker run --rm -d  wot_backend:latest

docker run --rm -d  -p 80:80/tcp wot_frontend:lates