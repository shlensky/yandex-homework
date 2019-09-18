# Домашнее задание в Яндекс ШРИ 2019

## Запуск
    npm start

По умолчанию сервер считывает репозитории из родительской директории.
Так же можно передать конкретный путь к директории с репозиториями:

    node index.js /path/to/repos

При изменении в исходных файлах, сервер автоматически перезапускается.

## Примечание по поводу RCE

Скорее всего сейчас есть дыры в безопасности, т.к. нету экранизации параметров из запросов.
Наверняка можно выполнить инъекцию вредоносного кода, передав команду в каком нибудь параметре (repositoryId и т.п.).


## Бонус

Не успел сделать бонусное задание, но суть сводится к тому что нужно использовать Stream API.
Читать файлы небольшими кусочками, и подсчитывать кол-во символов.

## Второе задание по верстке

Не стал прикручивать инструменты (scss и т.п.), т.к. у нас будет отдельная лекция "Тулинг",
и наверняка в рамках домашнего задания будем настраивать билд систему.
