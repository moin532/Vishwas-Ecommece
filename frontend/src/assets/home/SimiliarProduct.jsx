import React, { useEffect } from 'react';
import {useDispatch , useSelector} from 'react-redux';
import { getAllprd } from '../../action/ProductAction';
import FtrProduct from '../home/FtrProduct'
import styled from 'styled-components';

const SimiliarProduct = ({category}) => {

    const dispacth = useDispatch();

    const { error, products, loading } = useSelector((state) => state.products);

    useEffect(()=>{
        dispacth(getAllprd());
    },[dispacth]);

    const res = products.filter(elem => elem.category ==  category);

    
  return (
   <Wrapper>

    <h1 className='flex justify-center  mt-12 text-3xl font-serif'>YOU MAY ALSO LIKE</h1>
     <div className="container1" id="container">
      {res &&
            res.map((elem, ind) => {
              return <FtrProduct elem={elem} key={ind} />;
            })}
    </div>
   </Wrapper>
  )
}


const Wrapper = styled.section`
     .container {
    max-width: 120rem;
    margin: 0 auto;
  }
  .container1 {
    display: flex;
    margin: 1vmax auto;
    width: 90vw;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 100%;
  }
`
export default SimiliarProduct
