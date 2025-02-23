#TodoApp

This is a full-stack Todo application using Angular (Frontend), .NET (Backend), and Docker for containerization.

Technologies Used:

    Docker (version 4.36.0)
    Node.js (version 20)
    Angular (version 19)
    .NET SDK (version 9)
    Git

How to run the app:

First download the repository: git clone https://github.com/alkhs10/Todoapp.git

Move inside the main folder : cd Todoapp

Now we have to install the dependencies defined in my project's package.json file.

cd todo-app
npm install 
cd ..


Start docker application.

docker-compose up --build

This will build the frontend and backend Docker images and start the containers.


#Access the Application:

Frontend: Visit http://localhost:8080/todo-app/ to view the Todo application interface.

Backend (API): Visit http://localhost:5108/api/Todo to interact with the backend API.

#Additional Notes:

Ensure Docker is installed and running before executing.
