import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Form = styled.form`
    width: 50%;
    height: 50px;
    padding-right: 15px;
    display:flex;
    @media screen and (max-width: 1000px) {
        width: 50%;
        position: static;
        margin-left: 170px;
        margin-top: -50px;
        display: flex;
        ;
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
        <Form className="opacity-75" role="search" onSubmit={handleSubmit} >
            <input 
                className="form-control rounded-pill" 
                type="search" 
                name="userInput" 
                value={userInput} 
                placeholder="Buscar por producto, categoría, ubicación..." 
                onChange={handleChange}
                />
        </Form>
    );
}