# FINE Headphones - A Next.js Ecommerce Website using Sanity.io and Stripe Payments.

View a live demo at: https://sanity-stripe-shop-website.vercel.app/

![Shop Website](https://i.imgur.com/IxJNVQ6.png)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Features Include:
- A fully functioning ecommerce shop with products, a shopping cart, and real payment support.
- Easily add, edit, or remove products live through sanity manager.
- Checkout payment support with shipping and card processing through stripe.
- Shop includes a main store page with individual product detail pages for each product.
- Products can be added to a shopping cart accessable anywhere on the website.

## Setup

To set up a development environment, please follow these steps:

1. Clone the repo

   ```shell
    git clone https://github.com/connorpaps/sanity-stripe-shop-website.git
   ```

2. Change directory to the project directory

    ```shell
    cd sanity-stripe-shop-website
    ```

3. Install the dependencies
   
    ```shell
     npm install
    ```

    If you get an error, please check the console for more information.

    If you don't get an error, you are ready to start development.

4. Run the app
   
    ```shell
    npm run dev
    ```

    Project will be running in the browser.

    Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
    
4. Update .env api key
   
    - Create a .env file at the root if not already there.
    - Add NEXT_PUBLIC_SANITY_TOKEN, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, and NEXT_PUBLIC_STRIPE_SECRET_KEY
    - API keys can be obtained from https://www.sanity.io/manage and https://stripe.com/ by signing up and creating new projects.
    - Restart the local server by closing it and running npm run dev in the terminal again.
  
