import React, { useState } from 'react'
import dark from "../Assets/dark.png"
import light from "../Assets/light.png"
export default function About() {
    const [mode, setmode] = useState(dark)
    const [mystyle, setmystyle] = useState({
        color:"black"
    })

    const toggle_style = ()=>{
        if(mystyle.color==="black"){
            setmystyle({
                backgroundColor:"black",
                color:"white",
            })
            setmode(light)
        }
        else{
            setmystyle({
                backgroundColor:"white",
                color:"black",
            })
            setmode(dark)
        }
    }
  return (
    <div style={mystyle} className='about_container'>
        <img src={mode} onClick={toggle_style}  alt="" />
    <div style={mystyle} className="about">
    <h1>This is About Page</h1>
    <p>TextUtils is a ReactJs website built primarily to do various operations on regular typed text. You can safely use WordPad or NotePad for text drafting, and saving, but TextUtils offers much more than simple text drafting and formatting. TextUtils can convert your text to any case in just one simple click of a button. It can extract links and numbers safely from a labyrinth of random text or sophisticated documentation. It has an improved property of base64 encoding, reversal of your inputted text.You can even remove whitespaces from your scripted documents, and wear up your earphones to listen to it, instead of straining your eyes! It does a detailed analyzing of your text, and provides an output of words, and characters, along with reading time as well. The best part of TextUtils is that it is an open source project, as a result, dozens of new features are in the upcoming, which definitely makes it a cut above the rest.</p>
    </div>
    </div>
  )
}
