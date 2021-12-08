import "/css/style.css"
import { DOM } from "./dom.js"
import { singIn, singUp } from "./singInFunctions"
import { click } from "./constants"
import "./img"
import { openSignIn, preview } from "./preview"

preview();

DOM.loginImg.addEventListener(click, openSignIn);
DOM.singInButton.addEventListener(click, singIn);
DOM.singUpButton.addEventListener(click, singUp);
DOM.preview.addEventListener(click, openSignIn);
