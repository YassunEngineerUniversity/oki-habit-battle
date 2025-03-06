FROM node:22.14.0

ENV TZ Asia/Tokyo

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm install

COPY . /app

CMD ["npm", "run", "dev", "--", "-p", "3001"]