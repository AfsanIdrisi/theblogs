
import React from 'react'
import Blog from './Blog'

export async function generateMetadata({ searchParams }) {
    let id = await searchParams.id;  
    let response = await fetch(`http://localhost:5000/search?id=${id}`);
    let data = await response.json();

    return {
        title: data[0]?.meta_title || "Default Title",  
        description: data[0]?.meta_description || "Default description",  
    };
}
export default function Page({searchParams}) {
    let id=searchParams.id;
  return (
    <div>
      <Blog newId={id}/>
    </div>
  )
}
