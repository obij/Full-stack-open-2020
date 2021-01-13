import React from 'react'
import Country from '../components/Country'

const List = ({arr}) => {
    return(
        <div>
            <ul>
                {arr.map(item=>
                    <Country key= {item["name"]} item= {item} />

                )}
            </ul>
        </div>
    )
}

export default List
