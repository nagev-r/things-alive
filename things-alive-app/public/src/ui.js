const createRoomBtn = document.getElementById('create-session');
const joinRoomBtn = document.getElementById('join-session');
const inviteBtn = document.getElementById('invite-session');
const leaveRoomBtn = document.getElementById('leave-session');

export function showCopyMsg(msg){
    const subtext = document.getElementById('copy-subtext');

    subtext.textContent = msg;
    subtext.classList.remove('hidden');

    setTimeout(() =>{
        subtext.classList.add('hidden');
    }, 2000)
}

export async function copyToClipboard(roomCode){
    try{
        await navigator.clipboard.writeText(roomCode);
        showCopyMsg('Copied to clipboard!');
    }catch(err){
        showCopyMsg('Could not copy to clipboard');
        console.log('Failed to copy: ', err);
    }
}

export function updateUI(userIsHost, userRoom){
    const inviteBtn = document.getElementById('invite-session');
    const leaveBtn = document.getElementById('leave-session');

    if(userIsHost){ //maybe there's a better way of doing this lol, switch stmnt?
        createRoomBtn.classList.add('hidden');
        joinRoomBtn.classList.add('hidden');

        inviteBtn.classList.remove('hidden');
        leaveBtn.classList.remove('hidden');

    } else if (!userIsHost && userRoom) {
        createRoomBtn.classList.add('hidden');
        joinRoomBtn.classList.add('hidden');

        inviteBtn.classList.add('hidden');
        leaveBtn.classList.remove('hidden');
    } else{
        createRoomBtn.classList.remove('hidden');
        joinRoomBtn.classList.remove('hidden');

        inviteBtn.classList.add('hidden');
        leaveBtn.classList.add('hidden');
    }
}

export function showCreateCard(roomId){
    const roomKey = document.getElementById('room-key');

    roomKey.textContent = roomId;
    document.getElementById('create-card').classList.remove('hidden'); 
}


export function setupUI() {
    const cardBackdrop = document.getElementById('card-backdrop');
    const copyCodeBtn = document.getElementById('copy-btn');

    const exitBtns = document.querySelectorAll('.exit-btn');
    exitBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.card').forEach(p => p.classList.add('hidden'));
            cardBackdrop.classList.add('hidden');
        });
    });

    leaveRoomBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent("leaveRoom"));
    })
    
    createRoomBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent("createRoom"));
        cardBackdrop.classList.remove('hidden');
        
    })

    joinRoomBtn.addEventListener('click', () => {
        cardBackdrop.classList.remove('hidden');
        document.getElementById('join-card').classList.remove('hidden');
  
    })

    inviteBtn.addEventListener('click', async () =>{
        window.dispatchEvent(new CustomEvent("inviteCode"));
    })

    copyCodeBtn.addEventListener('click', async () =>{
        window.dispatchEvent(new CustomEvent("inviteCode"));
    })

    //JOIN INPUT
    const enterBtn = document.getElementById('enter-btn');
    const keyInput = document.getElementById('key-input');
    
    enterBtn.addEventListener('click', () => {
        const inputVal = keyInput.value; 
        console.log("b:", inputVal);
        const chkdInputVal = inputVal.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
        console.log("a:", chkdInputVal);
        window.dispatchEvent(new CustomEvent("joinRoom", {
            detail: chkdInputVal
        }));
    })

    //NAV BUTTONS
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

