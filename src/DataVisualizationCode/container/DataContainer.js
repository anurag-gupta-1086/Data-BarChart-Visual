import { useState, useEffect } from 'react';
import TablePresentational from "../presentational/TablePresentational";
import BarChartPresentational from "../presentational/BarChartPresentational";


const DataContainer = () => {


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

  
    const [checkBoxArr, setCheckBoxArr] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const indexOfLastItem = currentPage*itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const updateCheckBox = (ind) => {
        ind %= 10;
        let newArr = [...checkBoxArr];
        newArr[ind] = !newArr[ind];
        let newData = [...data];
        newData[ind].checkBox = newArr[ind];

        setData(newData);
        setCheckBoxArr(newArr);
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products?limit=${itemsPerPage}&skip=${indexOfFirstItem}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        const reqData = result?.products.map((item) => {
          return {
              checkBox:true,
              id:item.id,
              title:item.title,
              price:item.price,
              brand:item.brand
          }
        })
        setData(reqData);
        setLoading(false);
        const booleanArray = new Array(reqData.length).fill(true);
        setCheckBoxArr(booleanArray);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchData();
    }, [currentPage]);

    if (loading) {
      return (
        <div className="text-center">
          <div className="spinner-border" role="status">
          </div>
        </div>
      );
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return (
      <div>
        <nav className="navbar bg-primary" data-bs-theme="dark">
            <a className="navbar-brand" href="/" style={{marginLeft:20}}>HomePage</a>
        </nav>

        <TablePresentational 
          data={data} 
          updateCheckBox={updateCheckBox} 
          handlePageChange = {handlePageChange}
          currentPage = {currentPage}
          indexOfLastItem = {indexOfLastItem}
        />

        <hr/>

        <BarChartPresentational reqData = {data}/>
      </div>
    );
}
  
export default DataContainer;