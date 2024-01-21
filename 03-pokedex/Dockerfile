
##TODO: Vanos a construir una imagen a partir de otra imagen
#FROM node:18-alpine3.15
#
##TODO: Crear directorio
#RUN mkdir -p /var/www/pokedex
##Todo: directorio de trabajo 
#WORKDIR /var/www/pokedex
#
##Todo: copiar directorio y archivos 
#COPY . ./var/www/pokedex
#COPY package.json tsconfig.json tsconfig.build.json /var/www/pokedex
#RUN yarn install --prod
#RUN yarn build
#
##todo: Dar permiso para ejecutar la aplicacion
#RUN adduser --disabled-password pokeuser
#RUN chown -R pokeuser:pokeuser /var/www/pokedex
#USER pokeuser
#
##?Limpiar cache
#RUN yarn cache clean --force
#
#EXPOSE 3000
#
#CMD ["yarn", "start"]


#Instalar dependencias solo cuando se modifica el archivo package.json
FROM node:18-alpine3.15 AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable
RUN pnpm install --frozen-lockfile

#Construir la aplicacion con dependencias de cache
FROM node:18-alpine3.15 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable
RUN pnpm build

#Imagen de produccion, copia archivos y ejecuta la aplicacion
FROM node:18-alpine3.15 AS runner
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable
RUN pnpm install --prod
COPY --from=builder /app/dist ./dist

CMD ["node", "dist/main"]