import "/css/style.css"
import { DOM } from "./dom.js"
import { singIn, singUp, hideForm } from "./singInFunctions"
import { click } from "./constants"
import "/img/logo.png"
import "/img/formFon.jpg"
import "/img/iconSignIn.png"
import "/img/serch.png"

DOM.singInButton.addEventListener(click, singIn);
DOM.singUpButton.addEventListener(click, singUp);
