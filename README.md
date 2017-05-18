# Gulp Start

v0.0.1


**Gulp Start** позволяет легко и быстро начать работу над проектом с использованием сборщика Gulp.

Соответствуя основным потребностям в разработке позволяет просто склонировать проект к себе, инициализировать и начать работать!

По желанию можно добавить свои плагины или не пользоваться всеми, которые есть. Весь код прокомментирован и по нему легко ориентироваться.

## Что может эта сборка
 + Компилировать **LESS** в **CSS**
 + Запустить **локальный сервер** с возможностью просмотра сайта с разных устройств одной сети
 + Конкатенировать файлы
 + Минифицировать **JavaScript** и **CSS**
 + Подставлять **вендорные префиксы** к стилям
 + Минифицировать изображения
 + и многое другое

## Как развернуть среду для проекта
 1. Скачиваем содержимое репозитория в папку проекта, или скачиваем архив и в ручную распаковываем его
 2. В папке проекта в консоли выполняем команду **`npm i`** (должен быть установлен [Node.JS](https://nodejs.org/en/) и [NPM](https://www.npmjs.com/))
 3. Когда необходимые пакеты буду установлены (может потребоваться время), инициализируем настройку проекта (опционально) командой **`npm init`**
 4. Чтобы сразу начать отслеживание файлов и запустить локальный сервер выполните команду **`gulp`** (уже можно работать!)
 5. Для загрузки популярных библиотек/плагинов и т.п. воспользуйте командой **`bower i Название_пакета`**. Возможные пакеты можно найти [здесь](https://bower.io/search/). По-умолчанию, все библиотеки устанавливаются в *app/libs*, такое поведение можно изменить в файле **.bowerrc** в корне проекта. (Не забудьте добавить JS файлы через **libs.js**!)
 5. Для компиляции проекта в продакшен выполните команду **`gulp build`**

## Структура
Стуктура проекта предельно проста:
 + **.bowerrc** — настройка пакетного менеджера Bower
 + **gulpfile.js** — скрипт настроек и тасков для Gulp'а
 + **package.json** — файл содержит информацию о проекте, авторе, а также список зависимостей
 + папка **app** — папка используемая во время непосредственно работы над проектом
 + папка **dist** — папка готового проекта, которая содержит минифицированные версии файлов и не содержит файлы типа **.less**
 + папка **node_modules** — папка, содержащая зависимости проекта
 
## Рекомендации к использованию
Чтобы работа над проектом с **Gulp Start** была легче и быстрее, рекомендую придерживаться следующих правил:
1. В папке **app** придерживайтесь следующей структуры:
 
+ css - скомпилированные css файлы
+ fonts - папка со шрифтами проекта
+ img - изображения
+ js - папка для пользовательских js файлов
+ libs - папка установленных библиотек
+ less - папка для less файлов


2. **HTML** файлы по умолчанию компилируются в корень **app**, при необходимости можно изменить в  **gulpfile.js**
3. Все библиотеки устанавливаются в **app/libs**. Также можно изменить в **.bowerrc**. Для их подключения используйте файл **js/libs.js** c директивой **@@include** (напр. **`@@include('../libs/jquery/dist/jquery.js')`**), если это **JS** и файл **libs.sass** (который нужно импортировать в style.less или подключать библиотеки сразу в нём), если это **CSS** (**примеры подключений библиотек есть в самих файлах**)
4. По-умолчанию компилируется только **style.less**, остальные файлы стилей следует импротировать в него, или заменить строку таска **less** **`return gulp.src('app/less/style.less')`** на **`return gulp.src('app/less/*.less')`**
5. В верстку стоит подключать **минифицированные файлы** — style.min.css/common.min.js/libs.min.js, т.к. именно **они попадают затем в билд!**


