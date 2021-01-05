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
      <Total text1= "total of " course={course} text2= "exercises" />
    </div>
  )
}

const Courses= ({courses}) => {
  return(
    <div>
      {courses.map(course =>
         <Course key= {course.id} course= {course} />
      )}
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return(
    <div>
      <Courses courses={courses} />
    </div>
  ) 
}

ReactDOM.render(<App />, document.getElementById('root'))