# HardwareStore

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Project RaulHardwareStore

## Description

The RaulHardwareStore project is a solution that allows Raul, the owner of a hardware store called "La Ferretería de Don Raúl", to keep track of inventory, generate invoices for customers, manage suppliers and receive notifications about the stock of products.

## Functionalities

The project offers the following functionalities:

- Inventory control: Allows to manage product inventory and keep track of available units.

- Invoicing: Allows to generate invoices for customers based on sales made.

- Supplier management: Allows to manage suppliers and associate them with the products they supply.

- Stock notifications: Sends notifications when the quantity of a specific product reaches its minimum or maximum quantity, allowing to place orders or avoid receiving more units than necessary.

## Technologies used

The project was developed using the following technologies:

- Backend: Spring Boot with reactive programming and WebFlux.

- Frontend: Angular with Redux pattern implemented using NgRx.

- User authentication: Firebase.

## Installation and execution

Follow these steps to configure and run the project in your local environment:
### Backend

1. Make sure you have Java and Spring Boot installed on your system.
2.  Clone the backend repository from GitHub: [https://github.com/jsfc2199/Back-end-RaulHardwareStore.git](https://github.com/jsfc2199/Back-end-RaulHardwareStore.git)

3. Navigate to the cloned project folder.

4. Start the backend server

### Frontend

1. Clone the frontend repository from GitHub: [https://github.com/TuUsuario/Frontend-RaulHardwareStore.git](https://github.com/TuUsuario/Frontend-RaulHardwareStore.git)

2. Make sure you have Node.js and npm installed on your system.

3. Navigate to the cloned frontend project folder.

9. Execute the `npm install` command to install the frontend dependencies.

10. Configure the HTTP service URLs in the frontend to point to the port where the backend runs locally.

11. Start the frontend server by running the following command:

 ```
 ng serve -o
 ```

12. The browser will open automatically to access the application.

Remember that to run the project locally, you will need to have Java, Spring Boot, Node.js and npm configured.

## Contributions

Contributions to the project are welcome. If you wish to contribute, follow the steps below:

1. Perform a fork of the repository.

2. Create a new branch for your changes: `git checkout -b my-branch`.

3. Make the necessary modifications and commit your changes: `git commit -m "Description of changes"`.
4. Push your changes to the remote repository: `git push origin my-branch`.
5.  Open a Pull Request in the original repository.
    
6.  Wait for your changes to be reviewed and merged into the main project.


## Additional Notes

- The project uses Firebase for user authentication. Running npm install should not cause any issues for the frontend, however, be sure to set up the Firebase credentials correctly and if necessary create your project in firebase to make use of the application as it is possible that the credentials may not exist and the original firebase project may be deleted.
    
- Before running the project, make sure you have installed all the dependencies for both the backend and the frontend. In the case of the frontend, it is recommended to run the `npm install` command to make sure you have all the dependencies updated.
    
- If you wish to work on the project, please note that services using HTTP methods must be modified to point to local URLs on the port configured for the backend.
- Currently there are no `spec.ts` test files because at the time of the project we did not have the knowledge to perform unit tests.
