# GDG-BH - Gerador de Certificados

[![Build Status](https://travis-ci.org/meanjs/mean.svg?branch=master)](https://travis-ci.org/meanjs/mean)
[![Dependencies Status](https://david-dm.org/meanjs/mean.svg)](https://david-dm.org/meanjs/mean)

O gerador de certificados tem como intuito gerar certificados de participação dos eventos promovidos pelo GDG-BH.
A aplicação fornece um template padrão em HTML, o usuário informa os dados do evento e faz upload do CSV contendo as informações do participante.
Com essas entradas o gerador irá gerar os certificados em formato PDF.

## Version
0.1.0b

## Dependencias

* [mongoDB](http://www.mongodb.org/)
* [PhantomJS](http://phantomjs.org/download.html)

## Desenvolvimento

Você quer contribuir? Excelente!!

O Gerador do GDG usa a stack MEAN.js e o Heroku.

Segue abaixo alguns frameworks usados no projeto:

* [node.js] - evented I/O for the backend
* [AngularJS] - HTML enhanced for web apps!
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [Grunt] - build system
* [jQuery] - duh

Workflow de Desenvolvimento


Para levantar o server da aplicação:

```sh
$ grunt
```

Para rodar os testes:

```sh
$ karma start
```

## License
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
