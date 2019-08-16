Examination 3 for the course 1DV023.

Questions to be answered:

What is the URL to your application?
https://cscloud19.lnu.se

Describe what you have done to make your application secure, both in code and when configuring your application server:

In code I've thought about not using sensitive code such as tokens directly into the application. When working in VSC I used dotenv for example. Then I made sure it was documented in .gitignore so it would not be pushed to github. 
When configuring my application I tried to find suitable packages to install. One of these were helmet, which helps securing Express application by setting various HTTP headers. 
One thing I also made sure I did was to keep the npm packages up to date and not work with outdated products, which could be a security weakness.

Describe the following parts, how you are using them and what their purpose is in your solution:

Reversed proxy (RP): Is a server which protects web servers from attacks. The RP sits in front of the web servers and forwards client, like web browsers, requests to those web servers. RP are mainly implemented to highten security, increase reliability as well as performance. 
In my application I use Nginx as a reversed proxy. Not only for security but it also, e.g, redirects the client from http to https. To enable https I use Let's Encrypt together with Certbot to get the Certificate Authority that is needed.

Process manager (PM): A PM manages the applications and therefore helps the user keeping the applications online. PM also gives the user the ability to start, stop, delete and restart processes. I use the advanced process manager PM2 for my application which has increased productivity as it maintains the application online and if it crashes it reloads.

TLS certificates: TLS stands for Transport Layer Security and is a cryptographic protocol to provide secure exchange of encrypted information over computer network. Websites may use TLS to secure the communications between the web browsers and their servers.
When I sign in to the server I have to provide a public-key as well as when pushing my repo to the server. This is TLS making sure the exchange is secure. 

Environment variables (ENV): an ENV is a dynamic object containing an editable value. This value can be used by a software program or application. It provides a way to influence the behaviour of the system's software, like "LANG" is the variable for which language the software communicates with the user.
When working in VSC I used dotenv which with a .env file contained different secure tokens. My application then read these tokens when sensitive information had to be used. 

What differs in your application when running it in development from running it in production?

When my application was running in development it was developing and could differ from 0-multiple bugs during development. Security was lower during development as packages were not installed and security settings were not done, code could be bugging and so forth. In development there is more room for error and change. 
While in production security packages and settings were complete before the application was put in production and the possible bugs had been taken care of before. 

Which extra modules did you use in the assignment? Motivate the use of them and how you have make sure that they are secure enough for production

body-parser: Used to parse express middleware. In my application I use bodyParser.urlencoded and bodyParser.json. urlencoded means it returns middleware which only parses urlencoded bodies, while bodyParser.json means it return middleware which only parses json bodies. I make sure they are secure enough by seeing when the module was updated, if it were a long time ago or recently. body-parser was updated 4 months ago. I also check how many are using the module, the more - the merrier. At this point 9,809,462 people downloads the module weekly. 

dotenv: Loads environment variables from a .env file into process.env. In my application I use dotenv to load the sensitive tokens I have stored in my .env file so I don't expose the sensitive tokens right in my application code. To make sure dotenv is secure enough for production, I check how many downloads it weekly - as this point 5,456,408 and I check when the module was updated last, which was 3 months ago. 

express: Express is a fast and minimalist web framework for node. I have built my application with Express as the framework as it is user-friendly, robust and we used it in previous assignments. To make sure it is secure enough for production, I check how many downloads it weekly - 9,466,044 as we speak, and when it was updated last which was 3 months ago.

express-github-webhook: Is a Express middleware for handling Github Webhooks. I chose to use this middleware to handle my webhook for GitHub. This middleware is, in my opinion, a bit risky to use because the last time it was updated was 2 years ago and weekly downloads are at this point just 106. However, when using this middleware you provide a secret which in my case I've located in my .env file. Therefor the sensitive token is not exposed openly. However, if I would change something in my application regarding the modules this would be the one middleware I would try to replace with something more recently updated and more popular.

express-handlebars: Is a handlebars view engine for Express. Using this in my application to render content. To make sure the middleware is secure enough for production, I check how popular it is (as of now - 81,171 downloads weekly) and when the last update was made (3 months ago).

helmet: Helps you secure the Express applications by setting various HTTP headers. In my application I use the default functions such as frameguard to prevent clickjacking and xssFilter which adds some small XSS protections. To make sure this module is secure enough, I check the popularity (atm 560,945) and when the last update was (atm 23 days ago). 

octonode: Is a library for nodejs to access the GitHub v3 API. I use this in my homeRouter file in my application. To make sure Octonode is secure enough, I check the weekly downloads, now of 10,820 and was updated 10 months ago.

socket.io: Is a library for realtime web applications and consists of two parts, a client side that runs in the browser and a server side library for nodejs. Socket.io uses primarily the WebSocket. I use it in my application to create the Real Time events. To make sure socket.io is secure enough, I can see that there is 11M downloads per month and the last update was 8 months ago. 

Have you implemented any extra features (see below) that could motivate a higher grade of this assignment? If so, describe them.

Only one very simple extra feature which is to be able to close the notification window.
