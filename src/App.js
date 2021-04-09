import React, {useState, useRef, useMemo, useCallback} from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';
import Counter from './Counter';
import InputSample from './InputSample';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중,,,');
  return users.filter(user => user.active).length;
}

function App() {

  const [inputs, setInputs] = useState({
    username:'',
    email:''
  });

  // 비구조화 할당 - 값 추출
  const {username, email} = inputs;

  const onChange = useCallback(

    e => {
      // 타켓에서 namer, value 추출
      const {name, value} = e.target;
      setInputs({
        ...inputs, // 기존 객체 복사
        [name]: value // name키를 가진 값을 value로 설정
      });
    },

    [inputs]
  );

  const [users, setUsers] = useState([
    {
        id:1,
        username:'velopert',
        email:'public.velopert@gmail.com',
        active: true
    },
    {
        id:2,
        username:'tester',
        email:'tester@example.com',
        active: false
    },
    {
        id:3,
        username:'liz',
        email:'liz@example.com',
        active: false
    }
]);

const nextId = useRef(4);

const onCreate = useCallback(() => {
  const user = {
    id: nextId.current,
    username,
    email
  };
  setUsers([...users, user]); // = users.concat(user) 

  setInputs({
    username:'',
    email:''
  });

  nextId.current += 1;
}, [users, username, email]
);

const onRemove = useCallback(
  id => {
  // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
  // 즉, user.id 가 id 인 것을 제거함
  setUsers(users.filter(user => user.id !== id));
  },
  [users]
);

const onToggle = useCallback(
  id => {
  setUsers(
    users.map(user =>
      user.id === id ?  {...user, active: !user.active } : user
      )
  );
  },
  [users]
);

const count = useMemo(() => countActiveUsers(users), [users]);

  return (
  <>
    <CreateUser 
      username={username}
      email={email}  
      onChange={onChange}
      onCreate={onCreate}
    />
    <UserList users = {users} onRemove={onRemove} onToggle={onToggle} />
    <div>활성 사용자 수 : {count}</div>
  </>
  );
}

export default App;
