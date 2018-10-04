FROM node:latest


# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN npm install react-scripts@0.9.5 -g
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
WORKDIR /opt/app
ADD . /opt/app



# set working directory
#RUN mkdir /usr/src/app
#WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
#ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
#ADD package.json /usr/src/app/package.json
#RUN npm install
#RUN npm install react-scripts@0.9.5 -g

# start app
CMD ["npm", "start"]