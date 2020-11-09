# Denlay - backend

## Требования

```text
postgres >= 10.14

node >= 12.x
```

## Установка

В корне папки прописать `npm i` где установятся все зависимости для всех сервисов

## Запуск

Перед запуском необходимо создать файлы в сервисах

Сервис авторизации находится в `internal/app/auth`

Сервис инвентаря находится в `internal/app/inventory`

В каждом из сервисом создать файлы `.env` и `ormconfig.js` по их примерам с постфиксом `.example`

### Сервис авторизации

```bash
cd ./internal/app/auth && npm start
```

### Сервис Инвентаря

```bash
cd ./internal/app/inventory && npm start
```
