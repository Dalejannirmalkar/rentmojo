# Specifies the base image we're extending
FROM node:10.15.3

# Specify the "working directory" for the rest of the Dockerfile
WORKDIR /src

# Install packages using NPM 5 (bundled with the node:9 image)
COPY ./package.json /src/package.json
COPY ./package-lock.json /src/package-lock.json
RUN npm install --silent

# Add application code
COPY ./ /src

# Set environment to "development" by default
ENV NODE_ENV dev

# Allows port 3000 to be publicly available
EXPOSE 1230
# The command uses nodemon to run the application
CMD ["node","app.js"]