"use strict";
//---------Creating Elements variable for button fields

//---------Parent Div element to store all button elements
let btnMenuDiv = document.createElement('div')

//---------Input field element and property setting
let gridSizeField = document.createElement("input")
gridSizeField.type = 'number'
gridSizeField.setAttribute('name', 'grid-size')
gridSizeField.setAttribute('value', '16')
gridSizeField.setAttribute('min', '16')
gridSizeField.setAttribute('max', '100')
gridSizeField.style.width = "80px"
gridSizeField.style.padding = "8px"
//---------Submit button for input field
let gridSizeSubmitBtn = document.createElement('button')
gridSizeSubmitBtn.textContent = "Submit Grid Size"

//---------Color picker label and button element
let colorBtnLabel = document.createElement("label")
colorBtnLabel.textContent = "Select a Color"
let colorBtn = document.createElement("input")
colorBtn.type = 'color'
//---------appending button into label element
colorBtnLabel.appendChild(colorBtn)
colorBtnLabel.style.alignContent = 'center'

//---------Random color picker button element
let randomColorBtn = document.createElement("button")
randomColorBtn.textContent = 'Select Random Color'

//---------Progressive darkening effect button element
let progressiveEffectBtn = document.createElement("button")
progressiveEffectBtn.textContent = 'Progressive Effect Disabled'

//---------Clear grid color button element
let clearBtn = document.createElement("button")
clearBtn.textContent = 'Clear Grid'

//---------appending all the button elements to parent div element
btnMenuDiv.append(gridSizeField, gridSizeSubmitBtn, colorBtnLabel, randomColorBtn, progressiveEffectBtn, clearBtn)
btnMenuDiv.style.display = 'flex'
btnMenuDiv.style.justifyContent = 'center'
btnMenuDiv.style.marginTop = "20px"

//---------appending parent div into body element 
document.body.append(btnMenuDiv)

//---------function to implement common style elements to child button elements
function commonStyle(element) {
    element.style.fontWeight = "bold"
    element.style.marginRight = "16px"
    element.style.fontSize = "20px"
    element.style.padding = "12px"
    element.style.border = "1px solid black"
    element.style.backgroundColor = "#57d8ff"
    element.style.borderRadius = "40px"
}

//---------initializing functions
commonStyle(gridSizeField)
commonStyle(gridSizeSubmitBtn)
commonStyle(colorBtnLabel)
commonStyle(randomColorBtn)
commonStyle(progressiveEffectBtn)
commonStyle(clearBtn)

//---------Style overrides for grid size input field and submit button
gridSizeField.style.marginRight = "-1px"
gridSizeField.style.borderTopRightRadius = "0px"
gridSizeField.style.borderBottomRightRadius = "0px"
gridSizeSubmitBtn.style.borderTopLeftRadius = "0px"
gridSizeSubmitBtn.style.borderBottomLeftRadius = "0px"
clearBtn.style.marginRight = 0

//---------Parent Div element for coloring field
let containerDiv = document.createElement("div")
containerDiv.setAttribute('id', 'container-div')
containerDiv.style.margin = "auto"
containerDiv.style.marginTop = "20px"
containerDiv.style.boxSizing = "content-box"
containerDiv.style.border = '16px groove #888282'
containerDiv.style.width = '500px'
containerDiv.style.height = '500px'
containerDiv.style.display = 'flex'
containerDiv.style.flexWrap = 'wrap'
document.body.append(containerDiv)

//---------initializing default value for grid size and element creation for grid
let gridSize = 16;
let childDivEl;
let opacityOn = false       //switch button for toggling opacity
let colorMode = 'single'

//---------Function to create grid inside parent div based on grid size value
function createGrid() {

    for (let i = 1; i <= gridSize * gridSize; i++) {
        childDivEl = document.createElement("div");
        childDivEl.classList.add(`child-div-${i}`)
        childDivEl.style.width = `${500 / gridSize}px`
        childDivEl.style.height = `${500 / gridSize}px`
        containerDiv.appendChild(childDivEl)
        console.log(containerDiv.childElementCount);

    }
    pickSingleColor()

}

createGrid()

