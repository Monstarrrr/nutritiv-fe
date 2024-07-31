# NUTRITIV-FE

[![](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=black&style=flat)](https://reactjs.org/) 

[![W3C Validation](https://img.shields.io/w3c-validation/html?targetUrl=https%3A%2F%2Fwww.nutritiv.app%2Flogin&color=lemon)](https://validator.w3.org/nu/?doc=https%3A%2F%2Fwww.nutritiv.app%2F)  
[![GitHub commit activity](https://img.shields.io/github/commit-activity/w/monstarrrr/nutritiv-fe)](#) 
[![GitHub last commit](https://img.shields.io/github/last-commit/monstarrrr/nutritiv-fe?color=blue&label=last%20updated)](#) 

[![image_original](https://github.com/user-attachments/assets/4e842201-138c-4d44-84e8-a4db2e589f22)](https://i.imgur.com/RvoPldV.gif)

![RExu2Hm](https://github.com/user-attachments/assets/efdf1bb7-75f3-4683-8468-5a2241cbe960)

![Nxov8rx](https://github.com/user-attachments/assets/e09e65b8-fc19-47ed-8c48-1bb0ee06d771)

![oK74j0B](https://github.com/user-attachments/assets/17ae005d-36b1-43b0-b827-a9ef5c8e7ec7)

![HabwbNS](https://github.com/user-attachments/assets/e93c52e0-a8be-4354-8c2b-48721905f5b5)

💡/ Creating a unique start-up idea

Instead of building an existing webapp's clone, I wanted to create a fresh concept that offers an engaging and enjoyable user experience. I developed a futuristic start-up that produces "superments" (super supplements) with various benefits.

🎨/ Establishing brand identity

Starting with a carefully chosen color palette, I designed a logo and gathered inspiration from platforms like Dribbble.com. I incorporated a floating iceberg to symbolize that there is more beneath the surface of the brand.

🖼️/ Crafting an intuitive landing page

Taking inspiration from the floating iceberg concept, I designed the landing page to showcase product shapes and categories separately, ensuring clarity and preventing confusion.

👤/ User authentication and registration

Implementing secure login and registration processes involved handling credentials and managing redirects to enhance the user experience. Integration with third-party applications like Google and Facebook was also included.

🔒/ Implementing 2FA authentication

To enhance security, I collaborated with the back-end developer to implement two-factor authentication, including QR code generation and backup words functionality.

⚙️/ Managing user settings

Basic user settings such as updating username, email, password, and 2FA were implemented, focusing on user input validation and seamless API calls.

🛡️/ Preventing spam with ReCaptcha

To reduce user friction, I integrated an invisible ReCaptcha solution to maintain security without inconveniencing regular users.

🧊/ Creating 3D models of each item

Using Blender, I designed optimized 3D models for each product. This required expertise in WebGL and libraries like ThreeJS, React-three-fiber, and React-three-drei, as well as addressing compatibility issues.

⏳/ Pre-loading 3D models for seamless integration

To minimize loading times, I implemented pre-loading techniques for the 3D models, leveraging the illusion of multiple canvases using scissoring techniques provided by react-three-drei.

🔍/ Displaying, ordering, and filtering item lists

Items were displayed in chunks with dynamic pagination options and sortable filters for an improved user experience. Careful attention was given to animations to ensure a smooth transition.  

📋/ Displaying individual item details

The individual item page showcased the 3D model, price, and customization options, allowing users to add items to their cart.

🧺/ Managing the shopping cart

The cart functionality enabled users to add and remove items seamlessly, updating the cart icon dynamically. Redux was utilized for state management to ensure scalability.

💳/ Enabling purchases with Stripe

Integrating Stripe's payment processing involved navigating their API complexity and implementing the payment page. Test mode was utilized for a simulated purchasing experience.

💬/ Real-time messaging with websockets

Implementing websockets, I created a 24/7 live support chat feature, showcasing bidirectional communication between the user and support team.

📱/ Ensuring responsiveness

Using a mobile-first approach, I prioritized responsiveness across the entire application to provide optimal user experience, particularly for mobile devices.
