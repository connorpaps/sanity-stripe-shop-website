// for sanity client
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// sanity user information to send requests between website and sanity
export const client = sanityClient({
    projectId: 'blm8zbsi',
    dataset: 'production',
    apiVersion: '2022-03-10',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);