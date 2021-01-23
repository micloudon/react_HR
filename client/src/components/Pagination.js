import React from 'react'
import './Pagination.css'

export const Pagination = ({postsPerPage, totalPosts, paginate}) => {
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul>
            {pageNumbers.map(number => (
                <li key={number}>
                <a onClick={ () => paginate(number) } href="!#myanchor" >
                {number}
                </a>
                </li>
            ) )}
            </ul>
        </nav>
    )
}

export default Pagination;