

import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *, 
    *:after,
    *:before {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        text-decoration: none;
    }
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font: inherit;
        vertical-align: baseline;
    }
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
        list-style-type: none;
        overflow-x: hidden;
        width: 100vw;
        background-color: #101010;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    :root {
        font-size: 62.5% !important;
        --ff-primary: 'Raleway', sans-serif;
    }

    ::selection {
        background:rgba(170, 29, 151, 0.95);
        color: white;
    }
    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-track {
        background: linear-gradient(95deg, rgba(170, 54, 124, 0.3), rgba(74, 47, 189, 0.3)); 
    }
    
    ::-webkit-scrollbar-thumb {
        background: linear-gradient(95deg, rgba(170, 54, 124, 0.95), rgba(74, 47, 189, 0.95)); 
        border-radius: 2px;
    }
`