const outputDiv = document.getElementById('output');
const cmdInput = document.getElementById('cmd');
let isConnectedToMakson = false;
let scriptElement;

function simulateTerminalResponse(response) {
    outputDiv.innerHTML += '<br>' + '<span style="color: red;">incognito</span> |$ ';
    const responseElement = document.createElement('div');
    responseElement.style.color = '#55ff55';
    responseElement.style.display = "inline-block";
    responseElement.style.color = 'white';
    outputDiv.appendChild(responseElement);

    let index = 0;
    const intervalId = setInterval(() => {
        if (response[index] === '\n') {
            responseElement.appendChild(document.createElement('br'));
        } else {
            responseElement.innerHTML += response[index] + '';
        }

        index++;

        if (index === response.length) {
            clearInterval(intervalId);
            cmdInput.focus();
        }
    },
        50);
}

cmdInput.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        if (isConnectedToMakson) {
            simulateTerminalResponse('Cannot input commands while connected to Makson. Disconnect first.');
            cmdInput.innerHTML = '';
            return;
        }

        const command = cmdInput.innerText.trim().toLowerCase();
        const commandPrompt = '<span style="color: #55ff55;" id="">com.user |</span>';
        outputDiv.innerHTML += `<div style="color: #;" id="user-input">${commandPrompt}<span>${command}</span></div>`;

        if (command.startsWith('vibrate')) {
            const durationMatch = command.match(/vibrate (\d+) to (\d+)/);

            if (durationMatch) {
                const minDuration = parseInt(durationMatch[1]);
                const maxDuration = parseInt(durationMatch[2]);

                if (!isNaN(minDuration) && !isNaN(maxDuration) && minDuration <= maxDuration) {
                    const randomDuration = Math.floor(Math.random() * (maxDuration - minDuration + 1)) + minDuration;
                    vibrateDevice(randomDuration);
                } else {
                    simulateTerminalResponse('Invalid vibration range');
                }
            } else {
                simulateTerminalResponse('Invalid command format. Use "vibrate [min] to [max]"');
            }
        } else if (command.startsWith('print')) {
            const printMatch = command.match(/print (.+) (\d+)/);

            if (printMatch) {
                const textToPrint = printMatch[1].trim();
                const repeatCount = parseInt(printMatch[2]);

                if (textToPrint && !isNaN(repeatCount) && repeatCount > 0) {
                    for (let i = 0; i < repeatCount; i++) {
                        simulateTerminalResponse(textToPrint);
                    }
                } else {
                    simulateTerminalResponse('Invalid print command format. Use "print [text] [number]"');
                }
            } else {
                simulateTerminalResponse('Invalid print command format. Use "print [text] [number]"');
            }

        } else if (command === 'ok' || command === 'thank you' || command === 'thank' || command === 'thnx' || command === 'thanks' || command === 'then cmd') {
            const gratitudeResponses = [
                'You\'re welcome!',
                'No problem!',
                'Glad I could help!',
                'Anytime!',
                'You got it!',
                'Sure thing!'
            ];

            const randomResponse = gratitudeResponses[Math.floor(Math.random() * gratitudeResponses.length)];
            simulateTerminalResponse(randomResponse);
        } else if (
            command === 'what are you doing' ||
            command === 'what\'s are you doing' ||
            command === 'what\'s are you doing now' ||
            command === 'what are you doing now'
        ) {
            const doingResponses = [
                'I\'m assisting you right now.',
                'Just helping out with your queries.',
                'Answering your commands and questions.',
                'Engaged in chat mode.',
                'Providing information and assistance.',
                'Responding to your inputs.',
                'Executing your commands.',
                'Being your virtual assistant.',
                'Responding to your inquiries.',
                'Assisting with various tasks.'
            ];
            const trimmedCommand = command.replace(/[?]/g, '').trim();
            const randomResponse = doingResponses[Math.floor(Math.random() * doingResponses.length)];
            simulateTerminalResponse(randomResponse);
        } else if (command === 'makson') {
            const maksonInfoResponse = 'Makson Chakma ☑️ \nHello, World! My name is Makson Chakma. I\m from Arunachal Pradesh studying in Bengaluru. \n My HOBBIES: \n1 | 💻 Technology,\n2 | 💁 Tips & tricks,\n3 | 🎁 Sharing my knowledges,\n My LANGUAGES: \n1 | Chakma - mother tongue,\n2 | Hindi,\n3 | English,\n4 | Assamese,\n My PROGRAMMING-LANGUAGES:\n1 | HTML,\n2 | CSS,\n3 | JAVASCRIPT,\n My GOAL \n 1 | 18,1.4,13812, 8,938 21.9,4,59,,3,13,+ along ♂️ humble man.';
            simulateTerminalResponse(maksonInfoResponse);
        } else if (command === 'gps emulator' || command === 'gps' || command === 'location hacking' || command === 'hack location') {
            const gpsInfoResponse = 'GPS Emulator Gps Emulator is a real time location hacking app free for Android users. With this you can change your location within a second. Simple to use not complicated. Remember this app is free to use for prank purpose. It\s not illegal to use this app, but make sure you should not use for illegal activities. For more below send me message from contact form.\n use "gps tool" command to get the tool';
            simulateTerminalResponse(gpsInfoResponse);
        } else if (command === 'gps tool') {
            const gpstoolResponse = ' $ error! server down!';
            simulateTerminalResponse(gpstoolResponse);
        }
        else if (command === 'netsh') {
            const netshResponse = 'Unable to perform in Android!';
            simulateTerminalResponse(netshResponse);


        } else if (command === 'dir') {
            const dirResponse = 'Directory of C:\\\n\nProgram Files\nUsers\nWindows';
            simulateTerminalResponse(dirResponse);
        } else if (command === 'echo') {
            const echoText = command.slice(5).trim();
            simulateTerminalResponse(echoText);
        } else if (command === 'date') {
            const currentDate = new Date().toLocaleDateString();
            simulateTerminalResponse(currentDate);
        } else if (command === 'help') {
            const helpResponse = 'Available commands:\n- ipconfig\n- dir\n- echo [text]\n- date\n- netsh\n- browser info\n- vibrate [min] to [max]';
            simulateTerminalResponse(helpResponse);
        } else if (command === 'who is your crush' || command === 'crush') {
            const crushResponse = 'My crush: <a href="https://instagram.com/sanjanatannya" target="_blank">Sanjana Tannya</a>';
            outputDiv.insertAdjacentHTML('beforeend', '<br>incognito | $' + crushResponse) + '<br>';
            cmdInput.focus();
        } else if (command === 'fa smiley' || command === 'smiley1.png' || command === 'crush png' || command === 'crush pic 1' || command === 'crush pic1' || command === 'crush img 1' || command === 'crush img1') {
            const imgResponse = '<div onclick="alertUser();"><img id="img" src="KrismaChakma.png" alt="Lovely Krisma Chakma"></div>\n<span id="caption">Caption: Lovely Krisma Chakma</span><br>';
            outputDiv.insertAdjacentHTML('beforeend', '<br>MAKSON | ' + imgResponse);
            cmdInput.focus();
        } else if (command === 'ip' || command === 'my ip' || command === 'what is my ip' || command === 'ip address') {
            getUserIP().then(ip => {
                const ipResponse = `Your IP Address: ${ip}`;
                simulateTerminalResponse(ipResponse);
            });
        } else if (command === 'who are you') {
            const botResponse = "I'm incognito, ";
            simulateTerminalResponse(botResponse);
        } else if (command === 'clear history' || command === 'clear') {
            outputDiv.innerHTML = '<div class="user-input">AI-justin26: All chat has been deleted!</div><br>';
        } else if (command === 'about you' || command === 'about yourself') {
            const aboutmeResponse = 'About my boss:\n Name - Makson Chakma \n Mother Name - Smt Gulsoki Chakma\n Father Name - Shri Sukhadev Chakma\n DOB - 26/09/2003\n POB - Mpen, Mio, Arunachal\n BIO ~ P Makson Chakma: 🌌 A seeker of joy and wisdom, dancing through lifes highs and lows. Radiating kindness, curiosity, and resilience.';
            simulateTerminalResponse(aboutmeResponse);
        } else if (command === 'about asha' || command === 'asha yuni' || command === 'asha' || command === 'yuni') {
            const aboutashayuniResponse = 'About Asha Yuni:\n Name - Asha Yuni \n Mother Name - unable to fetch!\n Father Name - unable ro fetch!\n DOB - 18/04/2006\n POB - unable to fetch!\n BIO ~ Asha Yuni, a vibrant 9th-grade student, finds joy in exploring the richworld of Korean culture. Her passion for learning and embracing diversity shines through in her academic journey.';
            simulateTerminalResponse(aboutashayuniResponse);
        } else if (command.startsWith('countdown')) {
            const countdownDuration = parseInt(command.split(' ')[1]);

            if (!isNaN(countdownDuration) && countdownDuration > 0) {
                initiateCountdown(countdownDuration);
            } else {
                simulateTerminalResponse('Invalid countdown duration');
            }
        } else if (command === 'connect makson.js' || command === 'connect with makson' || command === 'connect to makson' || command === 'connect makson') {
            const connectResponse = 'Connecting to makson.js...';
            simulateTerminalResponse(connectResponse);

            if (!scriptElement) {
                scriptElement = document.createElement('script');
                scriptElement.src = 'makson.js';
                document.body.appendChild(scriptElement);
                isConnectedToMakson = true;
            } else {
                simulateTerminalResponse('Already connected to makson.js');
            }
        } else {
            simulateTerminalResponse('Command not recognized');
        }

        cmdInput.innerHTML = '';
    }
});