//---------Event listener for grid size submit button
gridSizeSubmitBtn.addEventListener('click', () => {
    let mainDivEl = containerDiv.querySelectorAll(`div`)
    //---------removing existing element from parent div
    mainDivEl.forEach(function (div) {
        div.remove()
    })
    //---------limiting grid size value between 16 and 100
    gridSize = Math.min(Math.max(Math.trunc(gridSizeField.value), 16), 100)
    //---------create new grid by calling createGrid function
    createGrid()
})

//---------function to select a color through color button
function pickSingleColor() {
    for (let i = 1; i <= containerDiv.childElementCount; i++) {
        let Opacity = 0.1
        let element = containerDiv.querySelector(`.child-div-${i}`)

        //---------initializing event listener for child div elements
        element.addEventListener("mouseover", () => {
            if (colorMode === "single") {
                element.style.backgroundColor = colorBtn.value
                colorBtnLabel.style.background = colorBtn.value

                //---------chaning style color of color button label text to be visible when button background color is black
                labelTextColor()

                //---------condition to implement opacity (darkening effect) 
                if (opacityOn && Opacity <= 1) {  //check if opacityOn is true and opacity value is <=1
                    Opacity += 0.1                // increase opacity by 10% on every hover
                    element.style.opacity = Opacity
                } else {
                    element.style.opacity = 1      //default opacity value if above condition not met
                }

            }
        })
    }
}



//---------function to generate a random number between 0 & input parameter
function randomColor(number) {
    return Math.trunc((Math.random() * (number + 1)))
}

//---------function to generate random color 
function pickRandomColor() {
    for (let i = 1; i <= containerDiv.childElementCount; i++) {
        let Opacity = 0.1
        let element = containerDiv.querySelector(`.child-div-${i}`)

        //---------initializing event listener on child divs
        element.addEventListener('mouseover', () => {
            if (colorMode === "random") {

                labelTextColor()
                element.style.backgroundColor = `rgb(${randomColor(225)}, ${randomColor(225)}, ${randomColor(225)})`
                randomColorBtn.style.background = `rgb(${randomColor(225)}, ${randomColor(225)}, ${randomColor(225)})`

                //---------opacity conditions
                if (opacityOn && Opacity <= 1) {
                    Opacity += 0.1
                    element.style.opacity = Opacity
                } else {
                    element.style.opacity = 1
                }
            }
        })
    }
}

//---------adding event listener to color button
colorBtn.addEventListener('click', () => {
    labelTextColor()
    colorMode = 'single'
    randomColorBtn.removeEventListener('click', pickRandomColor) //removing event listener from random color button
    pickSingleColor() // invoking color pick function
    randomColorBtn.style.backgroundColor = '#57d8ff'
})

//---------adding event listener to random color button
randomColorBtn.addEventListener('click', () => {
    colorMode = 'random'
    colorBtn.removeEventListener('click', pickSingleColor); //removing eventlister for color button first
    pickRandomColor() //invoking random color generater function
    colorBtnLabel.style.backgroundColor = '#57d8ff'
    labelTextColor()
})

//---------function to toggle opacityOn variable
const opacitySwitch = () => {
    if (opacityOn) {
        opacityOn = false
        progressiveEffectBtn.textContent = 'Progressive Effect Disabled' //changing text of button
    } else if (!opacityOn) {
        opacityOn = true
        progressiveEffectBtn.textContent = 'Progressive Effect Enabled' //changing text of button

    }
    console.log(opacityOn)
}

//---------adding event listener for progressive effect button that invoke opacitySwitch Logic
progressiveEffectBtn.addEventListener("click", opacitySwitch)

//---------function to clear grid background of child divs
function clearGrid() {
    let mainDivEl = containerDiv.querySelectorAll(`div`);
    mainDivEl.forEach(function (div) {
        div.style.backgroundColor = ""
    })

}

//---------adding event listener to clear button that invoke clearGrid function
clearBtn.addEventListener('click', clearGrid)

//---------function to toggle color button text color
function labelTextColor() {
    if (colorBtnLabel.style.backgroundColor === "rgb(0, 0, 0)") {
        colorBtnLabel.style.color = "white"
    } else {
        colorBtnLabel.style.color = "black"
    }
}