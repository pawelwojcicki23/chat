import  './css/index.css';
import  './css/other.css';
import Navigo from 'navigo';
import axios from 'axios';
console.log('JavaScript was attached to the page!');

const router = new Navigo();



router
  .on({
    'chat': (params) => { 
        document.querySelector('#content').innerHTML =
        `<div class="chat">
        <h2>2. CHAT SCREEN</h2>
        <div class="chat-screen" id="content">
          <p>LAIT Chat</p>
          <div class="messages"></div><br>
          <input type="text" name="message" placeholder="Message" class="message">
          <input type="button" value="Add" id="add" class="add"><br>
        </div>
      </div>`;
      axios.get('http://194.182.69.199:3000/chat', {
          headers: {
              Authorization: sessionStorage.token
          }
      }) .then((results) => console.log(results));
    },
    '*': () => { 
      document.querySelector('#content').innerHTML =
      `<div class="login">
      <h2>1. LOGIN SCREEN</h2>
      <div class="login-screen" id="content">
        <p>LAIT Chat</p>
        <label for="username" class="user-label">Username</label><br>
        <input type="text" name="username" placeholder="Username" class="user" id="username"><br>
        <input type="button" value="Enter Chat" id="enter" class="enter"><br>
      </div>
    </div>`;
    }
  })
  .resolve();

  let user = document.querySelector('#username');
  const button = document.querySelector('#enter');
  button.addEventListener('click', () => {
      if (user.value.trim() === '') {
          return;
      }
    axios.post('http://194.182.69.199:3000/chatlogin', {
        alias: user.value,
    })
    .then((response) => {
        sessionStorage.token = response.data.token;
        router.navigate('chat');
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    })
  });