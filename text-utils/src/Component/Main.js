import React , {useState} from 'react'
import dark from "../Assets/dark.png"
import light from "../Assets/light.png"

export default function Main() {
    const [Text,setText] = useState("");
    const change_mode = (e) => {
        setText(e.target.value);
    }
    const click_mode_up = () =>{
        let new_text = Text.toUpperCase();
        setText(new_text);
    }
    const click_mode_low = () =>{
        let new_text=Text.toLocaleLowerCase();
        setText(new_text);
    }
    const clear_text = () =>{
        setText("");
    }
    let word = 0;
    if(Text===""){
        word=0;
    }
    else{
        word = Text.split(" ").length;
    }

    const [mystyle, setmystyle] = useState({
        color:"black"
    })
    const [btntext, setbtntext] = useState(dark)
    const toggle_style = ()=>{
        if(mystyle.color==="black"){
            setmystyle({
                color:"white",
                backgroundColor:"black"
            })
            setbtntext(light)
        }
        else{
            setmystyle({
                color:"black",
                backgroundColor:"white"
            })
            setbtntext(dark)
        }
    }
    const copy_text = ()=>{
        navigator.clipboard.writeText(Text)
        alert(Text + " is copied to the Clipboard!!")
    }
    return (
        <>
    <div className="main" style={mystyle}>
        <img src={btntext} onClick={toggle_style} alt="" />
        <h1 style={mystyle}>Welcome to Text-Area</h1>
        <textarea style={mystyle} name="" id="" value={Text} cols="100" placeholder='Write Something here!!' onChange={change_mode} rows="12"></textarea>
        <div className="button">
        <button style={mystyle} onClick={click_mode_up}>Convert to Upper Case</button>
        <button style={mystyle} onClick={click_mode_low}>Convert to Lower Case</button>
        <button style={mystyle} onClick={clear_text}>Clear Text</button>
        <button style={mystyle} id='c_text' onClick={copy_text}>Copy Text</button>
        </div>
        <div className="preview">
            <h3 style={mystyle}>Your Text Summary</h3>
            <p style={mystyle}>
            {word} words and {Text.length} characters<br/>
            {0.004*word} Minutes takes to Read
            </p>
        </div>
    </div>
    </>
  )
}