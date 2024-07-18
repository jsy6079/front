import React, { useEffect, useState } from 'react';
import { useParams,useNavigate  } from 'react-router-dom';
import axios from 'axios';

function FreeBoardWrite() {

    const [noticeBoardType, setNoticeBoardType] = useState('none');
    const [noticeBoardTitle,setNoticeBoardTitle] = useState('');
    const [noticeBoardWriter,setNoticeBoardWriter] = useState('');
    const [noticeBoardContent,setNoticeBoardContent] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

    const formData = {
        noticeBoardType: noticeBoardType,
        noticeBoardTitle: noticeBoardTitle,
        noticeBoardWriter: noticeBoardWriter,
        noticeBoardContent: noticeBoardContent,
        noticeBoardDate: new Date(),
        noticeBoardView: 0
    };

    if(formData.noticeBoardType !== 'none') {
    axios.post('http://localhost:8080/api/notice/post',formData)
    .then(response => {
        window.alert('글이 등록되었습니다.');
        navigate('/');
    })
    .catch(error => {
        console.log('글 등록 실패 '+error);
        console.log(noticeBoardType);
        console.log(noticeBoardTitle);
        console.log(noticeBoardContent);
        console.log(noticeBoardWriter);
    });
} else {
    alert('태그를 선택해주세요.');
}

};

return (
    <div className="container" style={{marginTop: '50px'}}>
    <form onSubmit={handleSubmit}>
      <div>
        <p>제목</p>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          className="form-control"
          placeholder="제목을 입력해주세요."
          type="text"
          name="noticeBoardTitle"
          id="noticeBoardTitle"
          aria-label="Disabled input example"
          required
          maxLength="30"
          style={{width: '500px'}}
          value={noticeBoardTitle}
          onChange={(e) => setNoticeBoardTitle(e.target.value)}
        />
        <p>&nbsp;</p>
        <select
            className="form-control"
            name="noticeBoardType"
            id='noticeBoardType'
            style={{ marginRight: '10px', width: '200px' }}
            value={noticeBoardType}
            onChange={(e) => setNoticeBoardType(e.target.value)}
          >
            <option value="none">태그를 선택해주세요</option>
            <option value="공지">공지</option>
            <option value="점검">점검</option>
            <option value="업데이트">업데이트</option>
          </select>
        </div>
      </div>


      <div>
        <p>작성자</p>
        <input
          className="form-control"
          placeholder="작성자를 입력해주세요."
          type="text"
          name="noticeBoardWriter"
          id="noticeBoardWriter"
          aria-label="Disabled input example"
          required
          value={noticeBoardWriter}
          onChange={(e) => setNoticeBoardWriter(e.target.value)}
        />
      </div>

      <div>
        <p>내용</p>
        <textarea
          className="form-control"
          placeholder="내용을 입력해주세요."
          name="noticeBoardContent"
          id="noticeBoardContent"
          style={{ height: '500px' }}
          required
          value={noticeBoardContent}
          onChange={(e) => setNoticeBoardContent(e.target.value)}
        />
      </div>

      <div className="d-flex justify-content-end" style={{ marginTop: '20px' }}>
        <button type="submit" className="btn btn-primary">등록하기</button>
      </div>
    </form>
    </div>
  );
};

export default FreeBoardWrite;