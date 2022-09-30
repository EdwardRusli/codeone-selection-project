import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import TextBox from './Components/TextBox';
import Header from './Components/Header';



function App() {
  const webTitle = "MySite"
  document.title = webTitle
  let [ContentArray, setContentArray] = useState([
    {id:0, content:"Task One", done:false},
    {id:1, content:"Task Two", done:false},
    {id:2, content:"Task Three", done:false},
    {id:3, content:"Task Four", done:false}])
  let [ContentInput, setContentInput] = useState("Enter content")
  let [EditInput, setEditInput] = useState("Enter content")

  const returnContent = (array) => {
    return array.content
  }

  const addContent = () => {
    if(ContentArray.map(returnContent).includes(ContentInput) == false && ContentInput !== "Enter content" && ContentInput !== "Already exists"){
      if(ContentArray.length>0){
        let lastelement = ContentArray[ContentArray.length-1]
        setContentArray(ContentArray = [...ContentArray, {id:lastelement.id+1, content:ContentInput, done:false}])
        setContentInput('Enter content')}
      else{
      setContentArray(ContentArray = [...ContentArray, {id:0, content:ContentInput, done:false}])
      setContentInput('Enter content')}
    }    
    else if(ContentInput !== "Enter content"){
      // console.log("Already exists")
      setContentInput('Already exists')
    }
    // console.log(ContentArray)
    
  }

  let [editMode, setEditMode] = useState(false)
  let [currentEditedValue, setCurrentEditedValue] = useState('')
  const toggleEditMode = (currentValue) => {
      setEditMode(true)
      setCurrentEditedValue(currentValue)
      setEditInput(currentValue)
      
    // if(ContentArray.map(returnContent).includes(editInto) == false){
    // let newArray = [...ContentArray]
    // newArray[indexToEdit].content = editInto
    // setContentArray(newArray)
    // console.log(ContentArray[indexToEdit].content)
    // }
    // else{
    //   console.log("Already exists")
    // }
  }

  //()=>editContent(ContentArray.map(e=>e.content).indexOf(array.content), "ABCD")
  const editContent = (endValue) => {
    if((ContentArray.map(returnContent).includes(endValue) == false || currentEditedValue == endValue) && EditInput !== 'Already exists'){
    let newArray = [...ContentArray]
    newArray[ContentArray.map(returnContent).indexOf(currentEditedValue)].done = false
    newArray[ContentArray.map(returnContent).indexOf(currentEditedValue)].content = endValue

    setContentArray(newArray)
    setEditMode(false)
    }
    else{
      // console.log('Already exists')
      setEditInput('Already exists')
    }
    // console.log('edited')
    // console.log(ContentArray)
  }

  const markAsDone = (listItem, arrayContent, arrayDone) => {
    // console.log(listItem)
    // console.log(arrayContent)
    if(arrayDone)
    {
    listItem.target.style.removeProperty('text-decoration')
    //listItem.target.style.removeProperty('opacity')
    
    let newArray = [...ContentArray]
    newArray[ContentArray.map(returnContent).indexOf(arrayContent)].done = false
    setContentArray(newArray)
    // console.log('marked')
    // console.log(ContentArray)
    }

    else
    {
    listItem.target.style.setProperty('text-decoration', 'line-through')
    //listItem.target.style.setProperty('opacity', '0.5')
    let newArray = [...ContentArray]
    newArray[ContentArray.map(returnContent).indexOf(arrayContent)].done = true
    setContentArray(newArray)
    // console.log('marked')
    // console.log(ContentArray)
    }
  }
  
  // const checkIfDone = (listItem) => {
  //   console.log('called')
  //   if(listItem.done){
  //     return "line-through"
  //   }
  //   else{
  //     return "line-through"
  //   }
  // }  
  // todo-row{align-items:center;background:linear-gradient(90deg,#ff7614,#ff5411);border-radius:5px;color:#fff;display:flex;justify-content:space-between;margin:4px auto;padding:16px;width:90%}
  const listEntryClassName = (id) => {
    id = id
    let colorNumber = id % 4
    let bg
    // console.log(colorNumber)
    switch(colorNumber){
      case 0:
        bg = 'bg-gradient-to-r from-red-500 to-red-600'
        break;
      case 1:
        bg = 'bg-gradient-to-r from-sky-600 to-sky-500'
        break;
      case 2:
        bg = 'bg-gradient-to-r from-orange-500 to-orange-600'
        break;
      case 3:
        bg = 'bg-gradient-to-r from-green-600 to-green-500'
        break;
    }
    return('rounded list-none list-inside flex items-center justify-between m-auto p-4 mx-7 my-2 w-[468px] transition-all ' + bg)}

  const checkIfDone  = (arrayDone) => {
    // console.log(arrayDone)
    let styleTest
    if(arrayDone){
      styleTest = {textDecorationLine:'line-through', opacity:'0.5'}
    }
    else{
      styleTest = {textDecorationLine:'none', opacity:'1'}
    }
    // console.log(ContentArray)
    return(styleTest)
  }
  

  return (

          <div className="bg-slate-900 text-lg text-neutral-50 flex flex-col mt-5 w-[520px] mx-auto rounded-lg text-center justify-center">
            <h1 className='font-sans text-2xl text-neutral-50 my-8 font-semibold'>What's the Plan for Today?</h1>


            {editMode ?
            <div>
            <TextBox className='outline-0 rounded-l-lg p-3.5 bg-slate-900 text-lg w-80 text-neutral-50 border-sky-500 focus:border-sky-500 border-2' onFocus={()=>setEditInput('')} variable={EditInput} function={(e) => setEditInput(e.target.value)}/>
            <button onClick={()=>editContent(EditInput)} className='rounded-r-lg bg-sky-500 p-3.5 border-sky-500 border-2 w-28 mb-[32px]'>Save</button>
            </div>
            :
            <div className='mb-8'>
            <div className='mb-8'>
              <TextBox className='outline-0 rounded-l-lg p-3.5 bg-slate-900 text-lg w-80 text-neutral-50 border-indigo-700 border-2' onFocus={()=>setContentInput('')} variable={ContentInput} function={(e) => setContentInput(e.target.value)}/>
              <button onClick={addContent} className='rounded-r-lg font-medium bg-gradient-to-r to-violet-500 from-indigo-700 p-3.5 h-[60px] w-28'>Add</button>
            </div>
              {ContentArray.map((array)=>{
                return(
                  <div key={array.id} className= {listEntryClassName(array.id)} onClick={(a)=>markAsDone(a, array.content, array.done)} style={checkIfDone(array.done)}>
                    {array.content}
                    <div>
                    <button className="mx-1 px-1" onClick={()=>toggleEditMode(array.content)}>✎</button>
                    <button className="mx-1 px-1" onClick={(e)=>{
                      e.stopPropagation()
                      let indexToRemove = ContentArray.map(e=>e.content).indexOf(array.content)
                      setContentArray(ContentArray.filter((data,idx) => idx !== indexToRemove))
                      // console.log('removed')
                      // console.log(ContentArray)
                    }}>✖</button>
                    
                    </div>
                  </div>
              )})}
            </div>}
          </div>
  );
}
export default App;