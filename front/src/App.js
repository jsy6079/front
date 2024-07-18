import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './common/NavBar';
import Main from './mainSection/main';
import NoticeBoardWrite from './noticeBoard/noticeBoardWrite';
import Footer from './common/footer';
import NoticeBoardDetail from './noticeBoard/noticeBoardDetail';
import NoticeBoard from './noticeBoard/noticeBoard';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path='/noticeBoard' element={<NoticeBoard/>}/>
        <Route path="/noticeBoardWrite" element={<NoticeBoardWrite/>} />
        <Route path="/api/free/detail/:freeBoardNo" element={<NoticeBoardDetail/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
