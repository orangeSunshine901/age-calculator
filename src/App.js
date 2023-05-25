import {useState} from "react";
import { createRoot } from "react-dom/client";

const App = ()=>{
  return(
    <div>
      <Calculator/>
    </div>
  )
}

const Calculator = ()=>{
  return(
  <div className="calculator-wrapper">
      <div className="calculator-body">
        <Input/>
      </div>
  </div>
  )
}

const Input = ()=>{
  
  const [date, setDate] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")
  const [yearResult, setYearResult] = useState("")
  const [monthResult, setMonthResult] = useState("")
  const [dateResult, setDateResult] = useState("")
  
  const d = new Date()
  let currentYear = d.getFullYear()
  let currentMonth = d.getMonth() + 1
  let currentDate = d.getDate()
  // const errorMessage = document.querySelectorAll("div.error-message > p")
  // const errorMessage = document.querySelectorAll(".error-message > p")
  
  const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ]
  
  function calcYears(){
    let finalDateResult=""
    let finalMonthResult=""
    let finalYearResult=""
    
    // Checking values and giving error
    if (date >= months[month-1]){
      document.querySelector("#date-error").textContent = "Must be a valid day"
    }
    
    if (date == ""){
      document.querySelector("#date-error").textContent = "This field is required"
      document.querySelectorAll("label")[0].classList.add("error-label")
      document.querySelectorAll("input")[0].classList.add("error-field")
    }
    
     if (month == ""){
      document.querySelector("#month-error").textContent = "This field is required"
      document.querySelectorAll("label")[1].classList.add("error-label")
      document.querySelectorAll("input")[1].classList.add("error-field")
    }
    
     if (year == ""){
      document.querySelector("#year-error").textContent = "This field is required"
      document.querySelectorAll("label")[2].classList.add("error-label")
      document.querySelectorAll("input")[2].classList.add("error-field")
    }
    
    
    
    if (date != "" && date <= months[month-1] && month != "" && month <= 12 && year != "" && year <= currentYear){
        if (date > currentDate) { 
        currentDate = currentDate + months[month - 1]; 
        currentMonth = currentMonth - 1; 
          console.log("2")
      } 
    
      if(month > currentMonth ){
        currentYear = currentYear - 1; 
        currentMonth = currentMonth+ 12; 
      }
      
      if (currentYear == year  && currentDate == date && currentMonth == month){
        finalYearResult = "0"
        finalDateResult = "0"
        finalMonthResult = "0"
      } 
      
      if ( month <= currentMonth && year <= currentYear){
        finalYearResult = currentYear - year;
        finalDateResult = currentDate - date;
        finalMonthResult = currentMonth - month;
        
      } else{
        document.querySelector("#month-error").textContent = "Must be in the past"
        document.querySelectorAll("label")[1].classList.add("error-label")
        document.querySelectorAll("input")[1].classList.add("error-field")
      }
      

      

      setYearResult(finalYearResult)
      setMonthResult(finalMonthResult)
      setDateResult(finalDateResult)
    }
    
  }
  
  // finalMonthResult is not correct maybe use Floor I think to find the difference or someMathFunction
  // Use Min and Max to get the bigger value to get the days
  // Find a way to get the total number of days in a month
  
  return(
    <div>
      <form onSubmit={(e)=> e.preventDefault()}>
        <div className="label-wrapper">
          <label 
            htmlFor="date"
            className="field-label"
            >
            Day
            <input 
              id="date" 
              className="input-field"
              name="date" 
              placeholder="DD" 
              maxlength="2"
              value={date}
              onChange={((e)=>{
                e.target.value > 31 ? document.querySelector("#date-error").textContent = "Must be a valid day" : document.querySelector("#date-error").textContent = ""
                e.target.value > 31 ? document.querySelectorAll("label")[0].classList.add("error-label") : document.querySelectorAll("label")[0].classList.remove("error-label")
                e.target.value > 31 ? document.querySelectorAll("input")[0].classList.add("error-field") : document.querySelectorAll("input")[0].classList.remove("error-field")
                setDate(e.target.value) 
              })
              }
              />
            <div>
              <p id="date-error" className="error-message"></p>
            </div>
          </label>
          <label 
            htmlFor="month"
            className="field-label"
            >Month
            <input 
              id="month" 
              name="month" 
              placeholder="MM" 
              maxlength="2"
              value={month}
              className="input-field"
              onChange={(e)=>{
                e.target.value > 12 ? document.querySelector("#month-error").textContent = "Must be a valid month" : document.querySelector("#month-error").textContent = ""
                e.target.value > 12 ? document.querySelectorAll("label")[1].classList.add("error-label") : document.querySelectorAll("label")[1].classList.remove("error-label")
                e.target.value > 12 ? document.querySelectorAll("input")[1].classList.add("error-field") : document.querySelectorAll("input")[1].classList.remove("error-field")
                setMonth(e.target.value)
              }}
              />
            <p id="month-error" className="error-message" ></p>
          </label>
          <label
            htmlFor="year"
            className="field-label"
            >Year
            <input 
              id="year" 
              name="year" 
              className="input-field"
              placeholder="YYYY" 
              maxlength="4" 
              type="text"
              value={year}
              onChange={(e)=>{
                e.target.value > currentYear ?
                document.querySelector("#year-error").textContent = "Must be in the past": document.querySelector("#year-error").textContent = ""
                e.target.value > currentYear ? document.querySelectorAll("label")[2].classList.add("error-label") : document.querySelectorAll("label")[2].classList.remove("error-label")
                e.target.value > currentYear ? document.querySelectorAll("input")[2].classList.add("error-field") : document.querySelectorAll("input")[2].classList.remove("error-field")
                setYear(e.target.value) 
              }}
              />
            <p id="year-error" className="error-message" ></p>
          </label>
        </div>
        <div className="button-section">
          <button 
            onClick={ calcYears }
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 44.091 44">
                <g id="icon-arrow" transform="translate(-0.955)">
                  <path id="Path_4158" data-name="Path 4158" d="M1,22.019c7.333-.333,22,3.6,22,21.981m0,0V0M45,22.019c-7.333-.333-22,3.6-22,21.981" fill="none" stroke="#fff" stroke-width="2"/>
    </g>
              </svg>
            </button>
        </div>
      </form>
      <Result day={dateResult} month={monthResult} year={yearResult}/>
     </div>
  )
}

const Result = ({day, month, year})=>{
  if (day == "0" && month == "0"){
    return(
      <div className="result-text">
          <p>Happy<br/><span>Birthday!</span></p>
        </div>
    )
  } else{
      return(
        <div className="result-text">
      <p><span>{year == "" ? "--" : year}</span> years</p>
      <p><span>{month == ""? "--" : month}</span> months</p>
      <p><span>{day == "" ? "--" : day}</span> days</p>
    </div>
        
      )}
} 


const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />)