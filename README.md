# team-together
## How to start:
### Install Node.js
https://nodejs.org/de/download/
### Clone repo
```
git clone https://github.com/team-together/team-together.git
```
### Install dependencies
```
cd teamtogether
npm install express
```
### Start service
```
node server.js
```
### Local server
URL: localhost:8080
### AWS
URL: http://ec2-13-52-99-214.us-west-1.compute.amazonaws.com/

## Docker:
### build docker image
```
docker build -t team_together_web_app .
```
### create docker container
```
docker run -d -p 80:8080 --name web-app team_together_web_app
```
### kill running container
```
docker rm -f web-app
```