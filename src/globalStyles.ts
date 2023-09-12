import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
    transition: background-color .5s;
}
body {
    background: #fff;
    font-family: Poppins;
    scroll-behavior: smooth;
    color: #0d0d0d;
}
::-webkit-scrollbar{
    width: 0px;
}
`;
