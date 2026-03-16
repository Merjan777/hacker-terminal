const input = document.getElementById('commandInput');
const output = document.getElementById('output');

const missions = [
    { target: "firewall_01", pass: "admin123", hint: "Common default admin password" },
    { target: "data_server", pass: "mz_studio_2026", hint: "Studio name + current year" }
];

let currentMission = 0;

input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const cmd = this.value.toLowerCase().trim();
        processCommand(cmd);
        this.value = '';
    }
});

function print(text, className = "") {
    const p = document.createElement('p');
    p.innerText = text;
    if (className) p.classList.add(className);
    output.appendChild(p);
    output.parentElement.scrollTop = output.parentElement.scrollHeight;
}

function processCommand(cmd) {
    print(`agent@mz_studio:~$ ${cmd}`);

    if (cmd === 'help') {
        print("Available commands: help, mission, scan, crack [password], clear");
    } 
    else if (cmd === 'mission') {
        print(`CURRENT TARGET: ${missions[currentMission].target}`, "system-msg");
        print(`HINT: ${missions[currentMission].hint}`);
    } 
    else if (cmd === 'scan') {
        print("Scanning target...");
        setTimeout(() => print(`Vulnerability found in ${missions[currentMission].target}! Try 'crack' command.`), 1000);
    } 
    else if (cmd.startsWith('crack ')) {
        const password = cmd.split(' ')[1];
        if (password === missions[currentMission].pass) {
            print("ACCESS GRANTED! System compromised.", "success-msg");
            if (currentMission < missions.length - 1) {
                currentMission++;
                print("New mission unlocked. Type 'mission' to see details.");
            } else {
                print("All systems hacked. You are the master agent!", "success-msg");
            }
        } else {
            print("ACCESS DENIED. Incorrect password.", "error-msg");
        }
    } 
    else if (cmd === 'clear') {
        output.innerHTML = '';
    } 
    else {
        print(`Command not found: ${cmd}`, "error-msg");
    }
}
