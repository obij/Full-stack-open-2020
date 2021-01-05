import React from 'react';
import ReactDOM from 'react-dom';

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
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return(
    <div>
      <Course course={course} />
      <Total text1= "total of " course={course} text2= "exercises" />
    </div>
  ) 
}

ReactDOM.render(<App />, document.getElementById('root'))