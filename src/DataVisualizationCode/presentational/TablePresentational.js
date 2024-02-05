import 'bootstrap/dist/css/bootstrap.min.css';

const DataPresentational = (props) => {
    const {data, updateCheckBox, handlePageChange, currentPage, indexOfLastItem} = props;

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>CheckBox</th>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Brand</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td><input type="checkbox" checked={item.checkBox} onChange={()=> {updateCheckBox(item.id-1)}} /></td>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.price}</td>
                            <td>{item.brand}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button className="btn btn-primary" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                Prev
                </button>
                <span style={{marginLeft:10,marginRight:10,fontSize:25,verticalAlign:"bottom"}}>{currentPage}</span>
                <button
                    className="btn btn-primary"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={indexOfLastItem >= 100}
                >
                Next
                </button>
            </div>
        </div>
    );
}
  
export default DataPresentational;