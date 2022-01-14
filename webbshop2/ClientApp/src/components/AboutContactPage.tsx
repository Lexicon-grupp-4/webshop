import React from 'react';


export default function AboutContactPage() {
    // TODO Add form validation and disable submit button accordingly


    return (
        <div>
            <h1>About & Contact</h1>

            <ul className="list-inline">
                <li className="list-inline-item">Lexicon Grupp 4</li>
                <li className="list-inline-item"><a href='https://github.com/hodhod212'>Ali</a></li>
                <li className="list-inline-item"><a href='https://github.com/devalalbin'>Albin</a></li>
                <li className="list-inline-item"><a href='https://github.com/karlglans'>Karl</a></li>
                <li className="list-inline-item"><a href='https://github.com/magbor21'>Magnus</a></li>
            </ul>

            <h3>About the Project: [To be filled in better later.....]</h3>

            <p> Web shop Project Specifications The project is creating a web shop. The web shop ́s shopping cart and the views, displaying all the products, should take place in a single page, without reloading. The user should be able to login and be authorized using Identity classes, for shopping history. There shall be an admin interface to be able to edit products, users, orders etc... Required Features: •Ability to create and edit Users •Ability to create and edit Products •Handling orders, allowing users to place them, allowing admins to change them etc... •A shopping cart, ability to go to cashier and print out a receipt •Shopping history in the User’s management page •Display pictures of all the products Code Requirements: •Use ASP.NET MVC to create the pages •Use CSS and Bootstrap to control the layout and appearance of the pages •Use JavaScript, JQuery and React to control the site’s front end •Use Partial Views •Use ASP.NET Identity to handle user registration and login •Use roles and authorization to control access to restricted pages. •Use Entity Framework for database connections and management </p>

        </div>


    );
}
