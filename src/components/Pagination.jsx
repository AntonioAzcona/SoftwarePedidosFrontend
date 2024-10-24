
export const Pagination = ({ elementos }) => {
    
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-end">

                {
                    elementos?.hasPrevPage && <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                }

                {
                    elementos?.docs?.map((elemento, index) => {
                        return <li key={index} className="page-item"><a className="page-link" href="#">{index + 1}</a></li>
                    })
                }

                {
                    elementos?.hasNextPage && <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                }

            </ul>
        </nav>
    )
}
