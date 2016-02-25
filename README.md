# NodeJS jQuery AJAX File Upload

This is a simple nodeJS application.

The project is an example to provide a simple AJAX upload solution with jQuery.

As i am a frontend developer, i like to build fancy and eyecandy web applications. This project's goals are simple. There is no CSS magick, there is no grid system or other asset frameworks. This is just a simple and almost native application. If you have feel like to boost my project with your design skills, feel free to fork my github.

jQuery don't has built-in file AJAX upload funcion, but there is a very simple way to write your own. We are using jQuery.ajax() function to upload, HTML5 progressbar to show the upload stream. You are free to build frontend codes in pure HTML, but the EJS templating engine has more capabilities (that's very similar to TWIG).

You can use any other backend code to handle incomming files. If you are experienced in PHP, it is ok, but nodeJS is a more modern way to build your applications. If you like coding in JavaScript, here is the first chance to write server-side codes in JS too.

We are providing a simple but powerful web aplication, this way you should use a nodeJS framework, Express to get it fast and easy.

If you want to install this code on your computer, just follow:

    sudo apt-get install nodejs
    md /home/user/Projects/ajaxNode
    cd /home/user/Projects/ajaxNode
    git clone https://github.com/matedon/NodeJS.jQuery.AJAX.File.Upload.git
    npm install
    npm install nodemon -g
    nodemon index.js
    firefox http://localhost:8081

Some useful links in the topic:
    

 - http://api.jquery.com/jquery.ajax
 - http://developer.mozilla.org/en-US/docs/Web/API/FormData
 - http://nodejs.org
 - http://nodemon.io
 - http://www.embeddedjs.com/getting_started.html
 - http://scotch.io/tutorials/use-ejs-to-template-your-node-application
