import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"; 
import axios from 'axios';
import { Link } from 'react-router-dom';



function Main() {

  const [events, setEvents] = useState({ list: [] });
  const [notices,setNotices] = useState({list: []});
  const [calenders,setCalenders] = useState({list: []});
  const [noticeLists,setNoticeLists] =useState({list: []});
  
  useEffect(() => {

    axios.get('http://13.211.200.67:8080/api/event')
    .then(response => {
      if (response.data && Array.isArray(response.data)) {
        setEvents({ list: response.data });
      } else {
        console.error('Invalid data format:', response.data);
      }
    })
    .catch(error => console.log('Error fetching data:', error));
  
  
    axios.get('http://13.211.200.67:8080/api/notice')
    .then(response => {
      if (response.data && Array.isArray(response.data)) {
        const top5Notices = response.data.slice(0,5);
        setNotices({ list: top5Notices });
      } else {
        console.error('Invalid data format:', response.data);
      }
    })
    .catch(error => console.log('Error fetching data:', error));
  
  
    axios.get('http://13.211.200.67:8080/api/calender')
    .then(response => {
      if (response.data && Array.isArray(response.data)) {
        const today = new Date();
        const formattedToday = today.toISOString().slice(0,10);
        const filteredCalenders = response.data.filter(item => {
          return item.CategoryName === '모험 섬' && item.StartTimes[0]?.startsWith(formattedToday);
        });
        setCalenders({ list: filteredCalenders });
      } else {
        console.error('Invalid data format:', response.data);
      }
    })
    .catch(error => console.log('Error fetching data:', error));

    axios.get('http://13.211.200.67:8080/api/notice/noticeBoardListResent')
    .then(response => {
      if (response.data && Array.isArray(response.data)) {
        setNoticeLists({ list: response.data });
      } else {
        console.error('Invalid data format:', response.data);
      }
    })
    .catch(error => console.log('Error fetching data:', error));

  },[]);


 


    // 날짜 포맷팅
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }



  return (

    <div className="container" style={{marginTop: '50px'}}>

        <div>

          <div id="featured-services" className="featured-services section">
          
      
            <div className="container">
              <div className="row gy-4">
              <h4 className="mb-1">Today Island</h4>  
              {calenders.list.map(calender=>(
                <div className="col-xl-3 col-md-6 d-flex" data-aos-delay="100">
                  <div className="service-item position-relative">
                    <div className='text-center'><img src={calender.ContentsIcon}></img>
                    </div>
                    <div className="text-center">
                      <h5 className='badge text-bg-success'>{calender.ContentsName}</h5>
                    </div>
                    <p>
                      {calender.RewardItems.map(rewardItem => (
                        rewardItem.Items.map(item => (
                          <img style={{width: '30px', height: '30px'}} key={item.Name} src={item.Icon} alt={item.Name} />
                        ))
                      ))}
                    </p>
                  </div>
                </div>
              ))}
              </div>
              </div>
           
          </div>



          <div className="container mt-60">
                <div className="row align-items-center mb-4 pb-2">
                      <div className="col-md-6 ">
                          <div className="section-title text-center text-md-start">
                              <h4 className="mb-1">공지사항  
                              <a href='https://lostark.game.onstove.com/News/Notice/List' target='_blank' className="text-muted readmore plus-button" 
                                  style={{ cursor: 'pointer', fontSize: '20px',marginLeft: '10px' }}>
                                  더 보기 <i className="uil uil-angle-right-b align-right"></i>
                              </a>
                              </h4>
                              <hr className="custom-hr-head"/>
                              {notices.list.map(notice=>(
                                  <div>
                                      <p className="readmore custom-section-content" style={{ display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', maxWidth: '100%' }}>
                                      <span className="badge text-bg-primary" >{notice.Type}</span>  <a href={notice.Link} target='_blank'>{notice.Title}</a>
                                      </p><hr className="custom-hr"/>
                                  </div>
                                  ))}
                          </div>
                      </div>
                      <div className="col-md-6">
                          <div className="section-title text-center text-md-start">
                              <h4 className="mb-1">공지사항
                              <Link style={{ cursor: 'pointer', fontSize: '20px',marginLeft: '10px' }} to="/noticeBoard">
                                  더 보기 <i className="uil uil-angle-right-b align-right"></i>
                              </Link>
                              </h4>
                              <hr className="custom-hr-head"/>

                              {noticeLists.list.map(noticeList=>(
                                  <div>
                                      <p className="readmore custom-section-content" style={{ display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', maxWidth: '100%' }}>
                                      <span className="badge text-bg-primary" >{noticeList.noticeBoardType}</span> <a href='#' target='_blank'>{noticeList.noticeBoardTitle}</a>
                                      </p><hr className="custom-hr"/>
                                  </div>
                                  ))}
                          </div>
                      </div>
                  </div> 
          </div> 

      </div>

        <div id="services" className="services section">

              <div className="row">
                  {events.list.map(event => (
                      <div className="col-xl-3 col-lg-4 col-md-6 mt-4" key={event.Title}>
                      <div className="card blog blog-primary rounded border-0 shadow overflow-hidden">
                          <div className="position-relative">
                          <a href={event.Link} target="_blank">
                            <img src={event.Thumbnail} style={{ width: '100%', height: 'auto' }} className="card-img-top" alt="..." />
                          </a>
                              <div className="overlay rounded-top"></div>
                          </div>
                          <div className="card-body content" style={{margin: '0px', paddingTop: '20px', paddingBottom: '0px'}}>
                              <p><a href={event.Link} target='_blank'>{event.Title}</a></p>
                              <p className="post-meta d-flex justify-content-between mt-2" style={{ display: 'flex', alignItems: 'center'}}>
                                <span> {formatDate(event.StartDate)}  ~ {formatDate(event.EndDate)} </span> 
                            </p>
                          </div>
                          <div className="author">
                          </div>
                      </div>
                  </div>          
                        ))}                       
                    </div>
              <div className="d-flex justify-content-end">
              </div>

        </div>

</div>

  );
}

export default Main;
