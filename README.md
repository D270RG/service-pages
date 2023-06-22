Как запускать:

1. Создать бд service: CREATE DATABASE service;
2. Сгенерировать бд из schema.sql (адрес подключения в server/database.connector.js)
3. Указать в src/HttpClient.ts адрес сервера 2.1 Опционально указать в server/server.js адрес сервера если надо для настройки прокси
4. Запустить сервер: node ./server/server.js в корне проекта
5. Информация о админ. юзере будет в ./server/Admin.txt (надо сменить)
