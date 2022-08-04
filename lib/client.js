import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

//create a sanity client
export const client = sanityClient( {
    projectId: 'haqrw8xt',
    dataset: 'production',
    apiVersion: '2022-03-10',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageUrlBuilder( client );
//fetch images from store
export const urlFor = ( source ) => builder.image(source);