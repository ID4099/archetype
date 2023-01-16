# Building layer
FROM node:16-alpine as development

WORKDIR /app

#Copy all dev-dependencies files 
COPY tsconfig*.json ./
COPY package*.json ./
COPY nest-cli*.json ./

RUN npm ci

COPY src/ src/

RUN npm run build

# Runtime Production layer
FROM node:16-alpine as production

WORKDIR /app

#Copy dependencies files
COPY package*.json ./

#Install runtime dependencies (without dev/test dependencies)
RUN npm ci --omit=dev

#Copy production build from stage=development
COPY --from=development /app/dist ./dist/

#Expose application PORT
EXPOSE 3000

#Start application
CMD [ "node", "dist/main.js" ]