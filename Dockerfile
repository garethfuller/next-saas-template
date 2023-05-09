# Pin specific version
# Use alpine for reduced image size
FROM node:20.0-alpine3.16 as base

RUN npm install -g pnpm

# Specify working directory other than /
WORKDIR /usr/src/app

# Copy only files required to install dependencies (better layer caching)
COPY package*.json pnpm-lock.yaml ./

FROM base as dev

RUN pnpm install --frozen-lockfile

COPY . .

FROM base as production

ENV NODE_ENV production

# Only install production dependencies
RUN pnpm install --frozen-lockfile --prod

# Use non-root user
# Use --chown on COPY commands to set file permissions
USER node

# Copy remaining source code AFTER installing dependencies.
# Again, copy only the necessary files.
COPY --chown=node:node . .

# Indicate expected port
EXPOSE 3000

