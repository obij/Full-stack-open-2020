import React from 'react'

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  
  const Total = ({text1, course, text2}) => {
    const total= course.parts.reduce((accumulator, currentValue) => 
       accumulator + currentValue.exercises, 0)
  
    return(
      <div>
        {text1} {total} {text2}
      </div>
    )
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  
  
  const Content = ({course}) => {
    return(
      <div>
       <ul>
         {course.parts.map(part =>
              <Part key= {part.id} part= {part} />
  
          )}
       </ul>
    </div>
    )
  }
  
  const Course = ({course}) => {
    return(
      <div>
        <Header course= {course} />
        <Content course= {course} />
        <Total text1= "total of " course={course} text2= "exercises" />
      </div>
    )
  }

export default Course
