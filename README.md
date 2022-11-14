# Название проекта:

Карты для обучения

## Описание проекта:

Работа с картами и колодами. Колоды - хранилище для карт.
Карты - содержат в себе вопросы, на которые необходимо дать один из вариантов ответа.
На сколько, Вы, верно поняли вопрос, и дали на него ответ.
В зависимости от того, на сколько точно вы ответили на вопрос, ему присваивается грейд (от 0 до 5).
Пользователю представляется возможность создавать свои колоды, со своим набором карт. 
Обучаться по картам других пользователей. 

## Пример колод:
![img_1.png](img_1.png)
## Пример карт:
![img_2.png](img_2.png)
## Пример обучения по картам с вопросами:
![img_3.png](img_3.png)
## Пример вариантов ответа:
![img_4.png](img_4.png)

## Нюансы:
При добавлении изображения используется формат base-64, для пользователя это значит, 
что загружать картинки придётся весом не более 1 мб.

## Технологии:
![React](https://img.shields.io/badge/-React-090909?style=for-the-badge&logo=React)
![Redux](https://img.shields.io/badge/-Redux-090909?style=for-the-badge&logo=Redux)
![TypeScript](https://img.shields.io/badge/-TypeScript-090909?style=for-the-badge&logo=TypeScript)
![Axios](https://img.shields.io/badge/-Axios-090909?style=for-the-badge&logo=Axios)
![ReduxThunk](https://img.shields.io/badge/-ReduxThunk-090909?style=for-the-badge&logo=ReduxThunk)
![ReactRouterDom](https://img.shields.io/badge/-ReactRouterDom-090909?style=for-the-badge&logo=ReactRouterDom)
![Formik](https://img.shields.io/badge/-Formik-090909?style=for-the-badge&logo=Formik)
![SASS](https://img.shields.io/badge/-sass-090909?style=for-the-badge&logo=sass)
![MUI](https://img.shields.io/badge/-MUI-090909?style=for-the-badge&logo=MUI)

## Архитектура проекта:
<ul>
<li>Папка api - запросы на сервер (axios)</li>
<li>Папка bll - редьюсеры по таскам и общий store</li>
<li>Папка common - пере используемые компоненты, картинки, общие файлы</li>
<li>Папка component - основные компоненты, для работы всего приложения</li>
<li>Папка utils - общие утилитные функции, для основных компонент.</li>
<li>Компонента App.tsx находится в корневой папке проекта.</li>
</ul>

## Файл package.json:
![img.png](img.png)




