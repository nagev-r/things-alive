const createRoomBtn = document.getElementById('create-session');
const joinRoomBtn = document.getElementById('join-session');


export function updateUI(user){
    const inviteBtn = document.getElementById('invite-session');
    const leaveBtn = document.getElementById('leave-session');

    if(!user.isHost){
        createRoomBtn.classList.add('hidden');
        joinRoomBtn.classList.add('hidden');

        inviteBtn.classList.remove('hidden');
        leaveBtn.classList.remove('hidden');

    } else {
        createRoomBtn.classList.add('hidden');
        joinRoomBtn.classList.add('hidden');

        leaveBtn.classList.remove('hidden');
    }
}

export function showCreateCard(roomId){
    const roomKey = document.getElementById('room-key');

    roomKey.textContent = roomId;
    document.getElementById('create-card').classList.remove('hidden'); 
}


export function setupUI() {
    const cardBackdrop = document.getElementById('card-backdrop');

    const exitBtns = document.querySelectorAll('.exit-btn');
    exitBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.card').forEach(p => p.classList.add('hidden'));
            cardBackdrop.classList.add('hidden');
        });
    });
    
    createRoomBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent("createRoom"));
        cardBackdrop.classList.remove('hidden');
        
    })

    joinRoomBtn.addEventListener('click', () => {
        cardBackdrop.classList.remove('hidden');
        document.getElementById('join-card').classList.remove('hidden');
  
    })

    const enterBtn = document.getElementById('enter-btn');
    const keyInput = document.getElementById('key-input');
    const inputVal = keyInput.textContent; //for some reason empty string!
    enterBtn.addEventListener('click', () => {
        console.log("b:", inputVal);
        const chkdInputVal = inputVal.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
        console.log("a:", chkdInputVal);
        window.dispatchEvent(new CustomEvent("joinRoom", {
            detail: chkdInputVal
        }));
    })

    const navBtns = document.querySelectorAll('[data-target]');
    navBtns.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const targetPanel = document.getElementById(targetId);

            document.querySelectorAll('.panel').forEach(p => {
                if( p !== targetPanel) p.classList.add('hidden');     
            })

            targetPanel.classList.toggle('hidden');
        })
    });

    const backBtns = document.querySelectorAll('.back-btn');
    backBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.panel').forEach(p => p.classList.add('hidden'));
            document.getElementById('main-panel').classList.remove('hidden');
        });
    });
}

