export type TDOM = {
    preview: HTMLImageElement,
    loginForm: HTMLDivElement,
    loginImg: HTMLImageElement,
    searchImg: HTMLImageElement,
    headerInput: HTMLInputElement,
    signInRadio: HTMLElement,

    singInLogin: HTMLInputElement,
    singInPassword: HTMLInputElement,
    singInButton: HTMLButtonElement,
    singInInputs: unknown,
    messageSignIn: HTMLElement,
    messageSignUp: HTMLElement,

    singUpFirstName: HTMLInputElement,
    singUpLastName: HTMLInputElement,
    singUpLogin: HTMLInputElement,
    singUpPassword: HTMLInputElement,
    singUpButton: HTMLButtonElement,
    singUpInputs: unknown,

    modalIcon: HTMLDivElement,
    mainArea: HTMLDivElement,

    filmsArea: HTMLDivElement,
    filterButton: HTMLImageElement,
    filtersForm:HTMLFormElement,
    templateCard: string,
    statusSelect: HTMLLabelElement,
    resetButton: HTMLButtonElement,
    pagination: HTMLDivElement,

    checkAdult:HTMLInputElement,
    checkPaidOff:HTMLInputElement,
    checkReleased:HTMLInputElement,
    countrySelect:HTMLLabelElement,
    genresSelect: HTMLLabelElement,
    bigButton:HTMLButtonElement,

    currentPage: HTMLSpanElement,
    lastPage: HTMLSpanElement,
    paginationBtnNext:HTMLImageElement,
    paginationBtnPrev: HTMLImageElement
}