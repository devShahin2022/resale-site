import React from 'react';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';

const BlogPage = () => {
    return (
        <div>
            <NavBar></NavBar>
            <div className="container">
                 <h1 className='bg-primary py-5 mb-4 text-center text-light'>Iam blog page</h1>
                
                
                <p className="lead fw-bold"># What are the different ways to manage a state in a React application?</p>
                <p className="lead">

                In React apps, there are at least seven ways to handle the state. Let us briefly explore a few of them in this part.

                URL
                We can use URL to store some data e.g.

                The id of the current item, being viewed
                Filter parameters
                Pagination offset and limit
                Sorting data
                Keeping such data in the URL allows users to share deep links with others.

                It is recommended to avoid storing such information in the app’s state to avoid the URL in our app getting out of sync. The URL should be used as the system of record, Read from it as needed for information related to sorting, pagination, etc. Update the URL as required when the settings change

                React Router is a great tool to handle routes and manage the params.
                <p className="lead my-4">
                 The second option is to store the state in the browser via web storage. This is useful when we want to persist state between reloads and reboots. Examples include cookies, local storage, and IndexedDB. These are native browser technologies.

                    Data persisted in the browser is tied to a single browser. So, if the user loads the site in a different browser, the data will not be available.

                    We avoid storing sensitive data in the browser since the user may access the app on a shared machine. Some examples of where web storage might be most useful include storing a user’s shopping cart, saving partially completed form data or storing JWT token in HttpOnly Cookie.
                </p>
                <p className="lead my-4">
                The third option is to use store state locally. It is useful when one component needs the state. Examples include a toggle button, a form, etc.
                </p>
                <p className="lead my-4">
                The Fourth option is to define the state in the parent component. Often, the same state is used across multiple components. In those cases, it is useful to lift the state to a common parent. The lifting state is a two‑step process. First, we declare the state in a common parent component, and then we pass the state down to child components via props.

                </p>
                <p className="lead my-4">
                 The fifth option is to compute the new state based on the available state and we do not need to declare a state at all. If there are existing values that can be composed to give us the information we need, then we can calculate that information on each render instead of storing it. Some examples include calling .length on an array to determine the number of records instead of storing a separate numItems variable in the state or deriving an errorsExist boolean by checking if the errors array is empty.  
                    
                </p>
                </p>
                <p className="lead fw-bold"># How does prototypical inheritance work?</p>
                <p className="lead">
                <p className="lead my-4">
                The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.
                    
                </p>
                </p>
                <p className="lead fw-bold"># What is a unit test? Why should we write unit tests?</p>
                <p className="lead">
                    The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.
                </p>
               
                <p className="lead fw-bold"># React vs. Angular vs. Vue?</p>
                <p className="lead">
                Vue provides higher customizability and hence is easier to learn than Angular or React. Further, Vue has an overlap with Angular and React with respect to their functionality like the use of components. Hence, the transition to Vue from either of the two is an easy option.

                <p className="lead my-3">
                Angular is a front-end framework with lots of components, services, and tools. On Angular’s site, you can see that they define Angular as: 

                      “The modern web developer’s platform”

                    It is developed and maintained by Google developers, but curiously it is not used to implement any of their most common products such as Search or YouTube.
                </p>

                <p className="lead my-3">
                React is considered a UI library. They define themselves as:

“A JavaScript library for building user interfaces”

Facebook developers are behind the development and maintenance of this library. And, in this case, most of Facebook’s products are made with React.

                </p>

                <p className="lead my-3">

                Vue.js is, according to its site:

“A progressive JavaScript framework”

Vue.js is developed and led by Evan You, but also it counts on a huge open-source community.
                </p>

                </p>
           
            </div>
            <Footer></Footer>
        </div>
    );
};

export default BlogPage;