import React, { useEffect, useState } from 'react';
import { useParams,useNavigate  } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';


const NoticeBoard = () => {

    const [loaMongNotices,setLoaMongNotices] = useState({list: []});
    const navigate = useNavigate();


    const noticeBoardWrite = () => {
        navigate('/noticeBoardWrite');
    }

    

    const [page, setPage] = useState({
        startPage: 1,
        endPage: 0,
        prev: false,
        next: false,
        total: 0,
        pagingInfo: {
          pageNum: 1,
          amount: 8
        }
      });

      useEffect(() => {
        axiosPageData(page.pagingInfo.pageNum);
      },[]);



      const axiosPageData = (pageNum,event,targetId) => {

        const amount = 8;
    
        axios.get('http://localhost:8080/api/notice/noticeBoardList', {
          params : {
            amount : amount,
            pageNum : pageNum
          }
        })
          .then(response => {
            setLoaMongNotices({list : response.data.list});
              setPage({
                startPage: response.data.page.startPage,
                endPage: response.data.page.endPage,
                prev: response.data.page.prev,
                next: response.data.page.next,
                total: response.data.page.total,
                pagingInfo: {
                    pageNum: response.data.page.pagingInfo.pageNum,
                    amount: response.data.page.pagingInfo.amount
                }
              });
              event.preventDefault();  
                    const element = document.getElementById(targetId);
                    if (element) {
                        const offsetTop = element.getBoundingClientRect().top + window.scrollY - 100; // 보정값 적용
                        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                    } else {
                        console.log("Element not found:", targetId); // 요소가 없을 경우 콘솔에 로그 출력
                    }   
          })
          .catch(error => console.log('Error fetching data:', error));
      }


        // 날짜 포맷팅
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
          }

    return (
        <>

    <div className="container" style={{marginTop: '50px'}}>
            <div className="d-flex justify-content-end">
                <button type='button' className="btn btn-primary" onClick={noticeBoardWrite}>
                    글쓰기
                </button>
            </div>
              <div className="d-flex align-items-center justify-content-center" style={{marginTop: '50px'}}>
          <table className="table">
              <thead className="table-secondary">
                  <tr>
                      <th scope="col" style={{width: '5%'}}>분류</th>
                      <th scope="col" style={{width: '40%'}}>제목</th> 
                      <th scope="col" style={{width: '15%'}}>날짜</th> 
                      <th scope="col" style={{width: '15%'}}>조회수</th> 
                  </tr>
              </thead>
              <tbody>
                {loaMongNotices.list.map(loaMongNotice=>(
                   <tr>
                              <td>{loaMongNotice.noticeBoardType}</td>
                              <td className="link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover">{loaMongNotice.noticeBoardTitle}</td>
                              <td>{formatDate(loaMongNotice.noticeBoardDate)}</td>
                              <td>{loaMongNotice.noticeBoardView}</td>
                   </tr>))}
                  </tbody>
              </table>          
        </div>


        <div className="row">
              <div className="col-12 mt-4">
                  <ul className="pagination justify-content-center mb-0">
                      {page.prev && (
                          <li className="page-item">
                              <a style={{ cursor: 'pointer' }} className="page-link" onClick={(e) => { axiosPageData(page.startPage - 1,e) }} aria-label="Previous">Prev</a>
                          </li>
                      )}
                      {Array.from({ length: (page.endPage - page.startPage + 1) }, (_, i) => page.startPage + i).map(pageNum => (
                          <li className={`page-item ${pageNum === page.pagingInfo.pageNum ? 'active' : ''}`} key={pageNum}>
                              <a style={{ cursor: 'pointer' }} className="page-link" onClick={(e) => { axiosPageData(pageNum,e) }}>{pageNum}</a>
                          </li>
                      ))}
                      {page.next && (
                          <li className="page-item">
                              <a style={{ cursor: 'pointer' }} className="page-link" onClick={(e) => { axiosPageData(page.endPage + 1,e) }} aria-label="Next">Next</a>
                          </li>
                      )}
                  </ul>
              </div>
          </div>

    </div>
        
        </>
    )

}

export default NoticeBoard;