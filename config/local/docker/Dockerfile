FROM            node:10.13.0

# Creates app directory
RUN             mkdir -p /var/code/

WORKDIR         /var/code/
COPY            ./ /var/code/

# Installs external dependencies.
RUN              yarn install

# Starts the development server
CMD              [ "yarn", "start" ]
