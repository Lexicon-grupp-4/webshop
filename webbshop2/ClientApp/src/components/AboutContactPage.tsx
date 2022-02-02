import React from 'react';
import { Container } from 'reactstrap';
import './NavMenu.css';


export default function AboutContactPage() {



    return (
        <div>
            <Container>
            <h1>Kontakt & Info</h1>

            <ul className="list-inline">
                <li className="list-inline-item">Lexicon Grupp 4</li>
                <li className="list-inline-item"><a href='https://github.com/hodhod212'>Ali</a></li>
                <li className="list-inline-item"><a href='https://github.com/devalalbin'>Albin</a></li>
                <li className="list-inline-item"><a href='https://github.com/karlglans'>Karl</a></li>
                <li className="list-inline-item"><a href='https://github.com/magbor21'>Magnus</a></li>
            </ul>

            <h3>Om Projektet</h3>

            <h2>Webbshop Projektspecifikationer</h2><br/>

            <p>Projektet går ut på att skapa en webbshop. Webbutikens varukorg och visningarna, som visar alla produkter, bör ske på en enda sida, utan att laddas om.<br />
                    Användaren ska kunna logga in och vara auktoriserad med hjälp av identitetsklasser, för shoppinghistorik.<br />
                    Det ska finnas ett admingränssnitt för att kunna redigera produkter, användare, beställningar etc...<br /> </p>
       

            <p><strong>Nödvändiga funktioner:</strong></p><br/>


                  <ol>
                        <li>Möjlighet att skapa och redigera användare</li>
                        <li>Möjlighet att skapa och redigera produkter </li>
                        <li>Hantera beställningar, tillåta användare att lägga dem, tillåta administratörer att ändra dem etc... </li>
                        <li>En kundvagn, möjlighet att gå till kassan och skriva ut en kvitto </li>
                        <li>Shoppingshistorik på Användarens hanteringssida </li>
                        <li>Visa bilder på alla produkter</li>

                    </ol>

               <p><strong>Kodkrav:</strong></p> <br/>
 
                <ol>
                    <li>Använd ASP.NET MVC för att skapa sidorna </li>
                    <li>Använd CSS och Bootstrap för att styra layouten och utseendet på sidorna </li>
                    <li>Använd JavaScript, JQuery och React för att styra webbplatsens gränssnitt </li>
                    <li>Använd partiella vyer  </li>
                    <li>Använd ASP.NET-identitet för att hantera användarregistrering och inloggning </li>
                    <li>Använd roller och behörighet för att kontrollera åtkomst till begränsade sidor. </li>
                    <li>Använd Entity Framework för databasanslutningar och hantering</li>

                </ol>


            </Container>
        </div>


    );
}