function alertUser() {
    alert("Don't dare me to touch!");
    document.getElementById("img").style.width = '0';
}

function initiateCountdown(duration) {
    let timeLeft = duration;

    const countdownInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            simulateTerminalResponse('Countdown completed');
            cmdInput.focus();
        } else {
            simulateTerminalResponse(`T-${timeLeft}s`);
            timeLeft--;
        }
    },
        1000);
}

const getUserIP = async () => {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP address:',
            error);
        return 'unknown';
    }
};

const displayFullUserIPv4 = async () => {
    const userIP = await getUserIP();
    const userIPElement = document.getElementById('userIP');

    for (let i = 0; i < userIP.length; i++) {
        setTimeout(() => {
            userIPElement.innerText = 'yourIP/' + userIP.substring(0, i + 1) + ':';
        }, 100 * i);
    }
};

window.onload = displayFullUserIPv4;

function vibrateDevice(duration) {
    if (navigator.vibrate) {
        const startTime = new Date().getTime();
        const endTime = startTime + duration;

        simulateTerminalResponse(`Vibrating for ${duration} milliseconds...`);

        const countdownInterval = setInterval(() => {
            const currentTime = new Date().getTime();

            if (currentTime >= endTime) {
                clearInterval(countdownInterval);
                simulateTerminalResponse('Vibrate complete');
                cmdInput.focus();
            } else {
                const remainingTime = Math.ceil((endTime - currentTime) / 1000);
                simulateTerminalResponse(`Vibrating for ${remainingTime}s`);
            }
        },
            1000);

        navigator.vibrate(duration);
    } else {
        simulateTerminalResponse('Error: Vibration not supported on this device.');
    }
}
