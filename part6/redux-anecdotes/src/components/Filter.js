import React from 'react'
import { filterChange } from '../reducers/filterReducer'
//import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'


const Filter = (props) => {
  //const dispatch = useDispatch()
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    const filterItem = event.target.value 
    //dispatch(filterChange(filterItem))
    props.filterChange(filterItem)

  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  filterChange
}

export default connect(
  null,
  mapDispatchToProps
)(Filter)

//export default Filter