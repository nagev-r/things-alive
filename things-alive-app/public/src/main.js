import { setupWorkspace } from "./workspace.js";

document.addEventListener("DOMContentLoaded", () => {
    setupWorkspace();

    const createRoomBtn = document.getElementById('create-session');
    const joinRoomBtn = document.getElementById('join-session');

    const NavBtns = document.querySelectorAll('[data-target]');
    NavBtns.forEach(button => {
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
});

  


