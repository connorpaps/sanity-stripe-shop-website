import React from 'react';
import { Layout } from '../components';
import '../styles/globals.css'

import {StateContext} from '../context/StateContext';
import {Toaster} from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  // Component is the current component loaded on the page wrapped in Layout component to add header/footer and state context component to allow access to site wide data
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}

export default MyApp
