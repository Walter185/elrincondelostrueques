import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Form = styled.form`
    width: 50%;
    height: 50px;
    display:flex;
    @media screen and (max-width: 1000px) {
        margin-top:20px;
      }
`;

export default function NavBarSearch(){
    const [userInput, setUserInput] = useState("");
    const navigateTo = useNavigate();

    function handleChange(evt){
        setUserInput(evt.target.value);
    }

    function handleSubmit(evt){
        evt.preventDefault();
        navigateTo(`/search/${userInput}`);
    }

    return(
        <Form className="opacity-75" role="search" onSubmit={handleSubmit}>
            <input 
                className="form-control rounded-pill" 
                type="search" 
                name="userInput" 
                value={userInput} 
                placeholder="Ingrese su búsqueda..." 
                onChange={handleChange}/>
        </Form>
    );
}