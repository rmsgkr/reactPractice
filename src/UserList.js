import React, {useEffect} from 'react';

function User({user, onRemove, onToggle}) {
    useEffect(() => {
        console.log('컴포넌트가 화면에 나타났다!(마운트)');
        return () => {
            console.log('컴포넌트 사라짐,,,(언마운트)');
        };
    }, []); // 마운트
    // 화면 사라질때 clean up
    // 값 넣을 시 업데이트
    // 생략시 리렌더링 될때마다 호출
    return (
        <div>
            <b
                style={{
                    cursor: 'pointer',
                    color: user.active ? 'red' : 'black'
                }}
                onClick={() => onToggle(user.id)}
            >
                {user.username}
            </b>
            &nbsp;
            <span>({user.email})</span>
            <button onClick={() => onRemove(user.id)}>삭제하기</button>
        </div>
    );
}

function UserList({users, onRemove, onToggle}){

    return (
        <div>
           {/*  <User user={users[0]} />
            <User user={users[1]} />
            <User user={users[2]} /> */}

            {users.map(user => (
                <User 
                    user={user} 
                    key={user.id} 
                    onRemove={onRemove}
                    onToggle={onToggle}
                />
            ))}
        </div>
    );
}

export default UserList;