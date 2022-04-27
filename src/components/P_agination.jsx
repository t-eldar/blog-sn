import React from 'react'
import { Button } from 'react-bootstrap'


const P_agination = ({postPerPage, totalPosts, paginate}) => {
    const pageNmbers = [];

    for(let i = 1; i<= Math.ceil(totalPosts / postPerPage); i++){
        pageNmbers.push(i);
    }

  return (
    <div>
        <ul className="pagination">
            {
                pageNmbers.map(number => (
                    <Button onClick={() => paginate(number)} className="page-item">
                        {number}
                    </Button>
                ))
            }
        </ul>
    </div>
  )
}

export default P_agination;
