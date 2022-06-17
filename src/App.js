import './index.css'
import avatar from './images/avatar.jpg'
import React, { createRef} from 'react'
import { v4 as uuid } from 'uuid'

// 时间格式化
function formatDate (time) {
  return `${time.getFullYear()}-${time.getMonth()}-${time.getDate()}`
}

class App extends React.Component {
  textareaRef = createRef()
  state = {
    // show hide
    // hot: 热度排序  time: 时间排序
    tabs: [
      {
        id: 1,
        name: '热度',
        type: 'hot'
      },
      {
        id: 2,
        name: '时间',
        type: 'time'
      }
    ],
    active: 'hot',
    list: [
      {
        id: 1,
        author: '刘德华',
        comment: '给我一杯忘情水',
        time: new Date('2021-10-10 09:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: 1
      },
      {
        id: 2,
        author: '周杰伦',
        comment: '哎哟，不错哦',
        time: new Date('2021-10-11 09:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: 0
      },
      {
        id: 3,
        author: '五月天',
        comment: '不打扰，是我的温柔',
        time: new Date('2021-10-11 10:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: -1
      }
    ],
    comment: ''
  }

  switchTabs = (type) => {
    this.setState({
      active: type
    })
  }

  textareaChange = (e) => {
    this.setState({
      comment: e.target.value
    })
  }

  submitComment = () => {
    if (this.state.comment.trim().length > 0) {
      this.setState({
        list: [
          ...this.state.list,
          {
            id: uuid(),
            author: 'cp',
            comment: this.state.comment,
            time: new Date(),
            // 1: 点赞 0：无态度 -1:踩
            attitude:0
          }
        ],
        comment: ''
      })
      this.textareaRef.current.focus()
    } else {
      alert('评论不能为空')
    }
  }

  delComment = (activeId) => {
    // 删除评论提示
    let isDel = window.confirm('确定是否删除此条评论?', {
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      type: 'info'
    })
    if (isDel) {
      this.setState({
        list: this.state.list.filter(item => item.id !== activeId)
      })
    } else {
      return
    }
  }

  likeComment = (currItem) => {
    this.setState({
      list: this.state.list.map(item => {
        if (item.id === currItem.id) {
          return {
            ...item,
            attitude: currItem.attitude === 1 ? 0 : 1
          }
        } else {
          return item
        }
      })
    })
  }

  hateComment = (currItem) => {
    this.setState({
      list: this.state.list.map(item => {
        if (item.id === currItem.id) {
          return {
            ...item,
            attitude: currItem.attitude === -1 ? 0 : -1
          }
        } else {
          return item
        }
      })
    })
  }



  render () {
    return (
      <div className="App">
        <h1 style={{textAlign: 'center', marginBottom: '20px', color: '#00A1D6'}}>
          React Demo1
          <p style={{fontSize: '16px', fontWeight: 'normal'}}>(tabs切换，点赞交互，删除评论，发表评论)</p>
        </h1>
        <div className="comment-container">
          {/* 排序 */}
          <div className="tabs-order">
            <ul className="sort-container">
              {
                this.state.tabs.map(tab => (
                  <li
                    key={tab.id}
                    className={tab.type === this.state.active ? 'on' : ''}
                    onClick = {() => this.switchTabs(tab.type)}
                  >按{tab.name}排序</li>
                ))
              }
            </ul>
          </div>

          {/* 添加评论 */}
          <div className="comment-send">
            <div className="user-face">
              <img className="user-head" src={avatar} alt="" />
            </div>
            <div className="textarea-container">
              <textarea
                cols="80"
                rows="5"
                placeholder="发条友善的评论"
                className="ipt-txt"
                value={this.state.comment}
                onChange={this.textareaChange}
                ref = {this.textareaRef}
              />
              <button className="comment-submit" onClick={this.submitComment}>发表评论</button>
            </div>
            <div className="comment-emoji">
              <i className="face"></i>
              <span className="text">表情</span>
            </div>
          </div>

          {/* 评论列表 */}
          <div className="comment-list">
            {
              this.state.list.map(item => (
                <div className="list-item" key={item.id}>
                  <div className="user-face">
                    <img className="user-head" src={avatar} alt="" />
                  </div>
                  <div className="comment">
                    <div className="user">{item.author}</div>
                    <p className="text">{item.comment}</p>
                    <div className="info">
                      <span className="time">{formatDate(item.time)}</span>
                      <span 
                        className={item.attitude === 1 ? 'like liked' : 'like'}
                        onClick={() => this.likeComment(item)}
                      >
                        <i className="icon" />
                      </span>
                      <span 
                        className={item.attitude === -1 ? 'hate hated' : 'hate'} 
                        onClick={() => this.hateComment(item)}
                      >
                        <i className="icon" />
                      </span>
                      <span className="reply btn-hover" onClick={() => this.delComment(item.id)}>删除</span>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>

          {/* 评论数 */}
          <div className="comment-head">
            <span>共 {this.state.list.length} 条评论</span>
          </div>
        </div>
      </div>)
  }
}


export default App
