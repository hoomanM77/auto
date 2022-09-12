////////////////////Variables//////////////////////////////////////
const $=document
import {suggestions as suggestArray} from "./suggestionList.js";
const inputTag=_id('floatingInput')
const suggestionList=_q('.suggestion-list')
let listFragment=document.createDocumentFragment()
/////////////// Catching Elements with functions////////////////////
function _id(tag) {
    return  $.getElementById(tag)
}
function _class(tag) {
    return $.getElementsByClassName(tag)
}
function _q(tag) {
    return $.querySelector(tag)
}
function _qAll(tag) {
    return $.querySelectorAll(tag)
}
////////////////////////////////
function showUpList(e) {
   let inputValue=e.target.value
    suggestionList.classList.add('active')
    if(inputValue){
        suggestionList.classList.add('active')
        let targetList=availableList(inputValue.toLowerCase())
        appendList(targetList)

    }else{
        suggestionList.classList.remove('active')
    }
}
function availableList(value) {
    let targetList = suggestArray.filter(function (item) {
        return (item.toLowerCase()).includes(value)
    })
    if(targetList.length){
        return targetList
    }else{
        suggestionList.children[0].innerHTML=''
        suggestionList.children[0].append(generateLiList(value))
    }
}
function appendList(targetList) {
    if(targetList){
        suggestionList.children[0].innerHTML=''
        targetList.forEach(function (item) {
            listFragment.append(generateLiList(item))
        })
        suggestionList.children[0].append(listFragment)

    }
}
function setSuggestOnInputValue(e) {
   let suggestContent=e.target.innerHTML
    inputTag.value=''
    inputTag.value=`${suggestContent}`
    suggestionList.classList.remove('active')

}
function generateLiList(content) {
    let newLiList=document.createElement('li')
    newLiList.innerHTML=`${content}`
    newLiList.addEventListener('click',setSuggestOnInputValue)
    return newLiList
}
window.addEventListener('load',function () {
    inputTag.value=''
})
inputTag.addEventListener('keyup',showUpList)