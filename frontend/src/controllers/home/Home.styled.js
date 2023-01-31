import styled from "styled-components";
import Hero from "../../assets/Hero.jpg";

export const StyledHome = styled.div`
    height: 70vh;
    position: relative;
    .bg-image {
        /* The image used */
        background-image: url(${Hero});
        
        /* Add the blur effect */
        filter: blur(8px);
        -webkit-filter: blur(8px);
        
        /* Full height */
        height: 100%; 
        position:relative;
        
        /* Center and scale the image nicely */
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      }
      
      /* Position text in the middle of the page/image */
      .bg-text {
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0, 0.4); /* Black w/opacity/see-through */
        color: white;
        font-weight: bold;
        border: 3px solid #f1f1f1;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
        width: 80%;
        padding: 20px;
        text-align: center;
      }
`;