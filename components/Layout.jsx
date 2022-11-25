import React from 'react';
// head element that appears above body similar to html head
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

// children is the current component loaded on the page, obtained from _app.js props
const Layout = ({children}) => {
  return (
    <div className="layout">
      <Head>
        <title>Pro Audio Store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      {/* Renders the main page content through children prop Component from app.js */}
      <main className="main-container">
        {children}
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout