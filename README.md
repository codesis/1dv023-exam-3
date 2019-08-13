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
body-parser
dotenv
express
express-github-webhook
express-handlebars
helmet
octonode
socket.io

Have you implemented any extra features (see below) that could motivate a higher grade of this assignment? If so, describe them.

Only one very simple extra feature which is to be able to close the notification window.
